let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("searchBtn");
let animeList = document.getElementById("animeList");
// console.log(searchBox,searchBtn);

let url = "https://api.aniapi.com/v1/anime";

let getAnimeName = function () {
    return searchBox.value;
}

let anime = [];
searchBtn.onclick = function () {
    let animeName = getAnimeName();
    if (animeName == "")
        alert("Enter something");
    else {
        let xhr = new XMLHttpRequest;
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = function () {
            let responseJSON = JSON.parse(xhr.response);
            let animeArray = responseJSON["data"]["documents"];
            for (let i = 0; i < animeArray.length; i++) {
                let currTitleEn = animeArray[i]["titles"]["en"];
                let currTitleJp = animeArray[i]["titles"]["jp"];
                // console.log(currTitleEn,currTitleJp);
                if (animeName === currTitleEn || animeName === currTitleJp)
                    anime.push(animeArray[i]);

            }
        }
        for (let i = 0; i < anime.length; i++) {
            let li = document.createElement("li");
            li.innerHTML=anime[i]["titles"]["en"];
            animeList.appendChild(li);
        }
        anime=[];
    }
    

}


