// Password generator

/* 

O nome crand é um apelido para "crypto/rand". Se você observar mais a abaixo no código, você verá uma chamada crand.Reader(), usando o apelido. 
A chamada crand.Reader() apenas lê os dados e gera valores randômicos (como se estivesse embaralhando os caracteres, no caso da geração de senha).

Sobre o _ (underline) ele é chamado de "blank identifier", sendo usado para armazenar todos os retornos de uma função em Go (igualzinho em Python). 
O "blank identifier" pode ser atribuído ou declarado com qualquer valor de qualquer tipo, com o valor descartado sem causar danos. 
É um pouco como escrever no arquivo /dev/null no Linux/Unix. 
Ele representa um valor somente de gravação para ser usado como um marcador de lugar (placeholder) onde uma variável é necessária, mas o valor real é irrelevante. 
Se não usarmos, não teríamos onde guardar o retorno de funções e o compilador iria reclamar. Aqui tem mais detalhes: https://golang.org/doc/effective_go.html#blank

Já o []byte é uma forma de representar strings e seria a mesma coisa que usar uma struct, tal como:

type slice struct {
    data uintptr
    len int
    cap int
}

Aqui tem mais alguns exemplos: https://syslog.ravelin.com/byte-vs-string-in-go-d645b67ca7ff

*/

package main

import (
    // O nome crand é um apelido para "crypto/rand"
	crand "crypto/rand"
	"fmt"
	"io"
	"math/rand"
	"time"
)

func generatePassword(minLength int, maxLength int) string {
	var chars = []byte("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+,.?/:;{}[]`~")

	var length = rand.Intn(maxLength-minLength) + minLength

	newPassword := make([]byte, length)
	randomData := make([]byte, length+(length/4))
	clen := byte(len(chars))
	maxrb := byte(256 - (256 % len(chars)))
	i := 0
	for {
		if _, err := io.ReadFull(crand.Reader, randomData); err != nil {
			panic(err)
		}
		for _, c := range randomData {
			if c >= maxrb {
				continue
			}
			newPassword[i] = chars[c%clen]
			i++
			if i == length {
				return string(newPassword)
			}
		}
	}
}

func main() {
	rand.Seed(time.Now().Unix())

	fmt.Print("Por favor, informe o comprimento mínimo: ")
	var minLength int
	fmt.Scanf("%d", &minLength)

	fmt.Print("Por favor, informe o comprimento máximo: ")
	var maxLength int
	fmt.Scanf("%d", &maxLength)

	fmt.Printf("Esta é a sua senha gerada por este programa em Go: %v\n", generatePassword(minLength, maxLength))
}
