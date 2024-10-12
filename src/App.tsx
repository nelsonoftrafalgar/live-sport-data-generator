import './styles.css'

import { Games } from './Games'
import { Summary } from './Summary'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const App = () => {
	const [summary, setSummary] = useState([
		{
			id: uuidv4(),
			teamA: 'France',
			teamB: 'Sweden',
			result: '1-0'
		},
		{
			id: uuidv4(),
			teamA: 'France',
			teamB: 'Sweden',
			result: '1-0'
		}
	])
	const [games, setGames] = useState([
		{
			id: uuidv4(),
			teamA: 'France',
			teamB: 'Sweden',
			result: '1-1',
			timeLeft: 40
		},
		{
			id: uuidv4(),
			teamA: 'Spain',
			teamB: 'Norway',
			result: '1-1',
			timeLeft: 40
		},
		{
			id: uuidv4(),
			teamA: 'Poland',
			teamB: 'Germany',
			result: '1-1',
			timeLeft: 40
		}
	])

	return (
		<div className='wrapper'>
			<Games games={games} />
			<Summary summary={summary} />
		</div>
	)
}
