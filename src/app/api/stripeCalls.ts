import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

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
			priceId:price.id,
			description: product.description
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

export async function checkout(priceId: string) {
	console.log(priceId)

	//const priceId = req.body.priceId as string
	const successUrl =
		'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}'
	const cancelUrl = 'http://localhost:3000/cancel'

	const checkoutSession = await stripe.checkout.sessions.create({
		success_url: successUrl,
		cancel_url: cancelUrl,
		mode: 'payment',
		line_items: [
			{
				price: priceId as string,
				quantity: 1,
			},
		],
	})
	return checkoutSession
}

export async function success(sessionId: string) {
	const session = await stripe.checkout.sessions.retrieve(
		'cs_test_a1D2ZxTVtLU0s9S0QIKmpVryPYoGaWJ2xSCy00kY9EpLNQyjODWDc2igbS',
		{
			expand: ['line_items', 'line_items.data.price.product'],
		}
	)

	const product = session.line_items?.data[0].price?.product as Stripe.Product

	return {
		customerName: session.customer_details?.name,
		image: product.images[0],
		product: product as Stripe.Product,
	}
}
