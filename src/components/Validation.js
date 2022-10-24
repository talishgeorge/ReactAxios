export const Validation = {};
Validation.validateBuffet = (value) => {
  return value == "";
};

Validation.validateEmail = (value) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(value);
};

Validation.validPlateCount = (value) => {
  return value != "" && value > 0;
};

Validation.validateDate = (value) => {
  let formatDate = new Date(value);
  let todayDate = new Date();

  return formatDate > todayDate;
};
