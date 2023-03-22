import { ReactNode } from 'react';

interface ResumeProps {
	title: string;
	value: number;
	icon: ReactNode;
}

const Resume = ({ title, value, icon }: ResumeProps) => {
	return (
		<div className="bg-slate-850 text-slate-300 w-full flex gap-2 justify-between rounded-md shadow-lg p-4 ">
			<div className="flex flex-col justify-center">
				<h2 className="font-semibold text-slate-200">{title}</h2>
				<p className="text-slate-300">
					{value.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</p>
			</div>
			<div className="flex items-center justify-end h-full">{icon}</div>
		</div>
	);
};

export default Resume;
