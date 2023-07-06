import Stripe from 'stripe'

const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET as string

export const stripe = new Stripe(secretKey,{
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop',
  }
})