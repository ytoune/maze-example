
import './index.html'
import './style.sass'

import { render } from './render'
import { makeMap } from './makeMap'

const main = async () => {

	const sizeX = 100
	const sizeY = 100
	const scale = 2
	const canvas = document.querySelector('canvas')
	canvas.width = scale * (2 * sizeX + 1)
	canvas.height = scale * (2 * sizeY + 1)

	const context = canvas.getContext('2d')

	const {
		map$,
		wayToPave$,
		pushNext,
	} = makeMap({size: {x: sizeX, y: sizeY}})

	map$.subscribe(render(context, scale))

	let dr = 1
	while (true) {
		await sleep(dr)
		dr = Math.max(.01, dr * .9)
		pushNext()
	}

}

const sleep = sec => new Promise(s => setTimeout(s, sec * 1000))

main().catch(console.error.bind(console))
