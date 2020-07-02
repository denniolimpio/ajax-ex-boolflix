$(document).ready( function() {

  // chiave api
  // 03a82650cf8ff5326e52310b09aeb357


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

          console.log(dataResults);

          stampaRisultato(dataResults)
        },

        error: function() {

          alert( "attenzione, si è verificato un erroe")

        }


      });
    }



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

            console.log(dataResults);

            stampaRisultato(dataResults)
          },

          error: function() {

            alert( "attenzione, si è verificato un erroe")

          }


        });
      }

    //  Con questa funzione compilo il  template
    function stampaRisultato(dataResults) {


      var source = $("#template").html();
      var template = Handlebars.compile(source);


      for ( var i = 0; i < dataResults.length; i++) {

        var arrayDataResutls = dataResults[i];
        // console.log(arrayDataResutls);

        // SCHEDA FILM
        // devo mostrare
        // -- >Titolo
        // -- > Titolo Originale
        // -- > Lingua
        // -- > voto

        var titoloSerie = ( arrayDataResutls.name);

        var scheda = ( {



          title: arrayDataResutls.title,
          name: titoloSerie,
          original_title: arrayDataResutls.original_title,
          original_language: arrayDataResutls.original_language,
          vote_average: arrayDataResutls.vote_average,

        });
        var html = template(scheda);
        $("#container").append(html);
      }

    }


    // funzione reset

    function reset() {
      $("#container").html("");
    }


// leggo valore input e, se questo non è vuoto, stampo a schermo i risultati della ricerca

  function avvioRicerca () {

    var inputSearch = $("#input").val();

    if ( inputSearch != "") {

      libreriaFilm(inputSearch);
      libreriaTv (inputSearch);
    }

  }




  }); // chiudo document ready
