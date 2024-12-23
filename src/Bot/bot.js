require("dotenv").config();
const { Telegraf } = require("telegraf");
const TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(TOKEN);

const web_link = process.env.WEB_LINK;

bot.command("start", (ctx) =>
  ctx.reply("Welcome to TON Wallet Manager", {
    reply_markup: {
      keyboard: [[{ text: "Open Wallet Manager", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
