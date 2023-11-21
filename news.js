const API_KEY = "0d549f83978e48d7a2398b43c1de26d1";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load', () => fetchNews("all"));

async function fetchNews(query) {
    console.log(query, "query")
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    return data
}
// let mobilemenu = document.querySelector(".mobile")
// let menuBtn = document.querySelector(".menuBtn")
// let menuBtnDisplay = true

// menuBtn.addEventListener("click", () => {
//     console.log("im here");
//     var menuBox = document.querySelector(".mobile");
//     if (menuBox.style.display == "block") { // if is menuBox displayed, hide it
//         menuBox.style.display = "none";
//     } else { // if is menuBox hidden, display it
//         menuBox.style.display = "block";
//     }
// })

// function myFunction() {
// document.getElementById("mobile").classList.toggle("show");
function toggleMenu() {
    var menuBox = document.getElementsById("menu-box");
    if (menuBox.style.display == "block") { // if is menuBox displayed, hide it
        menuBox.style.display = "none";
    } else { // if is menuBox hidden, display it
        menuBox.style.display = "block";
    }
}

fetchNews("all").then(data => renderMain(data.articles))
    //render function
function renderMain(arr) {
    document.querySelector("main")
    let mainHTML = ''
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            const newLocal = mainHTML += `<div class="card">
                    <a href=${arr[i].url}>
                 <img src=${arr[i].urlToImage} lazy="loading"/>
                 <h4>${arr[i].title}</h4>
                 <div class="publishbydate">
                <p>${arr[i].source.name}</p>
                <spa>•</spa>
                <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
               </div>

                <div class="desc">
                ${arr[i].description}
               </div>
               </div> `
        }

    }
    document.querySelector("main").innerHTML = mainHTML
}
const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile")
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit", async(e) => {
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchNews(searchInput.value)
    renderMain(data.articles)
})
searchBtnMobile.addEventListener("submit", async(e) => {
    e.preventDefault()
    const data = await fetchNews(searchInputMobile.value)
    renderMain(data.articles)
})

async function Search(query) {
    const data = await fetchNews(query)
    renderMain(data.articles)
}