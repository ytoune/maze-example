import { BehaviorSubject, zip } from 'rxjs'
import { map as mapop, filter } from 'rxjs/operators'

import {
	pickRamdom,
	getAllWalls,
	create as createMap,
	set as setCell,
	Map,
	Size,
} from './Map'

import { Type, set as setCellType, Cell } from './Cell'

import { getCellToPave as _getCellToPave, pave as _pave } from './pave'

const getCellToPave = ([map, waysToPave]: [Map, Cell[]]) =>
	_getCellToPave({ map, waysToPave })

const pave = ({
	map,
	from,
	to,
	waysToPave,
}: {
	map: Map
	from: Cell
	to: Cell
	waysToPave: Cell[]
}) => {
	return {
		..._pave({ map, from, to }),
		waysToPave,
	}
}

export const makeMap = ({ size }: { size: Size }) => {
	let map = createMap({ size })

	let [startWork] = pickRamdom(getAllWalls(map))
	if (!startWork) throw new Error('failed to pick start cell.')
	startWork = setCellType(startWork, 'type', Type.ROAD)
	map = setCell(map, startWork)
	const waysToPave = [startWork]

	const _map$ = new BehaviorSubject(map)
	const _waysToPave$ = new BehaviorSubject(waysToPave)

	const ok = 1
	const timing$ = new BehaviorSubject(1)
	const pushNext = () => {
		if (ok) timing$.next(1)
	}

	const setNextMap = ({
		map,
		to,
		waysToPave,
	}: {
		map: Map
		to: Cell
		waysToPave: Cell[]
	}) => {
		_map$.next(map)
		_waysToPave$.next([...waysToPave, to])
	}

	const wayToPave$ = zip(_map$, _waysToPave$).pipe(
		mapop(getCellToPave),
		filter(<T>(t?: T): t is T => !!t),
	)

	const paving$ = zip(wayToPave$.pipe(mapop(pave)), timing$)
		.pipe(
			mapop(([n]) => n),
			mapop(setNextMap),
		)
		.subscribe()

	const map$ = _map$.pipe(mapop(_ => _))

	return {
		map$,
		wayToPave$,
		paving$,
		pushNext,
	}
}
