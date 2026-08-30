// オリジナルの絵柄でプリンセス風キャラクターを描くSVG生成。
// 実在キャラクターのイラストをコピーするのではなく、
// 髪型・髪色・ドレスの色・小物の組み合わせで似た雰囲気を作る。

function hairBack(style, hair) {
  switch (style) {
    case "long":
    case "wavy":
      return `<path d="M45 70 Q30 150 55 220 L75 220 Q60 140 65 75 Z
                       M155 70 Q170 150 145 220 L125 220 Q140 140 135 75 Z"
                fill="${hair}"/>`;
    case "superlong":
      return `<path d="M42 65 Q20 170 40 238 L66 238 Q52 160 62 70 Z
                       M158 65 Q180 170 160 238 L134 238 Q148 160 138 70 Z"
                fill="${hair}"/>`;
    case "braid":
      return `<path d="M140 60 Q175 90 160 130 Q180 150 165 190 Q182 205 168 225
                        L150 220 Q168 200 152 185 Q170 145 148 128 Q166 95 128 68 Z"
                fill="${hair}"/>
              <circle cx="152" cy="128" r="6" fill="${hair}" opacity="0.6"/>
              <circle cx="163" cy="188" r="6" fill="${hair}" opacity="0.6"/>`;
    case "twinbraid":
      return `<path d="M48 70 Q30 100 42 140 L58 140 Q50 105 62 75 Z
                       M152 70 Q170 100 158 140 L142 140 Q150 105 138 75 Z"
                fill="${hair}"/>`;
    case "ponytail":
      return `<path d="M150 55 Q195 75 180 130 Q195 150 175 175 L158 168
                        Q175 145 162 125 Q175 85 132 68 Z" fill="${hair}"/>`;
    case "curly":
      return `<g fill="${hair}">
                <circle cx="42" cy="95" r="18"/><circle cx="40" cy="125" r="16"/>
                <circle cx="158" cy="95" r="18"/><circle cx="160" cy="125" r="16"/>
                <circle cx="50" cy="150" r="14"/><circle cx="150" cy="150" r="14"/>
              </g>`;
    case "bob":
    case "updo":
    default:
      return `<path d="M40 75 Q35 130 55 155 L65 150 Q50 115 58 78 Z
                       M160 75 Q165 130 145 155 L135 150 Q150 115 142 78 Z"
                fill="${hair}"/>`;
  }
}

function hairFront(style, hair) {
  const bangs = `<path d="M45 78 Q50 30 100 28 Q150 30 155 78
                          Q140 55 100 55 Q60 55 45 78 Z" fill="${hair}"/>`;
  if (style === "updo") {
    return `${bangs}<circle cx="100" cy="32" r="20" fill="${hair}"/>`;
  }
  return bangs;
}

function accessorySVG(type, color) {
  switch (type) {
    case "tiara":
      return `<path d="M70 32 L80 8 L92 26 L100 4 L108 26 L120 8 L130 32 Z"
                fill="none" stroke="${color}" stroke-width="4" stroke-linejoin="round"/>
               <circle cx="100" cy="16" r="4" fill="${color}"/>`;
    case "ribbon":
      return `<g transform="translate(140,45)">
                <path d="M0 0 L-18 -12 L-16 4 Z" fill="${color}"/>
                <path d="M0 0 L18 -12 L16 4 Z" fill="${color}"/>
                <circle cx="0" cy="0" r="5" fill="${color}"/>
              </g>`;
    case "bow":
      return `<g transform="translate(60,40)">
                <path d="M0 0 L-20 -10 L-18 8 Z" fill="${color}"/>
                <path d="M0 0 L20 -10 L18 8 Z" fill="${color}"/>
                <circle cx="0" cy="0" r="5" fill="${color}"/>
              </g>`;
    case "feather":
      return `<path d="M158 40 Q175 10 168 -10 Q160 15 150 35 Z" fill="${color}"/>`;
    case "flower":
      return `<g transform="translate(150,55)">
                <circle cx="0" cy="-8" r="6" fill="${color}"/>
                <circle cx="7" cy="-2" r="6" fill="${color}"/>
                <circle cx="-7" cy="-2" r="6" fill="${color}"/>
                <circle cx="0" cy="5" r="6" fill="${color}"/>
                <circle cx="0" cy="-1" r="5" fill="#fff8c9"/>
              </g>`;
    case "shell":
      return `<g transform="translate(100,190)">
                <path d="M-14 10 Q0 -14 14 10 Q0 4 -14 10 Z" fill="${color}"/>
              </g>`;
    case "book":
      return `<g transform="translate(100,205)">
                <rect x="-20" y="-8" width="40" height="16" rx="2" fill="${color}"/>
                <rect x="-1.5" y="-8" width="3" height="16" fill="#fff" opacity="0.6"/>
              </g>`;
    case "snowflake":
      return `<g transform="translate(155,45)" stroke="${color}" stroke-width="3" stroke-linecap="round">
                <line x1="0" y1="-10" x2="0" y2="10"/>
                <line x1="-9" y1="-5" x2="9" y2="5"/>
                <line x1="-9" y1="5" x2="9" y2="-5"/>
              </g>`;
    default:
      return "";
  }
}

function renderPortraitSVG(p) {
  return `
  <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="プリンセスのイラスト">
    <path d="M55 145 Q100 130 145 145 L170 232 L30 232 Z" fill="${p.dress}"/>
    <path d="M85 140 L115 140 L120 165 L100 175 L80 165 Z" fill="${p.dressAccent}" opacity="0.85"/>
    <rect x="88" y="118" width="24" height="24" rx="6" fill="${p.skin}"/>
    ${hairBack(p.hairStyle, p.hair)}
    <circle cx="100" cy="80" r="55" fill="${p.skin}"/>
    <circle cx="78" cy="90" r="5" fill="#2b2b2b"/>
    <circle cx="122" cy="90" r="5" fill="#2b2b2b"/>
    <circle cx="70" cy="103" r="8" fill="#ff9aa8" opacity="0.6"/>
    <circle cx="130" cy="103" r="8" fill="#ff9aa8" opacity="0.6"/>
    <path d="M85 108 Q100 118 115 108" stroke="#c0526b" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${hairFront(p.hairStyle, p.hair)}
    ${accessorySVG(p.accessory, p.accessoryColor)}
  </svg>`;
}
