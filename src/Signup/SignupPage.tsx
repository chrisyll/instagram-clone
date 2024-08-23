import styled from "styled-components";

function SignupPage() {
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <FormContainer>
      <LogoImage src="/images/insta_word_image.jpg" alt="Instagram" />
      <InfoText>Sign up to see photos and videos from your friends.</InfoText>
      <StyledForm>
        <StyledInput type="email" placeholder="Email" />
        <StyledInput type="text" placeholder="Full name" />
        <StyledInput type="text" placeholder="Username" />
        <StyledInput type="password" placeholder="Password" />
        <SignupButton disabled={true}>Sign up</SignupButton>
      </StyledForm>
    </FormContainer>
  );
}

export { SignupPage };

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  margin: 40px auto;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 9px 10px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: #fafafa;
  box-sizing: border-box;
  font-size: 14px;

  &:focus {
    border-color: #a9a9a9;
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
