import { Router } from 'express';
import UserController from './users/user.controller';

const routes = Router();

routes.post('/users', UserController.createUser);
routes.post('/users/:userId/cagada', UserController.addCagada);
routes.get('/users/:userId/cagadas', UserController.getUserCagadas);
routes.get('/users', UserController.getAllUsers);

export default routes;