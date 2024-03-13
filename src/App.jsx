
import { Layout } from 'antd'
import AppContent from './components/layout/AppContent'
import AppHeader from './components/layout/AppHeader'
import AppSider from './components/layout/AppSider'
import { CryptoContextProvider } from './context/crypto-context'




const App = () => (

  <CryptoContextProvider>
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  </CryptoContextProvider>




)
export default App
