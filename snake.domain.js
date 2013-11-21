function Coordonnees(param) {
	var x = 0;
	var y = 0;
	var z = 0;
	
	this.sontDesCoordonnees = true;
	this.x = function() { return x };
	this.y = function() { return y };
	this.z = function() { return z };
	this.bouger = function(coordonnees) {
		if(coordonnees.x != null) {
			x += coordonnees.x;
		}
		if(coordonnees.y != null) {
			y += coordonnees.y;
		}
		if(coordonnees.z != null) {
			z += coordonnees.z;
		}
	};
	this.egale = function(objet) {
		if(objet != null && objet.sontDesCoordonnees) {
			return x === objet.x() && y === objet.y() && z === objet.z();
		}
		return false;
	};
	this.estAligneSurLAxeX = function (objet) {
	    if (objet != null && objet.sontDesCoordonnees) {
	        return objet.y() === y && objet.z() === z;
	    }
	    return false;
	}
	this.estAligneSurLAxeY = function (objet) {
	    if (objet != null && objet.sontDesCoordonnees) {
	        return objet.x() === x && objet.z() === z;
	    }
	    return false;
	}
	this.estAligneSurLAxeZ = function (objet) {
	    if (objet != null && objet.sontDesCoordonnees) {
	        return objet.x() === x && objet.y() === y;
	    }
	    return false;
	}
	
	if(param != null) {
		initialiser();
	}
	
	function initialiser() {
		if(param.x != null) {
			x = param.x;
		}
		if(param.y != null) {
			y = param.y;
		}
		if(param.z != null) {
			z = param.z;
		}
	}
}
Coordonnees.calculerLaDistanceEntreDeuxPointsSurUnAxe = function (point1, point2) {
    var distance = point2 - point1;
    if (distance < 0) {
        return distance * -1;
    }
    return distance;
};

function DimensionCube(param) {
	var longueur = 0;
	
	this.longueur = function() { return longueur; };
	
	if(param != null) {
		initialiser();
	}
	
	function initialiser() {
		if(param.longueur != null) {
			longueur = param.longueur;
		}	
	}
}


function Cube(param) {
    var ceCube = this;
	var position = new Coordonnees();
	var dimension = new DimensionCube();
	
	this.estUnCube = true;
	this.position = function() { return position; };
	this.positionXMax = function() { return position.x() + dimension.longueur() / 2 };
	this.positionXMin = function() { return position.x() - dimension.longueur() / 2 };
	this.positionYMax = function() { return position.y() + dimension.longueur() / 2 };
	this.positionYMin = function() { return position.y() - dimension.longueur() / 2 };
	this.positionZMax = function() { return position.z() + dimension.longueur() / 2 };
	this.positionZMin = function() { return position.z() - dimension.longueur() / 2 };
	this.dimension = function() { return dimension; };
	this.aLaMemePosition = function(objet) {
		if(objet != null && objet.position != null) {
			return position.egale(objet.position());
		}
		return false;
	};
	this.estJuxtapose = function(objet) {
	    if(objet.estUnCube && estAligneSurUnAxeAvec(objet)) {
	        var distanceSurLAxe = calculerLaDistanceSurLAxeDAlignement();
	        var distanceAttendue = calculerLaDistanceAttendue();
	        return sontJuxtaposés(distanceSurLAxe, distanceAttendue);
		}
	    return false;

	    function estAligneSurUnAxeAvec(objet) {
	        return position.estAligneSurLAxeX(objet.position())
                || position.estAligneSurLAxeY(objet.position())
                || position.estAligneSurLAxeZ(objet.position());
	    }

	    function calculerLaDistanceSurLAxeDAlignement() {
	        var distance = 0;
	        if (position.estAligneSurLAxeX(objet.position())) {
	            distance = Coordonnees.calculerLaDistanceEntreDeuxPointsSurUnAxe(position.x(), objet.position().x());
	        }
	        if (position.estAligneSurLAxeY(objet.position())) {
	            distance = Coordonnees.calculerLaDistanceEntreDeuxPointsSurUnAxe(position.y(), objet.position().y());
	        }
	        if (position.estAligneSurLAxeZ(objet.position())) {
	            distance = Coordonnees.calculerLaDistanceEntreDeuxPointsSurUnAxe(position.z(), objet.position().z());
	        }
	        return distance;
	    }

	    function calculerLaDistanceAttendue() {
	        return dimension.longueur() / 2 + objet.dimension().longueur() / 2;
	    }

	    function sontJuxtaposés(distanceSurAxe, distanceAttendue) {
	        return distanceSurAxe > 0 && distanceSurAxe == distanceAttendue;
	    }
	};
	this.estInclusDansLeCube = function (objet) {
	    if (objet != null && objet.estUnCube) {
	        return estInclusSurLAxeX() && estInclusSurLAxeY() && estInclusSurLAxeZ();

	        function estInclusSurLAxeX() {
	            return ceCube.positionXMax() <= objet.positionXMax()
	                && ceCube.positionXMin() >= objet.positionXMin();
	        }
	        function estInclusSurLAxeY() {
	            return ceCube.positionYMax() <= objet.positionYMax()
	                && ceCube.positionYMin() >= objet.positionYMin();
	        }
	        function estInclusSurLAxeZ() {
	            return ceCube.positionZMax() <= objet.positionZMax()
	                && ceCube.positionZMin() >= objet.positionZMin();
	        }
	    }
	}
	
	
	if(param != null) {
		initialiser();
	}
	
	function initialiser() {	
		if(param.coordonnees != null) {
			position = param.coordonnees;
		}
		if(param.dimension != null) {
			dimension = param.dimension;
		}
	}
}

function DirectionSnake(param) {
    var axeDeDeplacement = 'x';
    var enAvant = true;

    this.estUneDirectionSnake = true;
    this.aLeMemeAxeQue = function (direction) {
        if (direction != null && direction.estUneDirectionSnake) {
            return axeDeDeplacement == direction.axe();
        }
        return false;
    };
    this.avanceSurX = function() { return axeDeDeplacement === 'x'; };
    this.avanceSurY = function() { return axeDeDeplacement === 'y'; };
    this.avanceSurZ = function () { return axeDeDeplacement === 'z'; };
    this.axe = function () { return axeDeDeplacement; };
    this.enAvant = function () { return enAvant; };

    if (param != null) {
        initialiser();
    }

    function initialiser() {
        if (param.axe != null) {
            axeDeDeplacement = param.axe;
        }
        if (param.enAvant != null) {
            enAvant = param.enAvant;
        }
    }
}

function Snake(param) {
	var DIMENSION_CUBE_DEFAUT = new DimensionCube({longueur: 10});
	
	var ceSnake = this;
	var directionSuivante = new DirectionSnake();
	var scene = new Cube();
	var corps = new Array();
	var aMange = false;
	
	this.estUnSnake = true;
	this.corps = function() { return corps; };
	this.changerDeDirection = function (nouvelleDirection) {
	    if (nouvelleDirection != null && nouvelleDirection.estUneDirectionSnake && estUneDirectionValide()) {
	        directionSuivante = nouvelleDirection;
	    }

	    function estUneDirectionValide() {
	        return !directionSuivante.aLeMemeAxeQue(nouvelleDirection) || nouvelleDirection.enAvant() == directionSuivante.enAvant();
	    }
	};
	this.avancer = function () {
	    ajouterTete();
	    retirerLaQueue();

	    function ajouterTete() {
	        var positionNouvelleTete = initialiserLaPositionDeLaNouvelleTete();
	        var longueurMouvement = DIMENSION_CUBE_DEFAUT.longueur();
	        dirigerLeDeplacement();
	        positionNouvelleTete.bouger(calculerLeDeplacement());
	        var nouvelleTete = new Cube({
	            dimension: DIMENSION_CUBE_DEFAUT,
	            coordonnees: positionNouvelleTete
	        });
	        bougerLaTeteSiSortieDeScene();
	        corps.unshift(nouvelleTete);

	        function initialiserLaPositionDeLaNouvelleTete() {
	            var coordonneesTeteActuelle = corps[0].position();
	            var coordonneesDeLaNouvelleTete = new Coordonnees({
	                x: coordonneesTeteActuelle.x(),
	                y: coordonneesTeteActuelle.y(),
	                z: coordonneesTeteActuelle.z()
	            });
	            return coordonneesDeLaNouvelleTete;
	        }
	        function dirigerLeDeplacement() {
	            if (!directionSuivante.enAvant()) {
	                longueurMouvement *= -1;
	            }
	            return longueurMouvement;
	        }
	        function calculerLeDeplacement() {
	            if (directionSuivante.avanceSurX()) {
	                return { x: longueurMouvement };
	            }
	            if (directionSuivante.avanceSurY()) {
	                return { y: longueurMouvement };
	            }
	            if (directionSuivante.avanceSurZ()) {
	                return { z: longueurMouvement };
	            }
	            return null;
	        }
	        function bougerLaTeteSiSortieDeScene() {
	            if (!nouvelleTete.estInclusDansLeCube(scene)) {
	                ajusterSurX();
	                ajusterSurY();
	                ajusterSurZ();
	            }

	            function ajusterSurX() {
	                if (nouvelleTete.position().x() > scene.positionXMax()) {
	                    nouvelleTete.position().bouger({ x: -scene.dimension().longueur() });
	                }
	                if (nouvelleTete.position().x() < scene.positionXMin()) {
	                    nouvelleTete.position().bouger({ x: scene.dimension().longueur() });
	                }
	            }
	            function ajusterSurY() {
	                if (nouvelleTete.position().y() > scene.positionYMax()) {
	                    nouvelleTete.position().bouger({ y: -scene.dimension().longueur() });
	                }
	                if (nouvelleTete.position().y() < scene.positionYMin()) {
	                    nouvelleTete.position().bouger({ y: scene.dimension().longueur() });
	                }
	            }
	            function ajusterSurZ() {
	                if (nouvelleTete.position().z() > scene.positionZMax()) {
	                    nouvelleTete.position().bouger({ z: -scene.dimension().longueur() });
	                }
	                if (nouvelleTete.position().z() < scene.positionZMin()) {
	                    nouvelleTete.position().bouger({ z: scene.dimension().longueur() });
	                }
	            }
	        }
	    }
	    function retirerLaQueue() {
	        if (!aMange) {
	            corps.pop();
	        } else {
	            aMange = false;
	        }
	    }
	};
	this.mangeUnBonus = function (bonus) {
	    if (bonus != null && bonus.estUnBonus) {
	        return manger();
	    }
	    return false;

	    function manger() {
	        var tete = corps[0];
	        if (tete.aLaMemePosition(bonus.courant())) {
	            aMange = true;
	            bonus.genererUnBonus(ceSnake);
	        }
	        return aMange;
	    }
	};
	this.seMord = function () {
	    var tete = corps[0];
	    var ilMord = false;
	    for (var i = 1; i < corps.length; i++) {
	        verifierSIlMordCeCorps(i);
	    }
	    return ilMord;

	    function verifierSIlMordCeCorps(index) {
	        if (tete.aLaMemePosition(corps[index])) {
	            ilMord = true;
	        }
	    }
	};

	initialiser();

	function initialiser() {
	    var LONGUEUR_SNAKE_DEFAUT = 3;

	    function parametrer() {
	        if (param.scene != null && param.scene.estUnCube) {
	            scene = param.scene;
	        }
	    }

	    function initialiserCoordonneesDuCube(decalage) {
	        var coordonneesDuCube = new Coordonnees({
	            x: scene.position().x(),
	            y: scene.position().y(),
	            z: scene.position().z()
	        });
	        coordonneesDuCube.bouger({ x: decaler() });
	        return coordonneesDuCube;

	        function decaler() {
	            return scene.position().x() - decalage * DIMENSION_CUBE_DEFAUT.longueur()
	        }
	    }

	    function construireLeCorpsInitial() {
	        for (var longueur = 0; longueur < LONGUEUR_SNAKE_DEFAUT; longueur++) {
	            corps.push(new Cube({
	                dimension: DIMENSION_CUBE_DEFAUT,
	                coordonnees: initialiserCoordonneesDuCube(longueur)
	            }));
	        }
	    }

	    if (param != null) {
	        parametrer();
	    }
	    construireLeCorpsInitial();
	}
}

function Bonus(param) {
    var DIMENSION_BONUS_DEFAUT = new DimensionCube({ longueur: 10 });

    var scene = new Cube();
    var bonusCourant = null;
    this.estUnBonus = true;
    this.courant = function () { return bonusCourant; };
    //TODO repenser le positionnement du bonus
    this.genererUnBonus = function (snake) {
        var nouveauBonus = new Cube({
            coordonnees: genererLesCoordonneesDuBonus(),
            dimension: DIMENSION_BONUS_DEFAUT
        });
        if (leBonusEstSurUnElementDuSnake()) {
            return this(snake);
        }
        bonusCourant = nouveauBonus;

        function genererLesCoordonneesDuBonus() {
            var xDuBonus = genererUneCoordonneeAleatoireEntreDeuxPoints(
                scene.positionXMax(),
                scene.positionXMin()
            );
            var yDuBonus = genererUneCoordonneeAleatoireEntreDeuxPoints(
                scene.positionYMax(),
                scene.positionYMin()
            );
            var zDuBonus = genererUneCoordonneeAleatoireEntreDeuxPoints(
                scene.positionZMax(),
                scene.positionZMin()
            );
            var coordonneesGenerees = new Coordonnees({
                x: xDuBonus,
                y: yDuBonus,
                z: zDuBonus
            });
            return coordonneesGenerees;
        }

        function genererUneCoordonneeAleatoireEntreDeuxPoints(point1, point2) {
            var distance = Coordonnees.calculerLaDistanceEntreDeuxPointsSurUnAxe(point1, point2);
            var nombreDeCubePossibleSurLaDistance = distance / DIMENSION_BONUS_DEFAUT.longueur();
            var nombreAleatoireEntre0Et9 = Math.floor(Math.random() * 10);
            var decalagePourCentrerLaCoordonnee = DIMENSION_BONUS_DEFAUT.longueur() / 2;
            return nombreAleatoireEntre0Et9 % nombreDeCubePossibleSurLaDistance + decalagePourCentrerLaCoordonnee;
        }
        function leBonusEstSurUnElementDuSnake() {
            if (snake != null && snake.estUnSnake) {
                return verifierSurLeBonusEstSurUnElementDuSnake();
            }
            return false;

            function verifierSurLeBonusEstSurUnElementDuSnake() {
                var estSurUnElementDuSnake = false;
                for (var i = 0; i < snake.corps() ; i++) {
                    comparerLesCoordonneesGenereesAvecUnElementDuSnake(snake.corps()[i], estSurUnElementDuSnake);
                }
                return estSurUnElementDuSnake
            }
            function comparerLesCoordonneesGenereesAvecUnElementDuSnake(element, estSurUnElementDuSnake) {
                if (element.aLaMemePosition(nouveauBonus)) {
                    estSurUnElementDuSnake = true;
                }
            }
        }
    };
    this.placerUnBonus = function (nouveauBonus) {
        if (nouveauBonus != null && nouveauBonus.estUnCube) {
            bonusCourant = nouveauBonus;
        }
    };

    if (param != null) {
        initialiser();
    }

    function initialiser() {
        if (param.scene != null && param.scene.estUnCube) {
            scene = param.scene;
        }
    }
}

function JeuSnake() {
    var LONGUEUR_SCENE = 150;
    var VITESSE_DEFAUT = 830;
    var POINTS_PAR_BONUS = 10;

    var score = 0;
    var continuer = true;
    var scene = new Cube({ dimension: new DimensionCube({ longueur: LONGUEUR_SCENE }) });
    var bonus = new Bonus({ scene: scene });
    var snake, partieEnCours;

    this.estEnCours = function () { return continuer; };
    this.scoreActuel = function () { return score; };
    this.changerLaDirectionDuSnake = function (nouvelleDirection) { snake.changerDeDirection(nouvelleDirection); };
    this.lancerUnePartie = function () {
        score = 0;
        snake = new Snake({ scene: scene });
        bonus.genererUnBonus(snake);
        setInterval(jouer, VITESSE_DEFAUT);
    };
    this.elementsADessiner = function () {
        return {
            scene: scene,
            bonus: bonus.courant(),
            tete: snake.corps()[0],
            corps: recupererLeCorps()
        };

        function recupererLeCorps() {
            var corps = new Array();
            for (var i = 1; i < snake.corps().length; i++) {
                corps.push(snake.corps()[i]);
            }
            return corps;
        }
    }

    function jouer() {
        if (!continuer) {
            clearInterval(partieEnCours);
        }
        if (snake.seMord()) {
            continuer = false;
        }
        if (snake.mangeUnBonus(bonus)) {
            score += POINTS_PAR_BONUS;
        }
        snake.avancer();
    }
}