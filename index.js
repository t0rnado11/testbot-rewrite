const createBot = require("./bot/bot.js")
const hash = require("./util/hash.js")

createBot(hash.genHash(), {
  host: "kaboom.pw",
  username: "testbot_"+hash.randomstring(5),
  version: "1.20.1"
})
