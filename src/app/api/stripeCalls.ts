import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ProductType } from '@/types/ProductType'

export async function getData() {
	const response = await stripe.products.list({
		expand: ['data.default_price'],
	})

	const data = response.data.map((product) => {
		const price = product.default_price as Stripe.Price

		return {
			id: product.id,
			name: product.name,
			image: product.images[0],
			url: product.url,
			price: price.unit_amount! / 100,
			priceId: price.id,
			description: product.description,
			quantity: 0,
		}
	})

	return data
}

// export async function getProductById(id: string) {
// 	const product = await stripe.products.retrieve(id, {
// 		expand: ['default_price'],
// 	})

// 	const price = product.default_price as Stripe.Price

// 	return {
// 		id: product.id,
// 		name: product.name,
// 		image: product.images[0],
// 		url: product.url,
// 		price: price.unit_amount! / 100,
// 		priceId: price.id,
// 		description: product.description,
// 	}
// }

export async function checkout(cartItems: ProductType[]) {
	const successUrl =
		'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}'
	const cancelUrl = 'http://localhost:3000/cancel'

	const checkoutSession = await stripe.checkout.sessions.create({
		success_url: successUrl,
		cancel_url: cancelUrl,
		mode: 'payment',
		line_items: cartItems.map((product) => ({
			price: product.priceId as string,
			quantity: product.quantity || 1,
		})),
	})
	console.log(checkoutSession)

	return checkoutSession
}

export async function success(sessionId: string) {
	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items', 'line_items.data.price.product', 'line_items.data'],
	})

	const customerName = session.customer_details?.name

	let qtd: number = 0
	const totalItems = session.line_items?.data.map((item) => {
		qtd = item.quantity!
		return qtd
	})
	console.log(totalItems!)
	console.log(totalItems![1])
	console.log(totalItems?.length)

	const quantity = totalItems!.reduce((acumulador, item) => {
		return acumulador + item
	}, 0)

	const productsImages = session.line_items?.data.map((item) => {
		const product = item.price?.product as Stripe.Product
		return product.images[0]
	})
	//const product = session.line_items?.data[0].price?.product as Stripe.Product

	return {
		customerName,
		productsImages,
		totalItems,
		quantity,
	}
}
