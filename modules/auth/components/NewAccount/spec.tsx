import { GraphQLError } from "graphql";
import { MockedProvider } from "@apollo/client/testing";
import NewAccountComponent from "@psi/auth/components/NewAccount";
import CreatePatientUser from "@psi/auth/components/NewAccount/graphql";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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
      query: CreatePatientUser,
      variables: {
        email: "tom.brady@psi.com.br",
      },
    },
    result: {
      data: {
        createPatientUser: null,
      },
    },
  },
  {
    request: {
      query: CreatePatientUser,
      variables: {
        email: "invalid-email",
      },
    },
    result: {
      errors: [new GraphQLError("invalid email")],
    },
  },
];

beforeEach(jest.clearAllMocks);

test("NewAccountComponent renders", () => {
  render(
    <MockedProvider>
      <NewAccountComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const newAccountButton = screen.getByText("Cadastrar") as HTMLButtonElement;
  const backButton = screen.getByText("Voltar") as HTMLButtonElement;

  expect(email).toBeInTheDocument();
  expect(newAccountButton).toBeInTheDocument();
  expect(backButton).toBeInTheDocument();
});

test("user should register account with valid mail", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <NewAccountComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const newAccountButton = screen.getByText("Cadastrar") as HTMLButtonElement;

  fireEvent.change(email, { target: { value: "tom.brady@psi.com.br" } });
  fireEvent.click(newAccountButton);

  await waitFor(() => {
    expect(mockAddToast).toBeCalledWith({
      header: "Tudo certo!",
      message:
        "Confira sua caixa de correio para validar esse cadastro e siga as instruções que estarão lá.",
    });
    expect(mockPushRoute).toBeCalledWith("/login");
  });
});

test("user should not register account with invalid mail", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <NewAccountComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const newAccountButton = screen.getByText("Cadastrar") as HTMLButtonElement;

  fireEvent.change(email, { target: { value: "invalid-email" } });
  fireEvent.click(newAccountButton);

  await waitFor(() => {
    expect(mockAddToast).toBeCalledWith({
      header: "Email inválido",
      message: "Digite um email válido e tente novamente.",
    });
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("user should be presented to server error message", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <NewAccountComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const newAccountButton = screen.getByText("Cadastrar") as HTMLButtonElement;

  fireEvent.change(email, { target: { value: "other" } });
  fireEvent.click(newAccountButton);

  await waitFor(() => {
    expect(mockAddToast).toBeCalledWith({
      header: "Erro no servidor",
      message:
        "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
    });
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("user should go back to login page", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <NewAccountComponent />
    </MockedProvider>,
  );
  const backButton = screen.getByText("Voltar") as HTMLButtonElement;

  fireEvent.click(backButton);

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledWith("/login");
  });
});
