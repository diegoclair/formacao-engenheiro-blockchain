// Projeto - Pig Dice Game

/*

Regras do Jogo

- O jogo tem 2 jogadores, jogando em rodadas.
- Em cada rodada, um jogador joga um dado quantas vezes quiser. Cada resultado é adicionado à sua pontuação.
- Mas, se o jogador obtiver o valor 1 ao jogar o dado, toda a sua pontuação será perdida naquela rodada. Depois disso, é a vez do próximo jogador.
- O jogador pode optar por 'Passar a vez', o que significa que sua pontuação atual é adicionada à sua pontuação global. Depois disso, é a vez do próximo jogador.
- O primeiro jogador a atingir 100 pontos na pontuação global vence o jogo.

*/

var scores, roundScore, activePlayer, dice, totalScore;

init(); //para inciar as variáveis a deixar o jogo limpo para o próximo jogo.


document.querySelector('.dice').style.display = 'none'; //tirar a imagem do dado na tela
currentScore = document.querySelector('#current-' + activePlayer).textContent;


//Jogar o dado
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    // 1 - Randon Number
    var dice = Math.floor((Math.random() * 6) + 1)

    // 2 - Show number dice
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';                //torna a imagem visivel
    diceDOM.src = 'dice-' + dice + '.png';          //seleciona a imagem de acordo com o numero randomico

    // Atualiza a pontuação da rodada SE o numero rolado NÃO for 1
    if (dice !== 1) {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }else{        
        nextPlayer();
        }
    }

);

//Passar a vez
document.querySelector('.btn-hold').addEventListener('click', function () {

    //Pontuação atual + score da rodada
    scores[activePlayer] += roundScore;

    //Atualiza a UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    

    //Verifica se somando a pontuação atual, se o jogador venceu
    if (scores[activePlayer] >= 10 ) {
        document.getElementById('name-' + activePlayer).textContent = 'Vencedor !!'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.btn-roll').style.display= 'none';
        document.querySelector('.btn-hold').style.display= 'none';

    } else {
        nextPlayer();
    }

});

//Novo jogo
document.querySelector('.btn-new').addEventListener('click', function () {
    init();
})


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  //função troca player

    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


function init() {
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.btn-roll').style.display= 'block';
    document.querySelector('.btn-hold').style.display= 'block';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.getElementById('name-0').textContent = 'JOGADOR 1'
    document.getElementById('name-1').textContent = 'JOGADOR 2'
    document.querySelector('.player-0-panel').classList.add('active')
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

}



