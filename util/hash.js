module.exports = function genHash() {
    var s = ""
    for (var i = 0; i < Math.floor(Math.random()*25)+10; i++) {
        if (Math.floor(Math.random()*2) == 0) {
            if (Math.floor(Math.random()*2) == 0) {
                s = s + String.fromCharCode(Math.floor(Math.random()*26)+65)
            } else {
                s = s + String.fromCharCode(Math.floor(Math.random()*26)+65).toUpperCase()
            }
        } else {
            s = s + Math.floor(Math.random()*10).toString()
        }
    }
    return s
}
