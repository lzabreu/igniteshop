export function formatNumber(number:number) {
	
 return (
 Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(number)

 )
}