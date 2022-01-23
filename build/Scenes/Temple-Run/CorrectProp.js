import RectProp from '../../Props/RectProp.js';
export default class CorrectProp extends RectProp {
    constructor(xPos, yPos, width, height) {
        super(xPos, yPos, width, height, 'green', 'fill');
    }
}
