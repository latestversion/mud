function FullMatcher(text)
{
  this.text = text
}

var _p = FullMatcher.prototype

_p.match = function(reftext)
{

}


function PartialMatcher(text)
{

  var inputtokens = text.split(" ")
  var regex = ""
  regex = "((\\s+)|(^))" + inputtokens.shift()
  for (var k in inputtokens)
  {
    regex += "\\S*?\\s+?" + inputtokens[k]
  }

  this.reggie = new RegExp(regex,"i")
}

var _p = PartialMatcher.prototype

_p.match = function(reftext)
{
  return this.reggie.exec(reftext)
}
