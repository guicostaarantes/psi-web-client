import { useRouter } from "next/router";
import { DeepPartial } from "utility-types";

import {
  TreatmentPriceRange,
  useMyPatientTopAffinitiesQuery,
} from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Modal from "@psi/styleguide/components/Modal";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface TreatmentSelectionModalProps {
  onClose: () => void;
  open: boolean;
}

const TreatmentSelectionModal = ({
  onClose,
  open,
}: TreatmentSelectionModalProps) => {
  const router = useRouter();

  const { loading, data } = useMyPatientTopAffinitiesQuery({
    fetchPolicy: "no-cache",
  });

  const handleVisitPsyProfile = (id: string) => () => router.push(`/psi/${id}`);

  const topAffinities =
    data?.myPatientTopAffinities?.filter(
      (aff) => aff.psychologist?.priceRangeOfferings?.length,
    ) || [];

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
            Estes são os psicólogos que possuem maior sinergia com o seu perfil.
            Clique nos botões para ver os seus perfis, horários e valores.
          </Paragraph>
        ) : (
          <Paragraph>
            Não conseguimos encontrar nenhum psicólogo que esteja disponível no
            momento. Estamos sempre tentando aumentar nossa rede, pedimos que
            tente novamente amanhã.
          </Paragraph>
        )}
        {topAffinities.map((aff) => (
          <div key={aff.psychologist.id} className="buttons">
            <MediumTitle>{aff.psychologist.fullName}</MediumTitle>
            <Button
              color="primary"
              onClick={handleVisitPsyProfile(aff.psychologist.id)}
            >
              Ver perfil
            </Button>
          </div>
        ))}
        <div className="buttons">
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
