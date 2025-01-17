import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import db from "../../../db/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [user] = await db("users").insert({ name, email, password: hashedPassword }).returning("*");
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ message: "Usuário já existe" });
  }
}
