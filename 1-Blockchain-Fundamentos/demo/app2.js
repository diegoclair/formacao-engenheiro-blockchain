/* Usando API BlockExplorer Para Buscar Dados na Blockchain */

// Carregando o módulo blockexplorer
const be = require('blockexplorer');

// Função para obter dados de um bloco
function getBlock() {
  	// Obtendo os dados do bloco 552062
    be.block('0000000000000000001068b21b0d4614abcde178bf7f0e59a014da3faafff957')
         .then((result) => {console.log(result)})
         .catch((err) => {throw err})
}

// Chamada a função
getBlock()