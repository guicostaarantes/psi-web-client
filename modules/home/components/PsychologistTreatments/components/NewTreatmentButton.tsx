import { useMutation } from "@apollo/client";
import { useState } from "@hookstate/core";
import { useRef } from "react";

import {
  CreateTreatment,
  CreateTreatmentInput,
  MyPsychologistTreatments,
} from "@psi/home/components/PsychologistTreatments/graphql";
import Button from "@psi/styleguide/components/Button";
import Input from "@psi/styleguide/components/Input";
import Modal from "@psi/styleguide/components/Modal";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const NewTreatmentButton = () => {
  const duration = useRef(null);
  const price = useRef(null);
  const interval = useRef(null);

  const modalOpen = useState(false);

  const [createTreatment, { loading }] = useMutation<
    null,
    CreateTreatmentInput
  >(CreateTreatment, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPsychologistTreatments }],
  });

  const handleCreateClick = () => modalOpen.set(true);
  const handleModalClose = () => modalOpen.set(false);

  const handleCreateConfirmClick = async () => {
    await createTreatment({
      variables: {
        duration: 60 * Number(duration.current.value),
        price: Number(price.current.value),
        interval: 86400 * Number(interval.current.value),
      },
    });
    modalOpen.set(false);
  };

  return (
    <>
      <Button color="primary" onClick={handleCreateClick}>
        Quero tratar um paciente
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
          <Input
            name="interval"
            label="Intervalo entre sessões (dias)"
            reference={interval}
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
