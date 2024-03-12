import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Layout, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { getDataAllCoins, getMyWallet } from '../api'
const siderStyle = {
	padding: '1rem',
	backgroundColor: '#162b3f'
}

export default function AppHeader() {

	const [loading, setLoading] = useState(false)
	const [crypto, setCrypto] = useState([])
	const [wallet, setWallet] = useState([])

	useEffect(() => {
		async function preload() {
			setLoading(true)
			const allCoins = await getDataAllCoins()
			const myWallet = await getMyWallet()

			setCrypto(allCoins)
			setWallet(myWallet)
			setLoading(false)
		}
		preload()
	}, [])


	return (
		<Layout.Sider width="25%" style={siderStyle}>
			<Card style={{ marginBottom: '1rem' }}>
				<Statistic title="Active"
					value={11.28}
					precision={2}
					valueStyle={{ color: '#3f8600' }}
					prefix={<ArrowUpOutlined />}
					suffix="%" />
				{/* <List
					size="small"
					dataSource={wallet}
					renderItem={(item) => <List.Item>{item}</List.Item>}
				/> */}
			</Card>
			<Card>
				<Statistic
					title="Idle"
					value={9.3}
					precision={2}
					valueStyle={{ color: '#cf1322' }}
					prefix={<ArrowDownOutlined />}
					suffix="%"
				/>
			</Card>
		</Layout.Sider>
	)
}