export default class UserData {

  private static readonly COIN_OBJECT_NAME: string = 'coins';

  private static readonly QUESTIONS_OBJECT_NAME: string = 'questions'

  private coins: number;

  private questions: {question: string, answers: {answer: string, correct: boolean}[], questionInfo: string, id: number}[];
  
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

  
}