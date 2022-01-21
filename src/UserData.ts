import GameInfo from "./GameInfo.js";

export default class UserData {

  public static readonly COIN_OBJECT_NAME: string = 'coins';

  public static readonly QUESTIONS_OBJECT_NAME: string = 'questions'

  public static readonly SKINS_OBJECT_NAME: string = 'skins'

  public static readonly CURRENT_SKIN_OBJECT_NAME: string = 'current_skin'

  public static readonly STORY_PROGRESS_OBJECT_NAME: string = 'story_progress'

  public static readonly MASTER_SOUND_OBJECT_NAME: string = 'master_sound'

  public static readonly MUSIC_SOUND_OBJECT_NAME: string = 'music_sound'

  public static readonly UI_SOUND_OBJECT_NAME: string = 'ui_sound'

  public static readonly SOUND_OBJECT_NAME: string = 'sound'

  private coins: number;

  private questions: {question: string, answers: {answer: string, correct: boolean}[], questionInfo: string, id: number}[];

  private skins: {src: string, id: number, name: string}[];

  private currentSkin: number;

  private storyProgress: {NPCs: {name: string, talkedTo: boolean, finished: boolean}[]}

  private sounds: {name: string, procent: number}[]
  
  public constructor() {
    if (localStorage.getItem(UserData.COIN_OBJECT_NAME)) {
      this.coins = Number(localStorage.getItem(UserData.COIN_OBJECT_NAME))
    } else {
      this.coins = 0
      localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`)
    } 

    if (localStorage.getItem(UserData.QUESTIONS_OBJECT_NAME)) {
      this.questions = JSON.parse(localStorage.getItem(UserData.QUESTIONS_OBJECT_NAME))
    } else {
      this.questions = [];
      localStorage.setItem(UserData.QUESTIONS_OBJECT_NAME, JSON.stringify(this.questions))
    }

    if (localStorage.getItem(UserData.SKINS_OBJECT_NAME)) {
      this.skins = JSON.parse(localStorage.getItem(UserData.SKINS_OBJECT_NAME))
    } else {
      this.skins = [
        {src: GameInfo.IMG_PATH + 'Sam_Suong/robot-preview.png', id: 0, name: 'Normale Robot'}
      ]
      localStorage.setItem(UserData.SKINS_OBJECT_NAME, JSON.stringify(this.skins))
    }

    if (localStorage.getItem(UserData.CURRENT_SKIN_OBJECT_NAME)) {
      this.currentSkin = Number(localStorage.getItem(UserData.CURRENT_SKIN_OBJECT_NAME))
    } else {
      this.currentSkin = 0
      localStorage.setItem(UserData.CURRENT_SKIN_OBJECT_NAME, `${this.currentSkin}`)
    } 

    if (localStorage.getItem(UserData.STORY_PROGRESS_OBJECT_NAME)) {
      this.storyProgress = JSON.parse(localStorage.getItem(UserData.STORY_PROGRESS_OBJECT_NAME))
    } else {
      this.storyProgress = {NPCs: []}
      localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress))
    }

    if (localStorage.getItem(UserData.SOUND_OBJECT_NAME)) {
      this.sounds = JSON.parse(localStorage.getItem(UserData.SOUND_OBJECT_NAME))
    } else {
      this.sounds = []
      localStorage.setItem(UserData.SOUND_OBJECT_NAME, JSON.stringify(this.sounds))
    }


  }
  
  /**
   * Getter for coins
   *
   * @returns Amount of coins the player has.
   */
  public getCoins(): number {
    return this.coins;
  }
  
  /**
   * Method that adds coins to the player.$
   */
  public increaseCoins(amount: number): void {
    this.coins += amount;
    localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`)
  }

  /**
   * Method that removes coins from the player
   */
  public decreaseCoins(amount: number): void {
    this.coins -= amount;
    localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`)
  }

  public addQuestion(
    question: {question: string, answers: {answer: string, correct: boolean}[], questionInfo: string, id: number}
  ): void {
    let shouldAdd = true;

    this.questions.forEach((existingQuestion) => {
      if (existingQuestion.id === question.id) shouldAdd = false
    })

    if (shouldAdd) {
      this.questions.push(question)
      this.questions.sort((firstEl, secondEl) => firstEl.id - secondEl.id)
      localStorage.setItem(UserData.QUESTIONS_OBJECT_NAME, JSON.stringify(this.questions))
    }
  }

  /**
   * Getter for Questions
   * 
   * @returns questions
   */
  public getQuestions(): {question: string, answers: {answer: string, correct: boolean}[], questionInfo: string, id: number}[] {
    return this.questions;
  }

  public addSkin(skin: {src: string, id: number, name: string}): void {
    this.skins.push(skin)
    this.skins.sort((firstEl, secondEl) => firstEl.id - secondEl.id)
    localStorage.setItem(UserData.SKINS_OBJECT_NAME, JSON.stringify(this.skins))
  }

  public decreaseCurrentSkin(): void {
    this.changeCurrentSkin(this.currentSkin - 1)
  }

  public increaseCurrentSkin(): void {
    this.changeCurrentSkin(this.currentSkin + 1)
  }

  private changeCurrentSkin(skinIndex: number) {
    if (skinIndex > this.skins.length - 1) this.currentSkin = 0
    else if (skinIndex < 0) this.currentSkin = this.skins.length - 1
    else this.currentSkin = skinIndex
    localStorage.setItem(UserData.CURRENT_SKIN_OBJECT_NAME, `${this.currentSkin}`)
  }

  public getSkins(): {src: string, id: number}[] {
    return this.skins
  }

  public getCurrentSkin(): {src: string, id: number, name: string} {
    return this.skins[this.currentSkin]
  }

  public getStoryProgress(): {NPCs: {name: string, talkedTo: boolean, finished: boolean}[]} {
    return this.storyProgress
  }
  
  public getNPCStoryProgress(name: string): {name: string, talkedTo: boolean, finished: boolean} {
    const NPCData = this.storyProgress.NPCs.filter((NPC) => NPC.name === name)[0]
    if (NPCData) return NPCData
    else {
      this.changeNPCStoryProgress({name: name, talkedTo: false, finished: false})

      return {name: name, talkedTo: false, finished: false}
    }
  }

  public changeNPCStoryProgress(NPCStoryProgress: {name: string, talkedTo: boolean, finished: boolean}) {
    const newNPCArray = this.storyProgress.NPCs.filter((NPC) => NPC.name !== NPCStoryProgress.name)
    newNPCArray.push(NPCStoryProgress)
    this.storyProgress.NPCs = newNPCArray
    localStorage.setItem(UserData.STORY_PROGRESS_OBJECT_NAME, JSON.stringify(this.storyProgress))
  }

  public getSoundProcent(name: string): number {
    const soundData = this.sounds.filter((sound) => sound.name === name)[0]
    if (soundData) return soundData.procent
    else {
      this.changeSoundProcent(name, 100)
      return 100
    }
  }

  public changeSoundProcent(name: string, procent: number): void {
    const newSoundArray = this.sounds.filter((sound) => sound.name !== name)
    newSoundArray.push({name: name, procent: procent})
    this.sounds = newSoundArray
    localStorage.setItem(UserData.SOUND_OBJECT_NAME, JSON.stringify(this.sounds))
  }
}