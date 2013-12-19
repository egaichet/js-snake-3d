var POSITION_MAX_CAMERA = 400;

function Rendu() {
    var WIDTH = 800;
	var HEIGHT = 600;

	var renderer;
    var scene;
    var camera;
    var jeu;
    var objets = new Array();
    var cubeDeScene;
    var sommetDuCubeDeScene;
    var directionPrecedente;

    var texturePomme = THREE.ImageUtils.loadTexture('texture-pomme.jpg', new THREE.UVMapping());
    texturePomme.wrapS = texturePomme.wrapT = THREE.ClampToEdgeWrapping;
    var textureEcaille = THREE.ImageUtils.loadTexture('texture-ecaille.jpg', new THREE.UVMapping());
    textureEcaille.wrapS = textureEcaille.wrapT = THREE.ClampToEdgeWrapping;
    var textureParois = THREE.ImageUtils.loadTexture('texture-parois.jpg', new THREE.UVMapping());
    textureEcaille.wrapS = textureEcaille.wrapT = THREE.ClampToEdgeWrapping;
    var texturePlaque = THREE.ImageUtils.loadTexture('texture-plaque.jpg', new THREE.UVMapping());
    textureEcaille.wrapS = textureEcaille.wrapT = THREE.ClampToEdgeWrapping;

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
            new THREE.MeshLambertMaterial({ color: 0x54FFB8, side: THREE.BackSide, map: textureParois }),
            new THREE.MeshLambertMaterial({ color: 0x8CFFCF, side: THREE.BackSide, map: texturePlaque }),
            new THREE.MeshLambertMaterial({ color: 0xC2FFE6, side: THREE.BackSide, map: textureParois })
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
        camera.lookAt(scene.position);
        scene.add(camera);

        directionPrecedente = new Direction({ axe: Direction.X, top: false });
    }

    function placerLesLumieres() {
        var pointDeLumiere = new THREE.PointLight(0xFFFFFF);
        scene.add(pointDeLumiere);

        var lumiereAmbiante = new THREE.AmbientLight(0xFAFAFA);
        scene.add(lumiereAmbiante);
    }

    function animer() {
        supprimerLesObjetsDeLaScene();
        dessinerLaTete();
        dessinerLeCorps();
        dessinerLeBonus();
        dessinerLesEffets();

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
            var teteDessine = dessinerUneSphere(tete, new THREE.MeshLambertMaterial({ map: textureEcaille, color: 0x54FFB8}), 1.3);
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
                    new THREE.MeshLambertMaterial({ map: textureEcaille, color: 0x000000 }),
                    new THREE.MeshLambertMaterial({ map: textureEcaille, color: 0x000000 }),
                    new THREE.MeshLambertMaterial({ map: textureEcaille, color: 0x000000 })
                ]);
                scene.add(elementDessine);
                objets.push(elementDessine);
            }
        }

        function dessinerLeBonus() {
            var bonus = jeu.elementsADessiner().bonus;
            var bonusDessine = dessinerUneSphere(bonus, new THREE.MeshLambertMaterial({ map: texturePomme}) /*new THREE.MeshBasicMaterial({ color: 0xFA4343 })*/);
            scene.add(bonusDessine);
            objets.push(bonusDessine);
        }

        function dessinerLesEffets() {
            if(jeu.aMange()) {

            }
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

    function dessinerUneSphere(cubeADessine, materiel, grossissement) {
        var longueurDuCube = cubeADessine.dimension().longueur();
        var rayonDeLaSphere = longueurDuCube / 2;
        if(grossissement)
            rayonDeLaSphere *= grossissement;
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