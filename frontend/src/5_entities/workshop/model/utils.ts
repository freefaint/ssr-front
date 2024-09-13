import { StatusColor } from './consts';

export const getColorStatusByState = (state: number) => {
	switch (state) {
		case 0:
			return StatusColor.RED;
		case 1:
			return StatusColor.ORANGE;
		case 2:
			return StatusColor.YELLOW;
		case 3:
			return StatusColor.GREEN;
		case 4:
			return StatusColor.BLUE;
		default:
			return StatusColor.NEUTRAL;
	}
};
