'use client'
import Image from 'next/image'
import { ProductType } from '@/types/ProductType'
import { formatNumber } from '@/utils/formatNumber'
import { Handbag } from 'phosphor-react'

interface ProductProps {
	product: ProductType
}

export function Product({ product }: ProductProps) {
	const priceBR = formatNumber(Number(product.price))

	return (
		<div className='relative flex flex-col bg-backGradient w-[35rem] rounded-lg overflow-hidden group'>
			<div className='flex items-center justify-center'>
				<Image
					priority={true}
					src={product.image}
					alt='Logotipo'
					width={520}
					height={520}
					className='object-cover transition-all duration-300 group-hover:scale-90 group-hover:-translate-y-[1rem]'
				/>
			</div>
			<footer className='flex align-items-center justify-between gap-2 opacity-100 m-1 bg-[#202024] p-6 rounded-md group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
				<div className='flex flex-col'>
					<p className='mb-1 text-base bold text-Grayscale/Title'>
						{product.name}
					</p>
					<span className='text-2xl font-bold text-Brand/Light'>{priceBR}</span>
				</div>
				<button className='flex items-center justify-center rounded-md cursor-pointer  w-14 h-14 bg-Brand/Principal text-Grayscale/White hover:bg-Brand/Light'>
					<Handbag size={32} weight='bold' />
				</button>
			</footer>
		</div>
	)
}
