function Direction(param) {
    var axe = Direction.X;
    var top = true;

    this.axe = function () { return axe; };
    this.top = function () { return top; };

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
    var deplacementXParKeycode = { 81: 0, 68: 0};
    var deplacementZParKeycode = { 81: 0, 68: 0};

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
                deplacementXParKeycode = { 81: -POSITION_MAX_CAMERA, 68: -POSITION_MAX_CAMERA };
                deplacementZParKeycode = { 81: POSITION_MAX_CAMERA, 68: -POSITION_MAX_CAMERA  };
                deplacerLaCamera(rendu, keycode);
            }
        });
        var regleXMin = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.x == -POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                deplacementXParKeycode = { 81: POSITION_MAX_CAMERA, 68: POSITION_MAX_CAMERA };
                deplacementZParKeycode = { 81: -POSITION_MAX_CAMERA, 68: POSITION_MAX_CAMERA  };
                deplacerLaCamera(rendu, keycode);
            }
        });
        var regleZMax = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.z == POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                deplacementXParKeycode = { 81: -POSITION_MAX_CAMERA, 68: POSITION_MAX_CAMERA };
                deplacementZParKeycode = { 81: -POSITION_MAX_CAMERA, 68: -POSITION_MAX_CAMERA  };
                deplacerLaCamera(rendu, keycode);
            }
        });
        var regleZMin = new RegleDeplacementCamera({
            regle: function (rendu) {
                return rendu.camera().position.z == -POSITION_MAX_CAMERA;
            },
            application: function (rendu, keycode) {
                deplacementXParKeycode = { 81: POSITION_MAX_CAMERA, 68: -POSITION_MAX_CAMERA };
                deplacementZParKeycode = { 81: POSITION_MAX_CAMERA, 68: POSITION_MAX_CAMERA  };
                deplacerLaCamera(rendu, keycode);
            }
        });
        listeDeRegles.push(regleXMax);
        listeDeRegles.push(regleXMin);
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
    function deplacerLaCamera(rendu, keycode) {
        var camera = rendu.camera();
        var animationDeplacement;
        var iterationsAFaire = 10;
        var iterationsFaites = 0;
        var deplacementIteratifX = deplacementXParKeycode[keycode] / iterationsAFaire;
        var deplacementIteratifZ = deplacementZParKeycode[keycode] / iterationsAFaire;
        animationDeplacement = setInterval(deplacer, 50);
        function deplacer() {
            iterationsFaites++;
            camera.position.x += deplacementIteratifX;
            camera.position.z += deplacementIteratifZ;
            camera.lookAt(rendu.scene().position);
            if (iterationsFaites == iterationsAFaire) {
                clearInterval(animationDeplacement);
            }
        }
    }
}

function RegleDeplacementSnake(param) {
    var deplacementParKeyCode = {83: null, 90: null, 37: null, 38: null, 39: null, 40: null};
    this.estValide = function () {
        return false;
    };
    this.appliquerLaRegle = function() {

    };
    this.genererLesReglesDeDeplacement = function() {
        var listeDeRegles = new Array();
        var regleXMax = new RegleDeplacementSnake({
            regle: function(rendu) {
                return rendu.camera().position.x == POSITION_MAX_CAMERA;
            },
            application: function(jeu, keycode) {
                 deplacementParKeyCode = {
                    83: new DirectionSnake({axe: Direction.X, enAvant: true}),
                    90: new DirectionSnake({axe: Direction.X, enAvant: false}),
                    37: new DirectionSnake({axe: Direction.Z, enAvant: true}),
                    38: new DirectionSnake({axe: Direction.Y, enAvant: true}),
                    39: new DirectionSnake({axe: Direction.Z, enAvant: false}),
                    40: new DirectionSnake({axe: Direction.Y, enAvant: false})
                 };
                 deplacerLeSnake(jeu, keycode);
              }
        });
        var regleXMin = new RegleDeplacementSnake({
            regle: function(rendu) {
                return rendu.camera().position.x == -POSITION_MAX_CAMERA;
            },
            application: function(jeu, keycode) {
                deplacementParKeyCode = {
                    83: new DirectionSnake({axe: Direction.X, enAvant: false}),
                    90: new DirectionSnake({axe: Direction.X, enAvant: true}),
                    37: new DirectionSnake({axe: Direction.Z, enAvant: false}),
                    38: new DirectionSnake({axe: Direction.Y, enAvant: true}),
                    39: new DirectionSnake({axe: Direction.Z, enAvant: true}),
                    40: new DirectionSnake({axe: Direction.Y, enAvant: false})
                };
                deplacerLeSnake(jeu, keycode);
            }
        });
        var regleZMax = new RegleDeplacementSnake({
            regle: function(rendu) {
                return rendu.camera().position.z == POSITION_MAX_CAMERA;
            },
            application: function(jeu, keycode) {
                deplacementParKeyCode = {
                    83: new DirectionSnake({axe: Direction.Z, enAvant: true}),
                    90: new DirectionSnake({axe: Direction.Z, enAvant: false}),
                    37: new DirectionSnake({axe: Direction.X, enAvant: false}),
                    38: new DirectionSnake({axe: Direction.Y, enAvant: true}),
                    39: new DirectionSnake({axe: Direction.X, enAvant: true}),
                    40: new DirectionSnake({axe: Direction.Y, enAvant: false})
                };
                deplacerLeSnake(jeu, keycode);
            }
        });
        var regleZMin = new RegleDeplacementSnake({
            regle: function(rendu) {
                return rendu.camera().position.z == -POSITION_MAX_CAMERA;
            },
            application: function(jeu, keycode) {
                deplacementParKeyCode = {
                    83: new DirectionSnake({axe: Direction.Z, enAvant: false}),
                    90: new DirectionSnake({axe: Direction.Z, enAvant: true}),
                    37: new DirectionSnake({axe: Direction.X, enAvant: true}),
                    38: new DirectionSnake({axe: Direction.Y, enAvant: true}),
                    39: new DirectionSnake({axe: Direction.X, enAvant: false}),
                    40: new DirectionSnake({axe: Direction.Y, enAvant: false})
                };
                deplacerLeSnake(jeu, keycode);
            }
        });
        listeDeRegles.push(regleXMax);
        listeDeRegles.push(regleXMin);
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
    function deplacerLeSnake(jeu, keycode) {
        jeu.changerLaDirectionDuSnake(deplacementParKeyCode[keycode]);
    }

}

function ControleSnake(jeu, rendu) {
    var jeu = jeu;
    var rendu = rendu;

    this.initialiserLeDeplacementDeLaCamera = function () {
        $(document).keydown(function (e) {
            if (estUnDeplacementDeCamera(e.keyCode)) {
                deplacerLaCamera(e.keyCode);
            }
        });

        function estUnDeplacementDeCamera(keycode) {
            return keycode == 81 || keycode == 68;
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

    this.initialiserLeDeplacementDuSnake = function () {
        $(document).keydown(function(e) {
            if(estUnDeplacementDuSnake(e.keyCode)) {
                deplacerLeSnake(e.keyCode);
            }
        });

        function estUnDeplacementDuSnake(keycode) {
            return keycode == 83
                || keycode == 90
                || keycode >= 37 && keycode <= 40;
        }
        function deplacerLeSnake(keycode) {
            var reglesDeDeplacementSnake = new RegleDeplacementSnake().genererLesReglesDeDeplacement();
            for(var i = 0; i < reglesDeDeplacementSnake.length; i++) {
                if(reglesDeDeplacementSnake[i].estValide(rendu)) {
                    reglesDeDeplacementSnake[i].appliquerLaRegle(jeu, keycode);
                    break;
                }
            }
        }
    }
}