import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

import ActiveTreatment from "@psi/home/components/PsychologistTreatments/components/ActiveTreatment";
import PendingTreatment from "@psi/home/components/PsychologistTreatments/components/PendingTreatment";
import {
  MyPsychologistTreatments,
  MyPsychologistTreatmentsResponse,
} from "@psi/home/components/PsychologistTreatments/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const PsychologistTreatments = () => {
  const router = useRouter();

  const { data } = useQuery<MyPsychologistTreatmentsResponse>(
    MyPsychologistTreatments,
  );

  const activeTreatments = data?.myPsychologistProfile?.treatments.filter(
    (tr) => tr.status === "ACTIVE",
  );

  const pendingTreatments = data?.myPsychologistProfile?.treatments.filter(
    (tr) => tr.status === "PENDING",
  );

  const handleNewTreatmentClick = () => {
    router.push("/novo-tratamento");
  };

  return (
    <>
      <Card>
        {activeTreatments?.length ? (
          <>
            <Paragraph>Esses são os seus tratamentos ativos:</Paragraph>
            {activeTreatments.map((tr) => (
              <ActiveTreatment
                key={tr.id}
                id={tr.id}
                duration={tr.duration}
                price={tr.price}
                interval={tr.interval}
                patient={tr.patient}
              />
            ))}
          </>
        ) : null}
        {pendingTreatments?.length ? (
          <>
            <Paragraph>
              Esses são os tratamentos que você disponibilizou para futuros
              pacientes:
            </Paragraph>
            {pendingTreatments.map((tr) => (
              <PendingTreatment
                key={tr.id}
                id={tr.id}
                duration={tr.duration}
                price={tr.price}
                interval={tr.interval}
              />
            ))}
          </>
        ) : null}
        {!activeTreatments?.length && !pendingTreatments?.length ? (
          <Paragraph>
            Você ainda não possui nenhum tratamento cadastrado.
          </Paragraph>
        ) : null}
        <div className="button-wrapper">
          <Button color="primary" onClick={handleNewTreatmentClick}>
            Quero tratar um paciente
          </Button>
        </div>
      </Card>
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
