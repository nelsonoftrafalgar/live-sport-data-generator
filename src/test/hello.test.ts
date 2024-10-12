import { describe, expect, test } from 'vitest'

import { analyzeGames } from '../App'

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

		const [firstGame, lastGame] = analyzeGames(games)

		expect(firstGame.timeLeft).toEqual(4)
		expect(lastGame.timeLeft).toEqual(2)
	})
})
