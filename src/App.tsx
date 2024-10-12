import './styles.css'

import { useEffect, useState } from 'react'

import { Game } from './types'
import { Games } from './Games'
import { Summary } from './Summary'
import { v4 as uuidv4 } from 'uuid'

export const updateResult = (result: string): string => {
	let [teamA, teamB] = result.split('-').map(Number)

	const updateTeamA = Math.random() < 0.5
	const isUpdate = Math.random() > 0.9

	if (isUpdate) {
		if (updateTeamA) {
			teamA += 1
		} else {
			teamB += 1
		}
	}

	return `${teamA}-${teamB}`
}

export const analyzeGames = (games: Game[]) => {
	const liveGames = games.reduce((acc: Game[], game: Game) => {
		if (game.timeLeft > 0) {
			return [
				...acc,
				{
					...game,
					result: updateResult(game.result),
					timeLeft: game.timeLeft - 1
				}
			]
		}

		return acc
	}, [])

	return liveGames
}

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
