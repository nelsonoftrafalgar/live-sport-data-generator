import { GamesProps } from './types'

export const Games = ({ games }: GamesProps) => {
	return (
		<div>
			<h2>Live Games</h2>

			<table className='table'>
				<thead>
					<tr className='row'>
						<th className='header'>Team A</th>
						<th className='header'>Team B</th>
						<th className='header'>Result</th>
						<th className='header'>Time left</th>
					</tr>
				</thead>
				<tbody>
					{games.map(({ id, teamA, teamB, result, timeLeft }) => {
						return (
							<tr key={id} className='row'>
								<td className='data'>{teamA}</td>
								<td className='data'>{teamB}</td>
								<td className='data'>{result}</td>
								<td className='data'>{timeLeft}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
