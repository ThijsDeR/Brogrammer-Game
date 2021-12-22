import DoodleScene from './Scenes/Doodle/DoodleScene.js';
import HubScene from './Scenes/Hub/HubScene.js';
import MenuScene from './Scenes/Main-Menu/MenuScene.js';
export default class SceneSelector {
    static getClassFromString(classString, canvas, userData) {
        switch (classString) {
            case 'hub': {
                return new HubScene(canvas, userData);
            }
            case 'doodle': {
                return new DoodleScene(canvas, userData);
            }
            case 'menu': {
                return new MenuScene(canvas, userData);
            }
            default: {
                return null;
            }
        }
    }
}
//# sourceMappingURL=SceneSelector.js.map