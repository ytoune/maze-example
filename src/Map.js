
import {
	set as setCellType,
	create as createCell,
	areSamePlace,
	getPosition,
	types,
	isWall,
} from './Cell'

import {
	create as createPosition,
	getNears as getNearPositions,
} from './Position'

export const create = ({size}) => {
	const {x: sizeX, y: sizeY} = size
	const map = {size}
	for (let x = 0; x < sizeX; ++x) {
		const row = map[x] = {}
		for (let y = 0; y < sizeY; ++y) {
			row[y] = createCell({
				position: createPosition({x, y}),
			})
		}
	}
	return map
}

export const getAllWalls = (map) => {
	const {size: {x: sizeX, y: sizeY}} = map
	const list = []
	for (let x = 0; x < sizeX; ++x) {
		const row = map[x]
		for (let y = 0; y < sizeY; ++y) {
			const cell = row[y]
			if (isWall(cell))
				list.push(cell)
		}
	}
	return list
}

export const pickRamdom = (cells) => {
	return cells[Math.floor(Math.ramdom() * cells.length)]
}

const {ROAD} = types
export const pave = (map, from, to) => {
	const newFrom = setCellType(from, )
	const {x: fromX, y: fromY} = getPosition(from)
	const {x: toX, y: toY} = getPosition(to)
	const [fromKey, toKey] = getDirection(from, to)
	let newMap = map
	let newTo = to
	if (fromKey) {
		newMap = set(newMap, setCellType(from, fromKey, ROAD))
	} else {
		newTo = setCellType(newTo, toKey, ROAD)
	}
	newMap = set(newMap, setCellType(newTo, 'type', ROAD))
	return newMap
}

export const set = (map, cell) => {
	const {x, y} = getPosition(cell)
	return {
		...map,
		[x]: {
			...map[x],
			[y]: cell,
		}
	}
}

const getDirection = (from, to) => {
	const {x: qx, y: qy} = getPosition(from)
	const {x: wx, y: wy} = getPosition(to)
	return (
		qx < wx ? ['eastType', null] :
		qy < wy ? ['southType', null] :
		qx > wx ? [null, 'eastType'] :
		qy > wy ? [null, 'southType'] :
		[null, null]
	)
}
