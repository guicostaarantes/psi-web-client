import { useState } from "@hookstate/core";
import { useEffect, useRef } from "react";

import treatmentFrequencies from "@psi/shared/constants/treatmentFrequencies";
import weekdayOptions from "@psi/shared/constants/weekdayOptions";
import {
  MyPsychologistTreatmentsDocument,
  useCreateTreatmentMutation,
} from "@psi/shared/graphql";
import getABWeek from "@psi/shared/utils/getABWeek";
import getPhases from "@psi/shared/utils/getPhases";
import Button from "@psi/styleguide/components/Button";
import DateInput from "@psi/styleguide/components/DateInput";
import Input from "@psi/styleguide/components/Input";
import Modal from "@psi/styleguide/components/Modal";
import Select from "@psi/styleguide/components/Select";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import { HOUR_24_FORMAT } from "@psi/styleguide/constants/locale";
import useToast from "@psi/styleguide/hooks/useToast";

const NewTreatmentButton = () => {
  const { addToast } = useToast();

  const frequencyRef = useRef(null);
  const weekdayRef = useRef(null);
  const startRef = useRef(null);
  const durationRef = useRef(null);
  const priceRangeRef = useRef(null);

  const modalOpen = useState(false);

  const [createTreatment, { loading, error }] = useCreateTreatmentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPsychologistTreatmentsDocument }],
  });

  const handleCreateClick = () => modalOpen.set(true);
  const handleModalClose = () => modalOpen.set(false);

  const handleCreateConfirmClick = async () => {
    if (
      isNaN(Number(frequencyRef.current.value)) ||
      isNaN(Number(weekdayRef.current.value)) ||
      !startRef.current.value ||
      isNaN(Number(durationRef.current.value)) ||
      !priceRangeRef.current.value
    ) {
      addToast({
        header: "Dados inválidos",
        message: "Confira os dados inseridos e tente novamente.",
      });
      return;
    }

    const phases = getPhases(
      frequencyRef.current.value,
      weekdayRef.current.value,
      startRef.current.value,
      HOUR_24_FORMAT,
    ).map((phase) => ({
      frequency: phase.frequency,
      phase: phase.phase,
      duration: 60 * Number(durationRef.current.value),
      priceRangeName: priceRangeRef.current.value,
    }));

    try {
      await Promise.all(
        phases.map((variables) => createTreatment({ variables })),
      );
    } catch (err) {
      // empty
    }
  };

  useEffect(() => {
    if (error) {
      if (error.message === "there is another treatment in the same period") {
        addToast({
          header: "Horários conflitantes",
          message:
            "O horário e a duração do novo tratamento está colidindo com outro tratamento. Tente novamente.",
        });
      } else {
        addToast({
          header: "Erro no servidor",
          message:
            "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
        });
      }
    } else if (!loading) {
      modalOpen.set(false);
    }
  }, [loading, error]);

  return (
    <>
      <Button color="primary" onClick={handleCreateClick}>
        Quero tratar um novo paciente
      </Button>
      <Modal
        open={modalOpen.value}
        onClose={handleModalClose}
        title="Criar tratamento"
      >
        <div className="wrapper">
          <Paragraph>
            Ao criar um novo tratamento, você está indicando ao sistema o desejo
            de tratar um novo paciente. O tratamento ficará marcado como
            pendente até que um paciente o escolha utilizando nosso buscador de
            tratamentos.
          </Paragraph>
          <Paragraph>
            Caso você não tenha tratamentos pendentes, você ficará invisível
            para novos pacientes que utilizarem o buscador de tratamentos.
          </Paragraph>
          <Paragraph>
            Atualmente estamos em uma semana {getABWeek(new Date())}.
          </Paragraph>
          <Select
            name="frequency"
            label="Frequência de tratamento"
            options={treatmentFrequencies}
            reference={frequencyRef}
          />
          <Select
            name="weekday"
            label="Dia da semana"
            options={weekdayOptions}
            reference={weekdayRef}
          />
          <DateInput
            format={HOUR_24_FORMAT}
            name="start"
            label="Hora de início da sessão (ex: 19:30)"
            reference={startRef}
          />
          <Input
            name="duration"
            label="Duração da sessão (minutos)"
            reference={durationRef}
          />
          <Input
            name="price"
            label="Preço da sessão (reais)"
            reference={priceRangeRef}
          />
          <div className="buttons">
            <Button
              color="primary"
              loading={loading}
              onClick={handleCreateConfirmClick}
            >
              Criar tratamento
            </Button>
            <Button color="secondary" onClick={handleModalClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .buttons {
          align-items: center;
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }
        .wrapper {
          max-width: 100%;
          width: 30rem;
        }
      `}</style>
    </>
  );
};

export default NewTreatmentButton;
