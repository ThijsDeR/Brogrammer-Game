export default class UserData {

  private static readonly COIN_OBJECT_NAME: string = 'coins';
  private coins: number;

  // TODO: Look at this later.
  // private upgrades: string[];
  
  public constructor() {
    if (localStorage.getItem(UserData.COIN_OBJECT_NAME)) {
      this.coins = Number(localStorage.getItem(UserData.COIN_OBJECT_NAME))
    } else {
      this.coins = 0
      localStorage.setItem(UserData.COIN_OBJECT_NAME, `${this.coins}`)
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
}