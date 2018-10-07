
import { BehaviorSubject, Subject, combineLatest, zip } from 'rxjs'
import { map as mapop, tap, filter, scan } from 'rxjs/operators'

import {
	pickRamdom,
	getAllWalls,
	create as createMap,
	set as setCell,
} from './Map'

import {
	types,
	set as setCellType,
} from './Cell'

import {
	getCellToPave as _getCellToPave,
	pave as _pave,
} from './pave'

const getCellToPave = ([map, waysToPave]) =>
	_getCellToPave({map, waysToPave})

const pave = ({map, from, to, waysToPave}) => {
	return {
		..._pave({map, from, to}),
		waysToPave,
	}
}

export const makeMap = ({size}) => {

	let map = createMap({size})

	let [startWork] = pickRamdom(getAllWalls(map))
	startWork = setCellType(startWork, 'type', types.ROAD)
	map = setCell(map, startWork)
	const waysToPave = [startWork]

	const _map$ = new BehaviorSubject(map)
	const _waysToPave$ = new BehaviorSubject(waysToPave)

	let ok = 1
	const timing$ = new BehaviorSubject(1)
	const pushNext = () => {
		if (ok) timing$.next(1)
	}

	const setNextMap = ({map, to, waysToPave}) => {
		_map$.next(map)
		_waysToPave$.next([...waysToPave, to])
	}

	const wayToPave$ = zip(
		_map$, _waysToPave$,
	).pipe(
		mapop(getCellToPave),
		filter(_ => _),
	)

	const paving$ = zip(
		wayToPave$.pipe(mapop(pave)),
		timing$,
	).pipe(
		mapop(([n]) => n),
		mapop(setNextMap),
	).subscribe()

	const map$ = _map$.pipe(mapop(_ => _))

	return {
		map$,
		wayToPave$,
		pushNext,
	}

}
