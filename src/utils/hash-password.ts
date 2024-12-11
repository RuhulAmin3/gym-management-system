import bcrypt from "bcrypt";

export const hashPassword = (text: string) => {
  return bcrypt.hashSync(text, 10);
};

export const comparePassword = (text: string, password: string) => {
  return bcrypt.compareSync(text, password);
};
