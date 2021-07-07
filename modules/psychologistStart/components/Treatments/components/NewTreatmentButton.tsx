import { useMutation } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useEffect, useRef } from "react";

import {
  CreateTreatment,
  CreateTreatmentInput,
  MyPsychologistTreatments,
} from "@psi/psychologistStart/components/Treatments/graphql";
import weekdayOptions from "@psi/shared/constants/weekdayOptions";
import getWeeklyStart from "@psi/shared/utils/getWeeklyStart";
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

  const weekday = useRef(null);
  const start = useRef(null);
  const duration = useRef(null);
  const price = useRef(null);

  const modalOpen = useState(false);

  const [createTreatment, { loading, error }] = useMutation<
    null,
    CreateTreatmentInput
  >(CreateTreatment, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPsychologistTreatments }],
  });

  const handleCreateClick = () => modalOpen.set(true);
  const handleModalClose = () => modalOpen.set(false);

  const handleCreateConfirmClick = async () => {
    const variables = {
      weeklyStart: getWeeklyStart(
        weekday.current.value,
        start.current.value,
        HOUR_24_FORMAT,
      ),
      duration: 60 * Number(duration.current.value),
      price: Number(price.current.value),
    };

    if (
      isNaN(variables.weeklyStart) ||
      isNaN(variables.duration) ||
      isNaN(variables.price)
    ) {
      addToast({
        header: "Dados inválidos",
        message: "Confira os dados inseridos e tente novamente.",
      });
      return;
    }

    try {
      await createTreatment({ variables });
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
          <Select
            name="weekday"
            label="Dia da semana"
            options={weekdayOptions}
            reference={weekday}
          />
          <DateInput
            format={HOUR_24_FORMAT}
            name="start"
            label="Hora de início da sessão (ex: 19:30)"
            reference={start}
          />
          <Input
            name="duration"
            label="Duração da sessão (minutos)"
            reference={duration}
          />
          <Input
            name="price"
            label="Preço da sessão (reais)"
            reference={price}
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
