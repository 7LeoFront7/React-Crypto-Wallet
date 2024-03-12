import axios from 'axios'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'ZQBMplllM8PR1NBHUbp4n6Z9OmPpdzPzKWupTiqAKCY='
  }
}
export async function getDataAllCoins() {
  const { data } = await axios.get('https://openapiv1.coinstats.app/coins', options)
  return data
}

export async function getMyWallet() {
  const { data } = await axios.get('https://c4213a96d52cd6ca.mokky.dev/coins')
  return data
}