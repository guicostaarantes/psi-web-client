import { useQuery } from "@apollo/client";
import React from "react";

import ActiveTreatment from "@psi/psychologistStart/components/Treatments/components/ActiveTreatment";
import NewTreatmentButton from "@psi/psychologistStart/components/Treatments/components/NewTreatmentButton";
import PendingTreatment from "@psi/psychologistStart/components/Treatments/components/PendingTreatment";
import {
  MyPsychologistTreatments,
  MyPsychologistTreatmentsResponse,
} from "@psi/psychologistStart/components/Treatments/graphql";
import Card from "@psi/styleguide/components/Card";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const PsychologistTreatments = () => {
  const { data } = useQuery<MyPsychologistTreatmentsResponse>(
    MyPsychologistTreatments,
  );

  const activeTreatments = data?.myPsychologistProfile?.treatments.filter(
    (tr) => tr.status === "ACTIVE",
  );

  const pendingTreatments = data?.myPsychologistProfile?.treatments.filter(
    (tr) => tr.status === "PENDING",
  );

  return (
    <>
      {activeTreatments?.length ? (
        <Card>
          <MediumTitle center>Tratamentos ativos</MediumTitle>
          {activeTreatments.map((tr) => (
            <ActiveTreatment
              key={tr.id}
              id={tr.id}
              weeklyStart={tr.weeklyStart}
              duration={tr.duration}
              price={tr.price}
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
                  weeklyStart={tr.weeklyStart}
                  duration={tr.duration}
                  price={tr.price}
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
