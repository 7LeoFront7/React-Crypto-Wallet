import { Table } from 'antd'
import { useCrypto } from '../context/crypto-context'
const columns = [
	{
		title: 'Coin',
		dataIndex: 'coin',
		sorter: (a, b) => a.coin.length - b.coin.length,
		sortDirections: 'descend',
	},
	{
		title: 'Price, $',
		dataIndex: 'price',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.amount - b.amount,
	}
]



export default function WalletTable() {

	const { wallet } = useCrypto()

	const data = wallet.map(c => ({
		key: c.coin,
		coin: c.coin,
		price: c.price,
		amount: c.amount
	}))

	return (
		<>
			<Table pagination={false} columns={columns} dataSource={data} />
		</>
	)
}
