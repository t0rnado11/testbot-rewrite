const mineflayer = require("mineflayer")
const Vec3 = require("vec3")
const addCore = require("../core/core.js")
const gradient = require("../util/tellraw.js")
const regex = require("../util/regex.js")

module.exports = function createBot(ownerHash, args) {
  var bot = mineflayer.createBot(args)
  bot.onTick = []
  bot.autoRejoin = true
  bot.ownerAuthed = []
  bot.trustAuthed = []
  bot.ownerHash = ownerHash
  bot.prefix = "+"
  bot.globalPrefix = "testbot:"
  bot.blacklist = []
  bot.regexFilter = []
  bot.bannedUsers = []
  bot.cloops = []
  bot.protectedCloops = []
  bot.donkeyCount = 0
  bot.opped = true

  addCore(bot)
  bot.core.init()

  bot.on("physicTick", () => {
    if (bot.onTick[0] != undefined) {
      for (var i = 0; i < bot.onTick.length; i++) {
        bot.onTick[i]()
        bot.write("chat_command", {
          command: "/op @s[type=player]",
          timestamp: BigInt(Date.now()),
          salt: 0n,
          argumentSignatures: [],
          signedPreview: false,
          messageCount: 0,
          acknowledged: Buffer.alloc(3),
          previousMessages: []
        })
      }
    }
  })

  bot._client.on("packet", (data, packetMeta, buffer, fullBuffer) => {
    if (packetMeta["name"] == "entity_status") {
      if (data["entityStatus"] == 24) {
        bot.opped = false
      }
      if (data["entityStatus"] == 28) {
        bot.opped = true
      }
    }
  })
}
