import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import CharacteristicChooserComponent from "@src/components/CharacteristicChooser";
import {
  CharacteristicType,
  CreateOrUpdatePatientProfileInput,
  CreateOwnPatientProfile,
  GetCharacteristicMessages,
  GetCharacteristicMessagesInput,
  GetCharacteristicMessagesResponse,
  GetCharacteristics,
  GetCharacteristicsResponse,
  GetOwnPatientProfile,
  GetOwnPatientProfileResponse,
  SetOwnPatientCharacteristicChoicesAndPreferences,
  SetOwnPatientCharacteristicChoicesAndPreferencesInput,
  UpdateOwnPatientProfile,
} from "@src/components/PatientData/graphql";
import PreferenceChooserComponent from "@src/components/PreferenceChooser";
import { HAPPINESS_OPTIONS } from "@src/constants/happiness";
import useToast from "@src/hooks/useToast";
import Button from "@src/styleguide/Button";
import Card from "@src/styleguide/Card";
import Input from "@src/styleguide/Input";
import Col from "@src/styleguide/Layout/Col";
import Row from "@src/styleguide/Layout/Row";
import MediumTitle from "@src/styleguide/Typography/MediumTitle";

const PatientDataComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const { data: characteristicData } = useQuery<GetCharacteristicsResponse>(
    GetCharacteristics,
  );

  const {
    data: profileData,
    error: profileError,
  } = useQuery<GetOwnPatientProfileResponse>(GetOwnPatientProfile);

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

  const characteristics = useState<
    {
      name: string;
      type: CharacteristicType;
      possibleValues: string[];
    }[]
  >([]).attach(Downgraded);

  const choices = useState<Record<string, unknown>>({}).attach(Downgraded);

  const preferences = useState<
    {
      name: string;
      type: CharacteristicType;
      possibleValues: string[];
    }[]
  >([]).attach(Downgraded);

  const weights = useState<Record<string, Record<string, number>>>({}).attach(
    Downgraded,
  );

  const characteristicMessages = useState<Record<string, string>>({}).attach(
    Downgraded,
  );

  const preferenceMessages = useState<Record<string, string>>({}).attach(
    Downgraded,
  );

  // If profileError is different than "resource not found", something is wrong
  useEffect(() => {
    if (
      profileError?.message &&
      profileError.message !== "resource not found" &&
      profileError.message !== "forbidden"
    ) {
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
        profileData.getOwnPatientProfile?.fullName || "";
      likeNameRef.current.value =
        profileData.getOwnPatientProfile?.likeName || "";
      birthDateRef.current.value =
        profileData.getOwnPatientProfile?.birthDate || "";
      cityRef.current.value = profileData.getOwnPatientProfile?.city || "";
    }
  }, [profileData]);

  // Load all characteristics and all preferences
  useEffect(() => {
    if (characteristicData) {
      characteristics.set(characteristicData.getPatientCharacteristics);
      preferences.set(characteristicData.getPsychologistCharacteristics);
    }
  }, [characteristicData]);

  // Fetch messages for characteristics and preferences
  useEffect(() => {
    if (characteristicData) {
      let keys = [];

      for (const i of characteristicData.getPatientCharacteristics) {
        keys.push(`char:${i.name}`);
        for (const j of i.possibleValues) {
          keys.push(`char:${i.name}:${j}`);
        }
      }
      getCharacteristicMessages({ variables: { lang: "pt-BR", keys } });

      keys = [];

      for (const i of characteristicData.getPsychologistCharacteristics) {
        for (const j of i.possibleValues) {
          keys.push(`pref:${i.name}:${j}`);
        }
      }

      getPreferenceMessages({ variables: { lang: "pt-BR", keys } });
    }
  }, [characteristicData]);

  // Set characteristic messages from server
  useEffect(() => {
    if (characteristicMessagesData) {
      characteristicMessages.set(
        characteristicMessagesData?.getMessages.reduce(
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
        preferenceMessagesData?.getMessages.reduce(
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
    if (profileData && characteristics.value.length) {
      const initialChoices = {};
      for (const char of profileData.getOwnPatientProfile.characteristics) {
        if (char.selectedValues.length) {
          const possibleValues = characteristics.value.find(
            (ch) => ch.name === char.name,
          ).possibleValues;
          if (char.type === "BOOLEAN" || char.type === "SINGLE") {
            if (possibleValues.includes(char.selectedValues[0])) {
              initialChoices[char.name] = char.selectedValues[0];
            }
          } else if (char.type === "MULTIPLE") {
            initialChoices[char.name] = {};
            for (const val of char.selectedValues) {
              if (possibleValues.includes(val)) {
                initialChoices[char.name][val] = true;
              }
            }
          }
        }
      }
      choices.set(initialChoices);
    }
  }, [profileData, characteristics.value]);

  // Load current preference weights and fill the fields
  useEffect(() => {
    if (profileData && preferences.value) {
      const initialWeights = {};

      const possibleWeights = HAPPINESS_OPTIONS.map((ho) => ho.value);

      for (const pref of profileData?.getOwnPatientProfile?.preferences) {
        if (!initialWeights[pref.characteristicName]) {
          initialWeights[pref.characteristicName] = {};
        }
        if (possibleWeights.includes(pref.weight)) {
          initialWeights[pref.characteristicName][pref.selectedValue] =
            pref.weight;
        }
      }
      weights.set(initialWeights);
    }
  }, [profileData, preferences.value]);

  const [createOwnPatientProfile] = useMutation<
    null,
    CreateOrUpdatePatientProfileInput
  >(CreateOwnPatientProfile);

  const [updateOwnPatientProfile] = useMutation<
    null,
    CreateOrUpdatePatientProfileInput
  >(UpdateOwnPatientProfile);

  const [setOwnPatientCharacteristicChoicesAndPreferences] = useMutation<
    null,
    SetOwnPatientCharacteristicChoicesAndPreferencesInput
  >(SetOwnPatientCharacteristicChoicesAndPreferences);

  const handleSave = async () => {
    // Gathering profile input information
    const profileInput = {
      fullName: fullNameRef.current.value,
      likeName: likeNameRef.current.value,
      birthDate: Number(birthDateRef.current.value),
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
        message: "Há campos em branco que devem ser preenchidos.",
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
          selectedValues: Object.keys(choices.value[cho]),
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
      const profileExists = !(profileError?.message === "resource not found");

      if (profileExists) {
        await updateOwnPatientProfile({
          variables: {
            profileInput,
          },
        });
      } else {
        await createOwnPatientProfile({
          variables: {
            profileInput,
          },
        });
      }

      await setOwnPatientCharacteristicChoicesAndPreferences({
        variables: {
          choiceInput,
          weightInput,
        },
      });

      addToast({
        header: "Tudo certo",
        message: `Perfil ${
          profileExists ? "atualizado" : "criado"
        } com sucesso.`,
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
        <MediumTitle center noMarginTop>
          Dados do paciente
        </MediumTitle>
        <Input name="fullName" label="Nome completo" reference={fullNameRef} />
        <Input
          name="likeName"
          label="Nome pelo qual gostaria de ser chamado"
          reference={likeNameRef}
        />
        <Row>
          <Col xs={12} md={4}>
            <Input
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
          Características do paciente
        </MediumTitle>
        <CharacteristicChooserComponent
          characteristics={characteristics}
          choices={choices}
          messages={characteristicMessages}
        />
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Preferências do paciente
        </MediumTitle>
        <PreferenceChooserComponent
          preferences={preferences}
          weights={weights}
          messages={preferenceMessages}
        />
      </Card>
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
    </>
  );
};

export default PatientDataComponent;
