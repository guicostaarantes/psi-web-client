import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import CharacteristicChooserComponent from "@src/components/CharacteristicChooser";
import {
  CharacteristicType,
  CreateOrUpdatePatientProfileInput,
  CreateOwnPatientProfile,
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
import Button from "@src/styleguide/Button";
import Card from "@src/styleguide/Card";
import Input from "@src/styleguide/Input";
import Col from "@src/styleguide/Layout/Col";
import Row from "@src/styleguide/Layout/Row";
import MediumTitle from "@src/styleguide/Typography/MediumTitle";

const PatientDataComponent = () => {
  const router = useRouter();

  const { data: characteristicData } = useQuery<GetCharacteristicsResponse>(
    GetCharacteristics,
  );
  const {
    data: profileData,
    error: profileError,
  } = useQuery<GetOwnPatientProfileResponse>(GetOwnPatientProfile);

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

  // If profileError is different than "resource not found", something is wrong
  useEffect(() => {
    console.log(profileError);
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

  // Load current characteristic choices and fill the fields
  useEffect(() => {
    if (profileData && characteristics.value) {
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
    try {
      const profileExists = !(profileError?.message === "resource not found");

      if (profileExists) {
        await updateOwnPatientProfile({
          variables: {
            input: {
              fullName: fullNameRef.current.value,
              likeName: likeNameRef.current.value,
              birthDate: Number(birthDateRef.current.value),
              city: cityRef.current.value,
            },
          },
        });
      } else {
        await createOwnPatientProfile({
          variables: {
            input: {
              fullName: fullNameRef.current.value,
              likeName: likeNameRef.current.value,
              birthDate: Number(birthDateRef.current.value),
              city: cityRef.current.value,
            },
          },
        });
      }

      await setOwnPatientCharacteristicChoicesAndPreferences({
        variables: {
          choiceInput: Object.keys(choices.value).map((cho) => {
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
          }),
          weightInput: Object.keys(weights.value).flatMap((charName) => {
            return Object.keys(weights.value[charName]).map((value) => {
              return {
                characteristicName: charName,
                selectedValue: value,
                weight: weights.value[charName][value],
              };
            });
          }),
        },
      });
    } catch (err) {
      console.log(err);
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
        />
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Preferências do paciente
        </MediumTitle>
        <PreferenceChooserComponent
          preferences={preferences}
          weights={weights}
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
