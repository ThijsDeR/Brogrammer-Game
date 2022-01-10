import Scene from '../Scene.js';
import ImageProp from './ImageProp.js';
export default class TextBox {
    textBoxImage;
    sentences;
    currentSentence;
    sentenceLength;
    nextSentenceDelay;
    xPos;
    yPos;
    width;
    height;
    constructor(xPos, yPos, width, height, sentences) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.sentences = sentences;
        this.currentSentence = 0;
        this.sentenceLength = 0;
        this.textBoxImage = new ImageProp(this.xPos, this.yPos, './assets/img/chatbox.png', this.width, this.height);
        this.nextSentenceDelay = 200;
    }
    draw(ctx) {
        this.textBoxImage.draw(ctx);
        if (!this.isDone()) {
            Scene.writeTextToCanvas(ctx, this.sentences[this.currentSentence].substring(0, this.sentenceLength), this.xPos + (this.width / 2), this.yPos + (this.height / 2), 20, 'center', 'middle', 'black');
        }
    }
    advanceSentence(elapsed) {
        this.sentenceLength += 0.01;
        this.nextSentenceDelay -= elapsed;
    }
    nextSentence() {
        if (this.nextSentenceDelay < 0) {
            if (this.sentenceLength < this.sentences[this.currentSentence].length) {
                this.sentenceLength = this.sentences[this.currentSentence].length;
            }
            else {
                this.currentSentence += 1;
                this.sentenceLength = 0;
            }
            this.nextSentenceDelay = 200;
        }
    }
    isDone() {
        return this.currentSentence > this.sentences.length - 1;
    }
}
//# sourceMappingURL=TextBox.js.map