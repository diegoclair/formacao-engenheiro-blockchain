/* Usando API BlockExplorer Para Buscar Dados na Blockchain */

// Carregando o módulo blockexplorer
const be = require('blockexplorer');

// Função para obter dados de um bloco
function getBlock() {
  	// Obtendo o hash do bloco 552062
    be.blockIndex(552062)
         .then((result) => {console.log(result)})
         .catch((err) => {throw err})
}

// Chamada a função
getBlock()