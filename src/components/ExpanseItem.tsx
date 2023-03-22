import { TrashSimple } from 'phosphor-react';

interface ExpanseItemProps {
	id: string;
	title: string;
	date: string;
	value: number;
	type: 'input' | 'expanse';
	onDelete: (id: string) => void;
}

const ExpanseItem = ({
	id,
	title,
	date,
	value,
	type,
	onDelete,
}: ExpanseItemProps) => {
	return (
		<div className="w-full flex rounded-md bg-slate-850 shadow-lg px-8 py-4 min-h-[96px] justify-between items-center">
			<div
				className={`${
					type === 'input' ? 'bg-emerald-400' : 'bg-rose-500'
				} w-2 h-2 rounded-full `}
			/>
			<h3 className="w-[45%] text-slate-300 font-medium ">{title}</h3>
			<p className="w-[20%] text-end text-slate-500">
				{new Date(date).toLocaleString('pt-BR', {
					day: '2-digit',
					month: 'short',
					year: 'numeric',
				})}
			</p>
			<p
				className={`w-[20%] text-end font-medium ${
					type === 'input' ? 'text-emerald-400' : 'text-rose-500'
				}`}
			>
				{value?.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</p>
			<div className="flex items-center gap-4 w-[8%] justify-end ">
				<button onClick={onDelete.bind(null, id)}>
					<TrashSimple size={24} className="text-slate-500" weight="bold" />
				</button>
			</div>
		</div>
	);
};

export default ExpanseItem;
