const mineflayer = require("mineflayer")
const Vec3 = require("vec3")

module.exports = function createBot(args) {
  var bot = mineflayer.createBot(args)
  bot.onTick = []
  bot.autoRejoin = true
  bot.ownerAuthed = []
  bot.trustAuthed = []
  bot.ownerHash = ""
  bot.prefix = "+"
  bot.globalPrefix = "testbot:"
  bot.blacklist = []
  bot.regexFilter = []
  bot.bannedUsers = []

  bot.on("physicTick", () => {
    if (bot.onTick[0] != undefined) {
      for (var i = 0; i < bot.onTick.length; i++) {
        bot.onTick[i]()
      }
    }
  })

  
}
