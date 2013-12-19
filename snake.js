$(function () {
    var jeu = new JeuSnake({score: $('#score'), annonce: $('#annonce')});
    jeu.lancerUnePartie();

    var rendu = new Rendu();
    rendu.initialiser($('#container'));
    rendu.dessinerLeCubeDeScene(jeu.elementsADessiner().scene);
    rendu.animer(jeu);

    var controles = new ControleSnake(jeu, rendu);
    controles.initialiserLeDeplacementDeLaCamera();
    controles.initialiserLeDeplacementDuSnake();

});