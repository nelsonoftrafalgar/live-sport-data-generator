import { afterEach, describe, expect, test, vi } from 'vitest'
import {
	analyzeGames,
	excludePlayingCountries,
	getGameCountries,
	getNewGame,
	pickTwoCountries,
	updateResult
} from '../utils'

import { europeanCountries } from '../countries'

describe('analyzeGames', () => {
	test('should update time left for each game in progress', () => {
		const games = [
			{
				id: 'test-id',
				teamA: 'A',
				teamB: 'B',
				result: '1-0',
				timeLeft: 5
			},
			{ id: 'test-id', teamA: 'C', teamB: 'D', result: '2-2', timeLeft: 3 }
		]

		const [firstGame, lastGame] = analyzeGames(games).updatedGames

		expect(firstGame.timeLeft).toEqual(4)
		expect(lastGame.timeLeft).toEqual(2)
	})

	test('should remove game if time left is 0', () => {
		vi
			.spyOn(Math, 'random')
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(0.8)
		const games = [
			{
				id: 'test-id',
				teamA: 'A',
				teamB: 'B',
				result: '1-0',
				timeLeft: 5
			},
			{ id: 'test-id', teamA: 'C', teamB: 'D', result: '2-2', timeLeft: 0 }
		]

		const [firstGame, lastGame] = analyzeGames(games).updatedGames

		expect(firstGame).toBeDefined()
		expect(lastGame).toBeUndefined()
	})

	test('should add a new game if Math.random > 0.9', () => {
		const games = [
			{
				id: 'test-id',
				teamA: 'TeamA',
				teamB: 'TeamB',
				result: '1-0',
				timeLeft: 5
			}
		]

		vi
			.spyOn(Math, 'random')
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(0.95)

		const updatedGames = analyzeGames(games)

		expect(Object.keys(updatedGames)).toHaveLength(2)
	})

	test('should not add a new game if Math.random <= 0.9', () => {
		const games = [
			{
				id: 'test-id',
				teamA: 'TeamA',
				teamB: 'TeamB',
				result: '1-0',
				timeLeft: 5
			}
		]

		vi
			.spyOn(Math, 'random')
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(1)
			.mockReturnValueOnce(0.85)

		const { updatedGames } = analyzeGames(games)

		expect(updatedGames).toEqual([
			{
				id: 'test-id',
				teamA: 'TeamA',
				teamB: 'TeamB',
				result: '1-1',
				timeLeft: 4
			}
		])
	})

	test('should return finished game if timeLeft is 0', () => {
		const games = [
			{
				id: 'test-id',
				teamA: 'TeamA',
				teamB: 'TeamB',
				result: '1-0',
				timeLeft: 0
			}
		]

		const { finishedGame } = analyzeGames(games)

		expect(finishedGame).toEqual({
			id: 'test-id',
			teamA: 'TeamA',
			teamB: 'TeamB',
			result: '1-0',
			timeLeft: 0
		})
	})
})

describe('updateResult', () => {
	test('should increase the score for teamA when random favors teamA', () => {
		vi.spyOn(Math, 'random').mockReturnValueOnce(0.4).mockReturnValueOnce(0.95)

		const result = updateResult('1-2')
		expect(result).toBe('2-2')
	})

	test('should increase the score for teamB when random favors teamB', () => {
		vi.spyOn(Math, 'random').mockReturnValueOnce(0.6).mockReturnValueOnce(0.95)

		const result = updateResult('1-2')
		expect(result).toBe('1-3')
	})

	test('should not increase the score for either team when random values do not meet the condition', () => {
		vi.spyOn(Math, 'random').mockReturnValueOnce(0.4).mockReturnValueOnce(0.8)

		const result = updateResult('1-2')
		expect(result).toBe('1-2')
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})
})

describe('getNewGame', () => {
	test('should return a new game with initial result set to 0-0', () => {
		const newGame = getNewGame(['TeamA', 'TeamB'])

		expect(newGame.result).toBe('0-0')
	})
	test('should return a new game with initial timeLeft set to 60', () => {
		const newGame = getNewGame(['TeamA', 'TeamB'])

		expect(newGame.timeLeft).toEqual(60)
	})
})

describe('pickTwoCountries', () => {
	test('should return an array of two different countries', () => {
		const [firstCountry, secondCountry] = pickTwoCountries(europeanCountries)

		expect(firstCountry).toBeDefined()
		expect(secondCountry).toBeDefined()

		expect(firstCountry).not.toEqual(secondCountry)
	})
})

describe('getGameCountries', () => {
	test('should return an array of countries involved in the games', () => {
		const games = [
			{
				id: 'test-id',
				teamA: 'France',
				teamB: 'Germany',
				result: '2-1',
				timeLeft: 45
			},
			{
				id: 'test-id',
				teamA: 'Italy',
				teamB: 'Spain',
				result: '0-3',
				timeLeft: 15
			}
		]
		expect(getGameCountries(games)).toEqual([
			'France',
			'Germany',
			'Italy',
			'Spain'
		])
	})
})

describe('excludePlayingCountries', () => {
	test('should exclude the playing countries from the european countries list', () => {
		const playingCountries = ['France', 'Spain']
		const availableCountries = excludePlayingCountries(playingCountries)
		expect(availableCountries.includes(playingCountries[0])).toBe(false)
		expect(availableCountries.includes(playingCountries[1])).toBe(false)
	})
})
