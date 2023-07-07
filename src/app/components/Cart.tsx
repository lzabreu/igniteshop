import { useCart } from '@/hooks/useCart'
import { CartDetail } from './CartDetail'
import { formatNumber } from '@/utils/formatNumber'
import { checkout } from '@/api/stripeCalls'

export function Cart() {
	async function handleCheckout() {
		try {
			const checkoutUrl = await checkout(cartItems)
			const checkUrl = checkoutUrl.url as string
			if (checkUrl) {
				window.location.href = checkUrl
			}
		} catch (error) {
			alert(' Não foi possível realizar o pagamento')
		}
	}
	const { cartItems, cartTotal, totalItems } = useCart()
	return (
		<div className='flex flex-col justify-between h-screen bg-Grayscale/Elements px-12 shadow-2xl shadow-Grayscale/Elements'>
			<div>
				<h1 className='text-xl text-Grayscale/Title mt-16 mb-8'>
					Sacola de compras
				</h1>
				{cartItems &&
					cartItems.map((item) => (
						<div
							key={item.id}
							className='flex flex-col text-Grayscale/Text mb-6'
						>
							<CartDetail product={item} />
						</div>
					))}
			</div>
			<div>
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between text-Grayscale/Text mb-1'>
						<span>Quantidade</span>
						<span>{totalItems}</span>
					</div>
					<div className='flex justify-between text-Grayscale/Text text-lg font-bold mb-16'>
						<span>Valor total</span>
						<span className='text-Grayscale/Title text-2xl'>
							{formatNumber(Number(cartTotal))}
						</span>
					</div>
				</div>
				<button
					onClick={handleCheckout}
					className='mb-12 w-full py-5 text-lg font-bold rounded-lg cursor-pointer bg-Brand/Principal text-Grayscale/White hover:bg-Brand/Light'
				>
					Finalizar compra
				</button>
			</div>
		</div>
	)
}
