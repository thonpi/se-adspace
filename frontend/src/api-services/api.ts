import { env } from "../utils/env";

export type UserRoles = "ADMIN" | "USER";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  roles: UserRoles[];
  isDesigner: boolean;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const register = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string
) => {
  const res = await fetch(`${env.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, password, firstName, lastName }),
  });
  return res.json();
};

export const login = async (phoneNumber: string, password: string) => {
  const res = await fetch(`${env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, password }),
  });
  return res.json();
};

export const logout = async (accessToken: string) => {
  const res = await fetch(`${env.API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
};
