import { Button, DatePicker, Divider, Flex, Form, InputNumber, Result, Select, Space, Typography } from 'antd'
import axios from 'axios'
import { useRef, useState } from 'react'
import { useCrypto } from '../context/crypto-context'

export default function AddCoinForm({ onClose }) {
	const [form] = Form.useForm()
	const [coin, setCoin] = useState(null)
	const [submitted, setSubmitted] = useState(false)
	const { crypto, loading, addCoinInWallet } = useCrypto()

	const walletRef = useRef()



	if (submitted) {
		return (
			<Result
				status="success"
				title="New Coin Added"
				subTitle={`added ${walletRef.current.amount} of ${coin.name} by price ${walletRef.current.price}$`}
				extra={[
					<Button type="primary" key="console" onClick={onClose}>
						Go Back
					</Button>,

				]}
			/>
		)
	}


	if (!coin) {
		return (<Select
			style={{ width: '100%' }}
			loading={loading}
			onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
			placeholder='Select coin'
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
		)
	}

	const onFinish = async (values) => {

		const newCoinWallet = {
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date(),
			coin: coin.name
		}
		walletRef.current = newCoinWallet

		await axios.post('https://c4213a96d52cd6ca.mokky.dev/coins', newCoinWallet)

		setSubmitted(true)
		addCoinInWallet(newCoinWallet)
	}

	function handlerAmoutChange(value) {
		const price = form.getFieldValue('price')
		form.setFieldsValue({
			total: +(value * price).toFixed(3)
		})
	}

	function handlerPriceChange(value) {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(value * amount).toFixed(3)
		})
	}


	return (
		<>
			<Flex align='center'>
				<img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
				<Typography.Title style={{ margin: 0 }} level={2}>({coin.symbol}) {coin.name}</Typography.Title>
			</Flex>
			<Divider />
			<Form
				form={form}
				name="basic"
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 10,
				}}
				style={{
					maxWidth: 600,
				}}
				initialValues={{
					price: +coin.price.toFixed(3),
				}}
				onFinish={onFinish}
			>
				<Form.Item
					label="Amount"
					name="amount"
					rules={[
						{
							required: true,
							min: 0.0001,
							type: 'number',
							message: 'Please input your amount',
						},
					]}
				>
					<InputNumber placeholder='Enter coin amount' onChange={handlerAmoutChange}
						style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					label="Price"
					name="price"
				>
					<InputNumber onChange={handlerPriceChange} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					label="Date & Time"
					name="date"
				>
					<DatePicker showTime />
				</Form.Item>

				<Form.Item
					label="Total"
					name="total"
				>
					<InputNumber style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add Coin
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
