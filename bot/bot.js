const mineflayer = require("mineflayer")
const Vec3 = require("vec3")

module.exports = function createBot(args) {
  var bot = mineflayer.createBot(args)
  bot.onTick = []
  bot.autoRejoin = true
  
}
