import { createContext, useContext, useEffect, useState } from 'react'
import { getDataAllCoins, getMyWallet } from '../api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
	wallet: [],
	crypto: [],
	loading: false
})



export function CryptoContextProvider({ children }) {

	function mapWallet(wallet, result) {
		return wallet.map((myCoin) => {
			const coin = result.find((c) => c.name === myCoin.coin)

			return {
				grow: myCoin.price < coin.price,
				growPercent: percentDifference(myCoin.price, coin.price),
				totalAmout: myCoin.amount * coin.price,
				totalProfit: myCoin.amount * coin.price - myCoin.amount * myCoin.price,
				...myCoin
			}
		})

	}

	const [loading, setLoading] = useState(false)
	const [crypto, setCrypto] = useState([])
	const [wallet, setWallet] = useState([])

	useEffect(() => {
		async function preload() {
			setLoading(true)
			const { result } = await getDataAllCoins()
			const myWallet = await getMyWallet()
			setWallet(mapWallet(myWallet, result))
			setCrypto(result)
			setLoading(false)
		}
		preload()
		setInterval(async () => {

			const { result } = await getDataAllCoins()
			const myWallet = await getMyWallet()
			setCrypto(result)
			setWallet(mapWallet(myWallet, result))
		}, 10000)
	}, [])

	function addCoinInWallet(newCoin) {
		setWallet(prev => mapWallet([...prev, newCoin], crypto))
	}

	return <CryptoContext.Provider value={{ wallet, loading, crypto, addCoinInWallet }}>{children}</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
	return useContext(CryptoContext)
}