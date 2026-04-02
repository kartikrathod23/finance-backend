export type RegisterInput = {
  email: string;
  password: string;
  role: "ADMIN" | "ANALYST" | "VIEWER";
};

export type LoginInput = {
  email: string;
  password: string;
};