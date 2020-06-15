
//exercicio 3
var jogoVelha = "#";
var espaco = ' ';
var size = 20;
var condicao = false;
var impressao = '';
let result = 0;
let i = 0;

for (let i = 1; i <= size; i++, impressao += '\n') {
    for (let j = 0; j < size; j++) {
        impressao += (i+j) % 2 ? ' ' : '#';      
        /*
        (i+j) % 2 ele vai verificar se (i+j) / 2 é verdadeiro, para isso, se puder dividir exatamente (%) ele considera verdadeiro
        por exemplo, 2 eu posso dividir por 2, o 3 não... o 4 eu posso dividir por 2, o 5 não
        //os numeros impares voce até pode dividir por 2, mas ele seria um numero quebrado e qundo é quebrado, ele retorna falso 
        */
    };
}

console.log(impressao);

//exercicio 1
/* let triangulo = jogoVelha;

for (let index = 1; index < 8; index++) {
    console.log(triangulo);
    triangulo += jogoVelha;
} */


//exercicio 2
/* for (let i = 1; i <= 100; i++) {
    result = i / 3;
    if (Number.isInteger(result)) {
        result = i / 5;
        if (Number.isInteger(result)) {
            console.log("Fizz");
        }else{
            console.log("FizzBuzz");
        }        
    } else{
        result = i / 5;
        if (Number.isInteger(result)) {
            console.log("Buzz");
        } else{
            console.log(i);
        }        
    }
} */
