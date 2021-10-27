/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
export const isEmail = (email: string, required = true): boolean => {
  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validEmailRegex.test(email) || (!required && !email);
};

export const isPhoneNumber = (phone: string): boolean => {
  const validPhoneNumber = /^[+]*[0-9]*$/;
  return validPhoneNumber.test(phone);
};

export const isPostalCode = (postalCode: string): boolean => {
  const validPostalCode = /^[a-z0-9]*$/;
  return validPostalCode.test(postalCode);
};

export const isValidTaxNumber = (taxNumber: string, required = true): boolean => {
  const validTaxNumber = /^[a-zA-Z0-9]*$/;
  return validTaxNumber.test(taxNumber) || (!required && !taxNumber);
};

export const isValidRegistrationNumber = (registrationNumber: string, required = true): boolean => {
  const validRegistrationNumber = /^[a-zA-Z0-9]*$/;
  return validRegistrationNumber.test(registrationNumber) || (!required && !registrationNumber);
};

export const isValidPassword = (password: string): boolean => {
  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/;
  return validPassword.test(password);
};

export const isConfirmationCode = (code: string): boolean => {
  const validCode = /^[0-9]{6}$/;
  return validCode.test(code);
};

export const isNotSpace = (code: string): boolean => {
  const validSpace = /([^\s])/;
  return validSpace.test(code);
};
