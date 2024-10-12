import { Game, LiveGames, Summary } from './types'

import { europeanCountries } from './countries'
import { v4 as uuidv4 } from 'uuid'

const GAME_DEFAULT_TIME = 60

export const getNewGame = ([teamA, teamB]: string[]) => ({
	result: '0-0',
	timeLeft: GAME_DEFAULT_TIME,
	teamA,
	teamB,
	id: uuidv4()
})

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

export const pickTwoCountries = (countries: string[]) => {
	const firstIndex = Math.floor(Math.random() * countries.length)
	let secondIndex

	do {
		secondIndex = Math.floor(Math.random() * countries.length)
	} while (secondIndex === firstIndex)

	return [countries[firstIndex], countries[secondIndex]]
}

export const getGameCountries = (games: Game[]) =>
	games.reduce((acc: string[], { teamA, teamB }) => [...acc, teamA, teamB], [])

export const excludePlayingCountries = (playingCountries: string[]) =>
	europeanCountries.filter((country) => !playingCountries.includes(country))

export const analyzeGames = (games: Game[]) => {
	const liveGames = games.reduce(
		(acc: LiveGames, game: Game) => {
			if (game.timeLeft > 0) {
				acc.updatedGames.push({
					...game,
					result: updateResult(game.result),
					timeLeft: game.timeLeft - 1
				})
			} else {
				acc.finishedGame = { ...game }
			}
			return acc
		},
		{ updatedGames: [], finishedGame: null }
	)

	if (Math.random() > 0.9) {
		const playingCountries = getGameCountries(games)
		const availableCountries = excludePlayingCountries(playingCountries)
		const randomCountries = pickTwoCountries(availableCountries)
		const newGame = getNewGame(randomCountries)
		liveGames.updatedGames.push(newGame)
	}

	return liveGames
}

export const getGameTotalResult = (result: string) =>
	result.split('-').reduce((acc, val) => acc + Number(val), 0)

export const updateSummary = (finishedGame: Game) => (summary: Summary[]) => {
	const { teamA, teamB, result, id } = finishedGame
	const newItem = { id, teamA, teamB, result }

	const existingIdx = summary.findIndex(
		(item) => getGameTotalResult(item.result) === getGameTotalResult(result)
	)

	return existingIdx === -1
		? [...summary, newItem]
		: [...summary.slice(0, existingIdx), newItem, ...summary.slice(existingIdx)]
}
