import { success } from '@/api/stripeCalls'
import Link from 'next/link'
import Image from 'next/image'

export default async function Success({searchParams}: any) {
	
	const sessionId = searchParams.session_id
	const session = success(sessionId)
	const [sessionDetail] = await Promise.all([session])

	return (
		<div className='flex flex-col items-center justify-center'>
			<p className='mb-16 text-3xl font-bold text-Grayscale/Title'>Compra Efetuada</p>
			<div className='flex items-center justify-center mb-8 overflow-hidden rounded-lg bg-backGradient'>
				<Image
					priority={true}
					src={sessionDetail.image}
					alt='Logotipo'
					width={127}
					height={145}
					className='object-cover'
				/>
			</div>

			<p className='mx-auto mb-20 w-[36rem] text-2xl text-Grayscale/Text text-center'>
				Uhuul <strong>{sessionDetail.customerName}</strong>, sua Camiseta <strong>{sessionDetail.product.name}</strong> já está a caminho
				da sua casa.
			</p>
			<Link href='/' className='text-xl font-bold text-Brand/Light'>
				Voltar ao catálogo
			</Link>
		</div>
	)
}
