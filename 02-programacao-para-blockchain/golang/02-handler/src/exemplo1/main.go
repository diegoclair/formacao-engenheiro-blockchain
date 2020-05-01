// Usando http.Handle para tratar conexões em aplicações web

package main

import (
	"fmt"
	"net/http"
)

// O handler é uma struct
type myHandler struct {
	boasvindas string
}

// Função para tratar o handler
func (mh myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(fmt.Sprintf("%v world", mh.boasvindas)))
}

func main() {
	// Registrando o handler
	http.Handle("/", &myHandler{boasvindas: "Hello"})

	// Iniciando a app e ouvindo na porta 8000
	http.ListenAndServe(":8000", nil)
}
