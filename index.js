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
- [GET] /mensagens/{id} - Retorna apenas uma única mensagem pelo ID
- [POST] /mensagens - Cria uma nova mensagem
- [PUT] /mensagens - Atualiza uma mensagem pelo ID 
- [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID
*/


// Listas de objetos
const mensagens = [
    {
    "id": 1,
    "texto": "Essa é a primeira mensagem",
    },
    {
        "id": 2,
        "Texto": "Está é minha segunda mensagem"
    }
];

const getMensagensValidas = () => mensagens.filter(Boolean);

const getMensagemById = id => getMensagensValidas().find(msg => msg.id === id);

// - [GET] / mensagens - retorna a lista de mensagens
app.get('/mensagens', (req, res) => {
    res.send(getMensagensValidas());
});
 
//  - [GET] /mensagens/{id} - Retorna apenas uma única mensagem pelo ID
app.get('/mensagens/:id', (req, res) => {
    const id = +req.params.id;

    const mensagem = getMensagemById(id);

    if(!mensagem){
        res.send('mensagem não encontrada.');

        return;
    }

    res.send(mensagem);
});

// - [POST] /mensagens - Cria uma nova mensagem
app.post('/mensagem', (req, res) => {
    const mensagem = req.body;

    if(!mensagem || !mensagem.texto){
        res.send('mensagem invalida');

        return;
    }

    mensagem.id = mensagens.length + 1;
    mensagens.push(mensagem);

    res.send(mensagem);
});

//- [PUT] /mensagens - Atualiza uma mensagem pelo ID 
app.put('/mensagem/:id', (req, res) => {
    const id = +req.params.id;

    const mensagem = mensagens.find(msg => msg.id === id);

    const novoTexto = req.body.texto;

    if(!novoTexto) {
        res.send('Mensagem inválida.');
    }
    mensagem.texto = novoTexto;

    res.send(mensagem);
});

// - [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID
app.delete('/mensagem/:id', (req, res) => {
    const id = +req.params.id;

    const mensagem = getMensagemById(id);

    if(!mensagem){
        res.send('Mensagem não encontrada.');

        return;
    }

    const index = mensagens.indexOf(mensagem);

    delete mensagens[index];

    res.send('Menasagem removida com sucesso.');
})


app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}`);
});