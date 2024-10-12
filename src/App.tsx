import './styles.css'

import { Games } from './Games'
import { Summary } from './Summary'
import { useScoreBoard } from './hooks'

export const App = () => {
	const { summary, games } = useScoreBoard()

	return (
		<div className='wrapper'>
			<Games games={games} />
			<Summary summary={summary} />
		</div>
	)
}
