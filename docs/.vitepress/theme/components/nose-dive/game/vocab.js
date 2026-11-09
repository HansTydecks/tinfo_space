// Nose Dive – die 100 unregelmäßigen Verben in 10 Stufen (tiers).
//
// Format pro Zeile:  infinitive | simple past | past participle | deutsch | falsche Formen | auch richtig (past) | auch richtig (pp)
//
// - "falsche Formen" sind typische Schülerfehler (goed, wented …). Sie dürfen nie eine echte Form des Verbs sein.
// - "auch richtig" sind Formen, die ebenfalls korrekt sind (hanged, shined, gotten …). Sie werden nie als falsche
//   Antwort angeboten – auch nicht als „die andere Form“ (z. B. showed als 3. Form von show).

const DATA = [
  // Stufe 1
  ['be|was/were|been|sein|beed,wased,weren'],
  ['have|had|had|haben|haved,haded,hadden'],
  ['do|did|done|tun, machen|doed,dided,doned'],
  ['say|said|said|sagen|sayed,saided,sayen'],
  ['go|went|gone|gehen|goed,wented,goned'],
  ['get|got|got|bekommen|getted,gotted,getten||gotten'],
  ['make|made|made|machen|maked,maded,maden'],
  ['know|knew|known|wissen, kennen|knowed,knewed,knewn'],
  ['think|thought|thought|denken|thinked,thoughted,thunk'],
  ['take|took|taken|nehmen|taked,tooked,tooken'],
  // Stufe 2
  ['see|saw|seen|sehen|seed,seened,sawen'],
  ['come|came|come|kommen|comed,camed,camen'],
  ['give|gave|given|geben|gived,gaved,gaven'],
  ['find|found|found|finden|finded,founden,fand'],
  ['tell|told|told|erzählen, sagen|telled,tolded,tolden'],
  ['become|became|become|werden|becomed,becamed,becamen'],
  ['show|showed|shown|zeigen|showned,showded,shewn||showed'],
  ['leave|left|left|verlassen|leaved,lefted,leaven'],
  ['feel|felt|felt|fühlen|feeled,felted,feelt'],
  ['put|put|put|legen, stellen|putted,puted,putten'],
  // Stufe 3
  ['bring|brought|brought|bringen|bringed,brang,brung'],
  ['begin|began|begun|beginnen|beginned,beganed,begunned'],
  ['keep|kept|kept|behalten|keeped,kepted,kepten'],
  ['hold|held|held|halten|holded,helded,helt'],
  ['write|wrote|written|schreiben|writed,wroted,wroten'],
  ['stand|stood|stood|stehen|standed,stooded,stooden'],
  ['hear|heard|heard|hören|heared,hearded,hearen'],
  ['let|let|let|lassen|letted,leted,letten'],
  ['mean|meant|meant|bedeuten, meinen|meaned,meanted,ment'],
  ['set|set|set|setzen, stellen|setted,seted,setten'],
  // Stufe 4
  ['meet|met|met|treffen|meeted,metted,metten'],
  ['run|ran|run|rennen|runned,ranned,rannen'],
  ['pay|paid|paid|bezahlen|payed,paided,payen'],
  ['sit|sat|sat|sitzen|sitted,satted,sitten'],
  ['speak|spoke|spoken|sprechen|speaked,spaked,spoked'],
  ['lie|lay|lain|liegen|layed,layen,lyed|lied|lied'],
  ['lead|led|led|führen|leaded,ledded,lod'],
  ['read|read|read|lesen|readed,readen,rad'],
  ['grow|grew|grown|wachsen|growed,grewed,grewn'],
  ['lose|lost|lost|verlieren|losed,losted,losen'],
  // Stufe 5
  ['fall|fell|fallen|fallen|falled,fellen,fallt'],
  ['send|sent|sent|schicken|sended,sented,senden'],
  ['build|built|built|bauen|builded,builted,builden'],
  ['understand|understood|understood|verstehen|understanded,understooded,understanden'],
  ['draw|drew|drawn|zeichnen|drawed,drewed,drewn'],
  ['break|broke|broken|(zer)brechen|breaked,broked,braken'],
  ['spend|spent|spent|ausgeben, verbringen|spended,spented,spenden'],
  ['cut|cut|cut|schneiden|cutted,cuted,cutten'],
  ['rise|rose|risen|steigen, aufgehen|rised,rosed,rosen'],
  ['drive|drove|driven|fahren|drived,droved,droven'],
  // Stufe 6
  ['buy|bought|bought|kaufen|buyed,boughted,baught'],
  ['wear|wore|worn|tragen (Kleidung)|weared,wored,woren'],
  ['choose|chose|chosen|wählen|choosed,chosed,choosen'],
  ['sleep|slept|slept|schlafen|sleeped,slepted,slepten'],
  ['fly|flew|flown|fliegen|flyed,flewed,flewn'],
  ['forget|forgot|forgotten|vergessen|forgetted,forgoted,forgotted'],
  ['sell|sold|sold|verkaufen|selled,solded,solden'],
  ['teach|taught|taught|unterrichten|teached,taughted,teacht'],
  ['catch|caught|caught|fangen|catched,caughted,catcht'],
  ['fight|fought|fought|kämpfen|fighted,foughted,foughten'],
  // Stufe 7
  ['throw|threw|thrown|werfen|throwed,threwed,threwn'],
  ['sing|sang|sung|singen|singt,sanged,sunged'],
  ['swim|swam|swum|schwimmen|swimmed,swammed,swimmen'],
  ['hang|hung|hung|hängen|hunged,hangen,hungen|hanged|hanged'],
  ['ring|rang|rung|klingeln|ringt,runged,rangen'],
  ['shine|shone|shone|scheinen|shoned,shinen,shinded|shined|shined'],
  ['freeze|froze|frozen|frieren|freezed,frozed,frozened'],
  ['sweep|swept|swept|fegen|sweeped,swepted,sweept'],
  ['sew|sewed|sewn|nähen|sewd,sewned,sewen||sewed'],
  ['kneel|knelt|knelt|knien|knelted,kneelt,knelten|kneeled|kneeled'],
  // Stufe 8
  ['forbid|forbade|forbidden|verbieten|forbidded,forbaded,forbadden|forbad'],
  ['flee|fled|fled|fliehen|fleed,fleded,fledden'],
  ['feed|fed|fed|füttern|feeded,feded,fedden'],
  ['bite|bit|bitten|beißen|bited,biten,boten'],
  ['hide|hid|hidden|(sich) verstecken|hided,hidded,hiden'],
  ['sink|sank|sunk|sinken|sinked,sanked,sunked|sunk'],
  ['blow|blew|blown|blasen, wehen|blowed,blewed,blewn'],
  ['hit|hit|hit|schlagen, treffen|hitted,hited,hitten'],
  ['slide|slid|slid|rutschen|slided,slidden,slidded'],
  ['hurt|hurt|hurt|verletzen, wehtun|hurted,hurten,hurtet'],
  // Stufe 9
  ['spit|spat|spat|spucken|spitten,spatted,spited|spit|spit'],
  ['split|split|split|teilen, spalten|splitted,splited,splitten'],
  ['spread|spread|spread|verbreiten|spreaded,spreded,spreaden'],
  ['spring|sprang|sprung|springen|springed,spranged,sprunged|sprung'],
  ['steal|stole|stolen|stehlen|stealed,stoled,stolened'],
  ['stick|stuck|stuck|kleben, stecken|sticked,stucked,stucken'],
  ['sting|stung|stung|stechen|stinged,stunged,stang'],
  ['stink|stank|stunk|stinken|stinked,stanked,stunked|stunk'],
  ['shoot|shot|shot|schießen|shooted,shotted,shotten'],
  ['shake|shook|shaken|schütteln|shaked,shooked,shooken'],
  // Stufe 10
  ['strike|struck|struck|schlagen, streiken|striked,strucked,strucken||stricken'],
  ['swear|swore|sworn|schwören, fluchen|sweared,swored,sworned'],
  ['swing|swung|swung|schwingen|swinged,swunged,swang'],
  ['wake|woke|woken|aufwachen, wecken|woked,wakeded,woaken|waked|waked'],
  ['seek|sought|sought|suchen|seeked,soughted,saught'],
  ['tear|tore|torn|(zer)reißen|tored,toren,tearded'],
  ['win|won|won|gewinnen|winned,wonned,wonnen'],
  ['weep|wept|wept|weinen|weeped,wepted,weept'],
  ['ride|rode|ridden|reiten, fahren|rided,roded,roden'],
  ['drink|drank|drunk|trinken|drinked,dranked,drunked'],
]

const list = (s) => (s ? s.split(',').map((w) => w.trim()).filter(Boolean) : [])

export const VERBS = DATA.map(([zeile], i) => {
  const [inf, past, pp, de, wrong, alsoPast, alsoPp] = zeile.split('|')
  return {
    id: i + 1,
    tier: Math.floor(i / 10) + 1,
    inf,
    past,
    pp,
    de,
    wrong: list(wrong),
    alsoPast: list(alsoPast),
    alsoPp: list(alsoPp),
  }
})

export const TIERS = 10

export function verbsForTiers(tiers) {
  const set = new Set(tiers)
  return VERBS.filter((v) => set.has(v.tier))
}

/** Alle Formen, die für diese Frage als richtig gelten (be: „was/were“ zählt auch als was und were). */
export function validForms(verb, form) {
  const main = verb[form]
  const also = form === 'past' ? verb.alsoPast : verb.alsoPp
  return new Set([main, ...main.split('/'), ...also])
}
