const { cmd } = require('../lib')

const stickers = [
"https://raw.githubusercontent.com/siraj-7/plugins-secktor/main/sticker/1.webp",
"https://raw.githubusercontent.com/siraj-7/plugins-secktor/main/sticker/2.webp",
"https://raw.githubusercontent.com/siraj-7/plugins-secktor/main/sticker/3.webp",
"https://raw.githubusercontent.com/siraj-7/plugins-secktor/main/sticker/4.webp",
"https://raw.githubusercontent.com/siraj-7/plugins-secktor/main/sticker/5.webp",
"https://raw.githubusercontent.com/siraj-7/plugins-secktor/main/sticker/6.webp"
];

cmd({
pattern: 'dice',
}, async (Void, citel, text) => {
const randomIndex = Math.floor(Math.random() * stickers.length);
const randomSticker = stickers[randomIndex];

await Void.sendMessage(citel.chat, { sticker: { url: randomSticker } });
});
