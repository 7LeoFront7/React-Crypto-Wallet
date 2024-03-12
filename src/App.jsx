
import { Layout } from 'antd'
import AppContent from './components/AppContent'
import AppHeader from './components/AppHeader'
import AppSider from './components/AppSider'




const App = () => (



  <Layout>
    <AppHeader />
    <Layout>
      <AppSider />
      <AppContent />
    </Layout>
  </Layout>


)
export default App
