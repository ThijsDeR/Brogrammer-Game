export default abstract class PokeTaleInfo {
  public static readonly PLAYER_Y_SPEED: number = 9;

  public static readonly PLAYER_X_SPEED: number = 9;

  public static readonly WIN_SCORE: number = 10;

  public static readonly WIN_SOUND_VOLUME: number = 3/5;

  // Text
  public static readonly SCORE_TEXT_X_POS: number = 1/2 // width

  public static readonly SCORE_TEXT_Y_POS: number = 1/20 // height

  public static readonly SCORE_TEXT_FONT_SIZE: number = 1/50 // height

  public static readonly POKE_TALE_PROGRESS_OBJECT_NAME: string = 'poke'

  public static readonly PROMPTS: {prompt: string, moves: {move: string, correct: boolean}[], promptInfo: string, id: number}[] = [
    {prompt: 'Ghostleh probeert je uit te lokken.', moves: [
      {move: 'negeren', correct: true},
      {move: 'weglopen', correct: false},
      {move: 'slaan', correct: false},
      {move: 'boos worden', correct: false}],
      promptInfo: 'Wanneer je de uitlokker negeert krijgt hij geen plezier van het irriteren, waardoor hij stopt',
      id: 1
    },
    {prompt: 'Ghostleh is je belachelijk aan het maken.', moves: [
      {move: 'boos worden', correct: false},
      {move: 'bedanken', correct: false},
      {move: 'slaan', correct: true},
      {move: 'negeren', correct: false}],
      promptInfo: 'Door geen aandacht te geven haalt de pester hier geen plezier uit, waardoor hij stopt',
      id: 2
    },
    {prompt: 'Ghostleh zegt dat hij je credit-card gegevens wilt hebben.', moves: [
      {move: 'gegevens geven', correct: false},
      {move: 'niet geven', correct: true},
      {move: 'online zetten', correct: false},
      {move: 'Gegevens van mama geven', correct: false}],
      promptInfo: 'Je moet nooit je credit-card gegevens aan andere mensen geven',
      id: 3
    },
    {prompt: 'Ghostleh biedt je een snoepje aan.', moves: [
      {move: 'aanemen', correct: false},
      {move: 'niet aanemen', correct: true},
      {move: 'bedanken', correct: false},
      {move: 'wegrennen', correct: false}],
      promptInfo: 'Neem nooit snoep aan van vreemden',
      id: 4
    },
    {prompt: 'Ghostleh zegt dat je aardig bent', moves: [
      {move: 'bedanken', correct: true},
      {move: 'boos worden', correct: false},
      {move: 'terug complimenteren', correct: true},
      {move: 'be tsun about it', correct: false}],
      promptInfo: 'Je krijgt een compliment, het zou dan aardig zijn om te bedanken of terug te complimenteren',
      id: 5
    },
  ]
}
