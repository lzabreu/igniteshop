'use client'
import Link from 'next/link'
import { Product } from '@/components/Product'
import { useCart } from './hooks/useCart'

export default function Home() {
	const { productsList } = useCart()

	return (
		<div className='h-screen '>
			<div className='flex gap-8 pl-32 carousel'>
				{productsList.map((product) => (
					<Link
						key={product.id}
						href={`/product_detail/${product.id}`}
						className='flex items-center justify-center carousel-item'
					>
						<Product product={product} />
					</Link>
				))}
			</div>
		</div>
	)
}
