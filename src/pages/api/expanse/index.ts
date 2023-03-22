import { create, list } from '@/api/controllers/ExpansesController';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			return list(req, res);
		case 'POST':
			return create(req, res);
		default:
			return res.status(501).end('Rota não implementada');
	}
}
