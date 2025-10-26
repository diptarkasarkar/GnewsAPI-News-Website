const apikey = '75d0856155aee5cd5d112fd231db2735';

const ipl = document.querySelector('#ipl');
const finance = document.querySelector('#finance');
const politics = document.querySelector('#politics');
const technology = document.querySelector('#technology');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const cardsContainer = document.querySelector('#cards-container');
const cardTemplate = document.querySelector('#card-template');

window.addEventListener('load', () => fetchNews('India'));

ipl.addEventListener('click', () => fetchNews('ipl'));
finance.addEventListener('click', () => fetchNews('finance'));
politics.addEventListener('click', () => fetchNews('politics'));
technology.addEventListener('click', () => fetchNews('technology'));

searchBtn.addEventListener('click', () => {
  const value = searchInput.value.trim().toLowerCase();
  if (value) fetchNews(value);
});

async function fetchNews(query) {
  try {
    console.log(`Fetching news for: ${query}`);
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      query
    )}&lang=en&country=us&max=10&apikey=${apikey}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('API Response:', data);
    if (!data.articles || data.articles.length === 0) {
      cardsContainer.innerHTML = `<p class="text-center text-gray-600 mt-10">No news found for "${query}". Try another keyword.</p>`;
      return;
    }
    bindData(data.articles);
  } catch (error) {
    console.error('Fetch Error:', error);
    cardsContainer.innerHTML = `<p class="text-center text-red-600 mt-10">Error fetching news. Please try again later.</p>`;
  }
}

function bindData(articles) {
  cardsContainer.innerHTML = '';
  articles.forEach((article) => {
    const cardClone = cardTemplate.content.cloneNode(true);
    fillData(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillData(cardClone, article) {
  const newsImg = cardClone.querySelector('#cardImg');
  const newsHeading = cardClone.querySelector('#cardHeading');
  const newsDate = cardClone.querySelector('#CardDate');
  const newsDes = cardClone.querySelector('#cardDespription');
  const sourceEl = cardClone.querySelector('#cardScouce');

  newsImg.src =
    article.image ||
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
  newsHeading.textContent = article.title || 'No title available';
  newsDes.textContent = article.description || 'No description available';
  sourceEl.textContent = article.source?.name || 'Unknown Source';
  const date = new Date(article.publishedAt).toLocaleString();
  newsDate.textContent = date;
  cardClone.firstElementChild.addEventListener('click', () => {
    if (article.url) window.open(article.url, '_blank');
  });
}
