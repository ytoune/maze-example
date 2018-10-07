
import {
	set as _setCellType,
	create as createCell,
	areSamePlace,
	getPosition,
	types,
	isWall,
} from './Cell'

import {
	create as createPosition,
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

export const getAllCells = (map) => {
	const {size: {x: sizeX, y: sizeY}} = map
	const list = []
	for (let x = 0; x < sizeX; ++x) {
		const row = map[x]
		for (let y = 0; y < sizeY; ++y) {
			list.push(row[y])
		}
	}
	return list
}

export const getAllWalls = (map) => getAllCells(map).filter(isWall)

export const pickRamdom = (cells) => {
	const {length} = cells
	if (!length) return []
	const idx = Math.floor(Math.random() * length)
	const _cells = [...cells]
	const [cell] = _cells.splice(idx, 1)
	return [cell, _cells]
}

const {ROAD} = types
export const pave = (map, from, to) => {
	const {x: fromX, y: fromY} = getPosition(from)
	const {x: toX, y: toY} = getPosition(to)
	const [fromKey, toKey] = getDirection(from, to)
	let _map = map
	let _from = from
	let _to = to
	if (fromKey) {
		_from = setCellType(_map, _from, fromKey, ROAD)
		_map = set(_map, _from)
	} else {
		_to = setCellType(_map, _to, toKey, ROAD)
		_map = set(_map, _to)
	}
	_to = setCellType(_map, _to, 'type', ROAD)
	_map = set(_map, _to)
	return [_map, _to]
}

const setCellType = (map, cell, key, value) => {
	const _cell = getCurrentCell(map, cell)
	return _setCellType(_cell, key, value)
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

const getCurrentCell = (map, cell) => {
	const {x, y} = getPosition(cell)
	return {...map[x][y]}
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

export const getNears = (map, cell) => {
	const {size: {x: sizeX, y: sizeY}} = map
	const {x: cx, y: cy} = getPosition(cell)
	const positions = []
	for (const [dx, dy] of [
		[-1,  0],
		[ 0, -1],
		[ 1,  0],
		[ 0,  1],
	]) {
		const x = cx + dx
		const y = cy + dy
		if (0 <= x && 0 <= y && x < sizeX && y < sizeY) {
			positions.push(map[x][y])
		}
	}
	return positions
}
