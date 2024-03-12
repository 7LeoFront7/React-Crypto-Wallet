import { Layout } from 'antd'

const contentStyle = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 60px)',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#162b3f',
}

export default function AppHeader() {
	return <Layout.Content style={contentStyle}>Content</Layout.Content>
}