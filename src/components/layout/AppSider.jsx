import { ArrowDownOutlined, ArrowUpOutlined, LoadingOutlined } from '@ant-design/icons'
import { Card, Layout, List, Spin, Statistic, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { getDataAllCoins, getMyWallet } from '../../api'
import { capitalize, percentDifference } from '../../utils'


export default function AppHeader() {

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
	}, [])


	return (


		<Layout.Sider width="25%" style={{ padding: '1rem', backgroundColor: '#efefef' }}>


			<Spin style={{ display: loading ? 'block' : 'none', transition: 'all .3s', justifyContent: 'center', marginTop: '5rem' }}
				indicator={<LoadingOutlined style={{ fontSize: 75, color: '#fff' }} spin />} />

			{wallet.map((myCoin) => (
				<Card key={myCoin.coin} style={{ marginBottom: '1rem', boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' }}>
					<Statistic title={capitalize(myCoin.coin)}
						value={myCoin.totalAmout}
						precision={2}
						valueStyle={{ color: myCoin.grow ? '#3f8600' : '#cf1322' }}
						prefix={myCoin.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix="$" />
					<List
						size="small"
						dataSource={[
							{ title: 'Total Profit', value: myCoin.totalProfit, isTag: true },
							{ title: 'Asset Amount', value: myCoin.amount, isPlain: true }
						]}
						renderItem={(item) => (
							<List.Item>

								<span>{item.title}</span>

								<span>
									{item.isTag && <Tag color={myCoin.grow ? 'green' : 'red'}>{myCoin.growPercent}%</Tag>}
									{item.isPlain && item.value.toFixed(2)}
									{!item.isPlain && <Typography.Text type={myCoin.grow ? 'success' : 'danger'}>

										{item.value.toFixed(2)}$</Typography.Text>}</span>
							</List.Item>
						)}
					/>
				</Card>
			))}



		</Layout.Sider>


	)
}