
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
	changeItemQuantity: (productId: string, quantity: number) => void
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
		return total + product.price * product.quantity!
	}, 0)
	const totalItems = cartItems.reduce((total, product) => {
		return total + product.quantity!
	}, 0)

	const addToCart = useCallback(
		(product: ProductType) => {
			product.quantity = 1
			setCartItems((state) => [...state, product])
		},
		[cartItems]
	)

	const removeCartItem = useCallback(
		(productId: string) => {
			setCartItems((state) => state.filter((item) => item.id !== productId))
		},
		[cartItems]
	)

	function checkItemExists(productId: string) {
		return cartItems.some((product) => product.id === productId)
	}

	const changeItemQuantity = useCallback(
		(productId: string, quantity: number) => {
			const newCart = cartItems.map((product) => {
				if (product.id === productId && product.quantity !== null) {
					product.quantity = quantity
				}
				return product
			})
			if (newCart.length > 0) {
				setCartItems(newCart)
			}
		},
		[cartItems]
	)

	return (
		<CartContext.Provider
			value={{
				cartItems,
				productsList,
				addToCart,
				getProducts,
				removeCartItem,
				checkItemExists,
				changeItemQuantity,
				cartTotal,
				totalItems,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
