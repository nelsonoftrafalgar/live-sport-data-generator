import './styles.css'

import { useEffect, useState } from 'react'

import { Game } from './types'
import { Games } from './Games'
import { Summary } from './Summary'
import { analyzeGames } from './utils'
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
	const [games, setGames] = useState<Game[]>([])

	useEffect(() => {
		const timeout = setTimeout(() => {
			const updatedGames = analyzeGames(games)
			setGames(updatedGames)
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [games])

	return (
		<div className='wrapper'>
			<Games games={games} />
			<Summary summary={summary} />
		</div>
	)
}
