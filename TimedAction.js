
function TimedAction(a,timestamp)
{
  this.a = a
  this.timestamp = timestamp
  this.id = TimedAction.id++
}

TimedAction.id = 1

var _p = TimedAction.prototype


_p.Timestamp = function()
{
  return this.timestamp
}

_p.SetTimestamp = function(t)
{
  this.timestamp = t
}

_p.Action = function()
{
  return this.a
}


_p.ID = function()
{
  return this.id
}
