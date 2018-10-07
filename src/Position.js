
export const create = ({x, y}) => {
	return {
		x, y,
	}
}

export const equal = ({x: qx, y: qy}, {x: wx, y: wy}) => {
	return qx === wx && qy === wy
}
