import { Layout } from 'antd'

const headerStyle = {
	textAlign: 'center',
	color: '#fff',
	height: 60,
	paddingInline: 48,
	lineHeight: '64px',
	backgroundColor: '#fff',
	boxShadow: '5px 5px 12px 5px #333'
}

export default function AppHeader() {
	return <Layout.Header style={headerStyle}>
		<p>LeoFront</p>

	</Layout.Header>
}