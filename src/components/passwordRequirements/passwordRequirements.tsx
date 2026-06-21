import { getPasswordStrength } from '../../getPasswordStrength';

export const passwordRequirements = (password: string) => {
  const strength = getPasswordStrength(password);
  return [
    { met: strength.hasNumber, text: '1 number' },
    { met: strength.hasUpperCase, text: '1 uppercase' },
    { met: strength.hasLowerCase, text: '1 lowercase' },
    { met: strength.hasSpecialChar, text: '1 special character' },
  ];
};
