'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { useCart } from '@/hooks/useCart'
import { formatNumber } from '@/utils/formatNumber'
import { Header } from '@/components/Header'

export default function ProductDetail() {
	const router = useRouter()
	const { productsList, addToCart, checkItemExists } = useCart()
	const params = useParams()
	const product = productsList.filter((product) => product.id === params.id)
	const [isSending, setIsSending] = useState(false)
	const priceBR = formatNumber(Number(product[0]?.price))

	function handleAddToCart() {
		const exists = checkItemExists(product[0].id)
		if (!exists) {
			setIsSending(true)
			addToCart(product[0])
			setIsSending(false)
			router.replace('/')
			//window.location.href = '/'
		} else {
			alert('Produto já adicionado')
		}
	}

	return (
		<main className='flex items-start justify-center gap-16 mx-32 my-auto h-[35rem]'>
			<header className='fixed top-0 left-0 right-0 z-10 bg-Grayscale/Background'>
				<Header />
			</header>
			<div className='flex items-center justify-center h-full overflow-hidden rounded-lg bg-backGradient'>
				<Image
					priority={true}
					src={product[0].image}
					alt='Logotipo'
					width={520}
					height={480}
					className='object-cover'
				/>
			</div>
			<div className='flex flex-col w-[35rem] justify-between h-full pt-8'>
				<div className='flex flex-col '>
					<p className='mb-4 text-3xl bold text-Grayscale/Title'>
						{product[0].name}
					</p>
					<p className='mb-10 text-3xl text-Brand/Light'>{priceBR}</p>
					<p className='text-lg bold text-Grayscale/Text'>
						{product[0].description}
					</p>
				</div>
				<button
					disabled={isSending}
					onClick={handleAddToCart}
					className='p-5 text-lg font-bold rounded-lg cursor-pointer bg-Brand/Principal text-Grayscale/White hover:bg-Brand/Light disabled:opacity-50 disabled:hover:cursor-not-allowed'
				>
					Colocar na sacola
				</button>
			</div>
		</main>
	)
}
