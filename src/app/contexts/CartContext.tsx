'use client'

import { getData } from '@/api/stripeCalls'
import { ProductType } from '@/types/ProductType'
import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react'

interface CartContextData {
	productsList: ProductType[]
	cartItems: ProductType[]
	cartTotal: number
	totalItems: number
	addToCart: (product: ProductType) => void
	removeCartItem: (productId: string) => void
	checkItemExists: (productId: string) => boolean
	getProducts: () => Promise<void>
}

interface CartContextProviderProps {
	children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
	const [cartItems, setCartItems] = useState<ProductType[]>([])
	const [productsList, setProductsList] = useState<ProductType[]>([])

	const getProducts = useCallback(async () => {
		const products = await getData()
		const [productList] = await Promise.all([products])

		setProductsList(productList)
	}, [])

	useEffect(() => {
		getProducts()
	}, [getProducts])

	const cartTotal = cartItems.reduce((total, product) => {
		return total + product.price
	}, 0)

	const totalItems = cartItems.length
console.log(totalItems)

	function addToCart(product: ProductType) {
		setCartItems((state) => [...state, product])
	}

	function removeCartItem(productId: string) {
		setCartItems((state) => state.filter((item) => item.id !== productId))
	}

	function checkItemExists(productId: string) {
		return cartItems.some((product) => product.id === productId)
	}

	return (
		<CartContext.Provider
			value={{
				cartItems,
				productsList,
				addToCart,
				getProducts,
				removeCartItem,
				cartTotal,
				totalItems,
				checkItemExists,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
