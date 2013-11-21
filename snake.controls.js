function Direction(param) {
    var axe = Direction.X;
    var top = true;

    this.axe = function () { return axe; };
    this.top = function () { return top; };
    this.modifierLaDirection = function (direction) {
        if (direction != null) {
            if (direction.axe != null) {
                axe = direction.axe;
            }
            if (direction.top != null) {
                top = direction.top;
            }
        }
    }
    this.coeficientX = function () {
        if (axe === Direction.X) {
            return top ? 1 : -1;
        }
        return 0;
    };
    this.coeficientY = function () {
        if (axe === Direction.Y) {
            return top ? 1 : -1;
        }
        return 0;
    };
    this.coeficientZ = function () {
        if (axe === Direction.Z) {
            return top ? 1 : -1;
        }
        return 0;
    };

    if (param != null) {
        initialiser();
    }

    function initialiser() {
        if (param.axe != null) {
            axe = param.axe;
        }
        if (param.top != null) {
            top = param.top;
        }
    }
}
Direction.X = 'x';
Direction.Y = 'y';
Direction.Z = 'z';

function RegleDeplacementCamera(param) {
    var directionPrecedente;
    var deplacementXParKeycode = { 81: 0, 90: 0, 68: 0, 83: 0 };
    var deplacementYParKeycode = { 81: 0, 90: 0, 68: 0, 83: 0 };
    var deplacementZParKeycode = { 81: 0, 90: 0, 68: 0, 83: 0 };

    this.directionPrecedente = function () { return directionPrecedente; };
    this.estValide = function () {
        return false;
    };
    this.appliquerLaRegle = function () {
    };
    this.genererLesReglesDeDeplacement = function () {
        var listeDeRegles = new Array();
        var regleXMax = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.x == POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                directionPrecedente = new Direction({ axe: Direction.X, top: true });
                var coefYTop = rendu.sommetScene().coeficientY();
                var coefZTop = rendu.sommetScene().coeficientZ();
                if (changeDeSommet(keycode)) {
                    rendu.sommetScene().modifierLaDirection({ axe: Direction.X, top: keycode === 83 });
                }

                deplacementXParKeycode = { 81: -POSITION_MAX_CAMERA, 90: -POSITION_MAX_CAMERA, 68: -POSITION_MAX_CAMERA, 83: -POSITION_MAX_CAMERA };
                deplacementYParKeycode = { 81: POSITION_MAX_CAMERA * -coefZTop, 90: POSITION_MAX_CAMERA * coefYTop, 68: POSITION_MAX_CAMERA * coefZTop, 83: POSITION_MAX_CAMERA * -coefYTop };
                deplacementZParKeycode = { 81: POSITION_MAX_CAMERA * coefYTop, 90: POSITION_MAX_CAMERA * coefZTop, 68: POSITION_MAX_CAMERA * -coefYTop, 83: POSITION_MAX_CAMERA * coefZTop };

                deplacerLaCamera(rendu, keycode);
            }
        });
        var regleXMin = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.x == -POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                directionPrecedente = new Direction({ axe: Direction.X, top: false });
                var coefYTop = rendu.sommetScene().coeficientY();
                var coefZTop = rendu.sommetScene().coeficientZ();
                if (changeDeSommet(keycode)) {
                    rendu.sommetScene().modifierLaDirection({ axe: Direction.X, top: keycode === 90 });
                }

                deplacementXParKeycode = { 81: POSITION_MAX_CAMERA, 90: POSITION_MAX_CAMERA, 68: POSITION_MAX_CAMERA, 83: POSITION_MAX_CAMERA };
                deplacementYParKeycode = { 81: POSITION_MAX_CAMERA * coefZTop, 90: POSITION_MAX_CAMERA * coefYTop, 68: POSITION_MAX_CAMERA * -coefZTop, 83: POSITION_MAX_CAMERA * -coefYTop };
                deplacementZParKeycode = { 81: POSITION_MAX_CAMERA * coefYTop, 90: POSITION_MAX_CAMERA * coefZTop, 68: POSITION_MAX_CAMERA * coefYTop, 83: -POSITION_MAX_CAMERA * coefZTop };

                deplacerLaCamera(rendu, keycode);
            }
        });
        var regleYMax = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.y == POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                directionPrecedente = new Direction({ axe: Direction.Y, top: true });
                var coefXTop = rendu.sommetScene().coeficientX();
                var coefZTop = rendu.sommetScene().coeficientZ();
                if (changeDeSommet(keycode)) {
                    rendu.sommetScene().modifierLaDirection({ axe: Direction.Y, top: keycode === 83 });
                }

                deplacementXParKeycode = { 81: POSITION_MAX_CAMERA * coefZTop, 90: POSITION_MAX_CAMERA * coefXTop, 68: POSITION_MAX_CAMERA * -coefZTop, 83: POSITION_MAX_CAMERA * -coefXTop };
                deplacementYParKeycode = { 81: -POSITION_MAX_CAMERA, 90: -POSITION_MAX_CAMERA, 68: -POSITION_MAX_CAMERA, 83: -POSITION_MAX_CAMERA };
                deplacementZParKeycode = { 81: POSITION_MAX_CAMERA * -coefXTop, 90: POSITION_MAX_CAMERA * coefZTop, 68: POSITION_MAX_CAMERA * coefXTop, 83: POSITION_MAX_CAMERA * -coefZTop };

                deplacerLaCamera(rendu, keycode);
            }
        });
        var regleYMin = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.y == -POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                directionPrecedente = new Direction({ axe: Direction.Y, top: false });
                var coefXTop = rendu.sommetScene().coeficientX();
                var coefZTop = rendu.sommetScene().coeficientZ();
                if (changeDeSommet(keycode)) {
                    rendu.sommetScene().modifierLaDirection({ axe: Direction.Y, top: keycode === 90 });
                }

                deplacementXParKeycode = { 81: POSITION_MAX_CAMERA * -coefZTop, 90: POSITION_MAX_CAMERA * coefXTop, 68: POSITION_MAX_CAMERA * coefZTop, 83: POSITION_MAX_CAMERA * -coefXTop };
                deplacementYParKeycode = { 81: POSITION_MAX_CAMERA, 90: POSITION_MAX_CAMERA, 68: POSITION_MAX_CAMERA, 83: POSITION_MAX_CAMERA };
                deplacementZParKeycode = { 81: POSITION_MAX_CAMERA * coefXTop, 90: POSITION_MAX_CAMERA * coefZTop, 68: POSITION_MAX_CAMERA * -coefXTop, 83: POSITION_MAX_CAMERA * -coefZTop };

                deplacerLaCamera(rendu, keycode);
            }
        });
        var regleZMax = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.z == POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                directionPrecedente = new Direction({ axe: Direction.Z, top: true });
                var coefXTop = rendu.sommetScene().coeficientX();
                var coefYTop = rendu.sommetScene().coeficientY();
                if (changeDeSommet(keycode)) {
                    rendu.sommetScene().modifierLaDirection({ axe: Direction.Z, top: keycode === 83 });
                }

                deplacementXParKeycode = { 81: POSITION_MAX_CAMERA * -coefYTop, 90: POSITION_MAX_CAMERA * coefXTop, 68: POSITION_MAX_CAMERA * coefYTop, 83: POSITION_MAX_CAMERA * -coefXTop };
                deplacementYParKeycode = { 81: POSITION_MAX_CAMERA * coefXTop, 90: POSITION_MAX_CAMERA * coefYTop, 68: POSITION_MAX_CAMERA * -coefXTop, 83: POSITION_MAX_CAMERA * -coefYTop };
                deplacementZParKeycode = { 81: -POSITION_MAX_CAMERA, 90: -POSITION_MAX_CAMERA, 68: -POSITION_MAX_CAMERA, 83: -POSITION_MAX_CAMERA };

                deplacerLaCamera(rendu, keycode);
            }
        });
        var regleZMin = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.z == -POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                directionPrecedente = new Direction({ axe: Direction.Z, top: false });
                var coefXTop = rendu.sommetScene().coeficientX();
                var coefYTop = rendu.sommetScene().coeficientY();
                if (changeDeSommet(keycode)) {
                    rendu.sommetScene().modifierLaDirection({ axe: Direction.Z, top: keycode === 90 });
                }

                deplacementXParKeycode = { 81: POSITION_MAX_CAMERA * coefYTop, 90: POSITION_MAX_CAMERA * coefXTop, 68: POSITION_MAX_CAMERA * -coefYTop, 83: POSITION_MAX_CAMERA * -coefXTop };
                deplacementYParKeycode = { 81: POSITION_MAX_CAMERA * -coefXTop, 90: POSITION_MAX_CAMERA * coefYTop, 68: POSITION_MAX_CAMERA * coefXTop, 83: POSITION_MAX_CAMERA * -coefYTop };
                deplacementZParKeycode = { 81: POSITION_MAX_CAMERA, 90: POSITION_MAX_CAMERA, 68: POSITION_MAX_CAMERA, 83: POSITION_MAX_CAMERA };

                deplacerLaCamera(rendu, keycode);
            }
        });
        listeDeRegles.push(regleXMax);
        listeDeRegles.push(regleXMin);
        listeDeRegles.push(regleYMax);
        listeDeRegles.push(regleYMin);
        listeDeRegles.push(regleZMax);
        listeDeRegles.push(regleZMin);
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
    function changeDeSommet(keycode) {
        return keycode === 90 || keycode === 83;
    }
    function deplacerLaCamera(rendu, keycode) {
        var camera = rendu.camera();
        camera.position.x += deplacementXParKeycode[keycode];
        camera.position.y += deplacementYParKeycode[keycode];
        camera.position.z += deplacementZParKeycode[keycode];
        camera.rotation.x -= Math.PI / 2; // TODO : calculer la rotation de la camera puis animer la camera
        camera.lookAt(rendu.scene().position);
    }
}

function ControleSnake() {
    var directionPrecedente = new Direction({ axe: Direction.X, top: false });

    this.initialiserLeDeplacementDeLaCamera = function (rendu) {
        $(document).keydown(function (e) {
            if (estUnDeplacementDeCamera(e.keyCode)) {
                deplacerLaCamera(e.keyCode);
            }
        });

        function estUnDeplacementDeCamera(keycode) {
            return keycode == 81 || keycode == 90 || keycode == 68 || keycode == 83;
        }

        function deplacerLaCamera(keycode) {
            var reglesDeDeplacementCamera = new RegleDeplacementCamera().genererLesReglesDeDeplacement();
            for (var i = 0; i < reglesDeDeplacementCamera.length; i++) {
                if (reglesDeDeplacementCamera[i].estValide(rendu)) {
                    reglesDeDeplacementCamera[i].appliquerLaRegle(rendu, keycode);
                    break;
                }
            }
        }
    }

    this.initialiserLeDeplacementDuSnake; //TODO cette fonction
}