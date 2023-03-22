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
