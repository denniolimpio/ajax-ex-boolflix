$(document).ready( function() {

  // chiave api
  // 03a82650cf8ff5326e52310b09aeb357

// chiamo l'api contenente le info sui film
  $.ajax (

  {
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data:
      {

      api_key: "03a82650cf8ff5326e52310b09aeb357",
      query: 'mad max',
      language: 'it-IT',

    },
    // se l'api viene caricata correttamente

    success: function(dataResponse) {

      console.log(dataResponse);


    },

    error: function() {

      alert( "attenzione, si è verificato un erroe")

    }

});



// ------ funzioni

// -- creo una funzione per leggere il valore inserito dall'utente nella searchBar
// --> restituisco il titolo del film corrispondente al valore inserito dall'utente

// function searchFilm() {




// };

}); // chiudo document ready
