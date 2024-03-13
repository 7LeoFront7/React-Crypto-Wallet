import { createContext, useEffect, useState } from 'react'
import { getDataAllCoins, getMyWallet } from '../api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
	wallet: [],
	crypto: [],
	loading: false
})

export function CryptoContextProvider({ children }) {

	const [loading, setLoading] = useState(false)
	const [crypto, setCrypto] = useState([])
	const [wallet, setWallet] = useState([])

	useEffect(() => {
		async function preload() {
			setLoading(true)
			const { result } = await getDataAllCoins()
			const myWallet = await getMyWallet()
			setCrypto(result)
			setWallet(myWallet.map((myCoin) => {

				const coin = result.find((c) => c.id === myCoin.coin)

				return {
					grow: myCoin.price < coin.price,
					growPercent: percentDifference(myCoin.price, coin.price),
					totalAmout: myCoin.amount * coin.price,
					totalProfit: myCoin.amount * coin.price - myCoin.amount * myCoin.price,
					...myCoin
				}
			}))
			setLoading(false)
		}
		preload()
		setInterval(async () => {
			const { result } = await getDataAllCoins()
			const myWallet = await getMyWallet()
			setCrypto(result)
			setWallet(myWallet.map((myCoin) => {

				const coin = result.find((c) => c.id === myCoin.coin)

				return {
					grow: myCoin.price < coin.price,
					growPercent: percentDifference(myCoin.price, coin.price),
					totalAmout: myCoin.amount * coin.price,
					totalProfit: myCoin.amount * coin.price - myCoin.amount * myCoin.price,
					...myCoin
				}
			}))
		}, 2000)
	}, [])
	return <CryptoContext.Provider value={{ wallet, loading, crypto }}>{children}</CryptoContext.Provider>
}

export default CryptoContext