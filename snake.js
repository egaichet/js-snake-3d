$(function () {
    var jeu = new JeuSnake({
        score: $('#score'),
        annonce: $('#annonce'),
        resultats: $('#resultats')});
    jeu.lancerUnePartie();

    var rendu = new Rendu();
    rendu.initialiser($('#container'));
    rendu.dessinerLeCubeDeScene(jeu.elementsADessiner().scene);
    rendu.animer(jeu);

    var controles = new ControleSnake(jeu, rendu);
    controles.initialiserLeDeplacementDeLaCamera();
    controles.initialiserLeDeplacementDuSnake();

    $(document).keydown(function(e) {
        $('#key-' + e.keyCode).addClass('touche-presse')
    }).keyup(function(e) {
        $('#key-' + e.keyCode).removeClass('touche-presse')
    });

    $('#nav-scores').click(function() {
        $('.infos-box:visible').fadeOut(function() {
            $('#resultats').fadeIn();
        })
    })
    $('#nav-aide').click(function() {
        $('.infos-box:visible').fadeOut(function() {
            $('#aide').fadeIn();
        })
    })
    $('#nav-a-propos').click(function() {
        $('.infos-box:visible').fadeOut(function() {
            $('#a-propos').fadeIn();
        })
    })

});