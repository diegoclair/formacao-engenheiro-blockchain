// Topological Sort
// https://en.wikipedia.org/wiki/Topological_sorting

package main

import (
	"fmt"
)

type Dependency struct {
	nodeId   int
	children []int
}

// Converte dependências em bordas (edges)
func dependenciesToEdges(dependencies []Dependency) []Edge {
	edges := []Edge{}
	for _, node := range dependencies {
		for _, child := range node.children {
			edges = append(edges, Edge{start: node.nodeId, end: child})
		}
	}
	return edges
}

type Edge struct {
	start int // início e fim são ids de nó
	end   int
}

type Node struct {
	id       int
	children []int
	selected bool
	incoming int
}

// Obtém uma lista de arestas como entrada com os node_ids inicial e final
// útil para casos como ordenação de tarefas
func topologicalSort(input []Edge) ([]int, [][]int) {

	// Gerar um mapeamento para node_id e número de arestas de entrada
	incoming := make(map[int]int)
	for _, edge := range input {
		if _, ok := incoming[edge.start]; !ok {
			incoming[edge.start] = 0
		}
		incoming[edge.end] += 1
	}

	nodes := make([]*Node, 0)
	for k, v := range incoming {
		chdn := []int{}
		for _, edge := range input {
			if edge.start == k {
				chdn = append(chdn, edge.end)
			}
		}
		nodes = append(nodes, &Node{id: k, children: chdn, selected: false, incoming: v})
	}

	res := []int{}
	var levels [][]int
	for len(res) < len(nodes) {
		level := []int{}
		queue := []int{}
		for idx, node := range nodes {
			// Selecione um nó sem dependência de entrada
			if !node.selected && node.incoming == 0 {
				queue = append(queue, idx)
				nodes[idx].selected = true
			}
		}
		for _, idx := range queue {
			node := nodes[idx]
			level = append(level, node.id)
			// Diminuir os valores de entrada para todas os nós filhos
			for _, childId := range node.children {
				for _, child := range nodes {
					if !child.selected && child.id == childId {
						child.incoming--
					}
				}
			}
		}
		res = append(res, level...)
		levels = append(levels, level)
	}
	return res, levels
}

func main() {
	var edges []Edge
	edges = append(edges, Edge{1, 2})
	edges = append(edges, Edge{2, 3})
	edges = append(edges, Edge{4, 3})
	edges = append(edges, Edge{4, 5})
	edges = append(edges, Edge{3, 6})
	edges = append(edges, Edge{5, 6})

	order, levels := topologicalSort(edges)
	fmt.Println("Resultado: ", order)
	fmt.Println("Níveis: ", levels)

	// Ou você pode especificar dependências
	var deps []Dependency
	deps = append(deps, Dependency{nodeId: 1, children: []int{2}})
	deps = append(deps, Dependency{nodeId: 2, children: []int{3}})
	deps = append(deps, Dependency{nodeId: 4, children: []int{3, 5}})
	deps = append(deps, Dependency{nodeId: 5, children: []int{6}})
	deps = append(deps, Dependency{nodeId: 3, children: []int{6}})

	edges = dependenciesToEdges(deps)
	order, levels = topologicalSort(edges)
	fmt.Println("Resultado: ", order)
	fmt.Println("Níveis: ", levels)

}
