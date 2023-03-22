import { get, remove, update } from '@/api/controllers/ExpansesController';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			return get(req, res);
		case 'DELETE':
			return remove(req, res);
		case 'PUT':
			return update(req, res);
		default:
			return res.status(501).end('Rota não implementada');
	}
}
