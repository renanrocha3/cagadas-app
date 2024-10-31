import mongoose from 'mongoose';
import cagadaSchema from './cagada.model';

const { Schema, model } = mongoose;

// Define o schema para o documento User
const userSchema = new Schema({
  nome: { type: String, required: true, trim: true },
  imageFileName: { type: String, required: false, trim: true },
  cagada: [cagadaSchema] // Array de subdocumentos Cagada
});

const UserModel = model('User', userSchema);

export default UserModel;
