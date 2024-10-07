"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../spiner/Spiner";

const FormContainer = styled.div`
  width: 90%;
  max-width: 350px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #007bff;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #007bff;
`;

const Label = styled.label`
  width: 100%;
  display: flex;
  padding: 5px;
  font-weight: 600;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 15px auto;
  font-family: "Prompt", sans-serif;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 900;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const LoadingMessage = styled.p`
  font-size: 16px;
  color: #000000;
`;

const RegisterMessage = styled.p`
  color: #000; /* Color negro para el mensaje de registro */
`;

const LoginForm = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/products");
    }
  }, [status, router]);

  const handleSignIn = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      {status === "loading" && <Spinner />}

      {status === "unauthenticated" && (
        <FormContainer>
          <Title>Login</Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <div>
              <Label htmlFor="username">Username:</Label>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <StyledButton type="submit" label="Sign In"></StyledButton>
            <RegisterMessage>
              Don't have an account? <StyledLink href="/register">Register here</StyledLink>
            </RegisterMessage>
          </form>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormContainer>
      )}
    </div>
  );
};

export default LoginForm;
