var renderer = null,
	scene = null,
	camera = null,
	cube = null,
	animating = true,
	boxW = 1.89, boxH = .89, negBallDir = -.89, posBallDir = .89, xBallSpeed = .05, yBallSpeed = .04, zBallSpeed = .03,
    myXvelocity = null, myYvelocity = null, myZvelocity = null,
    ballHolder = new Array();
    xVal = new Array();
    yVal = new Array();
    zVal = new Array();
    


THREE.ImageUtils.crossOrigin = "Anonymous";

    // container and cameras
    function cameras()
    {
        // Grab our container div
        var container = document.getElementById("container");

        // Create the Three.js renderer, add it to our div
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        // Create a new Three.js scene
        scene = new THREE.Scene();

        // Put in a camera
        camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 4000);
        camera.position.set(0, 0, 5);

        // Create an ambient light
        var ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        // Create a directional light
        var diffuseLight = new THREE.DirectionalLight(0xffffff, 0.5);
        diffuseLight.position.set(0, 10, 1);
        scene.add(diffuseLight);
    }

function box()
{
    // Create an empty geometry object to hold the line vertex data
    var lgeometry = new THREE.Geometry();
  
    //front face
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, -1, 1))); //origin
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, -1, 1))); // origin
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, 1, 1))); 
    //lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, 1, 1))); //origin
 
    //back face
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, -1, -1))); // orgin
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, 1, -1)));  //orgin
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, 1, -1))); //origin
     
    //Top face
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, 1, -1))); //origin
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, 1, 1))); // orgin
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, 1, 1)));  //orgin

   //Buttom face
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, -1, -1))); // origin
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, -1, -1))); // origin
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, -1, 1))); // origin

    //right face
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, -1, -1))); // origin
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, 1, -1))); // origin
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, 1, 1))); // origin
  
    //left face
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, -1, -1))); // origin
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, -1, 1))); // origin
   lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, 1, 1))); // origin

    // line material
    var lmaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 1, linewidth: 1 });

    // together
    line = new THREE.Line(lgeometry, lmaterial);


    // add to scene
    scene.add(line);

    // Turn it toward the scene, or we won't see the cube shape!
   line.rotation.x = Math.PI / 5;
   line.rotation.y = Math.PI / 5;

    //animBox();
}

// animate the box
function animBox()
{/*
    if (animating)
    {

        //line.position.x += 0.01;
        line.rotation.y += 0.01;
    }
    */
}

function createSphere()
{
        // Create the sphere geometry
        var sgeometry = new THREE.SphereGeometry(0.1,10,10);

	    // Create a colored material for the sphere (ambient and diffuse componenets)
	    var smaterial = new THREE.MeshLambertMaterial( { ambient: 0xff0000, color: 0xff0000 });

        // And put the geometry and material together into a mesh
	    sphere = new THREE.Mesh(sgeometry, smaterial);

	    return sphere;
}


//alert(velocityHolder[0]);
/*
function velocityHolder(mesh, xVelocity, yVelocity, zVelocity)
{
    this.myMesh = mesh;
    this.myXvelocity = xVelocity,
    this.myYvelocity = yVelocity,
    this.myZvelocity = zVelocity;
}
*/
function run()
{
    //xBallSpeed = .05, yBallSpeed = .04, zBallSpeed = .03
    // Render the scene
    renderer.render(scene, camera);
    if (animating)
    {

         for (i = 0; i < ballHolder.length; i++)
         {
      
        // move the sphere for next frame

             ballHolder[i].position.x += xVal[i];
             ballHolder[i].position.y += yVal[i];
             ballHolder[i].position.z += zVal[i];

             if (((ballHolder[i].position.x >= posBallDir) || (ballHolder[i].position.x <= negBallDir)))
            {
                 xVal[i] = -xVal[i];
            }

             if (((ballHolder[i].position.x >= posBallDir) || (ballHolder[i].position.x <= negBallDir)))
            {
                 yVal[i] = -yVal[i];
            }

             if (((ballHolder[i].position.x >= posBallDir) || (ballHolder[i].position.x <= negBallDir)))
             {
                 zVal[i] = -zVal[i];
            }
         }
    }


    // Ask for another frame
    requestAnimationFrame(run);


}

function onLoad()
{
    cameras();
    box();

    mySphere = createSphere();
    ballHolder.push(mySphere);
    scene.add(ballHolder[ballHolder.length - 1]);

    xVal.push(0.01);
    yVal.push(0.01);
    zVal.push(0.01);
   
    run();
}

function addSphere(clicked_id)
{
    ball = createSphere();
    
    var max = .89;
    var min = -.89;

            // generate random values for x, y, z
            x = Math.random()/45;
            //alert(xballSpeed);
            y = Math.random()/44;
            //alert(yballSpeed);
            z = Math.random()/43;
            //alert(zballSpeed);

            //assign the random values to x, y, z
            xVal.push(x);
            yVal.push(y);
            zVal.push(z);
            //alert( newVal);

            ballHolder.push(ball);
            scene.add(ballHolder[ballHolder.length - 1]);

           // alert(xBallSpeed + "," + yBallSpeed + "," + zBallSpeed);
}

//pause/start animation
function pause()
{
    currentvalue = document.getElementById('pause').value;

    if (currentvalue == "Start")
    {
        animating = true;
        document.getElementById("pause").value = "Pause";
    }

    else
    {
        animating = false;
        document.getElementById("pause").value = "Start";
        alert("in The Ball holder" + ballHolder.length + ", in The velocity holder " + velocityHolder.length);
    }
}

