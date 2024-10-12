import { Game, Summary } from './types'
import { analyzeGames, updateSummary } from './utils'
import { useEffect, useState } from 'react'

export const useScoreBoard = () => {
	const [summary, setSummary] = useState<Summary[]>([])
	const [games, setGames] = useState<Game[]>([])

	useEffect(() => {
		const timeout = setTimeout(() => {
			const { updatedGames, finishedGame } = analyzeGames(games)
			if (finishedGame) {
				setSummary(updateSummary(finishedGame))
			}
			setGames(updatedGames)
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [games])

	return { summary, games }
}
