const client = require('../models/client');
const Client = require('../models/client');

class ClientController {
  async list (req, res) {
    try {
      const clients = await Client.find();
      res.json(clients);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async get (req, res) {
    res.json(res.client);
  }

  async getClient (req, res, next) {
    let client;
    try {
      client = await Client.findById(req.params.id);
      if (client == null) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.client = client;
    next();
  }

  async add (req, res) {
    const client = new Client({
      cnpj: req.body.cnpj,
      razaoSocial: req.body.razaoSocial,
      nomeContato: req.body.nomeContato,
      telefone: req.body.telefone,
      enderecos: req.body.enderecos
    });

    try {
      const newClient = await client.save();
      res.status(201).json(newClient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async update (req, res) {
    if (req.body.cnpj != null) {
      res.client.cnpj = req.body.cnpj;
    }
    if (req.body.razaoSocial != null) {
      res.client.razaoSocial = req.body.razaoSocial;
    }
    if (req.body.nomeContato != null) {
      res.client.nomeContato = req.body.nomeContato;
    }
    if (req.body.telefone != null) {
      res.client.telefone = req.body.telefone;
    }
    if (req.body.enderecos != null) {
      res.client.enderecos = req.body.enderecos;
    }
    try {
      const updatedClient = await res.client.save();
      res.json(updatedClient);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async remove (req, res) {
    try {
      await client.findByIdAndRemove(req.params.id);
      res.json({ message: 'Cliente removido com sucesso!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ClientController;

