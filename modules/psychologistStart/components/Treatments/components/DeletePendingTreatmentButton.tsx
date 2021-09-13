import { useState } from "@hookstate/core";
import { useEffect } from "react";

import {
  MyPsychologistTreatmentsDocument,
  TreatmentPriceRange,
  useDeleteTreatmentMutation,
  useMyPsychologistTreatmentsQuery,
} from "@psi/shared/graphql";
import formatValueRange from "@psi/shared/utils/formatValueRange";
import Button from "@psi/styleguide/components/Button";
import Modal from "@psi/styleguide/components/Modal";
import Radio from "@psi/styleguide/components/Radio";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import useToast from "@psi/styleguide/hooks/useToast";

interface DeletePendingTreatmentButtonProps {
  treatmentId: string;
}

const DeletePendingTreatmentButton = ({
  treatmentId,
}: DeletePendingTreatmentButtonProps) => {
  const { addToast } = useToast();

  const { data } = useMyPsychologistTreatmentsQuery();

  const [deleteTreatment, { loading, error }] = useDeleteTreatmentMutation({
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
    }
  }, [loading, error]);

  const priceRanges = data?.myPsychologistProfile?.priceRangeOfferings
    .reduce((final: Partial<TreatmentPriceRange>[], pro) => {
      const index = final.findIndex((i) => i.name === pro.priceRange.name);
      if (index === -1) {
        final.push(pro.priceRange);
      }
      return final;
    }, [])
    .sort((a, b) => (a.minimumPrice < b.minimumPrice ? -1 : 1));

  const modalOpen = useState(false);
  const selectedPriceRange = useState("");

  const handleDeleteClick = () => modalOpen.set(true);
  const handleModalClose = () => modalOpen.set(false);

  const handleDeleteConfirmClick = async () => {
    try {
      await deleteTreatment({
        variables: {
          id: treatmentId,
          priceRangeName: selectedPriceRange.value,
        },
      });
    } catch (err) {
      // empty
    }
  };

  return (
    <>
      <Button color="secondary" onClick={handleDeleteClick}>
        Excluir
      </Button>
      <Modal
        open={modalOpen.value}
        onClose={handleModalClose}
        title="Excluir tratamento"
      >
        <div className="wrapper">
          <Paragraph>
            Escolha uma oferta de preço para ser removida com o tratamento.
          </Paragraph>
          {priceRanges.map((ppr) => (
            <Radio
              key={ppr.name}
              name="price-range"
              value={ppr.name}
              label={`Preço ${formatValueRange(
                ppr.minimumPrice,
                ppr.maximumPrice,
              )}`}
              checked={ppr.name === selectedPriceRange.value}
              onChange={() => selectedPriceRange.set(ppr.name)}
            />
          ))}
          <div className="buttons">
            <Button
              color="primary"
              disabled={!selectedPriceRange.value}
              loading={loading}
              onClick={handleDeleteConfirmClick}
            >
              Excluir tratamento
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

export default DeletePendingTreatmentButton;
