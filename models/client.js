const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
  logradouro: { type: String, required: true },
  numero: { type: String, required: true },
  complemento: { type: String },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  cep: { type: String, required: true },
  latitude: { type: String },
  longitude: { type: String }
});

const ClientSchema = new Schema({
  cnpj: { type: String, required: true },
  razaoSocial: { type: String, required: true },
  nomeContato: { type: String, required: true },
  telefone: { type: String, required: true },
  enderecos: [AddressSchema]
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
