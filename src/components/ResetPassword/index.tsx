import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import ResetPassword from "@src/graphql/ResetPassword";
import useToast from "@src/hooks/useToast";
import Button from "@src/styleguide/Button";
import Card from "@src/styleguide/Card";
import Input from "@src/styleguide/Input";
import Paragraph from "@src/styleguide/Typography/Paragraph";

const ResetPasswordComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const [resetPasswordQuery, { loading, data, error }] = useMutation(
    ResetPassword,
  );

  const resetPassword = async () => {
    try {
      const token = new URLSearchParams(window.location.search).get("token");
      await resetPasswordQuery({
        variables: {
          token,
          newPassword: passwordRef.current.value,
        },
      });
    } catch (err) {}
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
        console.log(error.message);
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
        label="New Password"
        type="password"
        reference={passwordRef}
      />
      <Input
        name="confirm-password"
        label="Confirm Password"
        type="password"
        reference={confirmRef}
      />
      <Button block color="primary" loading={loading} onClick={resetPassword}>
        Cadastrar
      </Button>
      <Button block color="secondary" onClick={() => router.push("/login")}>
        Voltar
      </Button>
    </Card>
  );
};

export default ResetPasswordComponent;
