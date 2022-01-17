export default class UserData {

  private static readonly COIN_OBJECT_NAME: string = 'coins';

  private static readonly QUESTIONS_OBJECT_NAME: string = 'questions'

  private static readonly SKINS_OBJECT_NAME: string = 'skins'

  private static readonly CURRENT_SKIN_OBJECT_NAME: string = 'current_skin'

  private coins: number;

  private questions: {question: string, answers: {answer: string, correct: boolean}[], questionInfo: string, id: number}[];

  private skins: {src: string, id: number}[];

  private currentSkin: number;
  
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
        {src: './assets/img/Sam_Suong/robot-preview.png', id: 0}
      ]
      localStorage.setItem(UserData.SKINS_OBJECT_NAME, JSON.stringify(this.skins))
    }

    if (localStorage.getItem(UserData.CURRENT_SKIN_OBJECT_NAME)) {
      this.currentSkin = Number(localStorage.getItem(UserData.CURRENT_SKIN_OBJECT_NAME))
    } else {
      this.currentSkin = 0
      localStorage.setItem(UserData.CURRENT_SKIN_OBJECT_NAME, `${this.currentSkin}`)
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

  public addSkin(skin: {src: string, id: number}): void {
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

  public getCurrentSkin(): {src: string, id: number} {
    return this.skins[this.currentSkin]
  }
}