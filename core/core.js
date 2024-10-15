const Vec3 = require("vec3")
module.exports = function addCore(bot) {
  bot.core = {
    size: [20, 2, 20],
    origin: [0, 0, 0],
    currentBlock: [0, 0, 0],
    allocated: {
      // Format:
      // ["x,y,z"]: { block: "command_block", properties: "[facing=west,conditional=true]", nbt: '{Command:"say Hello World'}" }
    }
  }

  bot.core.getTrueCurrentPos = () => {
    return new Vec3(bot.core.origin[0] + bot.core.currentBlock[0], bot.core.origin[1] + bot.core.currentBlock[1], bot.core.origin[2] + bot.core.currentBlock[2])
  }

  // Initialise core (set core origin and start selfcare function)
  bot.core.init = () => {
    
  }
  
  // Returns false if there is a command block missing from the bot core
  bot.core.check = () => {
    
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
    
  }
}
