//Carrega o módulo http
const http = require('http');

//Defionimos um web server a partir do pacote http
const server = http.createServer((req, res) => {
    res.end("Hello World\n");
});

//Criamos o serviço web server
server.listen(4040, () =>{
    console.log('O servidor foi iniciado na porta 4040');
})