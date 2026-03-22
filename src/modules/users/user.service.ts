import db from "../../db/db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { CreateUserDTO, User, SafeUser } from "./user.types";

export const createUser = async (
  data: CreateUserDTO
): Promise<SafeUser> => {
  const hashed = await bcrypt.hash(data.password, 10);

  const insertedUsers = await db<User>("users")
    .insert({
      id: uuidv4(),
      name: data.name,
      email: data.email,
      password_hash: hashed,
      role: data.role,
    })
    .returning("*");

  const user = insertedUsers[0];

  if (!user) {
    throw new Error("User creation failed");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  };
};

export const findByEmail = async (
  email: string
): Promise<User | undefined> => {
  return db<User>("users").where({ email }).first();
};