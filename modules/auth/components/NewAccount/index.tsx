import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import CreatePatientUser from "@psi/auth/components/NewAccount/graphql";
import Button from "@psi/styleguide/components/Button";
import Card from "@psi/styleguide/components/Card";
import Input from "@psi/styleguide/components/Input";
import MainTitle from "@psi/styleguide/components/Typography/MainTitle";
import Paragraph from "@psi/styleguide/components/Typography/Paragraph";
import useToast from "@psi/styleguide/hooks/useToast";

const NewAccountComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const emailRef = useRef<HTMLInputElement>(null);

  const [signupQuery, { loading, data, error }] = useMutation(
    CreatePatientUser,
  );

  useEffect(() => {
    if (error) {
      if (error.message === "invalid email") {
        addToast({
          header: "Email inválido",
          message: "Digite um email válido e tente novamente.",
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
          "Confira sua caixa de correio para validar esse cadastro e siga as instruções que estarão lá.",
      });
      router.push("/login");
    }
  }, [data, error]);

  const signup = async () => {
    try {
      await signupQuery({
        variables: {
          email: emailRef.current.value,
        },
      });
    } catch (err) {
      // empty
    }
  };

  return (
    <Card style={{ width: "100%", maxWidth: 440 }}>
      <MainTitle center>Cadastrar nova conta</MainTitle>
      <Paragraph center>Digite o email que deseja cadastrar no PSI</Paragraph>
      <Input name="email" label="Email" reference={emailRef} />
      <Button block color="primary" loading={loading} onClick={signup}>
        Cadastrar
      </Button>
      <Button block color="secondary" onClick={() => router.push("/login")}>
        Voltar
      </Button>
    </Card>
  );
};

export default NewAccountComponent;
