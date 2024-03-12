import { Layout } from 'antd'

const headerStyle = {
	textAlign: 'center',
	color: '#fff',
	height: 60,
	paddingInline: 48,
	lineHeight: '64px',
	backgroundColor: '#fff',
}

export default function AppHeader() {
	return <Layout.Header style={headerStyle}>
		<p>LeoFront</p>

	</Layout.Header>
}