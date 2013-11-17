function calculerLaDistanceEntreDeuxPointsSurUnAxe(point1, point2) {
    var distance = point2 - point1;
    if (distance < 0) {
        return distance * -1;
    }
    return distance;
}

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
	var position = new Coordonnees();
	var dimension = new DimensionCube();
	
	this.estUnCube = true;
	this.position = function() { return position; };
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
	        return sontJuxtapos�s(distanceSurLAxe, distanceAttendue);
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
	            distance = calculerLaDistanceEntreDeuxPointsSurUnAxe(position.x(), objet.position().x());
	        }
	        if (position.estAligneSurLAxeY(objet.position())) {
	            distance = calculerLaDistanceEntreDeuxPointsSurUnAxe(position.y(), objet.position().y());
	        }
	        if (position.estAligneSurLAxeZ(objet.position())) {
	            distance = calculerLaDistanceEntreDeuxPointsSurUnAxe(position.z(), objet.position().z());
	        }
	        return distance;
	    }

	    function calculerLaDistanceAttendue() {
	        return dimension.longueur() / 2 + objet.dimension().longueur() / 2;
	    }

	    function sontJuxtapos�s(distanceSurAxe, distanceAttendue) {
	        return distanceSurAxe > 0 && distanceSurAxe == distanceAttendue;
	    }
	};
	this.estInclusDansLeCube = function (objet) {
	    if (objet != null && objet.estUnCube) {
	        return estInclusSurLAxeX() && estInclusSurLAxeY() && estInclusSurLAxeZ();

	        function estInclusSurLAxeX() {
	            return position.x() + dimension.longueur() / 2 <= objet.position().y() + objet.dimension().longueur() / 2
	                && position.x() - dimension.longueur() / 2 >= objet.position().y() - objet.dimension().longueur() / 2;
	        }
	        function estInclusSurLAxeY() {
	            return position.y() + dimension.longueur() / 2 <= objet.position().y() + objet.dimension().longueur() / 2
	                && position.y() - dimension.longueur() / 2 >= objet.position().y() - objet.dimension().longueur() / 2;
	        }
	        function estInclusSurLAxeZ() {
	            return position.z() + dimension.longueur() / 2 <= objet.position().z() + objet.dimension().longueur() / 2
	                && position.z() - dimension.longueur() / 2 >= objet.position().z() - objet.dimension().longueur() / 2;
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
	
	var directionSuivante = new DirectionSnake();
	var scene = new Cube();
	var corps = new Array();
	var aMange = false;
	
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
	    if (bonus != null && bonus.estUneListeDeBonus) {
	        return manger();
	    }
	    return false;

	    function manger() {
	        var tete = corps[0];
	        var listeBonus = bonus.liste();
	        var indexDuBonusMange = trouverLIndexDuBonusMange();
	        if (indexDuBonusMange != null) {
	            listeBonus.splice(indexDuBonusMange, 1);
	            aMange = true;
	            return true;
	        }
	        return false;

	        function trouverLIndexDuBonusMange() {
	            for (var i = 0; i < listeBonus.length; i++) {
	                if (listeBonus[i].aLaMemePosition(tete)) {
	                    return i;
	                }
	            }
	            return null;
	        }
	    }
	};
    //TODO : fonction manger

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

function ListeBonus(param) {
    var DIMENSION_BONUS_DEFAUT = new DimensionCube({ longueur: 10 });

    var liste = new Array();
    var scene = new Cube();

    this.estUneListeDeBonus = true;
    this.liste = function () { return liste; };
    this.genererUnBonus = function () {
        var nouveauBonus = new Cube({
            coordonnees: genererLesCoordonneesDuBonus(),
            dimension: DIMENSION_BONUS_DEFAUT
        });
        liste.push(nouveauBonus);

        function genererLesCoordonneesDuBonus() {
            var xDuBonus = genererUneCoordonneeAleatoireEntreDeuxPoints(
                calculerLaCoordonneeDuPlanSuperieur(scene.position().x(), scene.dimension().longueur()),
                calculerLaCoordonneeDuPlanInferieur(scene.position().x(), scene.dimension().longueur())
            );
            var yDuBonus = genererUneCoordonneeAleatoireEntreDeuxPoints(
                calculerLaCoordonneeDuPlanSuperieur(scene.position().y(), scene.dimension().longueur()),
                calculerLaCoordonneeDuPlanInferieur(scene.position().y(), scene.dimension().longueur())
            );
            var zDuBonus = genererUneCoordonneeAleatoireEntreDeuxPoints(
                calculerLaCoordonneeDuPlanSuperieur(scene.position().z(), scene.dimension().longueur()),
                calculerLaCoordonneeDuPlanInferieur(scene.position().z(), scene.dimension().longueur())
            );
            return new Coordonnees({
                x: xDuBonus,
                y: yDuBonus,
                z: zDuBonus
            });
        }
        function genererUneCoordonneeAleatoireEntreDeuxPoints(point1, point2) {
            var distance = calculerLaDistanceEntreDeuxPointsSurUnAxe(point1, point2);
            var nombreDeCubePossibleSurLaDistance = distance / DIMENSION_BONUS_DEFAUT.longueur();
            var nombreAleatoireEntre0Et9 = Math.floor(Math.random() * 10);
            var decalagePourCentrerLaCoordonnee = DIMENSION_BONUS_DEFAUT.longueur() / 2;
            return nombreAleatoireEntre0Et9 % nombreDeCubePossibleSurLaDistance + decalagePourCentrerLaCoordonnee;
        }
        function calculerLaCoordonneeDuPlanSuperieur(coordonneeDuCentre, longueur) {
            return coordonneeDuCentre + longueur / 2;
        }
        function calculerLaCoordonneeDuPlanInferieur(coordonneeDuCentre, longueur) {
            return coordonneeDuCentre - longueur / 2;
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