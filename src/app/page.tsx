'use client'
import Link from 'next/link'
import { Product } from '@/components/Product'
import { useCart } from './hooks/useCart'
import { Header } from './components/Header'

export default function Home() {
	const { productsList, cartItems } = useCart()

	return (
		<div className='h-screen '>
			<header className='fixed top-0 left-0 right-0 z-10'>
						<Header />
					</header>
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
