export interface Position {
	x: number
	y: number
}

interface CreateProps {
	x: number
	y: number
}

export const create = ({ x, y }: CreateProps): Position => {
	return { x, y }
}

export const equal = (
	{ x: qx, y: qy }: Position,
	{ x: wx, y: wy }: Position,
) => {
	return qx === wx && qy === wy
}
