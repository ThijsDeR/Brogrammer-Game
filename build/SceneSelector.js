import DoodleScene from './Scenes/Doodle/DoodleScene.js';
import HubScene from './Scenes/Hub/HubScene.js';
import MenuScene from './Scenes/Main-Menu/MenuScene.js';
import TempleRunScene from './Scenes/Temple-Run/TempleRunScene.js';
import PoketaleScene from './Scenes/Poke-Tale/PoketaleScene.js';
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
            case 'templerun': {
                return new TempleRunScene(canvas, userData);
            }
            case 'poketale': {
                return new PoketaleScene(canvas, userData);
            }
            default: {
                return null;
            }
        }
    }
}
//# sourceMappingURL=SceneSelector.js.map