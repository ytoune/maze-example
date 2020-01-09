import { Position, equal as isEqualPositions } from './Position'

export enum Type {
	WALL = 'WALL',
	ROAD = 'ROAD',
}

const { WALL } = Type

export interface Cell {
	type: Type
	eastType: Type
	southType: Type
	position: Position
}

interface CreateProps {
	position: Position
}

export const create = ({ position }: CreateProps): Cell => {
	return {
		type: WALL,
		eastType: WALL,
		southType: WALL,
		position,
	}
}

export const set = <T extends keyof Omit<Cell, 'position'>>(
	cell: Cell,
	key: T,
	value: Cell[T],
) => {
	if (key in cell && value in Type) {
		return { ...cell, [key]: value }
	}
	return { ...cell }
}

export const isWall = ({ type }: Cell) => WALL === type
export const isEastWall = ({ eastType }: Cell) => WALL === eastType
export const isSouthWall = ({ southType }: Cell) => WALL === southType

export const areSamePlace = (q: Cell, w: Cell) => {
	return isEqualPositions(q.position, w.position)
}

export const getPosition = ({ position }: Cell) => position
