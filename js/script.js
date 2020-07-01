$(document).ready( function() {

  // chiave api
  // 03a82650cf8ff5326e52310b09aeb357


  //  cliccando sulla input leggo il valore inserito dall'utente

  $("#search").click ( function () {

  // valore inserito dall'utente

  var inputSearch = $(this).val();

  console.log(inputSearch);

  });

// chiamo l'api contenente le info sui film
  $.ajax (

  {
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data:
      {

      api_key: "03a82650cf8ff5326e52310b09aeb357",
      query: ' ritorno al futuro',
      language: 'it-IT',

    },
    // se l'api viene caricata correttamente

    success: function(dataResponse) {

      var dataResults = dataResponse.results;

      console.log(dataResults);

      // ciclo for dataResults


      for ( var i = 0; i < dataResults.length; i++) {

        var arrayDataResutls = dataResults[i];
        // console.log(arrayDataResutls);

        // SCHEDA FILM
        // devo mostrare
        // -- >Titolo
        // -- > Titolo Originale
        // -- > Lingua
        // -- > voto

          var schedaFilm = ( {

          title: arrayDataResutls.title,
          original_title: arrayDataResutls.original_title,
          original_language: arrayDataResutls.original_language,
          vote_average: arrayDataResutls.vote_average,


        });

        console.log(schedaFilm);



      };
      // fine ciclo for dataResults


      // stampo la scheda film con handlebars

      var source = $("#movie-template").html();
      var template = Handlebars.compile(source);

      var html = template(schedaFilm);
      $("#container").append(html);




      // console.log(schedaFilm);


    },

    error: function() {

      alert( "attenzione, si è verificato un erroe")

    }


});








}); // chiudo document ready
