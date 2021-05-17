import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import CharacteristicChooserComponent from "@psi/profiles/components/CharacteristicChooser";
import PreferenceChooserComponent from "@psi/profiles/components/PreferenceChooser";
import {
  CharacteristicType,
  GetCharacteristicMessages,
  GetCharacteristicMessagesInput,
  GetCharacteristicMessagesResponse,
  GetCharacteristics,
  GetCharacteristicsResponse,
  MyPsychologistProfile,
  MyPsychologistProfileResponse,
  SetMyPsychologistCharacteristicChoicesAndPreferences,
  SetMyPsychologistCharacteristicChoicesAndPreferencesInput,
  UpsertMyPsychologistProfile,
  UpsertMyPsychologistProfileInput,
} from "@psi/profiles/components/PsychologistData/graphql";
import { HAPPINESS_OPTIONS } from "@psi/profiles/constants/happiness";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import DateInput from "@psi/styleguide/components/DateInput";
import Input from "@psi/styleguide/components/Input";
import Col from "@psi/styleguide/components/Layout/Col";
import Row from "@psi/styleguide/components/Layout/Row";
import MainTitle from "@psi/styleguide/components/Typography/MainTitle";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import { BIRTH_DATE_FORMAT } from "@psi/styleguide/constants/locale";
import useToast from "@psi/styleguide/hooks/useToast";

const PsychologistDataComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const { data: characteristicData } = useQuery<GetCharacteristicsResponse>(
    GetCharacteristics,
  );

  const {
    data: profileData,
    error: profileError,
    loading: profileLoading,
  } = useQuery<MyPsychologistProfileResponse>(MyPsychologistProfile);

  const [
    getCharacteristicMessages,
    { data: characteristicMessagesData },
  ] = useLazyQuery<
    GetCharacteristicMessagesResponse,
    GetCharacteristicMessagesInput
  >(GetCharacteristicMessages);

  const [
    getPreferenceMessages,
    { data: preferenceMessagesData },
  ] = useLazyQuery<
    GetCharacteristicMessagesResponse,
    GetCharacteristicMessagesInput
  >(GetCharacteristicMessages);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const likeNameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const birthDateInitialValue = useState<string>("");

  const characteristics = useState<
    {
      name: string;
      type: CharacteristicType;
      possibleValues: string[];
    }[]
  >([]).attach(Downgraded);

  const choices = useState<Record<string, unknown>>({});

  const preferences = useState<
    {
      name: string;
      type: CharacteristicType;
      possibleValues: string[];
    }[]
  >([]).attach(Downgraded);

  const weights = useState<Record<string, Record<string, number>>>({});

  const characteristicMessages = useState<Record<string, string>>({});

  const preferenceMessages = useState<Record<string, string>>({});

  useEffect(() => {
    if (profileError?.message && profileError.message !== "forbidden") {
      addToast({
        header: "Erro ao carregar informações",
        message:
          "Sentimos muito pelo transtorno. Vamos investigar e resolver este problema.",
      });
      console.error(profileError);
      router.push("/");
    }
  }, [profileError]);

  // Load current values and fill the fields
  useEffect(() => {
    if (profileData) {
      fullNameRef.current.value =
        profileData.myPsychologistProfile?.fullName || "";
      likeNameRef.current.value =
        profileData.myPsychologistProfile?.likeName || "";
      cityRef.current.value = profileData.myPsychologistProfile?.city || "";

      const birthDate = Number(profileData.myPsychologistProfile?.birthDate)
        ? new Date(1000 * Number(profileData.myPsychologistProfile.birthDate))
        : undefined;

      if (birthDate) {
        birthDateInitialValue.set(dayjs(birthDate).format(BIRTH_DATE_FORMAT));
      }
    }
  }, [profileData]);

  // Load all characteristics and all preferences
  useEffect(() => {
    if (characteristicData) {
      characteristics.set(characteristicData.psychologistCharacteristics);
      preferences.set(characteristicData.patientCharacteristics);
    }
  }, [characteristicData]);

  // Fetch messages for characteristics and preferences
  useEffect(() => {
    if (characteristicData) {
      let keys = [];

      for (const i of characteristicData.psychologistCharacteristics) {
        keys.push(`psy-char:${i.name}`);
        for (const j of i.possibleValues) {
          keys.push(`psy-char:${i.name}:${j}`);
        }
      }
      getCharacteristicMessages({ variables: { lang: "pt-BR", keys } });

      keys = [];

      for (const i of characteristicData.patientCharacteristics) {
        for (const j of i.possibleValues) {
          keys.push(`pat-pref:${i.name}:${j}`);
        }
      }

      getPreferenceMessages({ variables: { lang: "pt-BR", keys } });
    }
  }, [characteristicData]);

  // Set characteristic messages from server
  useEffect(() => {
    if (characteristicMessagesData) {
      characteristicMessages.set(
        characteristicMessagesData?.translations.reduce(
          (final, current) => ({
            ...final,
            [current.key]: current.value,
          }),
          {},
        ),
      );
    }
  }, [characteristicMessagesData]);

  // Set preference messages from server
  useEffect(() => {
    if (preferenceMessagesData) {
      preferenceMessages.set(
        preferenceMessagesData?.translations.reduce(
          (final, current) => ({
            ...final,
            [current.key]: current.value,
          }),
          {},
        ),
      );
    }
  }, [preferenceMessagesData]);

  // Load current characteristic choices and fill the fields
  useEffect(() => {
    if (!profileLoading && characteristics.value) {
      const initialChoices = {};
      for (const char of characteristics.value) {
        if (char.type === "BOOLEAN" || char.type === "SINGLE") {
          initialChoices[
            char.name
          ] = profileData.myPsychologistProfile?.characteristics?.find(
            (profileChar) => profileChar.name === char.name,
          ).selectedValues[0];
        } else if (char.type === "MULTIPLE") {
          initialChoices[char.name] = {};
          profileData.myPsychologistProfile?.characteristics
            ?.find((profileChar) => profileChar.name === char.name)
            .selectedValues.forEach(
              (sv) => (initialChoices[char.name][sv] = true),
            );
        }
      }
      choices.set(initialChoices);
    }
  }, [profileLoading, characteristics.value]);

  // Load current preference weights and fill the fields
  useEffect(() => {
    if (!profileLoading && preferences.value) {
      const initialWeights = {};
      const possibleWeights = HAPPINESS_OPTIONS.map((ho) => ho.value);
      for (const pref of preferences.value) {
        initialWeights[pref.name] = {};
        for (const pv of pref.possibleValues) {
          const weight = profileData.myPsychologistProfile?.preferences?.find(
            (profilePref) =>
              profilePref.characteristicName === pref.name &&
              profilePref.selectedValue === pv,
          )?.weight;
          initialWeights[pref.name][pv] =
            weight !== undefined && possibleWeights.includes(weight)
              ? weight
              : undefined;
        }
      }
      weights.set(initialWeights);
    }
  }, [profileLoading, preferences.value]);

  const [upsertMyPsychologistProfile] = useMutation<
    null,
    UpsertMyPsychologistProfileInput
  >(UpsertMyPsychologistProfile);

  const [setMyPsychologistCharacteristicChoicesAndPreferences] = useMutation<
    null,
    SetMyPsychologistCharacteristicChoicesAndPreferencesInput
  >(SetMyPsychologistCharacteristicChoicesAndPreferences, {
    refetchQueries: [{ query: MyPsychologistProfile }],
  });

  const handleSave = async () => {
    // Gathering profile input information
    const profileInput = {
      fullName: fullNameRef.current.value,
      likeName: likeNameRef.current.value,
      birthDate: dayjs(
        birthDateRef.current.value,
        BIRTH_DATE_FORMAT,
        true,
      ).unix(),
      city: cityRef.current.value,
    };

    // Checking if profileInput is invalid
    if (
      profileInput.fullName === "" ||
      profileInput.likeName === "" ||
      profileInput.city === "" ||
      isNaN(profileInput.birthDate)
    ) {
      addToast({
        header: "Verifique as informações",
        message: "Há campos em branco ou inválidos que devem ser preenchidos.",
      });
      return;
    }

    // Gathering characteristic choice input information
    const choiceInput = Object.keys(choices.value).map((cho) => {
      if (typeof choices.value[cho] === "string") {
        return {
          characteristicName: cho,
          selectedValues: [choices.value[cho] as string],
        };
      } else {
        return {
          characteristicName: cho,
          selectedValues: Object.keys(choices.value[cho]).filter(
            (key) => choices.value[cho][key],
          ),
        };
      }
    });

    // Checking if choiceInput is invalid (all BOOLEAN and SINGLE fields must be filled)
    if (
      !characteristics.value
        .filter((ch) => ["BOOLEAN", "SINGLE"].includes(ch.type))
        .every((ch) => Object.keys(choices.value).includes(ch.name))
    ) {
      addToast({
        header: "Verifique as informações",
        message: "Há características em branco que devem ser preenchidas.",
      });
      return;
    }

    // Gathering preferences weights input information
    const weightInput = Object.keys(weights.value).flatMap((charName) => {
      return Object.keys(weights.value[charName]).map((value) => {
        return {
          characteristicName: charName,
          selectedValue: value,
          weight: weights.value[charName][value],
        };
      });
    });

    // Checking if weightInput is invalid
    if (
      preferences.value.reduce(
        (final, current) => final + current.possibleValues.length,
        0,
      ) !== weightInput.length
    ) {
      addToast({
        header: "Verifique as informações",
        message: "Há preferências em branco que devem ser preenchidas.",
      });
      return;
    }

    // Sending new information to server
    try {
      await upsertMyPsychologistProfile({
        variables: {
          profileInput,
        },
      });

      await setMyPsychologistCharacteristicChoicesAndPreferences({
        variables: {
          choiceInput,
          weightInput,
        },
      });

      addToast({
        header: "Tudo certo",
        message: "Perfil atualizado com sucesso.",
      });
      router.push("/");
    } catch (err) {
      addToast({
        header: "Erro ao enviar informações",
        message:
          "Sentimos muito pelo transtorno. Vamos investigar e resolver este problema.",
      });
      console.error(err);
      router.push("/");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <>
      <Card>
        <MainTitle center>Atualização do perfil do psicólogo</MainTitle>
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Dados do psicólogo
        </MediumTitle>
        <Input name="fullName" label="Nome completo" reference={fullNameRef} />
        <Input
          name="likeName"
          label="Nome pelo qual gostaria de ser chamado"
          reference={likeNameRef}
        />
        <Row>
          <Col xs={12} md={4}>
            <DateInput
              format={BIRTH_DATE_FORMAT}
              forwardedValue={birthDateInitialValue.value}
              name="birthDate"
              label="Data de nascimento"
              reference={birthDateRef}
            />
          </Col>
          <Col xs={12} md={8}>
            <Input
              name="city"
              label="Cidade em que reside"
              reference={cityRef}
            />
          </Col>
        </Row>
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Características do psicólogo
        </MediumTitle>
        <CharacteristicChooserComponent
          characteristics={characteristics.value}
          choices={choices}
          messages={characteristicMessages.value}
          prefix="psy-char"
        />
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Preferências do psicólogo
        </MediumTitle>
        <PreferenceChooserComponent
          preferences={preferences.value}
          weights={weights}
          messages={preferenceMessages.value}
          prefix="pat-pref"
        />
      </Card>
      <Card>
        <Row style={{ margin: "1rem" }}>
          <Col xs={12} md={6}>
            <Button block color="primary" onClick={handleSave}>
              Salvar
            </Button>
          </Col>
          <Col xs={12} md={6}>
            <Button block color="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PsychologistDataComponent;
