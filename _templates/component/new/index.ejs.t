---
to: modules/<%= module %>/components/<%= h.changeCase.pascal(name) %>/index.tsx
---
import { useState } from "@hookstate/core";
import { useEffect } from "react";

import Paragraph from "@psi/styleguide/components/Typography/Paragraph";

interface <%= h.changeCase.pascal(name) %>Props {
  maximum?: number;
}

const <%= h.changeCase.pascal(name) %> = ({ maximum = 5 }: <%= h.changeCase.pascal(name) %>Props) => {
  const clicked = useState(0);

  useEffect(() => {
    if (clicked.value === maximum) {
      setTimeout(() => clicked.set(0), 1000);
    }
  }, [clicked.value]);

  const handleClick = () => {
    clicked.set((prev) => prev + 1);
  };

  return (
    <>
      <div className="wrapper" onClick={handleClick} role="button">
        <Paragraph>Hello, I am the <%= h.changeCase.pascal(name) %> component.</Paragraph>
        <Paragraph>You clicked me {clicked.value} times.</Paragraph>
        <Paragraph>I will reset when you click me {maximum} times.</Paragraph>
      </div>
      <style jsx>{`
        .wrapper {
          align-items: center;
          border: black 2px dashed;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          margin: 1rem;
          padding: 1rem;
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default <%= h.changeCase.pascal(name) %>;
