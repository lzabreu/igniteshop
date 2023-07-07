import { useCart } from '@/hooks/useCart'
import { ProductType } from '@/types/ProductType'
import { formatNumber } from '@/utils/formatNumber'
import Image from 'next/image'
import { Minus, Plus } from 'phosphor-react'

interface CartProps {
	product: ProductType
}

export function CartDetail({ product }: CartProps) {
	const { removeCartItem, changeItemQuantity } = useCart()

	function handleRemoveFromCart() {
		removeCartItem(product.id)
	}

	function handleQuantityPlus() {
		if (product.quantity !== null && product.quantity >= 0) {
			changeItemQuantity(product.id, product.quantity + 1)
		}
	}
	function handleQuantityMinus() {
		if (product.quantity !== null && product.quantity > 1) {
			changeItemQuantity(product.id, product.quantity - 1)
		}
	}

	const priceBR = formatNumber(Number(product?.price))
	return (
		<main className='flex gap-6 items-center justify-between'>
			<div className='flex gap-4'>
				<div className='flex items-center justify-center overflow-hidden rounded-lg bg-backGradient'>
					<Image
						priority={true}
						src={product.image}
						alt={product.description ? product.description : ''}
						width={100}
						height={93}
						className='object-cover'
					/>
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-col '>
						<p className='mb-2 text-lg  text-Grayscale/Text'>{product.name}</p>
						<p className='mb-2 text-lg font-bold text-Grayscale/Title'>
							{priceBR}
						</p>
					</div>
					<p
						onClick={handleRemoveFromCart}
						className='text-base font-bold text-Brand/Principal hover:text-Brand/Light cursor-pointer'
					>
						Remover
					</p>
				</div>
			</div>
			<div className='flex gap-2 '>
				<button
					onClick={handleQuantityMinus}
					className='text-xl rounded-md px-2 font-bold bg-Brand/Principal text-Grayscale/Title  hover:bg-Brand/Light'
				>
					<Minus size={20} />
				</button>
				<span className='w-8 text-center text-xl font-bold text-Grayscale/Title'>
					{product.quantity}
				</span>
				<button
					onClick={handleQuantityPlus}
					className='text-xl rounded-md px-2 font-bold bg-Brand/Principal text-Grayscale/Title hover:bg-Brand/Light'
				>
					<Plus size={20} />
				</button>
			</div>
		</main>
	)
}
