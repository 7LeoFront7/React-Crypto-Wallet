
import { Layout } from 'antd'
import AppContent from './components/layout/AppContent'
import AppHeader from './components/layout/AppHeader'
import AppSider from './components/layout/AppSider'
import { CryptoContextProvider } from './context/crypto-context'




function App() {


  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
        <Layout >
          <AppSider className='siderPC' />
          <AppContent />
        </Layout>
        {/* <AppSider className='siderMob' /> */}
      </Layout>
    </CryptoContextProvider>
  )
}









export default App
