
import {
	pickRamdom,
	getNears as getNearCells,
	pave as paveTheWay,
} from './Map'

import {
	isWall,
} from './Cell'

export const getCellToPave = ({waysToPave, map}) => {
	let from
	let to
	let _ways = waysToPave
	while (true) {
		[from, _ways] = pickRamdom(_ways)
		if (!from) return
		[to] = pickRamdom(getNearCells(map, from).filter(isWall))
		if (to) {
			_ways = [..._ways, from]
			break
		}
	}
	return {map, from, to, waysToPave: _ways}
}

export const pave = ({map: _map, from: _from, to: _to}) => {
	const [map, to] = paveTheWay(_map, _from, _to)
	return {map, to}
}
