'use client'
import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import { Handbag } from 'phosphor-react'
import { useCart } from '@/hooks/useCart'

export function Header() {
	const {totalItems} = useCart()
	return (
		<div className='flex items-center justify-between mt-10 mb-8 ml-32 mr-28'>
			<Image src={Logo} alt='Logotipo' width={130} />
			<div className='relative'>
				<div className='p-3 rounded-md text-Grayscale/Text bg-Grayscale/Elements'>
					<Handbag size={24} weight='bold' />
				</div>
				<span className='absolute top-0 right-0 flex items-center justify-center translate-x-1/2 -translate-y-1/2 border-2 rounded-full w-7 h-7 bg-Brand/Principal text-Grayscale/White border-Grayscale/Background'>
					{totalItems}
				</span>
			</div>
		</div>
	)
}
