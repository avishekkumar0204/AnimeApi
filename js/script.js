let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("searchBtn");
let animeList = document.getElementById("animeList");
// console.log(searchBox,searchBtn);

let url = "https://api.aniapi.com/v1/anime";


let getAnimeName = function () {
    return searchBox.value;
}

let getAnimeDetails = function (animeObject) {
    let li = document.createElement("li");
    li.className = "animeDetail";

    // Div for title
    let divForTitle = document.createElement("div");
    divForTitle.className = "divForTitle";
    let tileName = animeObject["titles"]["en"];
    divForTitle.innerHTML = `${tileName}`;
    li.appendChild(divForTitle);

    // Div for trailer
    let divForTrailer = document.createElement("div");
    divForTrailer.className = "divForTrailer";
    let a = document.createElement("a");
    let trailerLink = animeObject["trailer_url"];
    a.href = `${trailerLink}`;
    a.innerHTML = "Click here to watch trailer";
    divForTrailer.appendChild(a);
    li.appendChild(divForTrailer);

    // Div for Genre
    let divForGenres = document.createElement("div");
    divForGenres.className = "divForGenres flexBox";
    let genres = animeObject["genres"];
    for (let i = 0; i < genres.length; i++) {
        let span = document.createElement("span");
        span.innerHTML = `${genres[i]}`;
        divForGenres.appendChild(span);
    }
    li.appendChild(divForGenres);


    // Div for description
    let divForDescription = document.createElement("div");
    divForDescription.className = "divForDescription";
    divForDescription.innerHTML += "<h2>Description:</h2>";
    let description = animeObject["descriptions"]["en"];
    divForDescription.innerHTML += `${description}`;
    li.appendChild(divForDescription);

    // Div for session year
    let divForSeasonYear = document.createElement("div");
    divForSeasonYear.className = "divForSeasonYear";
    divForSeasonYear.innerHTML = "Year:";
    let seasonYear = animeObject["season_year"];
    divForSeasonYear.innerHTML += `${seasonYear}`;
    li.appendChild(divForSeasonYear);


    // Div for no of episode
    let divForNumberOfEpisode = document.createElement("div");
    divForNumberOfEpisode.classList = "divForNumberOfEpisode";
    let numberOfEpisode = animeObject["episodes_count"];
    divForNumberOfEpisode.innerHTML = "Number of Episode:";
    divForNumberOfEpisode.innerHTML += `${numberOfEpisode}`;
    li.appendChild(divForNumberOfEpisode);



    return li;
}


searchBtn.onclick = function () {
    animeList.innerHTML = "";
    let animeName = getAnimeName();
    if (animeName == "")
        alert("Enter something");
    else {
        let anime = [];
        let xhr = new XMLHttpRequest;
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = function () {
            let responseJSON = JSON.parse(xhr.response);
            let animeArray = responseJSON["data"]["documents"];
            let Found = false;
            for (let i = 0; i < animeArray.length; i++) {
                let currTitleEn = animeArray[i]["titles"]["en"];
                let currTitleJp = animeArray[i]["titles"]["jp"];

                if (animeName === currTitleEn || animeName === currTitleJp) {
                    anime.push(animeArray[i]);
                    Found = true;
                }

            }
            if (Found === true) {
                for (let i = 0; i < anime.length; i++) {
                    let li = getAnimeDetails(anime[i]);
                    animeList.appendChild(li);

                }
            }
            else {
                animeList.innerHTML = "No Such Anime";
            }
            anime = [];
        }
    }


}


