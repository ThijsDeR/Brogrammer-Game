import Player from '../../Player.js';
export default class HubPlayer extends Player {
    props;
    constructor(xPos, yPos, width = undefined, height = undefined) {
        super(xPos, yPos, './assets/img/Sam_Suong/robot-preview.png', width, height);
    }
}
//# sourceMappingURL=HubPlayer.js.map