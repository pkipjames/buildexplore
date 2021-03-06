// ==========================================
// Player
//
// This class contains the code that manages the local player.
// ==========================================


// Mouse event enumeration
MOUSE = {};
MOUSE.DOWN = 1;
MOUSE.UP = 2;
MOUSE.MOVE = 3;


// Constructor()
//
// Creates a new local player manager.
var btnOnPage=false;
function Player()
{    
}

// setWorld( world )
//
// Assign the local player to a world.

Player.prototype.setWorld = function( world )
{
    this.world = world;
    this.world.localPlayer = this;
    this.pos = world.spawnPoint;
    this.velocity = new Vector( 0, 0, 0 );
    this.angles = [ 0, Math.PI, 0 ];
    this.falling = false;
    this.keys = {};
    this.buildMaterial = BLOCK.DIRT;
    this.eventHandlers = {};
};

// setClient( client )
//
// Assign the local player to a socket client.

Player.prototype.setClient = function( client )
{
    this.client = client;
};

// setInputCanvas( id )
//
// Set the canvas the renderer uses for some input operations.
function elt(name, attributes) {
  var node = document.createElement(name);
  if (attributes) {
    for (var attr in attributes)
      if (attributes.hasOwnProperty(attr))
        node.setAttribute(attr, attributes[attr]);
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string")
      child = document.createTextNode(child);
    node.appendChild(child);
  }
  return node;
}

var addBTN =elt("button",{title:"Click To Change",style:"cursor:pointer;position:fixed;bottom:34px;font-size:32px;padding:0px;margin:0px;background:rgba(0,0,0,0.7);color:#ffffff;border:0px none;left:0px;z-index:199;"},"Delete Block Mode");
    addBTN.addEventListener("click",function (){if(btnOnPage){btnOnPage=false;addBTN.textContent="Delete Block";}else{btnOnPage=true;addBTN.textContent="Add Block";}});
var backBTN =elt("button",{onclick:"location.href='https://pkipjames.github.io/buildexplore/';",title:"Click To Go Back",style:"cursor:pointer;position:fixed;bottom:34px;font-size:32px;padding:0px;margin:0px;background:rgba(0,0,0,0.7);color:#ffffff;border:0px none;right:20px;z-index:199;"},"Exit Game");
 var mobileCallKeyboardinput=elt("input",{type:"text",style:"position:fixed;top:-1000px;"});
var jumpBTN =elt("button",{style:"cursor:pointer;position:fixed;bottom:72px;font-size:32px;padding:0px;margin:0px;background:rgba(0,0,0,0.7);color:#ffffff;border:0px none;left:0px;z-index:199;"},"Jump");

var upBTN=elt("td",{colspan:2,style:"text-align:center;"},"/\\");

var downBTN=elt("td",{colspan:2,style:"text-align:center;"},"\\/");

var leftBTN=elt("td",{style:"text-align:center;"},"<");

var rightBTN=elt("td",{style:"text-align:center;"},">");

var mobileControls=elt("table",{style:"cursor:pointer;position:fixed;width:100px;height:100px;z-index:199;right:100px;bottom:100px;background-color:rgba(0,0,0,0.8);color:#ffffff;text-align:center;"},elt("tr",null,upBTN),elt("tr",null,leftBTN,rightBTN),elt("tr",null,downBTN));

setTimeout(function (){document.body.appendChild(addBTN);document.body.appendChild(backBTN);document.body.appendChild(jumpBTN);document.body.appendChild(mobileControls);},1000);

Player.prototype.setInputCanvas = function( id )
{
    var canvas = this.canvas = document.getElementById( id );

    var t = this;
    jumpBTN.onmousedown=function(){t.onKeyEvent( 32, true ); };
jumpBTN.onmouseup=function(){t.onKeyEvent( 32, false ); };
jumpBTN.ontouchstart=function(){event.preventDefault();
t.onKeyEvent( 32, true ); };
jumpBTN.ontouchend=function(){event.preventDefault();
t.onKeyEvent( 32, false ); };

upBTN.onmousedown=function (event){

 t.onKeyEvent(38, true );

};

upBTN.onmouseup=function (event){

 t.onKeyEvent(38, false );

};

upBTN.ontouchstart=function (event){
event.preventDefault();

 t.onKeyEvent(38, true );

};

upBTN.ontouchend=function (event){
event.preventDefault();

 t.onKeyEvent(38, false );

};

downBTN.onmousedown=function (event){
 t.onKeyEvent(40, true );

};

downBTN.onmouseup=function (event){

 t.onKeyEvent(40, false );

};

downBTN.ontouchstart=function (event){
event.preventDefault();

 t.onKeyEvent(40, true );

};

downBTN.ontouchend=function (event){
event.preventDefault();

 t.onKeyEvent(40, false );

};

rightBTN.onmousedown=function (event){

 t.onKeyEvent(39, true );

};

rightBTN.onmouseup=function (event){

 t.onKeyEvent(39, false );

};

rightBTN.ontouchstart=function (event){
event.preventDefault();

 t.onKeyEvent(39, true );

};

rightBTN.ontouchend=function (event){
event.preventDefault();

 t.onKeyEvent(39, false );

};

leftBTN.onmousedown=function (event){

 t.onKeyEvent(37, true );

};

leftBTN.onmouseup=function (event){

 t.onKeyEvent(37, false );

};

leftBTN.ontouchstart=function (event){
event.preventDefault();

 t.onKeyEvent(37, true );

};

leftBTN.ontouchend=function (event){
event.preventDefault();

 t.onKeyEvent(37, false );

};



    document.onkeydown = function( e ) { if ( e.target.tagName != "INPUT" ) { t.onKeyEvent( e.keyCode, true ); return false; } };
    document.onkeyup = function( e ) { if ( e.target.tagName != "INPUT" ) { t.onKeyEvent( e.keyCode, false ); return false; } };
    
    mobileCallKeyboardinput.onkeydown = function( e ) { if ( e.target.tagName == "INPUT" ) { t.onKeyEvent( e.keyCode, true ); return false; } };
    mobileCallKeyboardinput.onkeyup = function( e ) { if ( e.target.tagName == "INPUT" ) { t.onKeyEvent( e.keyCode, false ); return false; } };
    
    canvas.ontouchstart = function( e ) { t.onMouseEvent( e.pageX, e.pageY, MOUSE.DOWN, btnOnPage); return false; };
    canvas.ontouchend = function( e ) { t.onMouseEvent( e.pageX, e.pageY, MOUSE.UP,btnOnPage); return false; };
    canvas.ontouchmove = function( e ) { t.onMouseEvent( e.pageX, e.pageY, MOUSE.MOVE, btnOnPage ); return false; };

    canvas.onmousedown = function( e ) { t.onMouseEvent( e.clientX, e.clientY, MOUSE.DOWN, btnOnPage ); return false; };
    canvas.onmouseup = function( e ) { t.onMouseEvent( e.clientX, e.clientY, MOUSE.UP, btnOnPage ); return false; };
    canvas.onmousemove = function( e ) { t.onMouseEvent( e.clientX, e.clientY, MOUSE.MOVE, btnOnPage ); return false; };
};

// setMaterialSelector( id )
//
// Sets the table with the material selectors.

Player.prototype.setMaterialSelector = function( id )
{
    var tableRow = document.getElementById( id ).getElementsByTagName( "tr" )[0];
    var texOffset = 0;

    for ( var mat in BLOCK )
    {
        if ( typeof( BLOCK[mat] ) == "object" && BLOCK[mat].spawnable == true )
        {
            var selector = document.createElement( "td" );
            selector.style.backgroundPosition = texOffset + "px 0px";

            var pl = this;
            selector.material = BLOCK[mat];
            selector.onclick = function()
            {
                this.style.opacity = "1.0";

                pl.prevSelector.style.opacity = null;
                pl.prevSelector = this;

                pl.buildMaterial = this.material;
            };

            if ( mat == "DIRT" ) {
                this.prevSelector = selector;
                selector.style.opacity = "1.0";
            }

            tableRow.appendChild( selector );
            texOffset -= 70;
        }
    }
};

// on( event, callback )
//
// Hook a player event.

Player.prototype.on = function( event, callback )
{
    this.eventHandlers[event] = callback;
};

// onKeyEvent( keyCode, down )
//
// Hook for keyboard input.

Player.prototype.onKeyEvent = function( keyCode, down )
{
    
    var key = String.fromCharCode( keyCode ).toLowerCase();
    if(keyCode==37){
        this.keys["left"] = down;
    }else if (keyCode==38){
        this.keys["up"]=down;
    }else if (keyCode==39){
        this.keys["right"]=down;
    }else if (keyCode==40){
        this.keys["down"]=down;
    }else{
    this.keys[key] = down;}
    this.keys[keyCode] = down;
    
    
    if ( !down && key == "t" && this.eventHandlers["openChat"] ) this.eventHandlers.openChat();
};

// onMouseEvent( x, y, type, rmb )
//
// Hook for mouse input.

Player.prototype.onMouseEvent = function( x, y, type, rmb )
{
    if ( type == MOUSE.DOWN ) {
        this.dragStart = { x: x, y: y };
        this.mouseDown = true;
        this.yawStart = this.targetYaw = this.angles[1];
        this.pitchStart = this.targetPitch = this.angles[0];
    } else if ( type == MOUSE.UP ) {
        if ( Math.abs( this.dragStart.x - x ) + Math.abs( this.dragStart.y - y ) < 4 )    
            this.doBlockAction( x, y, !rmb );

        this.dragging = false;
        this.mouseDown = false;
        this.canvas.style.cursor = "default";
    } else if ( type == MOUSE.MOVE && this.mouseDown ) {
        this.dragging = true;
        this.targetPitch = this.pitchStart - ( y - this.dragStart.y ) / 200;
        this.targetYaw = this.yawStart + ( x - this.dragStart.x ) / 200;

        this.canvas.style.cursor = "move";
    }
};

// doBlockAction( x, y )
//
// Called to perform an action based on the player's block selection and input.

Player.prototype.doBlockAction = function( x, y, destroy )
{
    var bPos = new Vector( Math.floor( this.pos.x ), Math.floor( this.pos.y ), Math.floor( this.pos.z ) );
    var block = this.canvas.renderer.pickAt( new Vector( bPos.x - 4, bPos.y - 4, bPos.z - 4 ), new Vector( bPos.x + 4, bPos.y + 4, bPos.z + 4 ), x, y );
    
    if ( block != false )
    {
        var obj = this.client ? this.client : this.world;
        
        if ( destroy )
            obj.setBlock( block.x, block.y, block.z, BLOCK.AIR );
        else
            obj.setBlock( block.x + block.n.x, block.y + block.n.y, block.z + block.n.z, this.buildMaterial );
    }
};

// getEyePos()
//
// Returns the position of the eyes of the player for rendering.

Player.prototype.getEyePos = function()
{
    return this.pos.add( new Vector( 0.0, 0.0, 1.7 ) );
};

// update()
//
// Updates this local player (gravity, movement)

Player.prototype.update = function()
{
    var world = this.world;
    var velocity = this.velocity;
    var pos = this.pos;
    var bPos = new Vector( Math.floor( pos.x ), Math.floor( pos.y ), Math.floor( pos.z ) );

    if ( this.lastUpdate != null )
    {
        var delta = ( new Date().getTime() - this.lastUpdate ) / 1000;

        // View
        if ( this.dragging )
        {
            this.angles[0] += ( this.targetPitch - this.angles[0] ) * 30 * delta;
            this.angles[1] += ( this.targetYaw - this.angles[1] ) * 30 * delta;
            if ( this.angles[0] < -Math.PI/2 ) this.angles[0] = -Math.PI/2;
            if ( this.angles[0] > Math.PI/2 ) this.angles[0] = Math.PI/2;
        }

        // Gravity
        if ( this.falling )
            velocity.z += -0.5;

        // Jumping
        if ( this.keys[" "] && !this.falling )
            velocity.z = 8;

        // Walking
        var walkVelocity = new Vector( 0, 0, 0 );
        if ( !this.falling )
        {
            if ( this.keys["w"] ||this.keys["up"]) {
                walkVelocity.x += Math.cos( Math.PI / 2 - this.angles[1] );
                walkVelocity.y += Math.sin( Math.PI / 2 - this.angles[1] );
            }
            if ( this.keys["s"] ||this.keys["down"]) {
                walkVelocity.x += Math.cos( Math.PI + Math.PI / 2 - this.angles[1] );
                walkVelocity.y += Math.sin( Math.PI + Math.PI / 2 - this.angles[1] );
            }
            if ( this.keys["a"] ||this.keys["left"]) {
                walkVelocity.x += Math.cos( Math.PI / 2 + Math.PI / 2 - this.angles[1] );
                walkVelocity.y += Math.sin( Math.PI / 2 + Math.PI / 2 - this.angles[1] );
            }
            if ( this.keys["d"] ||this.keys["right"]) {
                walkVelocity.x += Math.cos( -Math.PI / 2 + Math.PI / 2 - this.angles[1] );
                walkVelocity.y += Math.sin( -Math.PI / 2 + Math.PI / 2 - this.angles[1] );
            }
        }
        if ( walkVelocity.length() > 0 ) {
                walkVelocity = walkVelocity.normal();
                velocity.x = walkVelocity.x * 4;
                velocity.y = walkVelocity.y * 4;
        } else {
            velocity.x /= this.falling ? 1.01 : 1.5;
            velocity.y /= this.falling ? 1.01 : 1.5;
        }

        // Resolve collision
        this.pos = this.resolveCollision( pos, bPos, velocity.mul( delta ) );
    }

    this.lastUpdate = new Date().getTime();
};

// resolveCollision( pos, bPos, velocity )
//
// Resolves collisions between the player and blocks on XY level for the next movement step.

Player.prototype.resolveCollision = function( pos, bPos, velocity )
{
    var world = this.world;
    var playerRect = { x: pos.x + velocity.x, y: pos.y + velocity.y, size: 0.25 };

    // Collect XY collision sides
    var collisionCandidates = [];

    for ( var x = bPos.x - 1; x <= bPos.x + 1; x++ )
    {
        for ( var y = bPos.y - 1; y <= bPos.y + 1; y++ )
        {
            for ( var z = bPos.z; z <= bPos.z + 1; z++ )
            {
                if ( world.getBlock( x, y, z ) != BLOCK.AIR )
                {
                    if ( world.getBlock( x - 1, y, z ) == BLOCK.AIR ) collisionCandidates.push( { x: x, dir: -1, y1: y, y2: y + 1 } );
                    if ( world.getBlock( x + 1, y, z ) == BLOCK.AIR ) collisionCandidates.push( { x: x + 1, dir: 1, y1: y, y2: y + 1 } );
                    if ( world.getBlock( x, y - 1, z ) == BLOCK.AIR ) collisionCandidates.push( { y: y, dir: -1, x1: x, x2: x + 1 } );
                    if ( world.getBlock( x, y + 1, z ) == BLOCK.AIR ) collisionCandidates.push( { y: y + 1, dir: 1, x1: x, x2: x + 1 } );
                }
            }
        }
    }

    // Solve XY collisions
    for( var i in collisionCandidates ) 
    {
        var side = collisionCandidates[i];

        if ( lineRectCollide( side, playerRect ) )
        {
            if ( side.x != null && velocity.x * side.dir < 0 ) {
                pos.x = side.x + playerRect.size / 2 * ( velocity.x > 0 ? -1 : 1 );
                velocity.x = 0;
            } else if ( side.y != null && velocity.y * side.dir < 0 ) {
                pos.y = side.y + playerRect.size / 2 * ( velocity.y > 0 ? -1 : 1 );
                velocity.y = 0;
            }
        }
    }

    var playerFace = { x1: pos.x + velocity.x - 0.125, y1: pos.y + velocity.y - 0.125, x2: pos.x + velocity.x + 0.125, y2: pos.y + velocity.y + 0.125 };
    var newBZLower = Math.floor( pos.z + velocity.z );
    var newBZUpper = Math.floor( pos.z + 1.7 + velocity.z * 1.1 );

    // Collect Z collision sides
    collisionCandidates = [];

    for ( var x = bPos.x - 1; x <= bPos.x + 1; x++ ) 
    {
        for ( var y = bPos.y - 1; y <= bPos.y + 1; y++ )
        {
            if ( world.getBlock( x, y, newBZLower ) != BLOCK.AIR )
                collisionCandidates.push( { z: newBZLower + 1, dir: 1, x1: x, y1: y, x2: x + 1, y2: y + 1 } );
            if ( world.getBlock( x, y, newBZUpper ) != BLOCK.AIR )
                collisionCandidates.push( { z: newBZUpper, dir: -1, x1: x, y1: y, x2: x + 1, y2: y + 1 } );
        }
    }

    // Solve Z collisions
    this.falling = true;
    for ( var i in collisionCandidates )
    {
        var face = collisionCandidates[i];

        if ( rectRectCollide( face, playerFace ) && velocity.z * face.dir < 0 )
        {
            if ( velocity.z < 0 ) {
                this.falling = false;
                pos.z = face.z;
                velocity.z = 0;
                this.velocity.z = 0;
            } else {
                pos.z = face.z - 1.8;
                velocity.z = 0;
                this.velocity.z = 0;
            }

            break;
        }
    }

    // Return solution
    return pos.add( velocity );
};
