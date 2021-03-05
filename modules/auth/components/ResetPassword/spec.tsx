import { GraphQLError } from "graphql";
import { MockedProvider } from "@apollo/client/testing";
import ResetPasswordComponent from "@psi/auth/components/ResetPassword";
import ResetPassword from "@psi/auth/components/ResetPassword/graphql";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockAddToast = jest.fn();

jest.mock("@psi/styleguide/hooks/useToast", () => {
  return jest.fn(() => ({
    addToast: mockAddToast,
  }));
});

const mockGetSearchParam = jest.fn();

jest.mock("@psi/shared/hooks/useSearchParams", () => {
  return jest.fn(() => ({
    getSearchParam: mockGetSearchParam,
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
      query: ResetPassword,
      variables: {
        token: "valid-token",
        newPassword: "Abc123!@#",
      },
    },
    result: {
      data: {
        resetPassword: null,
      },
    },
  },
  {
    request: {
      query: ResetPassword,
      variables: {
        token: "invalid-token",
        newPassword: "Abc123!@#",
      },
    },
    result: {
      errors: [new GraphQLError("invalid token")],
    },
  },
  {
    request: {
      query: ResetPassword,
      variables: {
        token: "valid-token",
        newPassword: "weak",
      },
    },
    result: {
      errors: [new GraphQLError("weak password")],
    },
  },
];

beforeEach(jest.clearAllMocks);

test("ResetPasswordComponent renders", () => {
  render(
    <MockedProvider>
      <ResetPasswordComponent />
    </MockedProvider>,
  );

  const password = screen.getByLabelText("Nova senha") as HTMLInputElement;
  const confirm = screen.getByLabelText(
    "Digite novamente a nova senha",
  ) as HTMLInputElement;
  const resetPasswordButton = screen.getByText(
    "Redefinir senha",
  ) as HTMLButtonElement;
  const backButton = screen.getByText("Voltar") as HTMLButtonElement;

  expect(password).toBeInTheDocument();
  expect(confirm).toBeInTheDocument();
  expect(resetPasswordButton).toBeInTheDocument();
  expect(backButton).toBeInTheDocument();
});

test("user should reset password", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ResetPasswordComponent />
    </MockedProvider>,
  );
  const password = screen.getByLabelText("Nova senha") as HTMLInputElement;
  const confirm = screen.getByLabelText(
    "Digite novamente a nova senha",
  ) as HTMLInputElement;
  const resetPasswordButton = screen.getByText(
    "Redefinir senha",
  ) as HTMLButtonElement;

  mockGetSearchParam.mockImplementationOnce((key: string) => {
    if (key === "token") {
      return "valid-token";
    }
  });

  fireEvent.change(password, { target: { value: "Abc123!@#" } });
  fireEvent.change(confirm, { target: { value: "Abc123!@#" } });
  fireEvent.click(resetPasswordButton);

  await waitFor(() => {
    expect(mockGetSearchParam).toBeCalledWith("token");
    expect(mockAddToast).toBeCalledWith({
      header: "Tudo certo!",
      message:
        "Agora você já pode entrar no site usando seu email e sua nova senha.",
    });
    expect(mockPushRoute).toBeCalledWith("/login");
  });
});

test("user should not reset password with invalid token", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ResetPasswordComponent />
    </MockedProvider>,
  );
  const password = screen.getByLabelText("Nova senha") as HTMLInputElement;
  const confirm = screen.getByLabelText(
    "Digite novamente a nova senha",
  ) as HTMLInputElement;
  const resetPasswordButton = screen.getByText(
    "Redefinir senha",
  ) as HTMLButtonElement;

  mockGetSearchParam.mockImplementationOnce((key: string) => {
    if (key === "token") {
      return "invalid-token";
    }
  });

  fireEvent.change(password, { target: { value: "Abc123!@#" } });
  fireEvent.change(confirm, { target: { value: "Abc123!@#" } });
  fireEvent.click(resetPasswordButton);

  await waitFor(() => {
    expect(mockGetSearchParam).toBeCalledWith("token");
    expect(mockAddToast).toBeCalledWith({
      header: "Link inválido",
      message: "Esse link para redefinir senha já foi utilizado ou já expirou.",
    });
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("user should not reset password with weak password", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ResetPasswordComponent />
    </MockedProvider>,
  );
  const password = screen.getByLabelText("Nova senha") as HTMLInputElement;
  const confirm = screen.getByLabelText(
    "Digite novamente a nova senha",
  ) as HTMLInputElement;
  const resetPasswordButton = screen.getByText(
    "Redefinir senha",
  ) as HTMLButtonElement;

  mockGetSearchParam.mockImplementationOnce((key: string) => {
    if (key === "token") {
      return "valid-token";
    }
  });

  fireEvent.change(password, { target: { value: "weak" } });
  fireEvent.change(confirm, { target: { value: "weak" } });
  fireEvent.click(resetPasswordButton);

  await waitFor(() => {
    expect(mockGetSearchParam).toBeCalledWith("token");
    expect(mockAddToast).toBeCalledWith({
      header: "Senha fraca",
      message:
        "Para maior segurança, insira uma senha com pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo ~!@#$%^&*()_+ .",
    });
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("user should not reset password if confirm password does not match", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ResetPasswordComponent />
    </MockedProvider>,
  );
  const password = screen.getByLabelText("Nova senha") as HTMLInputElement;
  const confirm = screen.getByLabelText(
    "Digite novamente a nova senha",
  ) as HTMLInputElement;
  const resetPasswordButton = screen.getByText(
    "Redefinir senha",
  ) as HTMLButtonElement;

  fireEvent.change(password, { target: { value: "weak" } });
  fireEvent.change(confirm, { target: { value: "weak2" } });
  fireEvent.click(resetPasswordButton);

  await waitFor(() => {
    expect(mockGetSearchParam).not.toBeCalled();
    expect(mockAddToast).toBeCalledWith({
      header: "Senha não confere",
      message:
        "As senhas informadas nos dois campos não são as mesmas. Tente novamente.",
    });
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("user should be presented to server error message", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ResetPasswordComponent />
    </MockedProvider>,
  );
  const password = screen.getByLabelText("Nova senha") as HTMLInputElement;
  const confirm = screen.getByLabelText(
    "Digite novamente a nova senha",
  ) as HTMLInputElement;
  const resetPasswordButton = screen.getByText(
    "Redefinir senha",
  ) as HTMLButtonElement;

  mockGetSearchParam.mockImplementationOnce((key: string) => {
    if (key === "token") {
      return "valid-token";
    }
  });

  fireEvent.change(password, { target: { value: "weak3" } });
  fireEvent.change(confirm, { target: { value: "weak3" } });
  fireEvent.click(resetPasswordButton);

  await waitFor(() => {
    expect(mockGetSearchParam).toBeCalledWith("token");
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
      <ResetPasswordComponent />
    </MockedProvider>,
  );
  const backButton = screen.getByText("Voltar") as HTMLButtonElement;

  fireEvent.click(backButton);

  await waitFor(() => {
    expect(mockPushRoute).toBeCalledWith("/login");
  });
});
