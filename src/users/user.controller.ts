import { Response, Request } from 'express';
import UserService from './user.service';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { nome, imageFileName } = req.body;
      const user = await UserService.createUser(nome, imageFileName);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async addCagada(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { descricao } = req.body;
      const user = await UserService.addCagada(userId, descricao);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserCagadas(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const cagadas = await UserService.getUserCagadas(userId);
      res.status(200).json(cagadas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
