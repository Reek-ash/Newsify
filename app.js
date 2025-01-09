const API_KEY = "22236169b342413da3f125c08bed71e1";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);

}

function bindData(articles) {
    const mainContainer = document.getElementById("main-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    mainContainer.innerHTML = " ";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardsClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardsClone, article);

        mainContainer.appendChild(cardsClone);

    });

}

function fillDataInCard(cardsClone, article) {
    const newsImage = cardsClone.querySelector("#news-img");
    const newsTitle = cardsClone.querySelector("#news-title");
    const newsSource = cardsClone.querySelector("#news-source");
    const newsDesc = cardsClone.querySelector("#news-desc");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} .${date}`;

    cardsClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectednav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectednav?.classList.remove("active");
    curSelectednav = navItem;
    curSelectednav.classList.add("active");
}

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("search-txt");

searchButton.addEventListener("click", () => {

    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectednav?.classList.remove("active");
    curSelectednav = null;

});