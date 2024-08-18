import { Request, Response } from 'express';
import User from '../models/user';
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = await User.findByPk(userId);

  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = await User.findByPk(userId);

  if (user) {
    await user.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

