import { useEffect, useState } from 'react'

function App() {
	const [catFact, setCatFact] = useState<string>('')
	const [gif, setGif] = useState<string>('')

	const getGif = (string: string) => {
		const giphy_API: string = 'https://api.giphy.com/v1/gifs/search?q='
		const giphy_API_KEY: string = '&api_key=Je8I67Tj2pprYJ7OWB9ELIE8jFDvESPa'

		const url: string = giphy_API + string + giphy_API_KEY

		console.log(url)

		fetch(url)
			.then(response => response.json())
			.then(data => setGif(data.data[0].images.original.url))
	}

	const getCatFact = () => {
		const catFact_API: string = 'https://catfact.ninja/fact'

		fetch(catFact_API)
			.then(response => response.json())
			.then(data => {
				setCatFact(data.fact)

				return getGif(data.fact.split(' ', 3).join(' '))
			})
	}

	useEffect(getCatFact, [])

	return (
		<div className='App'>
			{gif !== null ? (
				<img src={gif} alt='cat gif' />
			) : (
				<p> No hay ningun gif disponible </p>
			)}
			{<p>{catFact}</p>}
		</div>
	)
}

export default App
