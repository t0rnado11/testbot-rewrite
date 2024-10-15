const Vec3 = require("vec3")
module.exports = function addCore(bot) {
  bot.core = {
    size: [20, 2, 20],
    origin: [0, 0, 0],
    endPoint = [20, 2, 20]
    currentBlock: [0, 0, 0],
    allocated: {
      // Format:
      // ["x,y,z"]: { block: "command_block", properties: "[facing=west,conditional=true]", nbt: '{Command:"say Hello World'}" }
    }
  }

  bot.core.getTrueCurrentPos = () => {
    return new Vec3(bot.core.origin[0] + bot.core.currentBlock[0], bot.core.origin[1] + bot.core.currentBlock[1], bot.core.origin[2] + bot.core.currentBlock[2])
  }
  
  bot.core.getTruePos = (arr) => {
    return new Vec3(arr[0], arr[1], arr[2])
  }

  bot.core.refill = () => {
    if (bot.blockAt(bot.core.getTruePos(bot.core.origin)) != undefined && !bot.blockAt(bot.core.getTruePos(bot.core.origin)).name.includes("repeating_command-block")) {
      bot.write("chat_command", {
        command: "/setblock "+bot.core.origin[0].toString()+" "+bot.core.origin[1].toString()+" "+bot.core.origin[2].toString()+" repeating_command_block{CustomName:'{\"text\":\"TestBot Core\",\"color\":\"light_purple\"}'}",
        timestamp: BigInt(Date.now()),
        salt: 0n,
        argumentSignatures: [],
        signedPreview: false,
        messageCount: 0,
        acknowledged: Buffer.alloc(3),
        previousMessages: []
      })
    }

    bot.write("update_command_block", {
      location: bot.core.getTruePos(bot.core.origin),
      command: "fill " + bot.core.origin.toString().replace(","," ") + " " + bot.core.endPoint.toString().replace(","," ") + " repeating_command_block{CustomName:'{\"text\":\"TestBot Core\",\"color\":\"light_purple\"}'}",
      flags: 0b100,
      mode: 1
    })

    for (const [k, v] of Object.entries(bot.core.allocated)) {
      bot.write("update_command_block", {
        location: bot.core.getTruePos(bot.core.origin),
        command: "setblock " + k.toString().replace(","," ") + bot.allocated[k].block + bot.allocated[k].properties + bot.allocated[k].nbt
        flags: 0b100,
        mode: 1
      })
    }
  }

  // Initialise core (set core origin and start selfcare function)
  bot.core.init = () => {
    bot.core.origin = [Math.floor(bot.entity.position.x-bot.core.size[0]/2), Math.floor(bot.entity.position.y-1), Math.floor(bot.entity.position.z-bot.core.size[2]/2)]
    bot.core.endPoint = [bot.core.origin[0]+bot.core.size[0], bot.core.origin[1]+bot.core.size[1], bot.core.origin[2]+bot.core.size[2]]
    
    bot.onTick.push(() => {
      if (!bot.core.check()) {
        bot.core.refill()
      }
    })
  }
  
  // Returns false if there is a command block missing from the bot core
  bot.core.check = () => {
    for (var x = 0; x <= bot.core.size[0]; x++) {
      for (var z = 0; z <= bot.core.size[2]; z++) {
        for (var y = 0; y <= bot.core.size[1]; y++) {
          if (bot.core.allocated[x.toString()+","+y.toString()+","+z.toString()] != undefined) {
            if (bot.blockAt(new Vec3(x, y, z)) != undefined && !bot.blockAt(new Vec3(x, y, z)).name.includes(bot.core.allocated[x.toString()+","+y.toString()+","+z.toString()].block)) {
              return false
            }
          } else {
            if (bot.blockAt(new Vec3(x, y, z)) != undefined && !bot.blockAt(new Vec3(x, y, z)).name.includes("repeating_command_block")) {
              return false
            }
          }
        }
      }
    }
    return true
  }

  // Increments the currentBlock value by 1
  bot.core.incrementCurrentBlock = () => {
    bot.core.currentBlock[0] += 1
    if (bot.core.currentBlock[0] >= bot.core.size[0]) {
      bot.core.currentBlock[0] = 0
      bot.core.currentBlock[2] += 1
    }
    if (bot.core.currentBlock[2] >= bot.core.size[2]) {
      bot.core.currentBlock[2] = 0
      bot.core.currentBlock[1] += 1
    }
    if (bot.core.currentBlock[1] >= bot.core.size[1]) {
      bot.core.currentBlock = [0, 0, 0]
    }
    if (allocated[bot.core.currentBlock[0].toString()+","+bot.core.currentBlock[1].toString()+","+bot.core.currentBlock[2].toString()] != undefined) {
      bot.core.incrementCurrentBlock()
    }
  }

  // Runs a command through the core
  bot.core.run = (commands) => {
    if (typeof(commands) == "string") {
      bot.write("update_command_block", {
        location: bot.core.getTrueCurrentPos(),
        command: commands,
        flags: 0b100,
        mode: 1
      })
    } else {
      for (var i = 0; i < commands.length; i++) {
        command = commands[i]
        bot.write("update_command_block", {
          location: bot.core.getTrueCurrentPos(),
          command: command,
          flags: 0b100,
          mode: 1
        })
      }
    }
  }

  // Allocates a specific area of the bot's core to be used for specific tasks
  // For example, a cloop that requires conditional command blocks
  // Areas of the core that have been allocated to something else will be skipped in the
  // incrementCurrentBlock() function
  bot.core.alloc = (relativePos, args) => {
    if (relativePos == [0, 0, 0]) {
      bot.output("Cannot allocate core root")
    } else {
      bot.core.allocated[(bot.core.origin[0]+relativePos[0]).toString()+","+(bot.core.origin[1]+relativePos[1]).toString()+","+(bot.core.origin[2]+relativePos[2]).toString()] = args
    }
  }
}
