// Pesquisa Linear
// https://en.wikipedia.org/wiki/Linear_search

package main

import "fmt"

func linearSearch(array []int, query int) int {
	for i, item := range array {
		if item == query {
			return i
		}
	}
	return -1
}

func main() {

	fmt.Println("Pesquisa Linear:")
	array := []int{0, 2, 4, 6, 8, 10, 12, 14, 16, 18}
	index := linearSearch(array, 10)
	if index == -1 {
		fmt.Println("Número Não Encontrado")
	} else {
		fmt.Println("Index: ", index)
		fmt.Println("array[", index, "] = ", array[index])
	}
}
