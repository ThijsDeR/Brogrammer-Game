import DoodleScene from './Doodle/DoodleScene.js'
import HubScene from './Hub/HubScene.js'
import Scene from './Scene.js'
import UserData from './UserData.js'

export default class SceneSelector {
  public static getClassFromString(classString: string, canvas: HTMLCanvasElement, userData: UserData): Scene | null {
    switch (classString){
      case 'hub': {
        return new HubScene(canvas, userData)
      }

      case 'doodle': {
        return new DoodleScene(canvas, userData)
      }

      default: {
        return null
      }
    }
  }
}