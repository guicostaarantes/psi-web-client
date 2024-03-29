import { parse } from "date-fns";
import { useRef } from "react";
import { useEffect } from "react";

import {
  MyPatientAppointmentsDocument,
  useEditAppointmentByPatientMutation,
} from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import DateInput from "@psi/styleguide/components/DateInput";
import Modal from "@psi/styleguide/components/Modal";
import TextArea from "@psi/styleguide/components/TextArea";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import {
  BIRTH_DATE_FORMAT,
  HOUR_24_FORMAT,
} from "@psi/styleguide/constants/locale";
import useToast from "@psi/styleguide/hooks/useToast";

interface EditAppointmentModalProps {
  onClose: () => void;
  open: boolean;
  appointmentId: string;
}

const EditAppointmentModal = ({
  onClose,
  open,
  appointmentId,
}: EditAppointmentModalProps) => {
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const reasonRef = useRef(null);

  const { addToast } = useToast();

  const [
    editAppointment,
    { loading, error, data },
  ] = useEditAppointmentByPatientMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPatientAppointmentsDocument }],
  });

  useEffect(() => {
    if (error) {
      if (error.message === "appointment cannot be scheduled to the past") {
        addToast({
          header: "Data inválida",
          message:
            "Agendamento não pode ser feito para uma data que já passou.",
        });
      } else {
        addToast({
          header: "Erro no servidor",
          message:
            "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
        });
      }
    } else if (data) {
      addToast({
        header: "Novo horário sugerido",
        message:
          "Seu psicólogo será avisado por email que um novo horário foi sugerido.",
      });
      onClose();
    }
  }, [error, data]);

  const handleEditClick = async () => {
    const dateStart = Number(
      parse(dateRef.current.value, BIRTH_DATE_FORMAT, new Date(0)),
    );

    const timeStart = Number(
      parse(timeRef.current.value, HOUR_24_FORMAT, new Date(43200000)),
    );

    const timezoneCompensation = -new Date().getTimezoneOffset() * 60000;

    try {
      await editAppointment({
        variables: {
          id: appointmentId,
          input: {
            start: new Date(dateStart + timeStart + timezoneCompensation),
            reason: reasonRef.current.value,
          },
        },
      });
    } catch (err) {
      // empty
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Sugerir mudança na consulta">
      <div className="wrapper">
        <Paragraph>
          Proponha uma nova data para a consulta, e opcionalmente adicione um
          motivo para a mudança. O seu psicólogo será notificado da mudança
          proposta.
        </Paragraph>
        <DateInput
          format={BIRTH_DATE_FORMAT}
          name="date"
          label="Data"
          reference={dateRef}
        />
        <DateInput
          format={HOUR_24_FORMAT}
          name="time"
          label="Hora"
          reference={timeRef}
        />
        <TextArea
          name="reason"
          label="Motivo para mudança"
          reference={reasonRef}
        />
        <div className="buttons">
          <Button color="primary" loading={loading} onClick={handleEditClick}>
            Sugerir mudança
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
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
    </Modal>
  );
};

export default EditAppointmentModal;
