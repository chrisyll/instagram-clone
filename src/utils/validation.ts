const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string) => {
  const nameParts = name.trim().split(/\s+/);
  return nameParts.length >= 2 && nameParts.every((part) => part.length >= 2);
};

const validateUsername = (username: string) => {
  const usernameRegex = /^(?![_\.])[a-zA-Z0-9._]{3,20}(?<![_.])$/;
  return usernameRegex.test(username);
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

export { validateEmail, validateName, validateUsername, validatePassword };
