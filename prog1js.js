var renderer = null,
	scene = null,
	camera = null,
	cube = null,
	animating = true;
    ballHolder = new Array();
    xVelocityHolder = new Array(), yVelocityHolder = new Array(), zVelocityHolder = new Array();
    console.log("");

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

    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 1, 1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(2, 1, 1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(2, -1, 1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(0, -1, 1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 1, 1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, 1, -1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, 1, -1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, -1, -1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, -1, -1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, 1, -1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(-1, -1, -1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(0, -1, 1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(2, -1, 1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, -1, -1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(1, 1, -1)));
    lgeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(2, 1, 1)));

    // line material
    var lmaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 1, linewidth: 1 });

    // together
    cube = new THREE.Line(lgeometry, lmaterial);

    // add to scene
    scene.add(cube);

    cube.rotation.x = .7;
    cube.rotation.y = .7;
}

//create a sphere
function createBall()
{
    //cameras();
    // Create the sphere geometry
    var sgeometry = new THREE.SphereGeometry(0.1, 10, 10);

    // Create a colored material for the sphere (ambient and diffuse componenets)
    var smaterial = new THREE.MeshLambertMaterial({ ambient: 0xff0000, color: 0xff0000 });

    // And put the geometry and material together into a mesh
    ball = new THREE.Mesh(sgeometry, smaterial);


    // Add the sphere to our scene
    //scene.add(sphere);

    return ball;
}

//main function
function onLoad()
{
    cameras();// add cameras to the container
    box(); // add cube to the container
    myBall = createBall();// create first ball
    ballHolder.push(myBall);
    scene.add(ballHolder[ballHolder.length - 1]);

    //assing and save x, y and z value
    xVelocityHolder.push(.01);
    yVelocityHolder.push(.01);
    zVelocityHolder.push(.01);
    // Run our render loop
    run();
}

function run()
{
    // Render the scene
    renderer.render(scene, camera);

    // move the sphere for next frame
    if (animating)
    {
        for (i = 0; i <= ballHolder.length - 1; i++)
        {
            ballHolder[i].position.x += xVelocityHolder[i];
            ballHolder[i].position.y += yVelocityHolder[i];
            ballHolder[i].position.z += zVelocityHolder[i];

            if (ballHolder[i].position.x >= .65 || ballHolder[i].position.x <= -.65)
            {
                xVelocityHolder[i] = -xVelocityHolder[i];
            }

            if (ballHolder[i].position.y >= .60 || ballHolder[i].position.y <= -.60)
            {
                yVelocityHolder[i] = -yVelocityHolder[i];
            }

            if (ballHolder[i].position.z >= .65 || ballHolder[i].position.z <= -.65)
            {
                zVelocityHolder[i] = -zVelocityHolder[i];
            }

        }
    }

    // Ask for another frame
    requestAnimationFrame(run);
}

function addSphere()
{
    l = 1;
    r = 1;

    // Create the sphere geometry
    var sgeometry = new THREE.SphereGeometry(0.1, 10, 10);

    // Create a colored material for the sphere (ambient and diffuse componenets)
    var smaterial = new THREE.MeshLambertMaterial({ ambient: 0xff00+l+r, color: 0xff0000 });

    // And put the geometry and material together into a mesh
    ball = new THREE.Mesh(sgeometry, smaterial);

    // generate random values for x, y, z
    x = Math.random()/30;
    y = Math.random()/32;
    z = Math.random()/35;
    // alert(x + ", " + y + ", " + z );

    //assing and save x, y and z value
    xVelocityHolder.push(x);
    yVelocityHolder.push(y);
    zVelocityHolder.push(z);

    ballHolder.push(ball);
    scene.add(ballHolder[ballHolder.length - 1]);

}

//pause/start animation
function pause() {
    currentvalue = document.getElementById('pause').value;

    if (currentvalue == "Start") {
        animating = true;
        document.getElementById("pause").value = "Pause";
    }

    else {
        animating = false;
        document.getElementById("pause").value = "Start";
        alert("There are " + ballHolder.length + " ball(s) in the box! \n Click Ok on this box or Space on your keyborad, \n Then click Start on the bottum to resume.");
    }
}

// reset balls
function reset()
{
    for (i = 1; i < ballHolder.length; i++)
    {
        scene.remove(ballHolder[i]);
    }   
}