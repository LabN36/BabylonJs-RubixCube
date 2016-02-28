var canvas,engine,scene,camera,score = 0;
var TOAD_MODEL;
var ENDING = [];

document.addEventListener("DOMContentLoaded",function(){
    if(BABYLON.Engine.isSupported()){
        initScene();
    }
},false);

function initScene() {
    canvas = document.getElementById('renderCanvas');
    engine = new BABYLON.Engine(canvas,true);
    scene = new BABYLON.Scene(engine);
	var camera=new BABYLON.ArcRotateCamera("camera",-Math.PI/2,Math.PI/4,20,BABYLON.Vector3.Zero(),scene);
	camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    var light = new BABYLON.PointLight("pointLight",new BABYLON.Vector3(0,5,-5),scene);
    initGame();
    engine.runRenderLoop(function(){
    scene.render();
})
}//end of intScene
function initGame() {
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, -3), scene);
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 3, 0), scene);
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -3, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
	var ColorBox = new Array(27);
	var noColor = new BABYLON.Color3(0, 0, 0);
//	var noColor1 = new BABYLON.Color3(1,1,1);
	var red = new BABYLON.Color3(1, 0, 0);
	var green = new BABYLON.Color3(0, 1, 0);
	var blue = new BABYLON.Color3(0, 0, 1);
	var yellow = new BABYLON.Color3(2, 2, 0);
	var orange = new BABYLON.Color3(2, 1, 0);
	var cyan = new BABYLON.Color3(0, 2, 2);
	ColorBox[0] = new Array(noColor, red, noColor, cyan, noColor, blue);
	ColorBox[1] = new Array(noColor, red, noColor, noColor, noColor, blue);
	ColorBox[2] = new Array(noColor, red, orange, noColor, noColor, blue);
	ColorBox[10] = new Array(noColor, red, noColor, cyan, noColor, noColor);
	ColorBox[11] = new Array(noColor, red, noColor, noColor, noColor, noColor);
	ColorBox[12] = new Array(noColor, red, orange, noColor, noColor, noColor);
	ColorBox[20] = new Array(noColor, red, noColor, cyan, green, noColor);
	ColorBox[21] = new Array(noColor, red, noColor, noColor, green, noColor);
	ColorBox[22] = new Array(noColor,red,orange,noColor,green,noColor);
	ColorBox[120] = new Array(noColor, noColor, noColor, cyan, green, noColor);
	ColorBox[110] = new Array(noColor, noColor, noColor, cyan, noColor, noColor);
	ColorBox[100] = new Array(noColor, noColor, noColor, cyan, noColor, blue);
	ColorBox[121] = new Array(noColor, noColor, noColor, noColor, green, noColor);
	ColorBox[101] = new Array(noColor, noColor, noColor, noColor, noColor, blue);
	ColorBox[122] = new Array(noColor, noColor, orange, noColor, green, noColor);
	ColorBox[102] = new Array(noColor, noColor, orange, noColor, noColor, blue);
	ColorBox[112] = new Array(noColor, noColor, orange, noColor, noColor, noColor);
	ColorBox[200] = new Array(noColor, noColor, noColor, cyan, noColor, blue);
	ColorBox[201] = new Array(noColor, noColor, noColor, noColor, noColor, blue);
	ColorBox[202] = new Array(noColor, noColor, orange, noColor, noColor, blue);
	ColorBox[210] = new Array(noColor, noColor, noColor, cyan, noColor, noColor);
	ColorBox[211] = new Array(noColor, noColor, noColor, noColor, noColor, noColor);
	ColorBox[212] = new Array(noColor, noColor, orange, noColor, noColor, noColor);
	ColorBox[220] = new Array(noColor, noColor, noColor, cyan, green, noColor);
	ColorBox[221] = new Array(noColor, noColor, noColor, noColor, green, noColor);
	ColorBox[222] = new Array(noColor, noColor, orange, noColor, green, noColor);

	var bsize = 2;
	var spacing = .1;
	
	var x = 0;
	var y = 0;
	var z = 0;
	
	var numCubes = 3;
	
	var allCubes = [];
	
	var rubix = new BABYLON.Mesh('', scene);
	
	rubix.position.x = 0;
	rubix.position.y = 0;
//	rubix.rotation.x = Math.PI /5.5;
//	rubix.rotation.z = Math.PI /5;
	var size = 5;
	for (var r = 0; r < numCubes; r++) {

		z = -(-bsize - spacing + numCubes * bsize + numCubes * spacing) * .5 + r * bsize + r * spacing;

		for (var i = 0; i < numCubes; i++) {

			y = -(-bsize - spacing + numCubes * bsize + numCubes * spacing) * .5 + i * bsize + i * spacing;

			for (var j = 0; j < numCubes; j++) {
				
				x = -(-bsize - spacing + numCubes * bsize + numCubes * spacing) * .5 + j * bsize + j * spacing;

				var parent = new BABYLON.Mesh('', scene);
				parent.rotationQuaternion = BABYLON.Quaternion.Identity();
									var val = r * 100 + i * 10 + j;								
				var box = BABYLON.MeshBuilder.CreateBox('test', { width: bsize, height: bsize, depth: bsize,faceColors:ColorBox[val] }, scene);
			
				box.position.x = x;
				box.position.y = y;
				box.position.z = z;
				
				box.parent = parent;
				
				parent.parent = rubix;

				allCubes.push(box);

			}

		}

	}
	
	var rotateMesh = new BABYLON.Mesh('', scene);
	
	rotateMesh.rotationQuaternion = BABYLON.Quaternion.Identity();
	
	rotateMesh.parent = rubix;
	
	var animationBox = new BABYLON.Animation("xanim", 'rotationQuaternion', 60, BABYLON.Animation.ANIMATIONTYPE_QUATERNION,
					BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	
    rotateMesh.animations.push(animationBox);
	
	function getCubePosition(mesh){
		
		var lm1 = BABYLON.Matrix.Identity();
		lm1.m[12] = mesh.position.x;
		lm1.m[13] = mesh.position.y;
		lm1.m[14] = mesh.position.z;
		
        var lm2 = BABYLON.Matrix.Identity();
        mesh.parent.rotationQuaternion.toRotationMatrix(lm2);

		lm1.multiplyToRef(lm2, lm1);
		
		return new BABYLON.Vector3(lm1.m[12], lm1.m[13], lm1.m[14]);

	}
	
	var ended = true;
	function rotate(xplane, yplane, zplane) {
		
		for (var i = 0; i < allCubes.length; i++){
			
			var cube = allCubes[i];
			var cubeP = cube.parent;
			
			if (cubeP.parent != rubix) {
			
				cubeP.parent.rotationQuaternion.multiplyToRef(cubeP.rotationQuaternion, cubeP.rotationQuaternion);
				cubeP.parent = rubix;
				
			}
			
			var position = getCubePosition(cube);
			
			var cx = Math.round(position.x / bsize);
			var cy = Math.round(position.y / bsize);
			var cz = Math.round(position.z / bsize);

			if (xplane == cx || yplane == cy || zplane == cz) {
				
				cubeP.parent = rotateMesh;
				
			}
			
		} 
		
		rotateMesh.rotationQuaternion = BABYLON.Quaternion.Identity();
		
		var end;
		
		if(xplane != null){
			end = BABYLON.Quaternion.RotationYawPitchRoll(0, Math.PI * .5, 0);
		}else if(yplane != null){
			end = BABYLON.Quaternion.RotationYawPitchRoll(Math.PI * .5, 0, 0);
		}else if(zplane != null){
			end = BABYLON.Quaternion.RotationYawPitchRoll(0, 0, Math.PI * .5);
		}
		
		if (end) {
			
			ended = false;
			var keys = [];
			keys.push({ frame: 0,    value: rotateMesh.rotationQuaternion });
			keys.push({ frame: 60, value: end });
			rotateMesh.animations[0].setKeys(keys);
			
			var on_end = function () {
				ended = true;
			} 
			scene.beginAnimation(rotateMesh, 0, 60, false, 1, on_end);
		} 

	} 
	 

	function handleKeyDown(evt) {
		
		if (!ended) { return;}
		var charStr = String.fromCharCode(evt.keyCode);
		
		if (charStr == "1") {
			rotate(-1, null, null);
   		}else if (charStr == "2") {
			rotate(0, null, null);
   		}else if (charStr == "3") {
			rotate(1, null, null);
   		}else if (charStr == "4") {
			rotate(null, -1, null);
   		}else if (charStr == "5") {
			rotate(null, 0, null);
   		}else if (charStr == "6") {
			rotate(null, 1, null);
   		}else if (charStr == "7") {
			rotate(null, null, -1);
   		}else if (charStr == "8") {
			rotate(null, null, 0);
   		}else if (charStr == "9") {
			rotate(null, null, 1);
   		}	

	}
	
	window.addEventListener("keydown", handleKeyDown, false);
	
	scene.onDispose = function () {
		
        window.removeEventListener("keydown", handleKeyDown);
		
    }
    
    
    
}
