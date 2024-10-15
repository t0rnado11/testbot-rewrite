// this module doesn't serve much purpose other than making code look nice

var Command = {}

Command.new = (name, aliases, perm, callback) => {
  return {
    name: name,
    aliases: aliases,
    permission: perm,
    func: callback
  }
}

module.exports = Command
