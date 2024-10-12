import { SummaryProps } from './types'

export const Summary = ({ summary }: SummaryProps) => {
	return (
		<div>
			<h2>Summary</h2>

			<table className='table'>
				<thead>
					<tr className='row'>
						<th className='header'>Team A</th>
						<th className='header'>Team B</th>
						<th className='header'>Result</th>
					</tr>
				</thead>
				<tbody>
					{summary.map(({ id, teamA, teamB, result }) => {
						return (
							<tr key={id} className='row'>
								<td className='data'>{teamA}</td>
								<td className='data'>{teamB}</td>
								<td className='data'>{result}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
