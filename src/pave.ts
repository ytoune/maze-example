import {
	pickRamdom,
	getNears as getNearCells,
	pave as paveTheWay,
	Map,
} from './Map'

import { isWall, Cell } from './Cell'

interface GetCellToPaveProps {
	waysToPave: Cell[]
	map: Map
}
export const getCellToPave = ({ waysToPave, map }: GetCellToPaveProps) => {
	let from
	let to
	let _ways = waysToPave
	while (true) {
		;[from, _ways] = pickRamdom(_ways)
		if (!from) return
		;[to] = pickRamdom(getNearCells(map, from).filter(isWall))
		if (to) {
			_ways = [..._ways, from]
			break
		}
	}
	return { map, from, to, waysToPave: _ways }
}

interface PaveProps {
	map: Map
	from: Cell
	to: Cell
}
export const pave = ({ map: _map, from: _from, to: _to }: PaveProps) => {
	const [map, to] = paveTheWay(_map, _from, _to)
	return { map, to }
}
