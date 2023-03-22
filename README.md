# Gerenciador de finanças
Projeto criado com o objetivo de implementar o conceito de listas duplamente encadeadas.

Clique [aqui](https://expanses-manager.vercel.app/) para testar.

## Sobre a API
Contruída com as API routes nativas do NextJs, a API que é responsável por toda a manipulação da lista duplamente encadeada. 

A lista consiste numa classe `DoublyLinkedList` que possui os métodos para *`adicionar` um novo nó ou `obter`, `atualizar` ou `remover` os dados de um nó existente*.

```ts
import { v4 as uuidv4 } from 'uuid';

export interface Data {
	id: string;
	title: string;
	value: number;
	data: string;
	type: 'expanse' | 'input';
}

interface NodeData extends Data {
	id: string;
}

class Node {
	public data: NodeData | null;
	public prev: Node | null;
	public next: Node | null;

	constructor(
		data: NodeData | null = null,
		prev: Node | null = null,
		next: Node | null = null
	) {
		this.data = data;
		this.prev = prev;
		this.next = next;
	}
}

export default class DoublyLinkedList {
	public head: Node | null;
	public tail: Node | null;

	constructor() {
		this.head = null;
		this.tail = null;
	}

	public add(data: Data): Data | null {
		const new_node = new Node({ ...data, id: uuidv4() });

		if (this.head === null) {
			this.head = new_node;
			this.tail = new_node;
		} else {
			new_node.prev = this.tail;
			if (this.tail) {
				this.tail.next = new_node;
			}
			this.tail = new_node;
		}

		return new_node.data;
	}

	public remove(id: string): Data | null {
		let current_node = this.head;

		while (current_node) {
			if (current_node.data?.id === id) {
				if (current_node.prev) {
					current_node.prev.next = current_node.next;
				} else {
					this.head = current_node.next;
				}
				if (current_node.next) {
					current_node.next.prev = current_node.prev;
				} else {
					this.tail = current_node.prev;
				}
				return current_node.data;
			}
			current_node = current_node.next;
		}

		return null;
	}

	public get_item(id: string): NodeData | null {
		let current_node = this.head;

		while (current_node) {
			if (current_node.data?.id === id) {
				return current_node.data;
			}

			current_node = current_node.next;
		}

		return null;
	}

	public update(
		id: string,
		data: {
			title?: string;
			value?: number;
			data?: string;
			type?: 'expanse' | 'input';
		} | null = null
	): NodeData | null {
		let current_node = this.head;

		while (current_node) {
			if (current_node.data?.id === id) {
				current_node.data = { ...current_node.data, ...data };

				return current_node.data;
			}

			current_node = current_node.next;
		}

		return null;
	}
}



```

A API possui as rotas:
- `GET /expanse` - retorna a listagem de todos os nós da lista além da contágem de despesas e entradas e o saldo da carteira do usuário com base nesses dados.
- `GET /expanse/[id]` - retorna os dados de um único nó da lista correspondente ao *id* passado.
- `POST /expanse` - cria um novo nó. Os dados que precisam ser passados pelo *body* da requisição são: `title: string`, `value: number`, `date: string`, `type: 'expanse' | 'input'`.
- `PUT /expanse/[id]`- atualização dos dados do nó com o *id* correspondente ao passado pela rota. Os dados que precisam ser passados pelo *body* da requisição são os mesmos da rota de criação com a diferença que nem todos os campos precisam ser informados. Apenas aqueles que forem informados serão atualizados.
- `DELETE /expanse/[id]`- remoção do nó com o *id* correspondente ao passado pela rota.

Cada rota possui um controller responsável por manipular os dados recebidos e chamar o método necessário da lista assim como realizar todas as operações necessárias para retornar os dados para o usuário.

## Sobre o Front-end
Inicialmente, o Front-end do projeto foi construído usando ReactJS, porém, por ser mais fácil gerênciar a o front-end e a API no mesmo projeto, foi migrado para o Next.js. Devido a essa mudança, a implementação do Server-Side Rendering (SSR) ficará para uma próxima atualização. Atualmente, as requisições ainda estão sendo feitas utilizando o [Axios](https://axios-http.com/ptbr/docs/intro).

Em relação ao estilo, está sendo utilizada a biblioteca [TailwindCSS](https://tailwindcss.com/) e para os ícones,está sendo utilizada a biblioteca [Phosphor React](https://github.com/phosphor-icons/react).

![image](https://user-images.githubusercontent.com/82323559/226903953-560c64a8-2f59-4d53-98c4-9c1271d104d9.png)
![image](https://user-images.githubusercontent.com/82323559/226903997-98feb479-2b08-4260-bca0-f60c6619944b.png)

Devido ao tempo de entrega do projeto, a função de editar um item da lista não foi implementada ainda. Contudo, se você fizer uma requisição para a rota com os dados necessários essa atualização já está sendo feita.

## 
*Copyright (c) 2023 [Jaiane Oliveira](https://github.com/JaianeOliveira) - v1.0.0, 22-03-2023*
