import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import useTerms from "@psi/profiles/hooks/useTerms";
import {
  GetCharacteristicMessagesDocument,
  GetPsychologistTermsDocument,
  MyUserDocument,
} from "@psi/shared/graphql";

const mocks = [
  {
    request: { query: MyUserDocument },
    result: {
      data: {
        myUser: {
          id: "70d99987-385f-4ab5-b9b1-09c09374d5aa",
          email: "peyton.manning@psi.com.br",
          role: "PSYCHOLOGIST",
        },
      },
    },
  },
  {
    request: {
      query: GetPsychologistTermsDocument,
    },
    result: {
      data: {
        psychologistTerms: [
          {
            name: "price",
            version: 1,
            active: true,
          },
          {
            name: "price",
            version: 2,
            active: true,
          },
          {
            name: "price",
            version: 3,
            active: false,
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetCharacteristicMessagesDocument,
      variables: {
        lang: "pt-BR",
        keys: ["psy-term:price:2"],
      },
    },
    result: {
      data: {
        translations: [
          {
            lang: "pt-BR",
            key: "psy-term:price:2",
            value: "Termo para preço versão 2",
          },
        ],
      },
    },
  },
];

const TestComponent = () => {
  const { terms, messages } = useTerms();

  return (
    <>
      {terms?.map((term) => (
        <div key={term.name}>
          <span>{messages[`psy-term:${term.name}:${term.version}`]}</span>
        </div>
      ))}
    </>
  );
};

test("should get active terms and messages", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <TestComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const elem1 = screen.getByText("Termo para preço versão 2");

    expect(elem1).toBeInTheDocument();
  });
});
