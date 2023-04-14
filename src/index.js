const app = require('./config/app');
const ClientController = require('./controllers/client-controller');

const clientController = new ClientController();

// Lista todos os clientes
app.get('/', clientController.list);

// Cria um novo cliente
app.post('/', clientController.add);

// Lista um cliente específico
app.get('/:id', clientController.getClient, clientController.get);

// Atualiza um cliente
app.put('/:id', clientController.getClient, clientController.update);

// Remove um cliente
app.delete('/:id', clientController.getClient, clientController.remove);

module.exports = app;

