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
		objet.position = new Coordonnees();
		objet.position.bouger({x: decalage});
		OnAttend(objet.position.x()).DEtreEgalA(decalage);
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
				x:10,
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
	
	Ca('teste qu\'un snake vide est composé de 3 objets', function() {
		var snake = new Snake();
		var corpsDuSnake = snake.corps();
		OnAttend(corpsDuSnake.length).DEtreEgalA(3);
	});
});