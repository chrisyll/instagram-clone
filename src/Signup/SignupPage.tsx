import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  validateEmail,
  validateName,
  validateUsername,
  validatePassword,
} from "../utils/validation";
import { handleSignup } from "../../firebase.config";
import errorMessages from "./SignupFormErrorMessages.json";

type FieldName = "email" | "name" | "username" | "password";

function SignupPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });

  const [formValuesValidation, setFormValuesValidation] = useState({
    isEmailValid: false,
    isNameValid: false,
    isUsernameValid: false,
    isPasswordValid: false,
  });

  const [fieldsTouched, setFieldsTouched] = useState({
    email: false,
    name: false,
    username: false,
    password: false,
  });

  const handleInputChange = (name: FieldName, value: string) => {
    setFormValues({ ...formValues, [name]: value });
    if (!fieldsTouched[name]) {
      setFieldsTouched({ ...fieldsTouched, [name]: true });
    }

    switch (name) {
      case "email":
        !formValuesValidation.isEmailValid &&
          setFormValuesValidation({
            ...formValuesValidation,
            isEmailValid: validateEmail(value),
          });
        break;
      case "name":
        !formValuesValidation.isNameValid &&
          setFormValuesValidation({
            ...formValuesValidation,
            isNameValid: validateName(value),
          });
        break;
      case "username":
        !formValuesValidation.isUsernameValid &&
          setFormValuesValidation({
            ...formValuesValidation,
            isUsernameValid: validateUsername(value),
          });
        break;
      case "password":
        !formValuesValidation.isPasswordValid &&
          setFormValuesValidation({
            ...formValuesValidation,
            isPasswordValid: validatePassword(value),
          });
        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await handleSignup(
        formValues.email,
        formValues.password,
        formValues.name,
        formValues.username
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <StyledForm onSubmit={onSubmit} noValidate>
          <LogoImage src="/images/insta_word_image.jpg" alt="Instagram" />
          <InfoText>
            Sign up to see photos and videos from your friends.
          </InfoText>
          <FormField>
            {!formValuesValidation.isEmailValid && fieldsTouched.email && (
              <ErrorMessage>{errorMessages.email}</ErrorMessage>
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={(e) =>
                handleInputChange(e.target.name as FieldName, e.target.value)
              }
              $hasError={
                !formValuesValidation.isEmailValid && fieldsTouched.email
              }
            />
          </FormField>
          <FormField>
            {!formValuesValidation.isNameValid && fieldsTouched.name && (
              <ErrorMessage>{errorMessages.name}</ErrorMessage>
            )}
            <Input
              type="text"
              name="name"
              placeholder="Full name"
              value={formValues.name}
              onChange={(e) =>
                handleInputChange(e.target.name as FieldName, e.target.value)
              }
              $hasError={
                !formValuesValidation.isNameValid && fieldsTouched.name
              }
            />
          </FormField>
          <FormField>
            {!formValuesValidation.isUsernameValid &&
              fieldsTouched.username && (
                <ErrorMessage>{errorMessages.username}</ErrorMessage>
              )}
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={(e) =>
                handleInputChange(e.target.name as FieldName, e.target.value)
              }
              $hasError={
                !formValuesValidation.isUsernameValid && fieldsTouched.username
              }
            />
          </FormField>
          <FormField>
            {!formValuesValidation.isPasswordValid &&
              fieldsTouched.password && (
                <ErrorMessage>{errorMessages.password}</ErrorMessage>
              )}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={(e) =>
                handleInputChange(e.target.name as FieldName, e.target.value)
              }
              $hasError={
                !formValuesValidation.isPasswordValid && fieldsTouched.password
              }
            />
          </FormField>
          <SignupButton
            type="submit"
            disabled={
              !formValuesValidation.isEmailValid ||
              !formValuesValidation.isNameValid ||
              !formValuesValidation.isUsernameValid ||
              !formValuesValidation.isPasswordValid
            }
          >
            Sign up
          </SignupButton>
        </StyledForm>
        <LoginContainer>
          <LoginText>
            Have an account?
            <Link to={"/"}>
              <LoginButton>Log in</LoginButton>
            </Link>
          </LoginText>
        </LoginContainer>
      </FormContainer>
    </Container>
  );
}

export { SignupPage };

const Container = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 320px;
  height: 580px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 40px;
`;

const LogoImage = styled.img`
  height: 120px;
  object-fit: cover;
`;

const InfoText = styled.div`
  font-size: 17px;
  color: #5a5a5a;
  margin-bottom: 20px;
  line-height: 20px;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  padding: 16px;
`;

const FormField = styled.div``;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  line-height: 14px;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 9px 10px;
  border: 1px solid ${(props) => (props.$hasError ? "red" : "#dbdbdb")};
  border-radius: 3px;
  background-color: ${(props) => (props.$hasError ? "#fdd" : "#fafafa")};
  box-sizing: border-box;
  font-size: 14px;

  &:focus {
    border-color: ${(props) => (props.$hasError ? "red" : "#a9a9a9")};
    outline: none;
  }
`;

const SignupButton = styled.button`
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background-color: #007bb5;
  }

  &:disabled {
    background-color: #b2dffc;
    cursor: default;
  }
`;

const LoginContainer = styled.div`
  height: 60px;
  border: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: #fff;
`;

const LoginText = styled.div`
  color: #262626;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: 5px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;
