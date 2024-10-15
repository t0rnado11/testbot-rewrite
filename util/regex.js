var regex = {}

regex.matchPlayers = (bot, reg) => {
  for (const [k, v] of Object.entries(bot.players)) {
    if (reg.test(k)) {
      return true;
    }
  }
  return false;
}

regex.isMatch = (str, reg) => {
  return reg.test(str)
}

module.exports = regex
