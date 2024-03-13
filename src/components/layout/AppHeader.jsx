import { Button, Drawer, Layout, Modal, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useCrypto } from '../../context/crypto-context'
import AddCoinForm from '../AddCoinForm'
import CoinInfoModal from '../CoinInfoModal'

const headerStyle = {
	width: '100%',
	textAlign: 'center',
	color: '#fff',
	height: 60,
	padding: '1rem',
	background: '#fff',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center'
}


export default function AppHeader() {
	const [drawer, setDrawer] = useState(false)
	const [select, setSelect] = useState(false)
	const { crypto, loading } = useCrypto()
	const [modal, setModal] = useState(false)
	const [coin, setCoin] = useState(null)



	useEffect(() => {
		const keypress = (event) => {

			if (event.key == '/') {
				setSelect((prev) => !prev)
			}
		}
		document.addEventListener('keypress', keypress)
		return () => document.removeEventListener('keypress', keypress)
	}, [])

	const showDrawer = () => {
		setDrawer((prev) => !prev)
	}

	const onClose = () => {
		setDrawer((prev) => !prev)
	}

	function handleSelect(value) {
		setModal(true)
		setCoin(crypto.find(c => c.id === value))
	}

	return <Layout.Header style={headerStyle}>
		<Select
			loading={loading}
			style={{
				width: 250,
			}}
			open={select}
			onClick={() => setSelect((prev) => !prev)}
			onSelect={handleSelect}
			value='press / to open'
			options={crypto.map((coin) => ({
				label: coin.name,
				value: coin.id,
				icon: coin.icon
			}))}
			optionRender={(option) => (
				<Space >
					<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
						<img style={{ width: 20 }} src={option.data.icon} /> {option.data.label}
					</div>

				</Space>
			)}
		/>
		<Button onClick={showDrawer} type='primary'>Add Coin</Button>

		<Modal footer={null} open={modal} onCancel={() => setModal(false)}>
			<CoinInfoModal coin={coin} />
		</Modal>

		<Drawer title="add Coin in Wallet" width={600} onClose={onClose} open={drawer}>
			<AddCoinForm />
		</Drawer>
	</Layout.Header>
}