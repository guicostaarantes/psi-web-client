import React, { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { Downgraded, useState } from "@hookstate/core";
import CharacteristicChooserComponent from "@src/components/CharacteristicChooser";
import GetOwnPatientProfile, {
  GetOwnPatientProfileResponse,
} from "@src/components/PatientData/graphql";
import PreferenceChooserComponent from "@src/components/PreferenceChooser";
import Card from "@src/styleguide/Card";
import Input from "@src/styleguide/Input";
import Col from "@src/styleguide/Layout/Col";
import Row from "@src/styleguide/Layout/Row";
import MediumTitle from "@src/styleguide/Typography/MediumTitle";

const PatientDataComponent = () => {
  const { data } = useQuery<GetOwnPatientProfileResponse>(GetOwnPatientProfile);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const likeNameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const characteristics = useState<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      selectedValues: string[];
      possibleValues: string[];
    }[]
  >([]).attach(Downgraded);

  const choices = useState<Record<string, unknown>>({}).attach(Downgraded);

  const preferences = useState<
    {
      name: string;
      type: "BOOLEAN" | "SINGLE" | "MULTIPLE";
      possibleValues: string[];
    }[]
  >([]).attach(Downgraded);

  const weights = useState<Record<string, Record<string, number>>>({}).attach(
    Downgraded,
  );

  console.log(weights.value);

  useEffect(() => {
    if (data) {
      fullNameRef.current.value = data?.getOwnPatientProfile?.fullName || "";
      likeNameRef.current.value = data?.getOwnPatientProfile?.likeName || "";
      birthDateRef.current.value = data?.getOwnPatientProfile?.birthDate || "";
      cityRef.current.value = data?.getOwnPatientProfile?.city || "";
      characteristics.set(data?.getOwnPatientProfile?.characteristics);
      preferences.set(data?.getPsychologistCharacteristics);
    }
  }, [data]);

  useEffect(() => {
    const initialChoices = {};
    for (const char of characteristics.value) {
      if (char.selectedValues.length) {
        if (char.type === "BOOLEAN" || char.type === "SINGLE") {
          if (char.possibleValues.includes(char.selectedValues[0])) {
            initialChoices[char.name] = char.selectedValues[0];
          }
        } else if (char.type === "MULTIPLE") {
          initialChoices[char.name] = {};
          for (const val of char.selectedValues) {
            if (char.possibleValues.includes(val)) {
              initialChoices[char.name][val] = true;
            }
          }
        }
      }
    }
    choices.set(initialChoices);
  }, [characteristics.value]);

  useEffect(() => {
    if (data) {
      const initialWeights = {};
      for (const pref of data?.getOwnPatientProfile?.preferences) {
        if (!initialWeights[pref.characteristicName]) {
          initialWeights[pref.characteristicName] = {};
        }
        initialWeights[pref.characteristicName][pref.selectedValue] =
          pref.weight;
      }
      weights.set(initialWeights);
    }
  }, [data]);

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
    </>
  );
};

export default PatientDataComponent;
