export default class CollideHandler {
    static NO_CONTACT = 0;
    static TOP_CONTACT = 1;
    static BOTTOM_CONTACT = 2;
    static LEFT_CONTACT = 3;
    static RIGHT_CONTACT = 4;
    static CORNER_CONTACT = 5;
    static collides(object1, object2) {
        if (object1.getMinXPos() < object2.getMaxXPos()
            && object1.getMaxXPos() > object2.getMinXPos()
            && object1.getMinYPos() < object2.getMaxYPos()
            && object1.getMaxYPos() > object2.getMinYPos()) {
            return true;
        }
        return false;
    }
    static getContactData(object1, object2) {
        let xPos = object1.getMinXPos();
        let yPos = object1.getMinYPos();
        let contact = CollideHandler.NO_CONTACT;
        const object1MidX = object1.getMinXPos() + (object1.getWidth() / 2);
        const object1MidY = object1.getMinYPos() + (object1.getHeight() / 2);
        const object2MidX = object2.getMinXPos() + (object2.getWidth() / 2);
        const object2MidY = object2.getMinYPos() + (object2.getHeight() / 2);
        const dx = object1MidX - object2MidX;
        const dy = object1MidY - object2MidY;
        const width = (object1.getWidth() + object2.getWidth()) / 2;
        const height = (object1.getHeight() + object2.getHeight()) / 2;
        const crossWidth = width * dy;
        const crossHeight = height * dx;
        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                contact = (crossWidth > (-crossHeight)) ? CollideHandler.BOTTOM_CONTACT : CollideHandler.LEFT_CONTACT;
            }
            else {
                contact = (crossWidth > (-crossHeight)) ? CollideHandler.RIGHT_CONTACT : CollideHandler.TOP_CONTACT;
            }
        }
        return contact;
    }
}
//# sourceMappingURL=CollideHandler.js.map