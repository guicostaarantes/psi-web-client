import { State, useState } from "@hookstate/core";

import Card from "@psi/styleguide/components/Card";
import Checkbox from "@psi/styleguide/components/Checkbox";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface TermProps {
  agreement: State<boolean>;
  message: string;
  name: string;
}

const Term = ({ agreement, message, name }: TermProps) => {
  const agreementState = useState(agreement);

  return (
    <>
      <Card floating>
        {message
          ?.split("\n")
          .filter((msg) => msg !== "")
          .map((msg, index) => (
            <Paragraph key={index} {...{ noMarginTop: index === 0 }}>
              {msg}
            </Paragraph>
          ))}
        <Checkbox
          name={`agreement-${name}`}
          label="Li e estou de acordo"
          checked={agreementState.value}
          onChange={() => agreementState.set((v) => !v)}
        />
      </Card>
      <style jsx>{`
        .wrapper {
          align-items: center;
          border: black 1px dashed;
          display: flex;
          flex-direction: column;
          margin: 1rem;
          padding: 1rem;
          padding-bottom: 2rem;
        }
      `}</style>
    </>
  );
};

export default Term;
