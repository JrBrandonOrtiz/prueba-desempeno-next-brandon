"use client";
import { useState } from "react";
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

const RegisterMessage = styled.p`
  color: #000; 
`;

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Spinner />}

      <FormContainer>
        <Title>Register</Title>
        <form onSubmit={handleRegister}>
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
          <StyledButton type="submit" label="Sign Up"></StyledButton>
          <RegisterMessage>
            Already have an account? <StyledLink href="/login">Login here</StyledLink>
          </RegisterMessage>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </div>
  );
};

export default RegisterForm;
