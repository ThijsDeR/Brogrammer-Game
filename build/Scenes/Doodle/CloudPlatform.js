import Cloud from './Cloud.js';
export default class CloudPlatform extends Cloud {
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, width, height);
    }
}
