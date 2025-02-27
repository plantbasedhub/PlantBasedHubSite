import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
}
