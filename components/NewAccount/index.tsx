import CreatePatientUser from "graphql/CreatePatientUser";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Button from "styleguide/Button";
import Card from "styleguide/Card";
import Input from "styleguide/Input";
import useToast from "styleguide/Toast";
import Paragraph from "styleguide/Typography/Paragraph";
import { useMutation } from "@apollo/client";

const NewAccountComponent = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const emailRef = useRef<HTMLInputElement>(null);

  const [signupQuery, { loading, data, error }] = useMutation(
    CreatePatientUser
  );

  useEffect(() => {
    if (error) {
      addToast({
        header: "Email já cadastrado",
        message: "Esse email já está atrelado a uma conta do PSI. Tente outro.",
      });
    } else if (data) {
      console.log(data);
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
