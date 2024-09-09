import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { validateEmail } from "../utils/validation";
import { handleLogin } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { login } from "../store/accountSlice";

function LoginPage() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (
    type: React.HTMLInputTypeAttribute,
    value: string
  ) => {
    setFormValues({ ...formValues, [type]: value });

    if (type === "email") {
      !emailTouched && setEmailTouched(true);
      setIsEmailValid(validateEmail(value));
    }
  };

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await handleLogin({ ...formValues });
      dispatch(login(result));
      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ImageContainer>
        <StyledImage src="/images/insta_on_iphone.jpg" alt="Iphone photo" />
      </ImageContainer>
      <FormContainer>
        <Form onSubmit={onsubmit} noValidate>
          <FormContent>
            <LogoImage src="/images/insta_word_image.jpg" alt="Instagram" />
            <Input
              type="email"
              placeholder="Email"
              value={formValues.email}
              onChange={(e) => handleInputChange(e.target.type, e.target.value)}
              $hasError={!isEmailValid && emailTouched}
            />
            <Input
              type="password"
              placeholder="Password"
              value={formValues.password}
              onChange={(e) => handleInputChange(e.target.type, e.target.value)}
            />
            <LoginButton
              type="submit"
              disabled={!isEmailValid || formValues.password.length === 0}
            >
              Log in
            </LoginButton>
          </FormContent>
        </Form>
        <SignUpContainer>
          <SignUpText>
            Don't have an account?
            <Link to={"signup"}>
              <SignUpButton>Sign up</SignUpButton>
            </Link>
          </SignUpText>
        </SignUpContainer>
      </FormContainer>
    </Container>
  );
}

export { LoginPage };

const Container = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ImageContainer = styled.div`
  width: 320px;
  height: 560px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormContainer = styled.div`
  width: 320px;
  height: 580px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Form = styled.form`
  border: 1px solid #dbdbdb;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 360px;
  background-color: #fff;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const LogoImage = styled.img`
  height: 120px;
  object-fit: cover;
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

const LoginButton = styled.button`
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

const SignUpContainer = styled.div`
  height: 60px;
  border: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: #fff;
`;

const SignUpText = styled.div`
  color: #262626;
`;

const SignUpButton = styled.button`
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
