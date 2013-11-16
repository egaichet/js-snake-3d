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
			x = coordonnees.x;
		}
		if(coordonnees.y != null) {
			y = coordonnees.y;
		}
		if(coordonnees.z != null) {
			z = coordonnees.z;
		}
	};
	this.egale = function(objet) {
		if(objet != null && objet.sontDesCoordonnees) {
			return x === objet.x() && y === objet.y() && z === objet.z();
		}
		return false;
	};
	//TODO : placer les alignements ici, les comparaison de distance seront au niveau du cube
	
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
		if(objet.estUnCube) {
			var longueurDeDecalageAttendue = dimension.longueur() / 2 + objet.dimension().longueur() / 2;
			return estAligneSurLAxeDesX() || estAligneSurLAxeDesY() || estAligneSurLAxeDesZ();
			
			function estAligneSurLAxeDesX() {
				var decalageX = objet.position().x() + position.x();
				return objet.position().y() == position.y() && objet.position().z() == position.z() && decalageX == longueurDeDecalageAttendue;
			}
			function estAligneSurLAxeDesY() {
				var decalageY = objet.position().y() + position.y();
				return objet.position().x() == position.x() && objet.position().z() == position.z() && decalageY == longueurDeDecalageAttendue;
			}
			function estAligneSurLAxeDesZ() {
				var decalageZ = objet.position().z() + position.z();
				return objet.position().x() == position.x() && objet.position().y() == position.y() && decalageZ == longueurDeDecalageAttendue;
			}
		}
		return false;
	};
	
	
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

function Snake(param) {
	var DIMENSION_CUBE_DEFAUT = new DimensionCube({longueur: 10});
	
	var deplacement = {direction: 'x', sens: true};
	var scene = new Cube();
	var corps = new Array();
	
	this.corps = function() { return corps; };
	
	function initialiser() {
		var LONGUEUR_SNAKE_DEFAUT = 3;
		
		function parametrer() {
			if(param.scene != null) {
				scene = param.scene;
			}
		}
		
		function initialiserCoordonneesDuCube(decalage) {
			var coordonneesDuCube = new Coordonnees();
			coordonneesDuCube.x = scene.position.x;
			coordonneesDuCube.y = scene.position.y;
			coordonneesDuCube.x = scene.position.z;
			coordonneesDuCube.x += decalage * DIMENSION_CUBE_DEFAUT.longueur;
			return coordonneesDuCube;
		}
		
		function construireLeCorpsInitial() {
			for(var longueur = 0; longueur < LONGUEUR_SNAKE_DEFAUT; longueur++) {
				corps.push(new Cube({
					dimension: DIMENSION_CUBE_DEFAUT, 
					coordonnees: initialiserCoordonneesDuCube(longueur)}));
			}
		}
		
		if(param != null) {
			parametrer();
		}
		construireLeCorpsInitial();
	}
	
	function avancer() {
		function ajouterTete() {
			var teteActuelle = this.corps[0];
			var nouvelleTete = new Cube({});
		}
	}
	
	initialiser();
}