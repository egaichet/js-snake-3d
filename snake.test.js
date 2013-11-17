Test(function() {
    Initialiser(function () { });
    Nettoyer(function () { });
    
	Ca('teste la comparaison de coordonnées', function() {
		var position = new Coordonnees({x: 10, y: 10, z: 10});
		OnAttend(position.egale(position)).DEtreVrai();
		OnAttend(position.egale(new Coordonnees())).DEtreFaux();
	});
	
	Ca('teste qu\'un objet peut se déplacer', function() {
	    var decalage = 10;
		var objet = new Object();
		objet.position = new Coordonnees({ x: decalage });
		objet.position.bouger({x: decalage});
		OnAttend(objet.position.x()).DEtreEgalA(decalage * 2);
	});
	
	Ca('teste qu\'un cube peut avoir la même position qu\'un autre objet', function() {
		var positionDeTest = new Coordonnees({x:10, y:10, z:10});
		var objet1 = new Object();
		objet1.position = function() { return positionDeTest; };
		var objet2 = new Object();
		objet2.position = function() { return new Coordonnees(); };
		var cube = new Cube({
			dimension: new DimensionCube(),
			coordonnees: positionDeTest
		});
		OnAttend(cube.aLaMemePosition(objet1)).DEtreVrai();
		OnAttend(cube.aLaMemePosition(objet2)).DEtreFaux();
	});
	
	Ca('teste qu\'un cube peut être juxtaposé à un autre cube sur l\'axe des X', function() {
		var dimensionReference = new DimensionCube({longueur:10});
		var cubeReference = new Cube({
			dimension: dimensionReference,
			coordonnees: new Coordonnees({
				x:20,
				y:10,
				z:10
			})
		});
		var cubeJuxtapose = new Cube({
			dimension: dimensionReference,
			coordonnees: new Coordonnees({
				x:30,
				y:10,
				z:10
			})
		});
		var cubePasJuxtapose = new Cube({
			dimension: dimensionReference,
			coordonnees: new Coordonnees()
		});
		OnAttend(cubeReference.estJuxtapose(cubeJuxtapose)).DEtreVrai();
		OnAttend(cubeReference.estJuxtapose(cubePasJuxtapose)).DEtreFaux();
	});

	Ca('teste qu\'un cube peut être inclus dans un autre cube', function () {
	    var grosCube = new Cube({
	        dimension: new DimensionCube({ longueur: 50 }),
            coordonnees: new Coordonnees()
	    });
	    var petitCube = new Cube({
	        dimension: new DimensionCube({ longueur: 10 }),
            coordonnees: new Coordonnees()
	    });
	    OnAttend(petitCube.estInclusDansLeCube(grosCube)).DEtreVrai();
	    OnAttend(grosCube.estInclusDansLeCube(petitCube)).DEtreFaux();
	});
	
	Ca('teste qu\'un nouveau snake est composé de 3 objets juxtaposés', function() {
		var snake = new Snake();
		var corpsDuSnake = snake.corps();
		OnAttend(corpsDuSnake.length).DEtreEgalA(3);
		OnAttend(corpsDuSnake[0].estJuxtapose(corpsDuSnake[1])).DEtreVrai();
		OnAttend(corpsDuSnake[1].estJuxtapose(corpsDuSnake[2])).DEtreVrai();
	});

	Ca('teste qu\'un snake qui avance dans une direction décale tous les éléments du corps dans cette direction', function () {
	    var snake = new Snake();
	    var corpsInitialDuSnake = snake.corps().slice(0);
	    snake.avancer();
	    var corpsFinalDuSnake = snake.corps();
	    OnAttend(corpsFinalDuSnake.length).DEtreEgalA(3);
	    verifierQueLeSnakeAvance();

	    function verifierQueLeSnakeAvance() {
	        for (var i = 0; i < corpsInitialDuSnake.length; i++) {
	            var elementDuCorpsInitial = corpsInitialDuSnake[i];
	            var elementDuCorpsFinal = corpsFinalDuSnake[i];
	            OnAttend(elementDuCorpsInitial.estJuxtapose(elementDuCorpsFinal)).DEtreVrai();
	            OnAttend(elementDuCorpsInitial.position().estAligneSurLAxeX(elementDuCorpsFinal.position())).DEtreVrai();
	        }
	    }
	});

	Ca('teste qu\'un snake qui change de direction va dans la bonne direction', function () {
	    var snake = new Snake();
	    var nouvelleDirection = new DirectionSnake({ axe: 'y', enAvant: true });
	    snake.changerDeDirection(nouvelleDirection);
	    snake.avancer();
	    verifierLAlignementTeteVentre();
	    verifierLAlignementVentreQueue();

	    function verifierLAlignementTeteVentre() {
	        var tete = snake.corps()[0];
	        var ventre = snake.corps()[1];
	        OnAttend(tete.estJuxtapose(ventre)).DEtreVrai();
	        OnAttend(tete.position().estAligneSurLAxeY(ventre.position())).DEtreVrai();
	    }
	    function verifierLAlignementVentreQueue() {
	        var ventre = snake.corps()[1];
	        var queue = snake.corps()[2];
	        OnAttend(ventre.estJuxtapose(queue)).DEtreVrai();
	        OnAttend(ventre.position().estAligneSurLAxeX(queue.position())).DEtreVrai();
	    }
	});

	Ca('teste qu\'un snake ne peut pas aller dans la direction opposée en un seul déplacement', function () {
	    var snakeNormal = new Snake();
	    var snakeAvecChangementDeDirection = new Snake();
	    var nouvelleDirection = new DirectionSnake({ axe: 'x', enAvant: false });
	    snakeAvecChangementDeDirection.changerDeDirection(nouvelleDirection);
	    snakeNormal.avancer();
	    snakeAvecChangementDeDirection.avancer();
	    verifierQueLesDeuxSnakesSontConfondus();

	    function verifierQueLesDeuxSnakesSontConfondus() {
	        var corpsNormal = snakeNormal.corps();
	        var corpsAvecChangement = snakeAvecChangementDeDirection.corps();
	        for (var i = 0; i < corpsNormal.length; i++) {
	            OnAttend(corpsNormal[i].aLaMemePosition(corpsAvecChangement[i])).DEtreVrai();
	        }
	    }
	});

	Ca('teste que la génération d\'un bonus est toujours inclus dans la scène', function () {
	    var scene = new Cube({
	        coordonnees: new Coordonnees(),
	        dimension: new DimensionCube({ longueur: 30 })
	    });
	    var snake = new Snake({ scene: scene });
	    snake.avancer();
	    var bonus = new Bonus({ scene: scene });
	    verifierLePlacementDe10GenerationsDeBonus();

	    function verifierLePlacementDe10GenerationsDeBonus() {
	        for (var i = 0; i < 10; i++) {
	            bonus.genererUnBonus(snake);
	            OnAttend(bonus.courant().estInclusDansLeCube(scene)).DEtreVrai();
	            verifierQueLeBonusNEstPasSurUnElementDuSnake();
	        }
	    }
	    function verifierQueLeBonusNEstPasSurUnElementDuSnake() {
	        for (var i = 0; i < snake.corps().length; i++) {
	            OnAttend(bonus.courant().aLaMemePosition(snake.corps()[i])).DEtreFaux();
	        }
	    }
	});

	Ca('teste qu\'un snake qui mange un bonus grandit d\'un élément et génère un nouveau bonus', function () {
	    var scene = new Cube({
	        coordonnees: new Coordonnees(),
	        dimension: new DimensionCube({ longueur: 50 })
	    });
	    var bonus = new Bonus({ scene: scene });
	    var snake = new Snake({ scene: scene });
	    positionnerLeBonus();
	    OnAttend(snake.corps().length).DEtreEgalA(3);
	    var aMange = snake.mangeUnBonus(bonus);
	    snake.avancer();
	    OnAttend(aMange).DEtreVrai();
	    OnAttend(snake.corps().length).DEtreEgalA(4);
	    OnAttend(bonus.courant().position().egale(new Coordonnees())).DEtreFaux();

	    function positionnerLeBonus() {
	        var bonusSurLaTete = new Cube({
	            coordonnees: new Coordonnees(),
	            dimension: new DimensionCube({ longueur: 10 })
	        });
	        bonus.placerUnBonus(bonusSurLaTete);
	    }
	});

	Ca('teste qu\'une tête qui avance sur un élément du corps donne une collision', function () {
	    var snakeQuiMord = new Snake();
	    var corpsDuSnakeQuiMord = snakeQuiMord.corps();
	    corpsDuSnakeQuiMord[0].position().bouger({ x: -10 });
	    OnAttend(snakeQuiMord.seMord()).DEtreVrai();

	    var snakeNormal = new Snake();
	    OnAttend(snakeNormal.seMord()).DEtreFaux();
	});

	Ca('teste qu\'un snake qui sort de la scène retourne dans la scène par la face opposée', function () {
	    var scene = new Cube({
	        coordonnees: new Coordonnees(),
	        dimension: new DimensionCube({ longueur: 50 })
	    });
	    var snake = new Snake({ scene: scene });
	    avancerNFois(3);
	    var tete = snake.corps()[0];
	    OnAttend(tete.position().x()).DEtreEgalA(-20);
        
	    function avancerNFois(n) {
	        for (var i = 0; i < n; i++) {
	            snake.avancer();
	        }
	    }
	});
});