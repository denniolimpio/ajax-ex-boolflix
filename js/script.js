// chiave api
// 03a82650cf8ff5326e52310b09aeb357

$(document).ready( function() {
  //  cliccando su buttonsearch avvio la ricerca
  //--- > leggo il valore inserito dall'utente nella inputSearch
  // --> se la input non è vuota, invoca la funzione searchFilm e avvio la ricerca
  // -- > la funzione Searchfilm stampa  i risultati a schermo

  $("#buttonSearch").click ( function () {
    // invoco la funzione reset(), in questo modo svuoto il mio template
    reset();
    // con la funzione readInput() leggo il valore della input inserita dall'utente
    // se il campo input non è vuoto, avvio la ricerca e stampo i ri
    avvioRicerca ()
  });

  // digitando il tasto invio (13)  avvio la ricerca
  $("#input").keypress ( function () {
    reset();
    if (event.which === 13 || event.keyCode === 13) {
      avvioRicerca ()
    }
  });
  //  ------- Funzioni -------

  //  #libreriaFilm -------

  function libreriaFilm (film) {

    var urlFilm = 'https://api.themoviedb.org/3/search/movie';
    var myKey = "03a82650cf8ff5326e52310b09aeb357";

    // chiamo l'api contenente le info sui film

    $.ajax (
      {
        url: urlFilm,
        method: 'GET',
        data:
        {
          api_key: myKey,
          query: film,
          language: 'it-IT',
        },
        // se l'api viene caricata correttamente
        success: function(dataResponse) {

          var dataResults = dataResponse.results;
          // console.log(dataResults);
          stampaRisultato(dataResults)
        },
        // altrimenti se l'api non viene caricata...errore

        error: function() {
          alert( "attenzione, si è verificato un erroe")
        }
      });
    }

    //  #libreriaTv -------

    function libreriaTv (tv) {

      var urlTv = 'https://api.themoviedb.org/3/search/tv';
      var myKey = "03a82650cf8ff5326e52310b09aeb357";

      // chiamo l'api contenente le info sui film
      $.ajax (

        {
          url: urlTv,
          method: 'GET',
          data:
          {
            api_key: myKey,
            query: tv,
            language: 'it-IT',

          },
          // se l'api viene caricata correttamente

          success: function(dataResponse) {

            var dataResults = dataResponse.results;

            // console.log(dataResults);

            stampaRisultato(dataResults)
          },

          error: function() {
            alert( "attenzione, si è verificato un erroe")
          }
        });
      }

      //  #stampaRisultato -------

      // compilo il template con handlebars
      function stampaRisultato(dataResults) {
        var source = $("#template").html();
        var template = Handlebars.compile(source);

        for ( var i = 0; i < dataResults.length; i++) {

          var arrayDataResutls = dataResults[i];
          // console.log(arrayDataResutls);


          // dichiaro le variabili

          // titolo serie tv
          var titoloSerie = arrayDataResutls.name;
          var voto = arrayDataResutls.vote_average;
          //converto i numeri da decimali a interi
          var star  =convertoVoto(voto);

          // SCHEDA FILM
          var scheda = ( {
            title: arrayDataResutls.title,
            name: titoloSerie,
            original_title: arrayDataResutls.original_title,
            original_language: arrayDataResutls.original_language,
            overview: arrayDataResutls.overview,
            vote_average: star,
          });

          var html = template(scheda);
          $("#container").append(html);
        }

      }

      // ---- #reset

      //---> elimino il contenuto del template
      function reset() {
        $("#container").html("");
      }

      // ---- #avvioRicerca
      //  -- > se valore input e, se qnon è vuoto, stampo a schermo i risultati della ricerca

      function avvioRicerca () {

        var inputSearch = $("#input").val();

        if ( inputSearch != "") {
          libreriaFilm(inputSearch);
          libreriaTv (inputSearch);
        }

      }
      // --- >  #convertoVoto

      // creo una funzione per convertire il voto da decimale a intero ( 1 - 5 )
      // per voti compresi tra 1 e 5 aggiugno le stelle piene
      // ---> altrimenti aggiungo le stelle vuote

      function convertoVoto(vote_av) {
        var vote = Math.floor(vote_av / 2);
        var stars = '';
        for (var i = 1; i <= 5; i++) {
          if (i <= vote) {
            stars += '<i class="fas fa-star"></i>';
          } else {
            stars += '<i class="far fa-star"></i>';
          }
        }
        return stars;
      }

      // --- > #bandiere

    }); // chiudo document ready
