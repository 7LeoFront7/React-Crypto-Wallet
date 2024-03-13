import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useCrypto } from '../context/crypto-context'
ChartJS.register(ArcElement, Tooltip, Legend)



export default function WalletChart() {

	const { wallet } = useCrypto()
	console.log(wallet)
	const data = {
		labels: wallet.map((myCoin) => myCoin.coin),
		datasets: [
			{
				label: '$',
				data: wallet.map((myCoin) => myCoin.totalAmout),
				backgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	return (
		<div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'center', height: 400 }}>
			<Pie options={{ maintainAspectRatio: false }} data={data} />
		</div>
	)
}


