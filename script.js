const apikey = 'ff6a67682fa67b591975f53041385e42';
const ipl = document.querySelector('#ipl')
const finance = document.querySelector('#finance')
const politics = document.querySelector('#politics')
const technology = document.querySelector('#technology')
const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')


window.addEventListener('load', () => fetchNews('India'));
ipl.addEventListener('click', () => {
    fetchNews('ipl');
})
finance.addEventListener('click', () => {
    fetchNews('finance');
})
politics.addEventListener('click', () => {
    fetchNews('politics');
})
technology.addEventListener('click', () => {
    fetchNews('technology');
})
searchBtn.addEventListener('click', () => {
    let value = searchInput.value.toLowerCase()
    fetchNews(value); 
})
function fetchNews(query) {
    fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&country=us&max=10&apikey=${apikey}`).
    then((response) => {
      return response.json();
    }).then((response) => {
        const articles = response.articles;
        bindData(articles)
    }).catch((error) => {
        console.log(error);
    })
}
function bindData(articles) {
    const cardsContainer = document.querySelector('#cards-container');
    const cardTemplate = document.querySelector('#card-template');

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        const cardClone = cardTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardsContainer.append(cardClone);
    });
}
function fillData(cardClone, article) {

    const newsImg = cardClone.querySelector('#cardImg');
    const newsHeading = cardClone.querySelector('#cardHeading');
    const newsDate = cardClone.querySelector('#CardDate');
    const newsDes = cardClone.querySelector('#cardDespription');

    newsImg.src = article.image;
    newsHeading.textContent = article.title;
    newsDes.textContent = article.description

    
    const source = article.source.name;
    cardClone.querySelector('#cardScouce').textContent = source;

    const date = new Date(article.publishedAt).toLocaleString();
    newsDate.textContent = date;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url);
    })
}

