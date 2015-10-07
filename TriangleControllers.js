
function DoNothingController()
{
    this.update = function(dt,model)
    {
    }
}

function AlignWithOriginController(model,time)
{
    this.model = model
    this.tcount = 0
    this.time = time

    var orgDir = model.getOriginalDirection()
    var dir = model.getCurrentDirection()

    var angle = v2d.signedanglebetweenvectors(dir,orgDir)

    model.rot_v = 0
    model.rot_a = 2*angle/time/time

}
AlignWithOriginController.protoype = {}

var _p = AlignWithOriginController.prototype

_p.update = function(dt,model)
{

    if(this.tcount >= this.time)
    {
        console.log("Rotation performed")
        model.controller = new DoNothingController()
    }
    else
    {
        var dv = model.rot_a*dt
        model.rot_v += dv
        var da = model.rot_v*dt
        model.rot -= da
        model.rotate(da)

    }
    this.tcount += dt
}


function GoToOriginalPositionController(model,toposition,time)
{
    this.model = model
    model.maxvelocity = 10000
    var d = model.position.distance(toposition)

    this.translationaction = new TranslationAction(model,d,model.position.vectorTo(toposition),time,true)
}

GoToOriginalPositionController.prototype = {}
GoToOriginalPositionController.prototype.update = function(dt,model)
{
    if(!this.translationaction.update(dt))
    {
        this.model.controller = new AlignWithOriginController(this.model,Triangle.ALIGN_TIME)
    }
}


//function TranslationAction(model,distance,direction,time,accelerated)
function GoToPositionController(model,toposition,time)
{
    this.model = model
    model.maxvelocity = 10000
    var d = model.position.distance(toposition)

    this.translationaction = new TranslationAction(model,d,model.position.vectorTo(toposition),time,true)
}

GoToPositionController.prototype = {}
GoToPositionController.prototype.update = function(dt,model)
{
    if(!this.translationaction.update(dt))
    {
        this.model.controller = new AlignWithOriginController(this.model,Triangle.ALIGN_TIME)
    }
}

function TriangleAimForOriginalPositionState(model)
{
    this.AIM_TIME = Triangle.AIM_TIME

    model.acceleration.x = -1*model.velocity.x/this.AIM_TIME
    model.acceleration.y = -1*model.velocity.y/this.AIM_TIME

    var currentDirection = model.getCurrentDirection()
    var wantedDirection = model.position.vectorTo(model.originalPosition)

    var angle = v2d.signedanglebetweenvectors(currentDirection,wantedDirection)

    this.rotaction = new RotationAction(model,angle,this.AIM_TIME,true)
}

TriangleAimForOriginalPositionState.prototype = {}
var _p = TriangleAimForOriginalPositionState.prototype

_p.update = function(dt,model)
{
    if(!this.rotaction.update(dt))
    {
        console.log("WOW, that rotation was heavy work!")
        model.controller = new GoToOriginalPositionController(model,model.originalPosition,Triangle.BACK_TO_POS_TIME)
    }
    else
    {
        model.updatePosition(dt)
    }
}

function TriangleController(model)
{
    this.model = model

    this.update = function(dt)
    {
        this.model.updatePosition(dt)
        if(this.model.scene.returnLetters)
        {
          this.model.controller = new TriangleAimForOriginalPositionState(this.model)
        }


    }
}
