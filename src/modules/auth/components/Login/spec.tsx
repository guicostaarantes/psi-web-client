import { GraphQLError } from "graphql";
import { MockedProvider } from "@apollo/client/testing";
import LoginComponent from "@psi/auth/components/Login";
import AuthenticateUser from "@psi/auth/components/Login/graphql";
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
      query: AuthenticateUser,
      variables: {
        email: "tom.brady@psi.com.br",
        password: "Abc123!@#",
      },
    },
    result: {
      data: {
        authenticateUser: {
          token:
            "TJA20rdqNfflNen3zqBXuI2HSOc5ta7U8xuDIJmcb9uLTGeLesANU7Lx76Htj8Y9",
          expiresAt: ((Date.now() / 1000) >> 0) + 3600,
        },
      },
    },
  },
  {
    request: {
      query: AuthenticateUser,
      variables: {
        email: "tom.brady@psi.com.br",
        password: "Abc123!@#-wrong",
      },
    },
    result: {
      errors: [new GraphQLError("incorrect credentials")],
    },
  },
];

beforeEach(jest.clearAllMocks);

test("LoginComponent renders", () => {
  render(
    <MockedProvider>
      <LoginComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const password = screen.getByLabelText("Senha") as HTMLInputElement;
  const signinButton = screen.getByText("Entrar") as HTMLButtonElement;
  const newAccountButton = screen.getByText(
    "Criar minha conta",
  ) as HTMLButtonElement;

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(signinButton).toBeInTheDocument();
  expect(newAccountButton).toBeInTheDocument();
});

test("user must be presented to correct credentials", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <LoginComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const password = screen.getByLabelText("Senha") as HTMLInputElement;
  const signinButton = screen.getByText("Entrar") as HTMLButtonElement;

  fireEvent.change(email, { target: { value: "tom.brady@psi.com.br" } });
  fireEvent.change(password, { target: { value: "Abc123!@#" } });
  fireEvent.click(signinButton);

  await waitFor(() => {
    expect(mockAddToast).not.toBeCalled();
    expect(localStorage.setItem).toBeCalledWith(
      "token",
      "TJA20rdqNfflNen3zqBXuI2HSOc5ta7U8xuDIJmcb9uLTGeLesANU7Lx76Htj8Y9",
    );
    expect(mockPushRoute).toBeCalledWith("/");
  });
});

test("user must be presented to incorrect credentials message", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <LoginComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const password = screen.getByLabelText("Senha") as HTMLInputElement;
  const signinButton = screen.getByText("Entrar") as HTMLButtonElement;

  fireEvent.change(email, { target: { value: "tom.brady@psi.com.br" } });
  fireEvent.change(password, { target: { value: "Abc123!@#-wrong" } });
  fireEvent.click(signinButton);

  await waitFor(() => {
    expect(mockAddToast).toBeCalledWith({
      header: "Credenciais inválidas",
      message: "Tente novamente.",
    });
    expect(localStorage.setItem).not.toBeCalled();
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("user must be presented to server error message", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <LoginComponent />
    </MockedProvider>,
  );
  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const password = screen.getByLabelText("Senha") as HTMLInputElement;
  const signinButton = screen.getByText("Entrar") as HTMLButtonElement;

  fireEvent.change(email, { target: { value: "tom.brady@psi.com.br" } });
  fireEvent.change(password, { target: { value: "Abc123!@#-other" } });
  fireEvent.click(signinButton);

  await waitFor(() => {
    expect(mockAddToast).toBeCalledWith({
      header: "Erro no servidor",
      message:
        "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
    });
    expect(localStorage.setItem).not.toBeCalled();
    expect(mockPushRoute).not.toBeCalled();
  });
});
