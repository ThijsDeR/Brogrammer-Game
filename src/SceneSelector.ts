import DoodleScene from './Scenes/Doodle/DoodleScene.js'
import HubScene from './Scenes/Hub/HubScene.js'
import MenuScene from './Scenes/Main-Menu/MenuScene.js'
import Scene from './Scene.js'
import UserData from './UserData.js'
import TempleRunScene from './Scenes/Temple-Run/TempleRunScene.js'
import PoketaleScene from './Scenes/Poke-Tale/PoketaleScene.js'

export default class SceneSelector {
  public static getClassFromString(classString: string, canvas: HTMLCanvasElement, userData: UserData): Scene | null {
    switch (classString){
      case 'hub': {
        return new HubScene(canvas, userData)
      }

      case 'doodle': {
        return new DoodleScene(canvas, userData)
      }

      case 'menu': {
        return new MenuScene(canvas, userData)
      }

      case 'templerun': {
        return new TempleRunScene(canvas, userData)
      }

      case 'poketale': {
      return new PoketaleScene(canvas, userData)
      }
      
      default: {
        return null
      }
    }
  }
}