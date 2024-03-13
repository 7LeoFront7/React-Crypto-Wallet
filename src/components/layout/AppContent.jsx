import { Layout, Typography } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import WalletChart from '../WalletChart'
import WalletTable from '../WalletTable'

const contentStyle = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 60px)',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#1b1b1b'

}

export default function AppHeader() {
	const { wallet, crypto } = useCrypto()

	const cryptoPriceMap = crypto.reduce((acc, c) => {
		acc[c.name] = c.price
		return acc
	}, {})


	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title style={{ textAlign: 'right', color: '#fff', padding: '1rem' }} level={3}>wallet: {wallet.map(myCoin => {

				return myCoin.amount * cryptoPriceMap[myCoin.coin]
			}).reduce((acc, v) => acc += v, 0).toFixed(2)}$
			</Typography.Title>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100vh - 60px)' }}>
				<WalletChart />
				<WalletTable />
			</div>

		</Layout.Content>
	)
}