'use client'
import { useState } from 'react'
import Image from 'next/image'
import Logotipo from '@/assets/logo.svg'
import { Handbag, X } from 'phosphor-react'
import { useCart } from '@/hooks/useCart'
import { Cart } from './Cart'

export function Header() {
	const [visible, setVisible] = useState(true)
	function pushCart() {
		if (visible) {
			setVisible(false)
		} else {
			setVisible(true)
		}
	}
	const { totalItems } = useCart()
	return (
		<div className='relative flex flex-col'>
			<div className='flex sticky items-center justify-between mt-10 mb-8 ml-32 mr-28 z-10'>
				<Image src={Logotipo} alt='Logotipo' width={130} />
				<div className='relative'>
					<div
						onClick={pushCart}
						className='p-3 rounded-md text-Grayscale/Text bg-Grayscale/Elements'
					>
						<Handbag size={24} weight='bold' />
					</div>
					<span className='absolute top-0 right-0 flex items-center justify-center translate-x-1/2 -translate-y-1/2 border-2 rounded-full w-7 h-7 bg-Brand/Principal text-Grayscale/White border-Grayscale/Background'>
						{totalItems}
					</span>
				</div>
			</div>

			<div hidden={visible} className='absolute z-50 top-0 right-0 bg-Grayscale/Elements transition-all duration-200'>
				<div className='relative flex flex-col'>
					<div className='absolute top-6 right-6'>
						<X
							size={24}
							weight='bold'
							className='text-Grayscale/Title'
							onClick={pushCart}
						/>
					</div>
					<Cart />
				</div>
			</div>
		</div>
	)
}
