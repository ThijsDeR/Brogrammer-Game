import RectProp from "../../Props/RectProp.js";
export default class DeadProp extends RectProp {
    constructor(xPos, yPos, width, height) {
        super(xPos, yPos, width, height, 'red', 'fill');
    }
}
