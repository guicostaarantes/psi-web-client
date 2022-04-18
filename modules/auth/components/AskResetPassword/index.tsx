import { useRouter } from "next/router";
import { KeyboardEventHandler, useEffect, useRef } from "react";

import { useAskResetPasswordMutation } from "@psi/shared/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Input from "@psi/styleguide/components/Input";
import MainTitle from "@psi/styleguide/components/Typography/MainTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import useToast from "@psi/styleguide/hooks/useToast";

const AskResetPasswordComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const emailRef = useRef<HTMLInputElement>(null);

  const [
    askResetMutation,
    { loading, data, error },
  ] = useAskResetPasswordMutation();

  useEffect(() => {
    if (error) {
      addToast({
        header: "Erro no servidor",
        message:
          "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
      });
    } else if (data) {
      addToast({
        header: "Tudo certo!",
        message:
          "Confira sua caixa de correio e siga as instruções que estarão lá.",
      });
      router.push("/login");
    }
  }, [data, error]);

  const askReset = async () => {
    try {
      await askResetMutation({
        variables: {
          email: emailRef.current.value,
        },
      });
    } catch (err) {
      // empty
    }
  };

  const handleEmailKeyPress: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      askReset();
    }
  };

  return (
    <Card style={{ width: "100%", maxWidth: 440 }}>
      <MainTitle center>Oi, bem-vindo ao PSI</MainTitle>
      <Paragraph center>
        Insira seu e-mail que iremos te enviar instruções para redefinir sua
        senha.
      </Paragraph>
      <Input
        name="email"
        label="Email"
        onKeyPress={handleEmailKeyPress}
        reference={emailRef}
      />
      <Button block color="primary" loading={loading} onClick={askReset}>
        Redefinir minha senha
      </Button>
      <Button block color="secondary" onClick={() => router.push("/login")}>
        Voltar
      </Button>
    </Card>
  );
};

export default AskResetPasswordComponent;
