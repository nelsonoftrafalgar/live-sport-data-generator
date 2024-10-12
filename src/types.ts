export interface Game {
	id: string
	teamA: string
	teamB: string
	result: string
	timeLeft: number
}

export interface Summary {
	id: string
	teamA: string
	teamB: string
	result: string
}

export interface GamesProps {
	games: Game[]
}

export interface SummaryProps {
	summary: Summary[]
}
