import styled from "styled-components";

function LoginPage() {
  return (
    <Container>
      <ImageContainer>
        <StyledImage src="/images/insta_on_iphone.jpg" alt="Iphone Photo" />
      </ImageContainer>
      <FormContainer>
        <Form>
          <FormContent>
            <LogoImage src="/images/insta_word_image.jpg" alt="Instagram" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <LoginButton disabled={true}>Log in</LoginButton>
          </FormContent>
        </Form>
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
`;

const Form = styled.form`
  border: 1px solid #dbdbdb;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 360px;
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

const Input = styled.input`
  border: 1px solid #dbdbdb;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;

  &:focus {
    border-color: #a8a8a8;
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
