import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import CreatePatientUser from "@src/graphql/CreatePatientUser";
import useToast from "@src/hooks/useToast";
import Button from "@src/styleguide/Button";
import Card from "@src/styleguide/Card";
import Input from "@src/styleguide/Input";
import Paragraph from "@src/styleguide/Typography/Paragraph";

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
    } catch (err) {}
  };

  return (
    <Card style={{ width: "100%", maxWidth: 440 }}>
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
