import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { GraphQLError } from "graphql";

import AskResetPasswordComponent from "@psi/auth/components/AskResetPassword";
import { AskResetPasswordDocument } from "@psi/shared/graphql";

const mockAddToast = jest.fn();

jest.mock("@psi/styleguide/hooks/useToast", () => {
  return jest.fn(() => ({
    addToast: mockAddToast,
  }));
});

const mockPushRoute = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPushRoute,
  }),
}));

const mocks = [
  {
    request: {
      query: AskResetPasswordDocument,
      variables: {
        email: "tom.brady@psi.com.br",
      },
    },
    result: {
      data: {
        askResetPassword: null,
      },
    },
  },
  {
    request: {
      query: AskResetPasswordDocument,
      variables: {
        email: "invalid-email",
      },
    },
    result: {
      errors: [new GraphQLError("")],
    },
  },
];

beforeEach(jest.clearAllMocks);

test("AskResetPasswordComponent renders", () => {
  render(
    <MockedProvider>
      <AskResetPasswordComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const askResetButton = screen.getByText(
    "Redefinir minha senha",
  ) as HTMLButtonElement;

  expect(email).toBeInTheDocument();
  expect(askResetButton).toBeInTheDocument();
});

test("user must be redirected to home if ask succeeds", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <AskResetPasswordComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const askResetButton = screen.getByText(
    "Redefinir minha senha",
  ) as HTMLButtonElement;

  fireEvent.change(email, { target: { value: "tom.brady@psi.com.br" } });
  fireEvent.click(askResetButton);

  await waitFor(() => {
    expect(mockAddToast).toBeCalledWith({
      header: "Tudo certo!",
      message:
        "Confira sua caixa de correio e siga as instruções que estarão lá.",
    });
    expect(mockPushRoute).toBeCalledWith("/login");
  });
});

test("user must be presented to server error message", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <AskResetPasswordComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const askResetButton = screen.getByText(
    "Redefinir minha senha",
  ) as HTMLButtonElement;

  fireEvent.change(email, { target: { value: "invalid-email" } });
  fireEvent.click(askResetButton);

  await waitFor(() => {
    expect(mockAddToast).toBeCalledWith({
      header: "Erro no servidor",
      message:
        "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
    });
    expect(mockPushRoute).not.toBeCalled();
  });
});
