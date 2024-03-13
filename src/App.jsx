
import { Layout } from 'antd'
import AppContent from './components/layout/AppContent'
import AppHeader from './components/layout/AppHeader'
import AppSider from './components/layout/AppSider'




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
