import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import '@/globals.css'
import { CartContextProvider } from '../contexts/CartContext'
import Image from 'next/image'
import Logotipo from '@/assets/Logotipo.svg'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
})

export const metadata = {
	title: 'Ignite Shop',
	description: 'Generated by create next app',
}
export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<CartContextProvider>
			<div
				className={`${roboto.className} h-screen w-screen bg-Grayscale/Background flex flex-col items-center`}
			>
				<Image src={Logotipo} alt='Logotipo' width={130} className='mb-24' />
				<div>{children}</div>
			</div>
		</CartContextProvider>
	)
}
