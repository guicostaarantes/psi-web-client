import { useState } from "@hookstate/core";
import React, { useEffect, useRef } from "react";

import EmailListItem, {
  EmailListItemRef,
} from "@psi/coordinatorStart/components/InvitePsychologists/components/EmailListItem";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Input from "@psi/styleguide/components/Input";
import MediumTitle from "@psi/styleguide/components/Typography/MediumTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

const InvitePsychologists = () => {
  const emails = useState<Array<string>>([]);

  const inputRef = useRef<HTMLInputElement>();
  const emailsRef = useRef<Array<EmailListItemRef>>([]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const keyPressHandler = (ev: KeyboardEvent) => {
        if (ev.key === "Enter") {
          addToInvitations();
        }
      };

      const pasteHandler = () => {
        setTimeout(addToInvitations, 0);
      };

      inputRef.current.addEventListener("keypress", keyPressHandler);
      inputRef.current.addEventListener("paste", pasteHandler);

      return () => {
        inputRef.current.removeEventListener("keypress", keyPressHandler);
        inputRef.current.removeEventListener("paste", pasteHandler);
      };
    }
  }, []);

  const addToInvitations = () => {
    emails.set((prev) => {
      const toAdd = inputRef.current.value.split(" ").filter((v) => v);
      const uniqueValues = [...new Set([...prev, ...toAdd])];
      const sortedValues = uniqueValues.sort((a, b) => (a > b ? 1 : -1));
      return sortedValues;
    });
    inputRef.current.value = "";
  };

  const sendInvitations = () => {
    emailsRef.current.forEach((email) => email?.sendInvite());
  };

  return (
    <Card>
      <MediumTitle center>Convidar psicológos para a plataforma</MediumTitle>
      <Card floating>
        <Paragraph>
          Insira os emails que deseja convidar no campo abaixo.
        </Paragraph>
        <div className="add-emails-wrapper">
          <Input
            reference={inputRef}
            label="Adicionar emails"
            name="add-emails"
          />
          <Button color="secondary" onClick={addToInvitations}>
            Adicionar
          </Button>
        </div>
      </Card>
      <Card floating>
        <ul>
          {emails.map((emailState, index) => (
            <EmailListItem
              key={emailState.value}
              emailState={emailState}
              ref={(el: EmailListItemRef) => (emailsRef.current[index] = el)}
            />
          ))}
        </ul>
        <Button color="primary" onClick={sendInvitations}>
          Enviar convites
        </Button>
      </Card>
      <style jsx>{`
        .add-emails-wrapper {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </Card>
  );
};

export default InvitePsychologists;
