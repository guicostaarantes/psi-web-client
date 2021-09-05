import ActiveTreatment from "@psi/psychologistStart/components/Treatments/components/ActiveTreatment";
import NewTreatmentButton from "@psi/psychologistStart/components/Treatments/components/NewTreatmentButton";
import PendingTreatment from "@psi/psychologistStart/components/Treatments/components/PendingTreatment";
import PriceRangeOffering from "@psi/psychologistStart/components/Treatments/components/PriceRangeOffering";
import { useMyPsychologistTreatmentsQuery } from "@psi/shared/graphql";
import Card from "@psi/styleguide/components/Card";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const PsychologistTreatments = () => {
  const { data } = useMyPsychologistTreatmentsQuery();

  const activeTreatments = data?.myPsychologistProfile?.treatments.filter(
    (tr) => tr.status === "ACTIVE",
  );

  const pendingTreatments = data?.myPsychologistProfile?.treatments.filter(
    (tr) => tr.status === "PENDING",
  );

  const priceRangeOfferings = data?.myPsychologistProfile?.priceRangeOfferings
    .reduce(
      (
        final: {
          name: string;
          minimumPrice: number;
          maximumPrice: number;
          count: number;
        }[],
        pro,
      ) => {
        const index = final.findIndex((i) => i.name === pro.priceRange.name);
        if (index === -1) {
          final.push({ ...pro.priceRange, count: 1 });
        } else {
          final[index].count += 1;
        }
        return final;
      },
      [],
    )
    .sort((a, b) => (a.minimumPrice < b.minimumPrice ? -1 : 1));

  return (
    <>
      {activeTreatments?.length ? (
        <Card>
          <MediumTitle center>Tratamentos ativos</MediumTitle>
          {activeTreatments.map((tr) => (
            <ActiveTreatment
              key={tr.id}
              id={tr.id}
              frequency={tr.frequency}
              phase={tr.phase}
              duration={tr.duration}
              priceRange={tr.priceRange}
              patient={tr.patient}
            />
          ))}
        </Card>
      ) : null}
      {pendingTreatments ? (
        <Card>
          {pendingTreatments.length ? (
            <>
              <MediumTitle center>Tratamentos aguardando paciente</MediumTitle>
              {pendingTreatments.map((tr) => (
                <PendingTreatment
                  key={tr.id}
                  id={tr.id}
                  frequency={tr.frequency}
                  phase={tr.phase}
                  duration={tr.duration}
                />
              ))}
              <MediumTitle center>Ofertas de preços aos pacientes</MediumTitle>
              {priceRangeOfferings.map((pro) => (
                <PriceRangeOffering
                  key={pro.name}
                  name={pro.name}
                  minimumPrice={pro.minimumPrice}
                  maximumPrice={pro.maximumPrice}
                  count={pro.count}
                />
              ))}
            </>
          ) : (
            <Paragraph center>
              Sem tratamentos pendentes. Isso significa que os pacientes não
              poderão te encontrar no buscador de tratamentos. Caso queira
              tratar
              {activeTreatments?.length ? " mais pacientes" : " algum paciente"}
              , clique no botão abaixo.
            </Paragraph>
          )}
          <div className="button-wrapper">
            <NewTreatmentButton />
          </div>
        </Card>
      ) : null}
      <style jsx>{`
        .button-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};

export default PsychologistTreatments;
