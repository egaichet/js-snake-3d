$(function () {
    var jeu = new JeuSnake();
    jeu.lancerUnePartie();

    var rendu = new Rendu();
    rendu.initialiser($('#container'));
    rendu.dessinerLeCubeDeScene(jeu.elementsADessiner().scene);
    rendu.animer(jeu);

    var controles = new ControleSnake();
    controles.initialiserLeDeplacementDeLaCamera(rendu);
});