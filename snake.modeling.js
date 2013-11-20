$(function () {
    var container = $('#container');
    var WIDTH = 640,
	  HEIGHT = 480;
    // set some camera attributes
    var VIEW_ANGLE = 45,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

    var renderer = new THREE.WebGLRenderer();
    var camera =
	  new THREE.PerspectiveCamera(
	    VIEW_ANGLE,
	    ASPECT,
	    NEAR,
	    FAR);

    var scene = new THREE.Scene();
    scene.add(camera);
    camera.position.x = 400;
    camera.lookAt(scene.position);
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    container.append(renderer.domElement);

    var geometry = new THREE.CubeGeometry(200, 200, 200);
    for (var i = 0; i < geometry.faces.length; i++) {
        geometry.faces[i].color.setHex(Math.random() * 0xffffff);
    }
    geometry.colorsNeedUpdate = true;
    var material = new THREE.MeshBasicMaterial({ color: 0xCCFFCC/*, transparent: true, opacity: 1, wireframe: true*/, vertexColors: THREE.FaceColors });
    var cube = new THREE.Mesh(geometry, material);
    cube.overdraw = true;

    scene.add(cube);

    // create a point light
    var pointLight =
      new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);

    function animate() {
        requestAnimationFrame(animate);
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.02;
        renderer.render(scene, camera);
    }

    animate();

    $(document).keydown(function (e) {
        var reglesDeDeplacementCamera = new RegleDeplacementCamera().genererLesReglesDeDeplacement();
        for (var i = 0; i < reglesDeDeplacementCamera.length; i++) {
            if (reglesDeDeplacementCamera[i].estValide(camera)) {
                reglesDeDeplacementCamera[i].appliquerLaRegle(camera, e.keyCode);
                break;
            }
        }
        
    });

    function RegleDeplacementCamera(param) {
        this.estValide = function () {
            return false;
        };
        this.appliquerLaRegle = function () {
        };
        this.genererLesReglesDeDeplacement = function () {
            var listeDeRegles = new Array();
            var regleX = new RegleDeplacementCamera({
                regle: function (camera) {
                    return camera.position.x == 400;
                },
                application: function (camera, keycode) {
                    var deplacementXParKeycode = { 37: -400, 38: -400, 39: -400, 40: -400 };
                    var deplacementYParKeycode = { 37: 0, 38: 400, 39: 0, 40: -400 };
                    var deplacementZParKeycode = { 37: -400, 38: 0, 39: 400, 40: 0 };

                    camera.position.x += deplacementXParKeycode[keycode];
                    camera.position.y += deplacementYParKeycode[keycode];
                    camera.position.z += deplacementZParKeycode[keycode];
                    camera.lookAt(scene.position);
                }
            });
            var regleXMin = new RegleDeplacementCamera({
                regle: function (camera) {
                    return camera.position.x == -400;
                },
                application: function (camera, keycode) {
                    var deplacementXParKeycode = { 37: 400, 38: 400, 39: 400, 40: 400 };
                    var deplacementYParKeycode = { 37: 0, 38: 400, 39: 0, 40: -400 };
                    var deplacementZParKeycode = { 37: 400, 38: 0, 39: -400, 40: 0 };

                    camera.position.x += deplacementXParKeycode[keycode];
                    camera.position.y += deplacementYParKeycode[keycode];
                    camera.position.z += deplacementZParKeycode[keycode];
                    camera.lookAt(scene.position);
                }
            });
            var regleXMax = new RegleDeplacementCamera({
                regle: function (camera) {
                    return camera.position.y == 400;
                },
                application: function (camera, keycode) {
                    var deplacementXParKeycode = { 37: -400, 38: -400, 39: -400, 40: -400 };
                    var deplacementYParKeycode = { 37: 0, 38: 400, 39: 0, 40: -400 };
                    var deplacementZParKeycode = { 37: 400, 38: 0, 39: -400, 40: 0 };

                    camera.position.x += deplacementXParKeycode[keycode];
                    camera.position.y += deplacementYParKeycode[keycode];
                    camera.position.z += deplacementZParKeycode[keycode];
                    camera.lookAt(scene.position);
                }
            });
            var regleXMax = new RegleDeplacementCamera({
                regle: function (camera) {
                    return camera.position.x == 400;
                },
                application: function (camera, keycode) {
                    var deplacementXParKeycode = { 37: -400, 38: -400, 39: -400, 40: -400 };
                    var deplacementYParKeycode = { 37: 0, 38: 400, 39: 0, 40: -400 };
                    var deplacementZParKeycode = { 37: 400, 38: 0, 39: -400, 40: 0 };

                    camera.position.x += deplacementXParKeycode[keycode];
                    camera.position.y += deplacementYParKeycode[keycode];
                    camera.position.z += deplacementZParKeycode[keycode];
                    camera.lookAt(scene.position);
                }
            });
            listeDeRegles.push(regleXMax);
            return listeDeRegles;
        };

        if (param != null) {
            initialiser(this);
        }

        function initialiser(regle) {
            if (param.regle != null) {
                regle.estValide = param.regle;
            }
            if (param.application != null) {
                regle.appliquerLaRegle = param.application
            }
        }
    }
});