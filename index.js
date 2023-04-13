const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.send("Hello, World!");
});

/* 
Lista de Endpoints da aplicacação
CRUD: Create, Read (Single & All), Update and Delete
CRUD: Criar, Ler (Individual e Tudo), Update And DELETE
- [GET] /mensagens - Retorna a lista de mensagens
- [GET] /mensagens/{id} - REtorna apenas uma única mensagem pelo ID
- [POST] /mensagens - Cria uma nova mensagem
- [PUT] /mensagens - Atualiza uma mensagem pelo ID 
- [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID
*/

const mensagens = [
    "Essa é a primeira mensagem",
    "Essa é a segunda mensagem"
];

// - [GET] / mensagens - retorna a lista de mensagens
app.get('/mensagens', (req, res) => {
    res.send(mensagens);
});
 
//  - [GET] /mensagens/{id} - Retorna apenas uma única mensagem pelo ID
app.get('/mensagens/:id', (req, res) => {
    const id = req.params.id;
    const mensagem = mensagens[id];
});

// - [POST] /mensagens - Cria uma nova mensagem
app.post('/mensagens', (req, res) => {
    const mensagem = req.body.mensagem;

    mensagens.push(mensagem);

    res.send(`mensagem criada com sucesso: '${mensagem}'.`);
});

//- [PUT] /mensagens - Atualiza uma mensagem pelo ID 
app.put('/mensagens/:id', (req, res) => {
    const id = req.params.id - 1;

    const mensagem = req.body.mensagem;

    mensagens[id] = mensagem;

    res.send(`Mensagem atualizada com sucesso: ${mensagem}.`);
});

app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`);
});