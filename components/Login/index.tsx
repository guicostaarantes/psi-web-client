import AuthenticateUser, { AuthenticateUserResponse } from "graphql/AuthenticateUser";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Button from "styleguide/Button";
import Card from "styleguide/Card";
import Input from "styleguide/Input";
import Paragraph from "styleguide/Typography/Paragraph";
import { useLazyQuery } from "@apollo/client";

const LoginComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [
    signinQuery,
    { loading, data, error },
  ] = useLazyQuery<AuthenticateUserResponse>(AuthenticateUser);

  useEffect(() => {
    if (error) {
      if (error.message === "incorrect credentials") {
        addToast({
          header: "Credenciais inválidas",
          message: "Tente novamente.",
        });
      } else {
        addToast({
          header: "Erro no servidor",
          message:
            "O servidor do PSI retornou um erro. Tente novamente mais tarde.",
        });
      }
    } else if (data) {
      localStorage.setItem("token", data.authenticateUser.token);
      router.push("/");
    }
  }, [data, error]);

  const signin = () => {
    signinQuery({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  };

  return (
    <Card style={{ width: "100%", maxWidth: 440 }}>
      <Paragraph center>
        Entre com suas credenciais ou crie uma nova conta
      </Paragraph>
      <Input name="email" label="Email" reference={emailRef} />
      <Input
        name="password"
        label="Senha"
        reference={passwordRef}
        type="password"
      />
      <Button block color="primary" loading={loading} onClick={signin}>
        Entrar
      </Button>
      <Button
        block
        color="secondary"
        onClick={() => router.push("/nova-conta")}
      >
        Criar minha conta
      </Button>
    </Card>
  );
};

export default LoginComponent;
