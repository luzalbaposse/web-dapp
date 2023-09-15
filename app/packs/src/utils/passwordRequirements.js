export const passwordMatchesRequirements = password => {
  const tags = ["Number", "Upper case", "Lower case", "8 characters"];
  const lengthRegex = new RegExp("^.{8,}$");
  const lowercaseRegex = new RegExp("(?=.*[a-z])");
  const uppercaseRegex = new RegExp("(?=.*[A-Z])");
  const digitRegex = new RegExp("(?=.*[0-9])");
  const errors = {};
  let valid = true;

  // the keys must match the tag names
  if (!lengthRegex.test(password)) {
    errors["8 characters"] = true;
    valid = false;
  } else {
    errors["8 characters"] = false;
  }

  if (!lowercaseRegex.test(password)) {
    errors["Lower case"] = true;
    valid = false;
  } else {
    errors["Lower case"] = false;
  }

  if (!uppercaseRegex.test(password)) {
    errors["Upper case"] = true;
    valid = false;
  } else {
    errors["Upper case"] = false;
  }

  if (!digitRegex.test(password)) {
    errors["Number"] = true;
    valid = false;
  } else {
    errors["Number"] = false;
  }

  return { errors, valid, tags };
};
