"use strict";

const apiURL = "https://api.tvmaze.com/search/shows?";

const hae = function (event) {
    event.preventDefault();
    $("#tulos").empty();
    $.getJSON(apiURL + $(this).serialize(), function (response) {
        $("#tulos").append("<h1>Hakutulokset hakusanalle: \"" + $("#query").val() + "\"</h1>");
        if (response.length > 0) {
            $.each(response, function (indeksi, sarja) {
                console.log(sarja.show);
                $("#tulos").append(`<article>
                <div class="row">
                <div class="col">
    <h2>${sarja.show.name}</h2>
    
    <p>Genre${sarja.show.genres.length > 1 ? "s" : ""}: ${sarja.show.genres.join(', ')}</p>
    </div>
    </div>
    <div class="row">
    <figure class="col">
    <a href=${sarja.show.officialSite ? sarja.show.officialSite : sarja.show.url}>
      <img src="${sarja.show.image ? sarja.show.image.medium : "notfound.png"
                    }" alt="${sarja.show.name}">
                    </a>
      <figcaption>${sarja.show.name}</figcaption>
    </figure>
   <div class="col"><p>${sarja.show.summary}</p></div>
    </div>
    <a class ="btn btn-dark" href="${sarja.show.officialSite ? sarja.show.officialSite : sarja.show.url
                    }">Linkki kotisivulle</a>
                    <br></br>
  </article>`);

            });
        } else {
            $("#tulos").append("<h1>Ei tuloksia</h1>");
        }
    }).fail(function () {
        $("#tulos").append("<h1>Virhe</h1>");
    });
};

$("form").submit(hae);
