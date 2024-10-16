var regex = {}

regex.matchPlayers = (bot, reg) => {
  for (const [k, v] of Object.entries(bot.players)) {
    if (reg.test(k)) {
      return true;
    }
  }
  return false;
}

regex.match = (str, reg) => {
  return reg.test(str)
}

regex.fromString = (str) => {
  return new RegExp(str)
}

module.exports = regex
