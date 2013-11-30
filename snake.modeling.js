var POSITION_MAX_CAMERA = 500;

function Rendu() {
    var WIDTH = 800;
	var HEIGHT = 600;

	var renderer;
    var scene;
    var camera;
    var lumieres = new Array();
    var jeu;
    var objets = new Array();
    var cubeDeScene;
    var sommetDuCubeDeScene;
    var directionPrecedente;

    this.scene = function () { return scene; };
    this.camera = function () { return camera };
    this.sommetScene = function () { return sommetDuCubeDeScene; };
    this.initialiser = function (conteneur) {
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);
        scene = new THREE.Scene();
        initialiserLaCamera();
        placerLesLumieres();
        sommetDuCubeDeScene = new Direction({ axe: Direction.Y, top: true });

        conteneur.append(renderer.domElement);

    };
    this.dessinerLeCubeDeScene = function (cube) {
        cubeDeScene = dessinerUnCube(cube, [
            new THREE.MeshBasicMaterial({ color: 0x54FFB8, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ color: 0x8CFFCF, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ color: 0xC2FFE6, side: THREE.BackSide })
        ]);
        scene.add(cubeDeScene);
    };
    this.animer = function (jeuAAnimer) {
        jeu = jeuAAnimer;
        animer();
    }

    function initialiserLaCamera() {
        var VIEW_ANGLE = 45;
        var ASPECT = WIDTH / HEIGHT;
        var NEAR = 0.1;
        var FAR = 10000;

        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        camera.position.z = POSITION_MAX_CAMERA;
        camera.rotation.order = 'XYZ';
        //camera.rotation.y += Math.PI / 2;
        camera.lookAt(scene.position);
        scene.add(camera);

        directionPrecedente = new Direction({ axe: Direction.X, top: false });
    }

    function placerLesLumieres() {
        var lumiere = new THREE.PointLight(0xFFFFFF);
        lumiere.position.x = 0;
        lumiere.position.y = 0;
        lumiere.position.z = 0;
        lumieres.push(lumiere);
        scene.add(lumiere);
    }

    function animer() {
        supprimerLesObjetsDeLaScene();
        //TODO supprimerLesObjets
        //TODO dessinerLesObjets
        dessinerLaTete();
        dessinerLeCorps();

        requestAnimationFrame(animer);
        renderer.render(scene, camera);

        function supprimerLesObjetsDeLaScene() {
            for (var i = 0; i < objets.length; i++) {
                scene.remove(objets[i]);
            }
            objets = new Array();
        }

        function dessinerLaTete() {
            var tete = jeu.elementsADessiner().tete;
            var teteDessine = dessinerUnCube(tete, [
                    new THREE.MeshBasicMaterial({ color: 0x4399FA }),
                    new THREE.MeshBasicMaterial({ color: 0x4399FA }),
                    new THREE.MeshBasicMaterial({ color: 0x4399FA })
            ]);
            scene.add(teteDessine);
            objets.push(teteDessine);
        }

        function dessinerLeCorps() {
            var elementsDuCorps = jeu.elementsADessiner().corps;
            for (var i = 0; i < elementsDuCorps.length; i++) {
                dessinerUnElementDuCorps(elementsDuCorps[i]);
            }

            function dessinerUnElementDuCorps(element) {
                var elementDessine = dessinerUnCube(element, [
                    new THREE.MeshBasicMaterial({ color: 0x389CFF }),
                    new THREE.MeshBasicMaterial({ color: 0x6EB6FF }),
                    new THREE.MeshBasicMaterial({ color: 0xADD6FF })
                ]);
                scene.add(elementDessine);
                objets.push(elementDessine);
            }
        }

        function dessinerLeBonus() {
            var bonus = jeu.elementsADessiner().bonus;
            var bonusDessine = dessinerUneSphere(bonus, new THREE.MeshBasicMaterial({ color: 0xFA4343 }));
            scene.add(bonusDessine);
            objets.push(bonusDessine);
        }
    }

    function dessinerUnCube(cubeADessine, materiel) {
        var longueurDuCube = cubeADessine.dimension().longueur();
        var gemotrie = new THREE.CubeGeometry(longueurDuCube, longueurDuCube, longueurDuCube);
        colorierLesFacesDUneGeometrieCubique(gemotrie);
        var material = new THREE.MeshFaceMaterial(materiel);
        var cubeDessine = new THREE.Mesh(gemotrie, material);
        positionnerLObjet(cubeDessine, cubeADessine.position());
        return cubeDessine;
    }

    function dessinerUneSphere(cubeADessine, materiel) {
        var longueurDuCube = cubeADessine.dimension().longueur();
        var rayonDeLaSphere = longueurDuCube / 2;
        var gemotrie = new THREE.SphereGeometry(rayonDeLaSphere);
        var sphereDessine = new THREE.Mesh(gemotrie, materiel);
        positionnerLObjet(sphereDessine, cubeADessine.position());
        return sphereDessine;
    }

    function colorierLesFacesDUneGeometrieCubique(gemotrie) {
        for (var i = 0; i < gemotrie.faces.length; i++) {
            if (i < 4) {
                gemotrie.faces[i].materialIndex = 0;
            } else if (i < 8) {
                gemotrie.faces[i].materialIndex = 1;
            } else {
                gemotrie.faces[i].materialIndex = 2;
            }
        }
    }

    function positionnerLObjet(objet, position) {
        objet.position.x = position.x();
        objet.position.y = position.y();
        objet.position.z = position.z();
    }
}