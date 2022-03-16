import { none, State, useState } from "@hookstate/core";
import React, { forwardRef, useImperativeHandle } from "react";
import { MdClose, MdDone, MdErrorOutline } from "react-icons/md";

import { useInvitePsychologistUserMutation } from "@psi/shared/graphql";
import CircleSpinner from "@psi/styleguide/components/Spinner";

interface EmailListItemProps {
  emailState: State<string>;
}

export interface EmailListItemRef {
  sendInvite: () => void;
}

const EmailListItem = ({ emailState }: EmailListItemProps, ref) => {
  const email = useState(emailState);

  const [
    invitePsychologist,
    { loading, error, data },
  ] = useInvitePsychologistUserMutation();

  useImperativeHandle(ref, () => ({
    sendInvite,
  }));

  const sendInvite = () => {
    if (!loading && !data) {
      invitePsychologist({ variables: { email: email.value } });
    }
  };

  const handleRemove = () => email.set(none);

  return (
    <li>
      {loading ? (
        <button onClick={() => null}>
          <CircleSpinner size="1.5rem" />
        </button>
      ) : error ? (
        <button onClick={sendInvite}>
          <MdErrorOutline size="1.5rem" />
        </button>
      ) : data ? (
        <button onClick={handleRemove}>
          <MdDone size="1.5rem" />
        </button>
      ) : (
        <button onClick={handleRemove}>
          <MdClose size="1.5rem" />
        </button>
      )}
      {error?.message === "invalid email" ? (
        <i>(endereço de email inválido)</i>
      ) : error?.message === "user already exists" ? (
        <i>(endereço de email já utilizado)</i>
      ) : null}
      <span>{email.value}</span>
      <style jsx>{`
        button {
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
        }
        li {
          align-items: center;
          display: flex;
        }
        i {
          padding-right: 0.5rem;
        }
      `}</style>
    </li>
  );
};

export default forwardRef(EmailListItem);
