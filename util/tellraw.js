var values = {
    [0]:  "0", [1]:  "1", [2]:  "2", [3]:  "3",
    [4]:  "4", [5]:  "5", [6]:  "6", [7]:  "7",
    [8]:  "8", [9]:  "9", [10]: "A", [11]: "B",
    [12]: "C", [13]: "D", [14]: "E", [15]: "F"
  }

function dec_to_hex(n) {
  return Math.floor(n/15) + (n % 15)
}

function rgb_to_hex(rgb) {
  return "#" + dec_to_hex(rgb[0]).toString() + dec_to_hex(rgb[1]).toString() + dec_to_hex(rgb[2]).toString()
}

function calculateGradient(col1, col2, segments) {
  var rStep = (col2[0]-col1[0])/(segments-1)
  var gStep = (col2[1]-col1[1])/(segments-1)
  var bStep = (col2[2]-col1[2])/(segments-1)

  list = []
  for (var i = 0; i <= segments; i++) {
    list[list.length] = rgb_to_hex([(col1[0] + (i*rStep)), (col1[1] + (i*gStep)), (col1[2] + (i*bStep))])
  }

  return list
}

function gradientText(txt, col1, col2, italic = false, bold = false, underline = false, strikethrough = false, obfuscated = false) {
  var cList = calculateGradient(col1, col2, txt.length)
  var base = ""
  if (italic) { base = base + `{"italic":true}` }
  if (bold) { base = base + `{"bold":true}` } else { base = base + `{"bold":false}` }
  if (underline) { base = base + `{"underline":true}` }
  if (strikethrough) { base = base + `{"strikethrough":true}` }
  if (obfuscated) { base = base + `{"obfuscated":true}` }

  for (var i = 0; i < cList.length; i++) {
    base = base + "{\"text\":\""+txt.substring(i, i+1)+"\",\"color\":\""+cList[i]+"\"}"
  }
  return base
}

function getTellraw(txt, col, italic = false, bold = false, underline = false, strikethrough = false, obfuscated = false) {
  var base = "{"
  if (italic) { base = base + `"italic":true,` }
  if (bold) { base = base + `"bold":true,` } else { base = base.base + `"bold":false,` }
  if (underline) { base = base + `"underline":true,` }
  if (strikethrough) { base = base + `"strikethrough":true,` }
  if (obfuscated) { base = base + `"obfuscated":true,` }

  base = base + `,"text":"`+txt+`","color":"`+col+`"}`
  return base
}

module.exports = {
  calculateGradient: calculateGradient,
  gradientText: gradientText,
  getTellraw: getTellraw
}
