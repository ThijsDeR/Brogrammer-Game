import CutScene from '../../../CutScene.js';
import KeyboardListener from '../../../KeyboardListener.js';
import TextBox from '../../../Props/TextBox.js';
import Scene from '../../../Scene.js';
import UserData from '../../../UserData.js';
import PokeTaleInfo from '../../Poke-Tale/Info/PokeTaleInfo.js';
import TempleRunInfo from '../../Temple-Run/Info/TempleRunInfo.js';
import PokeNPC from './PokeNPC.js';

export default class PokeNPCCutscene extends CutScene {
  private pokeNPC: PokeNPC;

  private textBox: TextBox;

  private endTextBox: TextBox;

  public constructor(
    canvas: HTMLCanvasElement,
    userData: UserData,
    pokeNPC: PokeNPC,
  ) {
    super(canvas, userData)

    this.pokeNPC = pokeNPC

    const sentences = [
    "I wanna be the very best, like no one even wa....",
    'Hey jij daar! Ik ben het Ash Ketchup',
    'Zou jij even hier naar binnen kunnen gaan?',
    'Ik weet niet wat er daar gaande is, maar het klinkt niet goed.',
    'En pas op! Er zitten hier enge monsters die de grootte zijn van een pocket!',
    'Bedankt! en als je me nodig hebt, sta ik hier.'
    ]

    const endSentences = [
      'To catch them is my real test, to train them is my ca...',
      'Ehh het portaal is open hoor ga maar snel voordat nindenbo© acties onderneemt!'
    ]

    const notReadySentences = [
      "Ik heb op het moment niks voor je",
    ]

    const doneSentences = [
      "Oh, ben je hier alweer?",
      "Je bent al klaar met dit level, als je er nog eens doorheen wilt mag het van mij",
      "Succes!"
    ]

    if (this.userData.getNPCStoryProgress(TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME).finished === false) this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, notReadySentences)
    else if (this.userData.getNPCStoryProgress(PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME).finished) this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, doneSentences)
    else if (this.userData.getNPCStoryProgress(PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME).talkedTo === true) {
      this.pokeNPC.finishInteraction()
      this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences) 
    }  
    else this.textBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, sentences)
    this.endTextBox = new TextBox(0, (this.canvas.height / 3) * 2, this.canvas.width, this.canvas.height / 3, endSentences)    
  }

  public draw(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.pokeNPC.getImage(), 0, 0, this.canvas.width / 4, this.canvas.height)
    this.textBox.draw(this.ctx)
  }

  public processInput(): void {
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
      this.textBox.nextSentence()
    }
  }

  public update(elapsed: number): boolean {
    this.textBox.advanceSentence(elapsed)
    if (this.textBox.isDone()) {
      this.pokeNPC.finishInteraction();
      const originalData = this.userData.getNPCStoryProgress(PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME)
      if (this.userData.getNPCStoryProgress(TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME).finished) {
        this.userData.changeNPCStoryProgress({name: PokeTaleInfo.POKE_TALE_PROGRESS_OBJECT_NAME, talkedTo: true, finished: originalData.finished })
      }
      if (this.userData.getNPCStoryProgress(TempleRunInfo.TEMPLE_RUN_PROGRESS_OBJECT_NAME).finished) {
        this.textBox = this.endTextBox
      }
      this.textBox.reset()
      return true
    }
    return false
  }

  public getOptionalScene(): Scene | null{
    return null
  }

}