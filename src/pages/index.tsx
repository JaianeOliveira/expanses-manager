import ExpanseItem from '@/components/ExpanseItem';
import Modal from '@/components/Modal';
import Resume from '@/components/Resume';
import { Api } from '@/services/Axios';
import {
	ArrowFatLinesDown,
	ArrowFatLinesUp,
	Plus,
	Wallet,
} from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export type Item = {
	id: string;
	title: string;
	value: number;
	date: string;
	type: 'expanse' | 'input';
};

type GetItemsResponse = {
	items: Item[];
	expanses: number;
	inputs: number;
	total: number;
};

const Home = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [{ expanses, inputs, items, total }, setData] =
		useState<GetItemsResponse>({
			items: [],
			expanses: 0,
			inputs: 0,
			total: 0,
		});

	const fetchItems = useCallback(async () => {
		try {
			const response = await Api.get<GetItemsResponse>('/expanse');
			const { items, expanses, inputs, total } = response.data;
			setData({ items, total, expanses, inputs });
		} catch (error) {
			console.log(error);
			toast.error('Ocorreu um erro');
		}
	}, []);

	const handleDeleteItem = useCallback(
		async (id: string) => {
			try {
				await Api.delete(`/expanse/${id}`);
				toast.success('Deletado com sucesso');
			} catch (error) {
				console.log(error);
				toast.error('Ocorreu um erro');
			} finally {
				await fetchItems();
			}
		},
		[fetchItems]
	);

	const handleModalOk = useCallback(async () => {
		await fetchItems();
		setModalVisible(false);
	}, [fetchItems]);

	useEffect(() => {
		fetchItems();
	}, [modalVisible, fetchItems]);

	return (
		<div className="bg-slate-800 min-h-[100vh] w-full px-[8vw] py-[8vh] flex flex-col gap-6">
			<ToastContainer
				autoClose={2000}
				hideProgressBar
				theme="dark"
				closeOnClick
				toastStyle={{
					background: '#242F42',
				}}
			/>

			<Modal
				isOpen={modalVisible}
				onCancel={() => setModalVisible(false)}
				onOk={handleModalOk}
			/>

			<div className="flex items-start justify-between">
				<h1 className="text-2xl font-semibold text-slate-100">
					Controle de gastos
				</h1>
				<button
					className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition-all px-4 py-2 rounded-full text-sm font-semibold"
					onClick={() => setModalVisible(true)}
				>
					<Plus weight="bold" />
					<span>Novo</span>
				</button>
			</div>
			<section className="flex align-center justify-between gap-4 mb-2">
				<Resume
					title="Entradas"
					value={inputs}
					icon={<ArrowFatLinesDown size={32} className="text-emerald-400" />}
				/>
				<Resume
					title="Saídas"
					value={expanses}
					icon={<ArrowFatLinesUp size={32} className="text-rose-500" />}
				/>
				<Resume
					title="Saldo"
					value={total}
					icon={
						<Wallet
							size={32}
							className={`${
								total > 0
									? 'text-emerald-400'
									: total && total < 0
									? 'text-rose-500'
									: 'text-slate-200'
							}`}
						/>
					}
				/>
			</section>
			<section className="flex flex-col gap-4 max-h-[60vh] overflow-y-scroll scrollbar">
				{items?.length ? (
					items?.map((item) => (
						<ExpanseItem key={item.id} {...item} onDelete={handleDeleteItem} />
					))
				) : (
					<p className="text-sm italic text-slate-500">
						Nenhuma despesa ou entrada cadastrada
					</p>
				)}
			</section>
		</div>
	);
};

export default Home;
