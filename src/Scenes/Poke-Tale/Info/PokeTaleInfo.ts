export default abstract class PokeTaleInfo {
  public static readonly PLAYER_Y_SPEED: number = 9;

  public static readonly PLAYER_X_SPEED: number = 9;

  public static readonly PLAYER_HEALTH: number = 100;

  public static readonly ENEMY_HEALTH: number = 50;

  public static readonly WIN_SCORE: number = 3;

  public static readonly WIN_COIN_AMOUNT: number = 10;

  public static readonly COMPLETE_SCORE_AWARD: number = 100;

  public static readonly WIN_SOUND_VOLUME: number = 3/5;

  public static readonly BACKGROUND_MUSIC_VOLUME: number = 1/20;

  public static readonly CORRECT_SOUND_VOLUME: number = 3/5;

  public static readonly WRONG_SOUND_VOLUME: number = 4/5;

  // Text
  public static readonly SCORE_TEXT_X_POS: number = 1/2 // width

  public static readonly SCORE_TEXT_Y_POS: number = 1/20 // height

  public static readonly SCORE_TEXT_FONT_SIZE: number = 1/50 // height

  public static readonly POKE_TALE_PROGRESS_OBJECT_NAME: string = 'poke'

  public static readonly PROMPTS: {prompt: string, moves: {move: string, correct: boolean}[], promptInfo: string, id: number}[] = [
    {prompt: 'Ghostleh probeert je uit te lokken.', moves: [
      {move: 'Negeren', correct: true},
      {move: 'Weglopen', correct: true},
      {move: 'Slaan', correct: false},
      {move: 'Boos worden', correct: false}],
      promptInfo: 'Wanneer je de uitlokker negeert krijgt hij geen plezier van het irriteren, waardoor hij stopt',
      id: 1
    },
    {prompt: 'Ghostleh is je belachelijk aan het maken.', moves: [
      {move: 'Boos worden', correct: false},
      {move: 'Bedanken', correct: false},
      {move: 'Sla hem', correct: false},
      {move: 'Negeren', correct: true}],
      promptInfo: 'Door geen aandacht te geven haalt de pester hier geen plezier uit, waardoor hij stopt',
      id: 2
    },
    {prompt: 'Ghostleh zegt dat hij je credit-card gegevens nodig heeft.', moves: [
      {move: 'Gegevens geven', correct: false},
      {move: 'Niet geven', correct: true},
      {move: 'Online zetten', correct: false},
      {move: 'Gegevens van mama geven', correct: false}],
      promptInfo: 'Je moet nooit je credit-card gegevens aan andere mensen geven',
      id: 3
    },
    {prompt: 'Ghostleh biedt je een snoepje aan.', moves: [
      {move: 'Aanemen', correct: false},
      {move: 'Niet aanemen', correct: true},
      {move: 'Bedanken', correct: false},
      {move: 'Wegrennen', correct: true}],
      promptInfo: 'Neem nooit snoep aan van vreemden',
      id: 4
    },
    {prompt: 'Ghostleh zegt dat je aardig bent', moves: [
        {move: 'Bedanken', correct: true},
        {move: 'Boos worden', correct: false},
        {move: 'Terug complimenteren', correct: true},
        {move: 'Weglopen', correct: false}],
      promptInfo: 'Je krijgt een compliment, het zou dan aardig zijn om te bedanken of terug te complimenteren',
      id: 5
    },
    {prompt: 'Ghostleh post een foto van je op instagram zonder je toestemming', moves: [
      {move: 'Vragen of hij de foto wilt verwijderen', correct: true},
      {move: 'De foto rapporteren', correct: true},
      {move: 'De foto accepteren en liken', correct: false},
      {move: 'Doorsturen', correct: false}],
      promptInfo: 'Als er ongevraagd een foto word gepost rapporteer je de foto en sprrek je de persoon an',
      id: 6
    },
    {prompt: 'Ghostleh weet je wachtwoord van TikTok! wat ga je doen?', moves: [
      {move: 'Het wachtwoord veranderen', correct: true},
      {move: 'Niks doen', correct: false},
      {move: 'Het account samen delen', correct: false},
      {move: 'Je account verwijderen', correct: false}],
      promptInfo: 'Als iemand toegang heeft tot je account, verander dan direct het wachtwoord',
      id: 7
    },
    {prompt: 'Ghostleh stuurt je een raar linkje op!', moves: [
      {move: 'Stuur de link door naar al je vrienden', correct: false},
      {move: 'Klik op de link', correct: false},
      {move: 'Negeer de link', correct: true},
      {move: 'Rapporteer de link', correct: true}],
      promptInfo: 'Klik nooit op rare linkjes',
      id: 8
    },
    {prompt: 'Ghostleh zegt dat hij 12 jaar oud is en een instagram account heeft', moves: [
      {move: 'Rapporteren', correct: true},
      {move: 'Accepteren', correct: false},
      {move: 'Niks doen', correct: false},
      {move: 'Chatten', correct: false}],
      promptInfo: 'Als iemand zich voordoet als iemand anders moet je hem rapporteren',
      id: 9
    },
    {prompt: 'Ghostleh vraagt of je hem geld kan voorschieten', moves: [
      {move: 'Je helpt hem', correct: false},
      {move: 'Je stuurt hem naar iemand anders', correct: false},
      {move: 'Je geeft hem geen geld', correct: true},
      {move: 'Je zegt dat je geen geld hebt', correct: true}],
      promptInfo: 'Mensen geld voorschieten is een slecht idee',
      id: 10
    },
    {prompt: 'Ghostleh stelt voor om een keer af te spreken', moves: [
      {move: 'Je spreekt niet af', correct: false},
      {move: 'Je spreekt af en nodigt een aantal vrienden uit', correct: false},
      {move: 'Je blokkeerd hem', correct: true},
      {move: 'Je spreekt af', correct: false}],
      promptInfo: 'Ontmoet nooit vreemden van het internet',
      id: 11
    },
  ]
}
