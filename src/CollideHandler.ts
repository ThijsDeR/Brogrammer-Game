import Game from './Game.js';
import Prop from './Props/Prop.js';

export default class CollideHandler {
  public static readonly NO_CONTACT: number = 0;

  public static readonly TOP_CONTACT: number = 1;

  public static readonly BOTTOM_CONTACT: number = 2;

  public static readonly LEFT_CONTACT: number = 3;

  public static readonly RIGHT_CONTACT: number = 4;

  public static readonly CORNER_CONTACT: number = 5


  /**
   * Check if two props collide
   *
   * @param object1 object 1
   * @param object2 object 2
   * @returns true or false
   */
  public static collides(object1: Prop, object2: Prop): boolean {
    if (
      object1.getMinXPos() < object2.getMaxXPos()
      && object1.getMaxXPos() > object2.getMinXPos()
      && object1.getMinYPos() < object2.getMaxYPos()
      && object1.getMaxYPos() > object2.getMinYPos()
    ) {
      return true;
    } return false;
  }

  public static getContactData(object1: Prop, object2: Prop): number {
    let xPos = object1.getMinXPos();
    let yPos = object1.getMinYPos();
    let contact: number = CollideHandler.NO_CONTACT;

    const object1MidX = object1.getMinXPos() + (object1.getWidth() / 2);
    const object1MidY = object1.getMinYPos() + (object1.getHeight() / 2);
    const object2MidX = object2.getMinXPos() + (object2.getWidth() / 2);
    const object2MidY = object2.getMinYPos() + (object2.getHeight() / 2);

    const dx = object1MidX - object2MidX
    const dy = object1MidY - object2MidY

    const width = (object1.getWidth() + object2.getWidth()) / 2
    const height = (object1.getHeight() + object2.getHeight()) / 2

    const crossWidth = width * dy;
    const crossHeight = height * dx;

    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        contact = (crossWidth > (-crossHeight)) ? CollideHandler.BOTTOM_CONTACT : CollideHandler.LEFT_CONTACT
      } else {
        contact = (crossWidth > (-crossHeight)) ? CollideHandler.RIGHT_CONTACT : CollideHandler.TOP_CONTACT
      }
    }
    return contact;
  }
}
