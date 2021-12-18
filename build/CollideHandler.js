export default class CollideHandler {
    static NO_CONTACT = 0;
    static TOP_CONTACT = 1;
    static BOTTOM_CONTACT = 2;
    static LEFT_CONTACT = 3;
    static RIGHT_CONTACT = 4;
    static collides(object1, object2) {
        if (object1.getMinXPos() < object2.getMaxXPos()
            && object1.getMaxXPos() > object2.getMinXPos()
            && object1.getMinYPos() < object2.getMaxYPos()
            && object1.getMaxYPos() > object2.getMinYPos()) {
            return true;
        }
        return false;
    }
    static getElasticData(object1, object2) {
        let xPos = object1.getMinXPos();
        let yPos = object1.getMinYPos();
        let contact;
        const object1MidX = object1.getMinXPos() + (object1.getMaxXPos() / 2);
        const object1MidY = object1.getMinYPos() + (object1.getMaxYPos() / 2);
        const object2MidX = object2.getMinXPos() + (object2.getMaxXPos() / 2);
        const object2MidY = object2.getMinYPos() + (object2.getMaxYPos() / 2);
        const dx = (object2MidX - object1MidX) / ((object2.getMaxXPos() - object2.getMinXPos()) / 2);
        const dy = (object2MidY - object1MidY) / ((object2.getMaxYPos() - object2.getMinYPos()) / 2);
        const absDX = Math.abs(dx);
        const absDY = Math.abs(dy);
        if (absDX > absDY) {
            if (dx < 0) {
                xPos = object2.getMaxXPos();
                contact = CollideHandler.RIGHT_CONTACT;
            }
            else {
                xPos = object2.getMinXPos() - (object1.getMaxXPos() - object1.getMinXPos());
                contact = CollideHandler.LEFT_CONTACT;
            }
        }
        else {
            if (dy < 0) {
                yPos = object2.getMaxYPos();
                contact = CollideHandler.TOP_CONTACT;
            }
            else {
                yPos = object2.getMinYPos() - (object1.getMaxYPos() - object1.getMinYPos());
                contact = CollideHandler.BOTTOM_CONTACT;
            }
        }
        return { x: xPos, y: yPos, contact: contact };
    }
}
//# sourceMappingURL=CollideHandler.js.map