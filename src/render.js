
import {
	getAllCells,
} from './Map'
import {
	getPosition,
	types,
	isWall,
	isEastWall,
	isSouthWall,
} from './Cell'

export const render = (context, scale) => (map) => {

	const context = canvas.getContext('2d')
	const {size: {x: _x, y: _y}} = map
	const sx = 2 * _x + 1
	const sy = 2 * _y + 1
	const imagedata = context.createImageData(sx * scale, sy * scale)

	const {data, data: {length}} = imagedata
	for (let i = 0; i < length; ++i) data[i] = 3 === i % 4 ? F : 0
	for (const cell of getAllCells(map)) {
		const {x: _x, y: _y} = getPosition(cell)
		const x = 2 * _x + 1
		const y = 2 * _y + 1
		if (!isWall(cell)) fill(data, WHITE, x, y, scale, sx)
		if (!isEastWall(cell)) fill(data, WHITE, x + 1, y, scale, sx)
		if (!isSouthWall(cell)) fill(data, WHITE, x, y + 1, scale, sx)
	}

	context.putImageData(imagedata, 0, 0)

}

const fill = (data, color, x, y, scale, sizeX) => {
	const ry = y * scale
	const rx = x * scale
	const width = scale * sizeX
	for (let _y = 0; _y < scale; ++_y) {
		const ty = (ry + _y) * width
		for (let _x = 0; _x < scale; ++_x) {
			const k = 4 * (ty + rx + _x)
			for (let i = 0; i < 4; ++i)
				data[k + i] = color[i]
		}
	}
}

const F = 255
const BLACK = [0, 0, 0, F]
const WHITE = [F, F, F, F]
