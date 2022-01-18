import Player from '../../Player.js';
export default class HubPlayer extends Player {
    props;
    constructor(xPos, yPos, width = undefined, height = undefined, userData) {
        console.log(`${userData.getCurrentSkin().src}`);
        super(xPos, yPos, `${userData.getCurrentSkin().src}`, width, height);
    }
}
