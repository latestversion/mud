

function Entity()
{
  this.id = 0
  this.name = ""
  this.description = ""
}


Entity.prototype = {}


var _p = Entity.protoype

_p.Name = function()
{return this.name}

_p.Description = function()
{return this.description}


_p.ID = function()
{return this.id}

_p.SetName = function(n)
{this.name = n}

_p.SetDescription = function(d)
{this.description = d}


_p.SetID = function(id)
{this.id = id}