
const WALL = 'WALL'
const ROAD = 'ROAD'

import {
	equal as isEqualPositions,
} from './Position'

export const types = {WALL, ROAD}

export const create = ({position}) => {
	return {
		type: WALL,
		eastType: WALL,
		southType: WALL,
		position,
	}
}

export const set = (cell, key, value) => {
	if (key in cell && types[value]) {
		return {
			...cell,
			[key]: value,
		}
	}
	return {...cell}
}

export const isWall = ({type}) => WALL === type

export const areSamePlace = (q, w) => {
	return isEqualPositions(q.position, w.position)
}

export const getPosition = ({position}) => position
