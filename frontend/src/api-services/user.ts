import { env } from "../utils/env";

export const getUsers = async (token: string) => {
  console.log('token be: ', token);
  try {
    const res = await fetch(`${env.API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    
    

    return res.json();
  } catch (error) {
    console.log('User ', error);
  }
};