import UserModel from './models/user.model';

class UserService {
  async createUser(nome: string, imageFileName: string) {
    const user = new UserModel({ nome, imageFileName, cagada: [] });
    return user.save();
  }

  async addCagada(userId: string, descricao: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    user.cagada.push({ descricao });
    return user.save();
  }

  async getUserCagadas(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user.cagada;
  }

  async getAllUsers() {
    return UserModel.find();
  }
}

export default new UserService();
