import { success } from '@/api/stripeCalls'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'

export default async function Success({ searchParams }: any) {
	const sessionId = searchParams.session_id
	const session = success(sessionId)
	const [sessionDetail] = await Promise.all([session])

	return (
		<div className='flex flex-col items-center justify-center w-screen'>
			<div className='relative ml-10 flex w-full items-center justify-center'>
				{sessionDetail &&
					sessionDetail.productsImages?.map((image: any, index) => (
						<div className='relative -ml-10'>
							<span className='flex text-lg items-center justify-center absolute -top-4 right-[80px] z-10 text-Grayscale/Title p-2 w-8 h-8 bg-Brand/Principal rounded-[50%] shadow-md shadow-Grayscale/Background'>
								{sessionDetail.totalItems![index]}
							</span>
							<Image
								key={image.id}
								priority={true}
								src={image}
								alt='Logotipo'
								width={140}
								height={140}
								className='relative  object-cover mb-8 rounded-full bg-backGradient overflow-hidden shadow-lg shadow-Grayscale/Elements'
							/>
						</div>
					))}
			</div>
			<p className='mb-16 text-3xl font-bold text-Grayscale/Title'>
				Compra Efetuada
			</p>
			<p className='mx-auto mb-20 w-[36rem] text-2xl text-Grayscale/Text text-center'>
				Uhuu! <strong>{sessionDetail.customerName}</strong>, sua compra de{' '}
				{sessionDetail.quantity} camisetas já está a caminho de sua casa.
			</p>
			<Link href='/' className='text-xl font-bold text-Brand/Light'>
				Voltar ao catálogo
			</Link>
		</div>
	)
}
