import { useState } from "@hookstate/core";
import { format, parse } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";

import CharacteristicChooserComponent from "@psi/profiles/components/CharacteristicChooser";
import PreferenceChooserComponent from "@psi/profiles/components/PreferenceChooser";
import { PSYCHOLOGIST_CHARACTERISTIC_PREFIX } from "@psi/profiles/constants/characteristicPrefixes";
import { HAPPINESS_OPTIONS } from "@psi/profiles/constants/happiness";
import useCharacteristics from "@psi/profiles/hooks/useCharacteristics";
import {
  MyPsychologistProfileDocument,
  useMyPsychologistProfileQuery,
  useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation,
  useUpsertMyPsychologistProfileMutation,
} from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import DateInput from "@psi/styleguide/components/DateInput";
import Input from "@psi/styleguide/components/Input";
import Col from "@psi/styleguide/components/Layout/Col";
import Row from "@psi/styleguide/components/Layout/Row";
import TextArea from "@psi/styleguide/components/TextArea";
import MainTitle from "@psi/styleguide/components/Typography/MainTitle";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import { BIRTH_DATE_FORMAT } from "@psi/styleguide/constants/locale";
import useToast from "@psi/styleguide/hooks/useToast";

const PsychologistDataComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const {
    data: profileData,
    error: profileError,
    loading: profileLoading,
  } = useMyPsychologistProfileQuery();

  const fullNameRef = useRef<HTMLInputElement>(null);
  const likeNameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const birthDateInitialValue = useState<string>("");

  const choices = useState<Record<string, unknown>>({});

  const weights = useState<Record<string, Record<string, number>>>({});

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
      bioRef.current.value = profileData.myPsychologistProfile?.bio || "";

      const birthDate = Number(profileData.myPsychologistProfile?.birthDate)
        ? new Date(1000 * Number(profileData.myPsychologistProfile.birthDate))
        : undefined;

      if (birthDate) {
        birthDateInitialValue.set(format(birthDate, BIRTH_DATE_FORMAT));
      }
    }
  }, [profileData]);

  const { characteristics, messages } = useCharacteristics();

  const chars = characteristics?.psychologistCharacteristics || [];
  const preferences = useMemo(
    () =>
      (characteristics?.patientCharacteristics || []).filter(
        (pref) => pref.name !== "income",
      ),
    [characteristics],
  );

  // Load current characteristic choices and fill the fields
  useEffect(() => {
    if (!profileLoading && chars) {
      const initialChoices = {};
      for (const char of chars) {
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
  }, [profileLoading, chars]);

  // Load current preference weights and fill the fields
  useEffect(() => {
    if (!profileLoading && preferences) {
      const initialWeights = {};
      const possibleWeights = HAPPINESS_OPTIONS.map((ho) => ho.value);
      for (const pref of preferences) {
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
  }, [profileLoading, preferences]);

  const [
    upsertMyPsychologistProfile,
  ] = useUpsertMyPsychologistProfileMutation();

  const [
    setMyPsychologistCharacteristicChoicesAndPreferences,
  ] = useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation({
    refetchQueries: [{ query: MyPsychologistProfileDocument }],
  });

  const handleSave = async () => {
    // Gathering profile input information
    const profileInput = {
      fullName: fullNameRef.current.value,
      likeName: likeNameRef.current.value,
      birthDate:
        Number(
          parse(
            birthDateRef.current.value,
            BIRTH_DATE_FORMAT,
            new Date(43200000),
          ),
        ) / 1000,
      city: cityRef.current.value,
      bio: bioRef.current.value,
      avatar: avatarRef.current.files?.[0] || null,
    };

    // Checking if profileInput is invalid
    if (
      profileInput.fullName === "" ||
      profileInput.likeName === "" ||
      profileInput.city === "" ||
      isNaN(profileInput.birthDate) ||
      profileInput.bio === ""
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
      !chars
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
      preferences.reduce(
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
        <input name="avatar" type="file" ref={avatarRef} />
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
        <TextArea
          name="bio"
          label="Fale sobre você para seus potenciais pacientes"
          reference={bioRef}
        />
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Características do psicólogo
        </MediumTitle>
        {chars
          .filter(
            (char) =>
              messages[`${PSYCHOLOGIST_CHARACTERISTIC_PREFIX}:${char.name}`],
          )
          .map((char) => (
            <CharacteristicChooserComponent
              key={char.name}
              characteristic={char}
              choice={choices[char.name]}
            />
          ))}
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Preferências do psicólogo
        </MediumTitle>
        {preferences.map((pref) => (
          <PreferenceChooserComponent
            key={pref.name}
            preference={pref}
            weight={weights[pref.name]}
          />
        ))}
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
