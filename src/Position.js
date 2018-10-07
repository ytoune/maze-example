
export const create = ({x, y}) => {
	return {
		x, y,
	}
}

export const getNears = ({x: cx, y: cy}, {x: sizeX, y: sizeY}) => {
	const positions = []
	for (let dx = -1; dx <= 1; ++dx) {
		const x = cx + dx
		for (let dy = -1; dy <= 1; ++dy) {
			if (dx && dy) {
				const y = cy + dy
				if (0 <= x && 0 <= y && x < sizeX && y < sizeY) {
					positions.push({x, y})
				}
			}
		}
	}
}

export const equal = ({x: qx, y: qy}, {x: wx, y: wy}) => {
	return qx === wx && qy === wy
}
