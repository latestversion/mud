function Portal()
{
  Entity.call(this)
  LogicEntity.call(this)
  DataEntity.call(this)
  HasRegion.call(this)
  HasEntries.call(this)
}

var _p = Portal.prototype

CopyPrototype(Entity,Portal)
CopyPrototype(HasRegion,Portal)
CopyPrototype(DataEntity,Portal)
CopyPrototype(LogicEntity,Portal)
CopyPrototype(HasEntries,Portal)

_p.Add = function()
{

}

_p.Remove = function()
{

}

function PortalEntry(startroom,direction,destroom)
{
  this.startroom = startroom
  this.direction = direction
  this.destroom = destroom
}

var _p = PortalEntry.prototype


