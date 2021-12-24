import { useState } from "@hookstate/core";
import { format, parse } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";

import CharacteristicChooserComponent from "@psi/profiles/components/CharacteristicChooser";
import PreferenceChooserComponent from "@psi/profiles/components/PreferenceChooser";
import Term from "@psi/profiles/components/Term";
import {
  PSYCHOLOGIST_CHARACTERISTIC_PREFIX,
  PSYCHOLOGIST_TERM_PREFIX,
} from "@psi/profiles/constants/characteristicPrefixes";
import { HAPPINESS_OPTIONS } from "@psi/profiles/constants/happiness";
import useCharacteristics from "@psi/profiles/hooks/useCharacteristics";
import useTerms from "@psi/profiles/hooks/useTerms";
import {
  MyPsychologistProfileDocument,
  useMyPsychologistProfileQuery,
  useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation,
  useUpsertMyPsychologistProfileMutation,
  useUpsertPsychologistAgreementMutation,
} from "@psi/shared/graphql";
import AvatarInput from "@psi/styleguide/components/AvatarInput";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import DateInput from "@psi/styleguide/components/DateInput";
import Image from "@psi/styleguide/components/Image";
import Input from "@psi/styleguide/components/Input";
import Col from "@psi/styleguide/components/Layout/Col";
import Row from "@psi/styleguide/components/Layout/Row";
import TextArea from "@psi/styleguide/components/TextArea";
import MainTitle from "@psi/styleguide/components/Typography/MainTitle";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
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
  const crpRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const instagramRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const birthDateInitialValue = useState<string>("");

  const choices = useState<Record<string, unknown>>({});

  const weights = useState<Record<string, Record<string, number>>>({});

  const agreements = useState<Record<string, boolean>>({});

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
      crpRef.current.value = profileData.myPsychologistProfile?.crp || "";
      whatsappRef.current.value =
        profileData.myPsychologistProfile?.whatsapp || "";
      instagramRef.current.value =
        profileData.myPsychologistProfile?.instagram || "";
      bioRef.current.value = profileData.myPsychologistProfile?.bio || "";

      const birthDate = profileData.myPsychologistProfile?.birthDate;
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

  const { terms, messages: termMessages } = useTerms();

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

  // Load current agreements and fill the checkboxes
  useEffect(() => {
    if (!profileLoading && terms) {
      const initialAgreements = {};
      for (const term of terms) {
        initialAgreements[
          term.name
        ] = !!profileData?.myPsychologistProfile.agreements.find(
          (agree) =>
            agree.termName === term.name && agree.termVersion === term.version,
        );
      }
      agreements.set(initialAgreements);
    }
  }, [profileLoading, terms.length]);

  const [
    upsertMyPsychologistProfile,
  ] = useUpsertMyPsychologistProfileMutation();

  const [
    setMyPsychologistCharacteristicChoicesAndPreferences,
  ] = useSetMyPsychologistCharacteristicChoicesAndPreferencesMutation({
    refetchQueries: [{ query: MyPsychologistProfileDocument }],
  });

  const [
    upsertPsychologistAgreementMutation,
  ] = useUpsertPsychologistAgreementMutation();

  const handleSave = async () => {
    // Gathering profile input information
    const profileInput = {
      fullName: fullNameRef.current.value,
      likeName: likeNameRef.current.value,
      birthDate: parse(
        birthDateRef.current.value,
        BIRTH_DATE_FORMAT,
        new Date(43200000),
      ),
      city: cityRef.current.value,
      crp: crpRef.current.value,
      whatsapp: whatsappRef.current.value,
      instagram: instagramRef.current.value,
      bio: bioRef.current.value,
      avatar: avatarRef.current.files?.[0] || null,
    };

    // Checking if profileInput is invalid
    if (
      profileInput.fullName === "" ||
      profileInput.likeName === "" ||
      profileInput.city === "" ||
      profileInput.crp === "" ||
      profileInput.whatsapp === "" ||
      profileInput.instagram === "" ||
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

    // Checking if agreements are invalid (all active ones need to be checked)
    if (
      Object.keys(agreements.value).some(
        (termName) => !agreements.value[termName],
      )
    ) {
      addToast({
        header: "Verifique as informações",
        message: "Há termos de uso que não foram lidos e acordados.",
      });
      return;
    }

    // Sending new information to server
    try {
      await Promise.all([
        upsertMyPsychologistProfile({
          variables: {
            profileInput,
          },
        }),
        setMyPsychologistCharacteristicChoicesAndPreferences({
          variables: {
            choiceInput,
            weightInput,
          },
        }),
        ...terms.map((term) =>
          upsertPsychologistAgreementMutation({
            variables: {
              agreementInput: {
                termName: term.name,
                termVersion: term.version,
                agreed: agreements.value[term.name],
              },
            },
          }),
        ),
      ]);

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
        <Paragraph center light>
          Os dados dessa seção serão acessíveis aos coordenadores do projeto e a
          pacientes que visitarem o seu perfil.
        </Paragraph>
        <AvatarInput
          currentAvatar={
            <Image
              circle
              label="Avatar atual"
              authSrc={
                profileData?.myPsychologistProfile?.avatar
                  ? `${process.env.NEXT_PUBLIC_PSI_STATIC_URI}/${profileData.myPsychologistProfile.avatar}`
                  : ""
              }
              src="avatar.webp"
            />
          }
          name="avatar"
          label="Modificar Avatar"
          reference={avatarRef}
        />
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
        <Row>
          <Col xs={12} md={4}>
            <Input
              maskProps={{
                mask: "99/9999999",
                maskChar: null,
              }}
              name="crp"
              label="CRP"
              reference={crpRef}
            />
          </Col>
          <Col xs={12} md={4}>
            <Input
              maskProps={{
                mask: "(99) 99999-9999",
              }}
              name="whatsapp"
              label="Whatsapp profisssional"
              reference={whatsappRef}
            />
          </Col>
          <Col xs={12} md={4}>
            <Input
              maskProps={{
                formatChars: { "*": "[0-9a-z._]" },
                mask: "@********************************",
                maskChar: null,
              }}
              name="instagram"
              label="Instagram profissional"
              reference={instagramRef}
            />
          </Col>
        </Row>
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
        <TextArea
          name="bio"
          label="Fale sobre você para seus potenciais pacientes"
          reference={bioRef}
        />
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Preferências do psicólogo
        </MediumTitle>
        <Paragraph center light>
          Os dados dessa seção são totalmente confidenciais e só serão usados
          pelo nosso algoritmo para encontrar pacientes com maior
          compatibilidade.
        </Paragraph>
        {preferences.map((pref) => (
          <PreferenceChooserComponent
            key={pref.name}
            preference={pref}
            weight={weights[pref.name]}
          />
        ))}
      </Card>
      <Card>
        <MediumTitle center noMarginTop>
          Termos de uso da plataforma
        </MediumTitle>
        <Paragraph center light>
          Você precisa estar de acordo com os termos de uso mais recentes para
          poder usar nossa plataforma.
        </Paragraph>
        {terms.map((term) => (
          <Term
            key={term.name}
            name={term.name}
            agreement={agreements[term.name]}
            message={
              termMessages[
                `${PSYCHOLOGIST_TERM_PREFIX}:${term.name}:${term.version}`
              ]
            }
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
