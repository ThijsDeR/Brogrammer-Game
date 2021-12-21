import DoodleScene from './Doodle/DoodleScene.js';
import HubScene from './Hub/HubScene.js';
export default class SceneSelector {
    static getClassFromString(classString, canvas, userData) {
        switch (classString) {
            case 'hub': {
                return new HubScene(canvas, userData);
            }
            case 'doodle': {
                return new DoodleScene(canvas, userData);
            }
            default: {
                return null;
            }
        }
    }
}
//# sourceMappingURL=SceneSelector.js.map