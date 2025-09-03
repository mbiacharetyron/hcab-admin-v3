export const validateUsername = (username: string): boolean => {
  // Username should be at least 3 characters and contain only alphanumeric characters, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]{3,}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const getFormErrors = (username: string, password: string): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!validateRequired(username)) {
    errors.username = 'Username is required';
  } else if (!validateUsername(username)) {
    errors.username = 'Username must be at least 3 characters and contain only letters, numbers, underscores, and hyphens';
  }

  if (!validateRequired(password)) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};
