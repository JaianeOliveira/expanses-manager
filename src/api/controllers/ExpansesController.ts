import { NextApiRequest, NextApiResponse } from 'next';
import DoublyLinkedList, { Data } from '../classes/DoublyLinkedList';

const linkedList = new DoublyLinkedList();

export const list = (req: NextApiRequest, res: NextApiResponse) => {
	const items = [];
	let expanses = 0;
	let inputs = 0;
	let current_node = linkedList.head;

	while (current_node?.data) {
		items.push(current_node.data);

		switch (current_node.data?.type) {
			case 'expanse':
				expanses += current_node.data.value;
				break;
			case 'input':
				inputs += current_node.data.value;
				break;
			default:
				break;
		}
		current_node = current_node.next;
	}
	return res.json({ items, expanses, inputs, total: inputs - expanses });
};

export const get = (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query as { id: string };
	const { body } = req;
	const updated_item = linkedList.update(id, body);

	if (!updated_item) {
		return res.status(404).end('Item não encontrado');
	}

	return res.json({ message: '', data: updated_item });
};

export const create = (req: NextApiRequest, res: NextApiResponse) => {
	const { body } = req as {
		body: Data;
	};
	if (!body) {
		return res.status(400).end('Nenhum dado informado');
	}

	const data = linkedList.add(body);
	return res.json({ message: 'Item adicionado', data });
};

export const remove = (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query as { id: string };
	const data = linkedList.remove(id);

	if (!data) {
		return res.status(404).end('Item não encontrado');
	}

	return res.json({ message: 'Item removido', data });
};

export const update = (req: NextApiRequest, res: NextApiResponse) => {
	const { body } = req;
	const { id } = req.query as { id: string };

	const data = linkedList.update(id, body);

	if (!data) {
		return res.status(404).end('Item não encontrado');
	}

	return res.json({ message: 'Item atualizado', data });
};
