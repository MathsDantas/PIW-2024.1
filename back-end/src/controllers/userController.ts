import { Request, Response } from 'express';
import { User } from '../models/user';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

// Função auxiliar para ler dados do arquivo JSON
const readData = (): User[] => {
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(jsonData) as User[];
};

// Função auxiliar para escrever dados no arquivo JSON
const writeData = (data: User[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getUsers = (req: Request, res: Response) => {
  const users = readData();
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const users = readData();
  const newUser: User = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body
  };
  users.push(newUser);
  writeData(users);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const users = readData();
  const userIndex = users.findIndex(user => user.id === +req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;
  writeData(users);
  res.json(updatedUser);
};

export const deleteUser = (req: Request, res: Response) => {
  let users = readData();
  const userIndex = users.findIndex(user => user.id === +req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users = users.filter(user => user.id !== +req.params.id);
  writeData(users);
  res.status(204).send();
};
