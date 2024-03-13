import { Layout } from 'antd'

const headerStyle = {
	width: '100%',
	textAlign: 'center',
	color: '#fff',
	height: 60,
	padding: '1rem',
	background: '#e8ba00',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center'
}

export default function AppHeader() {
	return <Layout.Header style={headerStyle}>
		<p>LeoFront</p>

	</Layout.Header>
}