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
	
	Ca('teste qu\'un snake vide est composé de 3 objets juxtaposés', function() {
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
});