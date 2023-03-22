import { Api } from '@/services/Axios';
import { formatCurrency } from '@/utils/FormatCurrency';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ModalProps {
	isOpen: boolean;
	onCancel?: () => void;
	onOk?: () => void;
}

interface FormData {
	title: string;
	date: string;
	value: string;
	type: 'input' | 'expanse';
}

function Modal({ isOpen, onCancel = () => {}, onOk = () => {} }: ModalProps) {
	const formInitialValues: FormData = {
		title: '',
		date: '',
		value: '',
		type: 'expanse',
	};
	const [form, setForm] = useState<FormData>(formInitialValues);
	const [fieldsWithErrors, setFieldsWithErrors] = useState<string[]>([]);

	const onFormChange = (field: string, value: string) => {
		if (field === 'value') {
			setForm((prev) => ({ ...prev, [field]: formatCurrency(value) }));
		} else {
			setForm((prev) => ({ ...prev, [field]: value }));
		}
	};

	const validateForm = (form: FormData) => {
		setFieldsWithErrors([]);
		let fields = [];

		if (!form.title.length) {
			fields.push('title');
		}
		if (!form.date) {
			fields.push('date');
		}
		if (!form.type) {
			fields.push('type');
		}
		if (!form.value) {
			fields.push('value');
		}

		setFieldsWithErrors(fields);

		return !fields.length;
	};

	const onConfirm = async () => {
		if (validateForm(form)) {
			try {
				await Api.post('/expanse', {
					title: form.title,
					date: form.date,
					type: form.type,
					value: parseFloat(
						form.value.replace('R$', '').replace('.', '').replace(',', '.')
					),
				});
				toast.success('Adicionado com sucesso');
				setForm(formInitialValues);
				onOk();
			} catch (error) {
				console.log(error);
				toast.error('Ocorreu um erro');
			}
		} else {
			toast.error(
				'Os campos do formulário precisam ser devidamente preeenchidos'
			);
		}
	};

	const onCancelHandler = () => {
		setForm(formInitialValues);
		setFieldsWithErrors([]);
		onCancel();
	};

	return (
		<>
			{isOpen && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity">
							<div className="absolute inset-0 bg-slate-900 opacity-75"></div>
						</div>
						<div className="inline-block align-bottom bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="p-6">
								<h2 className="text-xl font-bold mb-4">
									Adicionar entrada/despesa
								</h2>
								<form className="flex flex-col gap-2">
									<div className="flex justify-between gap-4">
										<div className="col-span-6 sm:col-span-3 w-full">
											<label
												htmlFor="title"
												className="block text-sm font-medium leading-6 text-slate-300"
											>
												Titulo
											</label>
											<input
												type="text"
												name="title"
												placeholder="Ex.: Conta de energia"
												id="title"
												value={form.title}
												onChange={(e) =>
													onFormChange(e.target.name, e.target.value)
												}
												className="mt-1 border border-slate-300 block w-full rounded-md text-slate-300 px-2 py-1 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-violet-400 outline-none"
											/>
										</div>
										<div className="col-span-6 sm:col-span-3 w-[30%]">
											<label className="block text-sm font-medium leading-6 text-slate-300">
												Data
											</label>
											<input
												name="date"
												value={form.date}
												onChange={(e) =>
													onFormChange(e.target.name, e.target.value)
												}
												type="date"
												className="mt-1 border border-slate-300 block w-full rounded-md text-slate-300 px-2 py-1 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-violet-400 outline-none"
											/>
										</div>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label className="block text-sm font-medium leading-6 text-slate-300">
											Valor
										</label>
										<input
											name="value"
											value={form.value}
											placeholder="R$ 0,00"
											onChange={(e) =>
												onFormChange(e.target.name, e.target.value)
											}
											type="text"
											className="mt-1 border border-slate-300 block w-full rounded-md text-slate-300 px-2 py-1 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:border-violet-400 outline-none"
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label className="block text-sm font-medium leading-6 text-slate-300 mb-1   ">
											Tipo
										</label>
										<div className="flex gap-4">
											<div className="flex items-center">
												<input
													id="input"
													name="input"
													type="radio"
													checked={form.type === 'input'}
													onChange={(e) => {
														onFormChange('type', e.target.name);
													}}
													className="h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-600 hover:ring-violet-600"
												/>
												<label
													htmlFor="input"
													className="block text-sm font-medium leading-6 pl-2 text-slate-300"
												>
													Entrada
												</label>
											</div>
											<div className="flex items-center">
												<input
													id="expanse"
													name="expanse"
													checked={form.type === 'expanse'}
													type="radio"
													onChange={(e) => {
														onFormChange('type', e.target.name);
													}}
													className="h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-600 hover:ring-violet-600"
												/>
												<label
													htmlFor="expanse"
													className="block text-sm font-medium leading-6 pl-2 text-slate-300"
												>
													Saída
												</label>
											</div>
										</div>
									</div>
								</form>

								<div className="flex gap-2 justify-end mt-2">
									<button
										className="border border-rose-500 hover:border-rose-700 text-rose-500 font-medium py-2 px-4 rounded-full transition-all"
										onClick={onCancelHandler}
									>
										Cancelar
									</button>
									<button
										className="bg-violet-500 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-full transition-all"
										onClick={onConfirm}
									>
										Salvar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Modal;
