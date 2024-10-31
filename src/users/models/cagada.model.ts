import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define o schema para o subdocumento Cagada
const cagadaSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  descricao: { type: String, required: true }
});

export default cagadaSchema;
