// chiave api
// 03a82650cf8ff5326e52310b09aeb357

$(document).ready( function() {

  //  cliccando su buttonsearch genero un evento:
  //  invoco la funzione reset():
  //  -----> che svuota svuota il contenitore nel DOM)

  //  invoco la funzione avvioRicerca:
  //  --> se la input non è vuota, cerca il contenuto corrispondente alla paroal chiave ( chiamata ajax)
  //  --> mi ritorna info film e serie tv
  //  -->  stampa i risultati nel dom

  $("#buttonSearch").click ( function () {

    reset();

    avvioRicerca ()
  });


  // digitando il tasto invio (13)  genero un evento

  $("#input").keypress ( function () {

    reset();

    if (event.which === 13 || event.keyCode === 13) {

      avvioRicerca ()
    }

  });



  //  ------- Funzioni -------

  //  funzione #libreriaFilm -------

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

    //  funzione #libreriaTv -------

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





      //  funzione #stampaRisultato -------

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

          // SCHEDA

          var scheda = ( {
            title: arrayDataResutls.title,
            name: titoloSerie,
            original_title: arrayDataResutls.original_title,
            original_language: linguaBandiera(arrayDataResutls.original_language),   // --- > #bandiere
            poster_path: arrayDataResutls.poster_path,
            overview: arrayDataResutls.overview,
            vote_average: star,
          });

          // inserisco il template all'interno del contenitore
          var html = template(scheda);
          $("#container").append(html);
        }

      }

      // ----  funzione #reset

      //---> elimino il contenuto del template

      function reset() {

        $("#container").html("");
      }

      // ---- funzione #avvioRicerca
      //  -- > se valore input e, se qnon è vuoto, stampo a schermo i risultati della ricerca

      function avvioRicerca () {

        var inputSearch = $("#input").val();

        if ( inputSearch != "") {
          libreriaFilm(inputSearch);
          libreriaTv (inputSearch);
        }

      }
      // --- > funzione  #convertoVoto

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


      // creo una funzione che assegna l'immagine della bandiera in base alla lingua del film/serie
      // -- > es. ( lingua ita, bandiera italiana)
      function linguaBandiera( flag)  {

         var lingue = ["it", "en", "de", "fr", "es"];

         if (lingue.includes(flag)) {

              flag = '<img src="img/' + flag + '.png" alt="bandiera">';
               }
               return flag;
      }

    }); // chiudo document ready
