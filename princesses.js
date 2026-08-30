// プリンセスのデータ一覧。
// 画像は実在キャラクターの絵をそのまま使うのではなく、
// 髪の色・ドレスの色・小物などの特徴からオリジナルのイラストを組み立てて表示する。
const PRINCESSES = [
  {
    id: "snowwhite",
    name: "白雪姫",
    accepts: ["しらゆきひめ", "しらゆき", "スノーホワイト", "しろゆきひめ"],
    skin: "#ffe0bd", hair: "#2b2b2b", hairStyle: "bob",
    dress: "#3b6fd1", dressAccent: "#ffd23f",
    accessory: "ribbon", accessoryColor: "#e63946",
  },
  {
    id: "cinderella",
    name: "シンデレラ",
    accepts: ["シンデレラ", "しんでれら"],
    skin: "#ffe0bd", hair: "#e8c15a", hairStyle: "updo",
    dress: "#8ec9e8", dressAccent: "#ffffff",
    accessory: "tiara", accessoryColor: "#c9a227",
  },
  {
    id: "aurora",
    name: "オーロラ姫",
    accepts: ["オーロラひめ", "おーろらひめ", "オーロラ", "ねむれるもりのびじょ"],
    skin: "#ffe0bd", hair: "#d9a441", hairStyle: "long",
    dress: "#e78fb3", dressAccent: "#7fc8e8",
    accessory: "tiara", accessoryColor: "#c9a227",
  },
  {
    id: "ariel",
    name: "アリエル",
    accepts: ["アリエル", "ありえる", "にんぎょひめ"],
    skin: "#ffdcb8", hair: "#e0492f", hairStyle: "long",
    dress: "#59c9c9", dressAccent: "#7b2fbe",
    accessory: "shell", accessoryColor: "#7b2fbe",
  },
  {
    id: "belle",
    name: "ベル",
    accepts: ["ベル", "べる"],
    skin: "#ffe0bd", hair: "#5a3a22", hairStyle: "updo",
    dress: "#f2c14e", dressAccent: "#f2c14e",
    accessory: "book", accessoryColor: "#7a4b2a",
  },
  {
    id: "jasmine",
    name: "ジャスミン",
    accepts: ["ジャスミン", "じゃすみん"],
    skin: "#e8b189", hair: "#1c1c1c", hairStyle: "ponytail",
    dress: "#3fbf9f", dressAccent: "#3fbf9f",
    accessory: "tiara", accessoryColor: "#3fbf9f",
  },
  {
    id: "pocahontas",
    name: "ポカホンタス",
    accepts: ["ポカホンタス", "ぽかほんたす"],
    skin: "#d99a66", hair: "#2b1a0f", hairStyle: "long",
    dress: "#c98a4b", dressAccent: "#8a5a2b",
    accessory: "feather", accessoryColor: "#e63946",
  },
  {
    id: "mulan",
    name: "ムーラン",
    accepts: ["ムーラン", "むーらん"],
    skin: "#ffe0bd", hair: "#1c1c1c", hairStyle: "updo",
    dress: "#e05b6b", dressAccent: "#f2c14e",
    accessory: "flower", accessoryColor: "#f2c14e",
  },
  {
    id: "rapunzel",
    name: "ラプンツェル",
    accepts: ["ラプンツェル", "らぷんつぇる"],
    skin: "#ffe0bd", hair: "#e8d34a", hairStyle: "superlong",
    dress: "#a06fd1", dressAccent: "#ffd23f",
    accessory: "flower", accessoryColor: "#e05b6b",
  },
  {
    id: "merida",
    name: "メリダ",
    accepts: ["メリダ", "めりだ"],
    skin: "#ffe0bd", hair: "#e0672b", hairStyle: "curly",
    dress: "#2f9e5b", dressAccent: "#0b5d33",
    accessory: "bow", accessoryColor: "#5a3a22",
  },
  {
    id: "tiana",
    name: "ティアナ",
    accepts: ["ティアナ", "てぃあな"],
    skin: "#8a5a3b", hair: "#1c1c1c", hairStyle: "bob",
    dress: "#2f9e5b", dressAccent: "#f2c14e",
    accessory: "flower", accessoryColor: "#f2c14e",
  },
  {
    id: "moana",
    name: "モアナ",
    accepts: ["モアナ", "もあな"],
    skin: "#c9884f", hair: "#2b1a0f", hairStyle: "wavy",
    dress: "#e0672b", dressAccent: "#f2c14e",
    accessory: "flower", accessoryColor: "#f2c14e",
  },
  {
    id: "elsa",
    name: "エルサ",
    accepts: ["エルサ", "えるさ"],
    skin: "#ffe9de", hair: "#e8e8e8", hairStyle: "braid",
    dress: "#bfe9f5", dressAccent: "#8ec9e8",
    accessory: "snowflake", accessoryColor: "#8ec9e8",
  },
  {
    id: "anna",
    name: "アナ",
    accepts: ["アナ", "あな"],
    skin: "#ffe0bd", hair: "#c9762b", hairStyle: "twinbraid",
    dress: "#2f5d9e", dressAccent: "#2f9e5b",
    accessory: "flower", accessoryColor: "#e05b6b",
  },
];

function normalizeSpeech(text) {
  return text
    .replace(/[\s　、。！？!?.,]/g, "")
    .replace(/[ぁ-ん]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60)); // hiragana -> katakana
}

function isMatch(princess, spokenText) {
  const normSpoken = normalizeSpeech(spokenText);
  return princess.accepts.some((word) => {
    const normWord = normalizeSpeech(word);
    return normSpoken.includes(normWord) || normWord.includes(normSpoken);
  }) || normalizeSpeech(princess.name) === normSpoken;
}
