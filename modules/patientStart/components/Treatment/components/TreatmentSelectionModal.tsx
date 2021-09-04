import { useState } from "@hookstate/core";
import { useEffect } from "react";
import { DeepPartial } from "utility-types";

import {
  MyPatientAppointmentsDocument,
  MyPatientTreatmentsDocument,
  TreatmentPriceRange,
  useAssignTreatmentMutation,
  useMyPatientTopAffinitiesQuery,
} from "@psi/shared/graphql";
import formatHourFromFrequencyAndPhase from "@psi/shared/utils/formatHourFromFrequencyAndPhase";
import formatValueRange from "@psi/shared/utils/formatValueRange";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Modal from "@psi/styleguide/components/Modal";
import Radio from "@psi/styleguide/components/Radio";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import useToast from "@psi/styleguide/hooks/useToast";

interface TreatmentSelectionModalProps {
  onClose: () => void;
  open: boolean;
}

const TreatmentSelectionModal = ({
  onClose,
  open,
}: TreatmentSelectionModalProps) => {
  const { addToast } = useToast();

  const { loading, data } = useMyPatientTopAffinitiesQuery({
    fetchPolicy: "no-cache",
  });

  const [
    assignTreatment,
    { loading: assignLoading, error },
  ] = useAssignTreatmentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: MyPatientAppointmentsDocument },
      { query: MyPatientTreatmentsDocument },
    ],
  });

  useEffect(() => {
    if (error) {
      addToast({
        header: "Erro ao iniciar tratamento",
        message:
          "Isso pode ter acontecido pois o tratamento escolhido foi selecionado recentemente por outro paciente. Escolha outro horário. Se o erro persistir, tente novamente mais tarde.",
      });
    }
  }, [error]);

  const selectedTreatment = useState("");
  const selectedPriceRange = useState("");

  const handleAssignClick = async () => {
    try {
      await assignTreatment({
        variables: {
          id: selectedTreatment.value,
          priceRangeName: selectedPriceRange.value,
        },
      });
    } catch (err) {
      // empty
    }
  };

  const topAffinities =
    data?.myPatientTopAffinities?.filter((aff) => aff.psychologist) || [];

  const possiblePriceRanges: Record<
    string,
    Array<DeepPartial<TreatmentPriceRange>>
  > = {};

  topAffinities.forEach((aff) => {
    aff.psychologist.priceRangeOfferings.forEach((pro) => {
      if (!possiblePriceRanges[aff.psychologist.id]) {
        possiblePriceRanges[aff.psychologist.id] = [];
      }

      if (
        !possiblePriceRanges[aff.psychologist.id].some(
          (ppr) => ppr.name === pro.priceRange.name,
        )
      ) {
        possiblePriceRanges[aff.psychologist.id].push(pro.priceRange);
      }
    });

    possiblePriceRanges[aff.psychologist.id].sort((a, b) =>
      a.minimumPrice < b.minimumPrice ? -1 : 1,
    );
  });

  return (
    <Modal open={open} onClose={onClose} title="Escolher psicólogo">
      <div className="wrapper">
        {loading ? (
          <Paragraph>
            Aguarde enquanto procuramos os psicólogos que estão disponíveis e
            possuem a maior sinergia com as suas preferências...
          </Paragraph>
        ) : topAffinities.length ? (
          <Paragraph>
            Escolha um dos psicólogos e horários abaixo para iniciar o
            tratamento.
          </Paragraph>
        ) : (
          <Paragraph>
            Não conseguimos encontrar nenhum psicólogo que esteja disponível no
            momento. Estamos sempre tentando aumentar nossa rede, pedimos que
            tente novamente amanhã.
          </Paragraph>
        )}
        {topAffinities.map((aff) => (
          <Card floating key={aff.psychologist.id}>
            <MediumTitle>{aff.psychologist.fullName}</MediumTitle>
            <div>Selecione um horário:</div>
            <div className="radio-group">
              {aff.psychologist.pendingTreatments.map((tr) => (
                <div key={tr.id}>
                  <Radio
                    name={tr.id}
                    value={tr.id}
                    label={`Sessões ${formatHourFromFrequencyAndPhase(
                      tr.frequency,
                      tr.phase,
                    )}`}
                    checked={tr.id === selectedTreatment.value}
                    onChange={() => selectedTreatment.set(tr.id)}
                  />
                </div>
              ))}
            </div>
            <div>Selecione um custo:</div>
            <div className="radio-group">
              {possiblePriceRanges[aff.psychologist.id].map((ppr) => (
                <div key={ppr.name}>
                  <Radio
                    name={ppr.name}
                    value={ppr.name}
                    label={`Preço ${formatValueRange(
                      ppr.minimumPrice,
                      ppr.maximumPrice,
                    )}`}
                    checked={ppr.name === selectedPriceRange.value}
                    onChange={() => selectedPriceRange.set(ppr.name)}
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}
        <div className="buttons">
          <Button
            color="primary"
            disabled={!selectedTreatment.value || !selectedPriceRange.value}
            loading={assignLoading}
            onClick={handleAssignClick}
          >
            Iniciar tratamento
          </Button>
          <Button color="secondary" onClick={onClose}>
            Voltar
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
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          margin-top: 0.5rem;
        }
        .wrapper {
          max-width: 100%;
          width: 30rem;
        }
      `}</style>
    </Modal>
  );
};

export default TreatmentSelectionModal;
