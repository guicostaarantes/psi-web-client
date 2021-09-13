import { useState } from "@hookstate/core";
import { useRouter } from "next/router";

import {
  MyPatientAppointmentsDocument,
  MyPatientTreatmentsDocument,
  TreatmentPriceRange,
  useAssignTreatmentMutation,
  useMyPatientProfileQuery,
  useMyPatientTopAffinitiesQuery,
} from "@psi/shared/graphql";
import formatHourFromFrequencyAndPhase from "@psi/shared/utils/formatHourFromFrequencyAndPhase";
import formatValueRange from "@psi/shared/utils/formatValueRange";
import getABWeek from "@psi/shared/utils/getABWeek";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Col from "@psi/styleguide/components/Layout/Col";
import Row from "@psi/styleguide/components/Layout/Row";
import Radio from "@psi/styleguide/components/Radio";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import useToast from "@psi/styleguide/hooks/useToast";

interface StartTreatmentCardProps {
  likeName: string;
  psyId: string;
}

const StartTreatmentCard = ({ likeName, psyId }: StartTreatmentCardProps) => {
  const { addToast } = useToast();
  const router = useRouter();

  const { data } = useMyPatientTopAffinitiesQuery();
  const { data: patientData } = useMyPatientProfileQuery();

  const selectedTreatment = useState("");
  const selectedPriceRange = useState("");

  const [assignTreatment, { loading }] = useAssignTreatmentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: MyPatientAppointmentsDocument },
      { query: MyPatientTreatmentsDocument },
    ],
  });

  const handleAssignClick = async () => {
    try {
      await assignTreatment({
        variables: {
          id: selectedTreatment.value,
          priceRangeName: selectedPriceRange.value,
        },
      });

      addToast({
        header: "Tudo certo",
        message: "Tratamento iniciado com sucesso.",
      });
      router.push("/");
    } catch (err) {
      addToast({
        header: "Erro ao iniciar tratamento",
        message:
          "Isso pode ter acontecido pois o tratamento escolhido foi selecionado recentemente por outro paciente. Atualize a página para verificar.",
      });
    }
  };

  const { psychologist } =
    data?.myPatientTopAffinities.find((psy) => psy.psychologist.id === psyId) ||
    {};

  const income = patientData?.myPatientProfile?.characteristics.find(
    (char) => char.name === "income",
  )?.selectedValues[0];

  const possiblePriceRanges: Array<Partial<TreatmentPriceRange>> = [];

  psychologist?.priceRangeOfferings.forEach((pro) => {
    const eligibleFor = pro?.priceRange.eligibleFor.split(",");

    if (
      eligibleFor.includes(income) &&
      !possiblePriceRanges.some((ppr) => ppr.name === pro.priceRange.name)
    ) {
      possiblePriceRanges.push(pro.priceRange);
    }
  });

  possiblePriceRanges.sort((a, b) =>
    a.minimumPrice < b.minimumPrice ? -1 : 1,
  );

  if (!psychologist || !possiblePriceRanges.length) {
    return null;
  }

  return (
    <Card>
      <MediumTitle noMarginTop>Iniciar tratamento</MediumTitle>
      <Paragraph>
        Esses são os horários e faixas de preço que estou disponibilizando
        atualmente:
      </Paragraph>
      <Paragraph noMarginBottom>
        Atualmente estamos em uma semana {getABWeek(new Date())}.
      </Paragraph>
      <Row>
        <Col sm={12} lg={6}>
          <Card floating>
            {psychologist.pendingTreatments.map((tr) => (
              <div key={tr.id}>
                <Radio
                  name={tr.id}
                  value={tr.id}
                  label={`Sessões ${formatHourFromFrequencyAndPhase(
                    tr.frequency,
                    tr.phase,
                  )} com duração de ${tr.duration / 60} minutos`}
                  checked={tr.id === selectedTreatment.value}
                  onChange={() => selectedTreatment.set(tr.id)}
                />
              </div>
            ))}
          </Card>
        </Col>
        <Col sm={12} lg={6}>
          <Card floating>
            {possiblePriceRanges.map((ppr) => (
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
          </Card>
        </Col>
      </Row>
      {selectedTreatment.value && selectedPriceRange.value ? (
        <div className="buttons">
          <Button color="primary" loading={loading} onClick={handleAssignClick}>
            Iniciar tratamento com {likeName}
          </Button>
        </div>
      ) : null}
      <style jsx>{`
        .buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }
      `}</style>
    </Card>
  );
};

export default StartTreatmentCard;
