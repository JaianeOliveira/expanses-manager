export function formatCurrency(value: string) {
	const formattedValue = value
		.replace(/\D/g, '')
		.replace(/(\d)(\d{2})$/, '$1,$2');
	return `R$ ${formattedValue.replace(/(?=(\d{3})+(\D))\B/g, '.')}`;
}
