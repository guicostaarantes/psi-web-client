import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import ResetPassword from "@psi/auth/components/ResetPassword/graphql";
import useSearchParams from "@psi/shared/hooks/useSearchParams";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Input from "@psi/styleguide/components/Input";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import useToast from "@psi/styleguide/hooks/useToast";

const ResetPasswordComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const { getSearchParam } = useSearchParams();

  const [resetPasswordQuery, { loading, data, error }] = useMutation(
    ResetPassword,
  );

  const resetPassword = async () => {
    try {
      if (passwordRef.current.value !== confirmRef.current.value) {
        addToast({
          header: "Senha não confere",
          message:
            "As senhas informadas nos dois campos não são as mesmas. Tente novamente.",
        });
        return;
      }
      const token = getSearchParam("token");
      await resetPasswordQuery({
        variables: {
          token,
          newPassword: passwordRef.current.value,
        },
      });
    } catch (err) {
      // empty
    }
  };

  useEffect(() => {
    if (error) {
      if (error.message === "weak password") {
        addToast({
          header: "Senha fraca",
          message:
            "Para maior segurança, insira uma senha com pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo ~!@#$%^&*()_+ .",
        });
      } else if (error.message === "invalid token") {
        addToast({
          header: "Link inválido",
          message:
            "Esse link para redefinir senha já foi utilizado ou já expirou.",
        });
      } else {
        addToast({
          header: "Erro no servidor",
          message:
            "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
        });
      }
    } else if (data) {
      addToast({
        header: "Tudo certo!",
        message:
          "Agora você já pode entrar no site usando seu email e sua nova senha.",
      });
      router.push("/login");
    }
  }, [data, error]);

  return (
    <Card style={{ width: "100%", maxWidth: 440 }}>
      <Paragraph center>Insira e confirme sua nova senha</Paragraph>
      <Input
        name="new-password"
        label="Nova senha"
        type="password"
        reference={passwordRef}
      />
      <Input
        name="confirm-password"
        label="Digite novamente a nova senha"
        type="password"
        reference={confirmRef}
      />
      <Button block color="primary" loading={loading} onClick={resetPassword}>
        Redefinir senha
      </Button>
      <Button block color="secondary" onClick={() => router.push("/login")}>
        Voltar
      </Button>
    </Card>
  );
};

export default ResetPasswordComponent;
