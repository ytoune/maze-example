import { render } from './render'
import { makeMap } from './makeMap'

const main = async () => {
	const sizeX = 100
	const sizeY = 100
	const scale = 2
	const canvas = document.querySelector('canvas')
	if (!canvas) throw new Error('failed to find canvas')
	canvas.width = scale * (2 * sizeX + 1)
	canvas.height = scale * (2 * sizeY + 1)

	const context = canvas.getContext('2d')
	if (!context) throw new Error('failed to get context')

	const { map$, pushNext } = makeMap({
		size: { x: sizeX, y: sizeY },
	})

	map$.subscribe(render(context, scale))

	let dr = 1
	while (true) {
		await sleep(dr)
		dr = Math.max(0.01, dr * 0.9)
		pushNext()
	}
}

const sleep = (sec: number) => new Promise(s => setTimeout(s, sec * 1000))

main().catch(console.error.bind(console))
