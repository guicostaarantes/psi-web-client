import { useEffect, useMemo, useRef } from "react";

import treatmentFrequencies from "@psi/shared/constants/treatmentFrequencies";
import weekdayOptions from "@psi/shared/constants/weekdayOptions";
import {
  MyPsychologistTreatmentsDocument,
  useTreatmentPriceRangesQuery,
  useUpdateTreatmentMutation,
} from "@psi/shared/graphql";
import formatValueRange from "@psi/shared/utils/formatValueRange";
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

interface EditTreatmentModalProps {
  onClose: () => void;
  open: boolean;
  treatmentId: string;
}

const EditTreatmentModal = ({
  onClose,
  open,
  treatmentId,
}: EditTreatmentModalProps) => {
  const { addToast } = useToast();

  const frequencyRef = useRef(null);
  const weekdayRef = useRef(null);
  const startRef = useRef(null);
  const durationRef = useRef(null);
  const priceRangeRef = useRef(null);

  const { data: priceRangesData } = useTreatmentPriceRangesQuery();

  const [editTreatment, { loading, error, data }] = useUpdateTreatmentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: MyPsychologistTreatmentsDocument }],
  });

  useEffect(() => {
    if (error) {
      addToast({
        header: "Erro no servidor",
        message:
          "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
      });
    } else if (data) {
      addToast({
        header: "Alterações feitas",
        message: "Avisaremos seu paciente por email.",
      });
      onClose();
    }
  }, [error, data]);

  const handleEditConfirmClick = async () => {
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
      await editTreatment({
        variables: { id: treatmentId, ...phases[0] },
      });
    } catch (err) {
      // empty
    }
  };

  const priceRangesOptions = useMemo(
    () =>
      priceRangesData?.treatmentPriceRanges.map((pr) => ({
        label: `Preço ${formatValueRange(pr.minimumPrice, pr.maximumPrice)}`,
        value: pr.name,
      })),
    [priceRangesData],
  );

  return (
    <Modal open={open} onClose={onClose} title="Editar tratamento">
      <div className="wrapper">
        <Paragraph>
          A modificação do tratamento não causa mudanças nas consultas já
          criadas pelo sistema, apenas nas consultas que serão criadas
          posteriormente. Caso queira modificar a data das consultas já
          marcadas, clique no botão Modificar próximo a elas.
        </Paragraph>
        <Paragraph>
          O seu paciente será notificado da mudança proposta.
        </Paragraph>
        <Paragraph>
          Atualmente estamos em uma semana {getABWeek(new Date())}.
        </Paragraph>
        <Select
          name="frequency"
          label="Frequência de tratamento"
          options={treatmentFrequencies.filter((tf) => tf.params.length === 1)}
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
        <Select
          name="priceRangeName"
          label="Valor cobrado por sessão"
          options={priceRangesOptions || []}
          reference={priceRangeRef}
        />
        <div className="buttons">
          <Button
            color="primary"
            loading={loading}
            onClick={handleEditConfirmClick}
          >
            Editar tratamento
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

export default EditTreatmentModal;
