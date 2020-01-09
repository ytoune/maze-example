import {
	set as _setCellType,
	create as createCell,
	getPosition,
	Type,
	isWall,
	Cell,
} from './Cell'

import { create as createPosition } from './Position'

export interface Size {
	x: number
	y: number
}
export interface Row {
	[y: number]: Cell
}
export interface Map {
	size: Size
	[x: number]: Row
}

interface CreateProps {
	size: Size
}

export const create = ({ size }: CreateProps): Map => {
	const { x: sizeX, y: sizeY } = size
	const map: Map = { size }
	for (let x = 0; x < sizeX; ++x) {
		const row = (map[x] = {} as Row)
		for (let y = 0; y < sizeY; ++y) {
			row[y] = createCell({
				position: createPosition({ x, y }),
			})
		}
	}
	return map
}

export const getAllCells = (map: Map) => {
	const {
		size: { x: sizeX, y: sizeY },
	} = map
	const list: Cell[] = []
	for (let x = 0; x < sizeX; ++x) {
		const row = map[x]
		for (let y = 0; y < sizeY; ++y) {
			list.push(row[y])
		}
	}
	return list
}

export const getAllWalls = (map: Map) => getAllCells(map).filter(isWall)

export const pickRamdom = (
	cells: Cell[],
): [Cell, Cell[]] | [undefined, Cell[]] => {
	const { length } = cells
	const _cells = [...cells]
	if (!length) return [undefined, []]
	const idx = Math.floor(Math.random() * length)
	const [cell] = _cells.splice(idx, 1)
	return [cell, _cells]
}

const { ROAD } = Type
export const pave = (map: Map, from: Cell, to: Cell): [Map, Cell] => {
	const [fromKey, toKey] = getDirection(from, to)
	let _map = map
	let _from = from
	let _to = to
	if (fromKey) {
		_from = setCellType(_map, _from, fromKey, ROAD)
		_map = set(_map, _from)
	} else if (toKey) {
		_to = setCellType(_map, _to, toKey, ROAD)
		_map = set(_map, _to)
	}
	_to = setCellType(_map, _to, 'type', ROAD)
	_map = set(_map, _to)
	return [_map, _to]
}

const setCellType = <K extends keyof Omit<Cell, 'position'>>(
	map: Map,
	cell: Cell,
	key: K,
	value: Cell[K],
) => {
	const _cell = getCurrentCell(map, cell)
	return _setCellType(_cell, key, value)
}

export const set = (map: Map, cell: Cell): Map => {
	const { x, y } = getPosition(cell)
	return {
		...map,
		[x]: {
			...map[x],
			[y]: cell,
		},
	}
}

const getCurrentCell = (map: Map, cell: Cell): Cell => {
	const { x, y } = getPosition(cell)
	return { ...map[x][y] }
}

export type Direction =
	| ['eastType', null]
	| ['southType', null]
	| [null, 'eastType']
	| [null, 'southType']
	| [null, null]

const getDirection = (from: Cell, to: Cell): Direction => {
	const { x: qx, y: qy } = getPosition(from)
	const { x: wx, y: wy } = getPosition(to)
	return qx < wx
		? ['eastType', null]
		: qy < wy
		? ['southType', null]
		: qx > wx
		? [null, 'eastType']
		: qy > wy
		? [null, 'southType']
		: [null, null]
}

export const getNears = (map: Map, cell: Cell) => {
	const {
		size: { x: sizeX, y: sizeY },
	} = map
	const { x: cx, y: cy } = getPosition(cell)
	const nears: Cell[] = []
	for (const [dx, dy] of [
		[-1, 0],
		[0, -1],
		[1, 0],
		[0, 1],
	]) {
		const x = cx + dx
		const y = cy + dy
		if (0 <= x && 0 <= y && x < sizeX && y < sizeY) {
			nears.push(map[x][y])
		}
	}
	return nears
}
