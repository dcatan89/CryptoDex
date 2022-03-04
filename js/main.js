/* Hamburger Icon click */
var $hamburgerIcon = document.querySelector('.hamburger-icon');
var $dropMenu = document.querySelector('.choice-list');
var $menuSearch = document.querySelector('.search-header');
var $searchBar = document.querySelector('.search-nav-row');
var menu = 'closed';
var bar = 'closed';

function hamburgerClick(event) {
  if (menu === 'closed') {
    $dropMenu.classList.remove('hidden');
    menu = 'open';
  } else {
    $dropMenu.classList.add('hidden');
    $searchBar.classList.add('hidden');
    menu = 'closed';
  }
}

function handleSearchBar(event) {
  event.preventDefault();
  if (bar === 'closed') {
    $searchBar.classList.remove('hidden');
    bar = 'open';
  } else {
    $searchBar.classList.add('hidden');
    bar = 'closed';
  }
}

$hamburgerIcon.addEventListener('click', hamburgerClick);
$menuSearch.addEventListener('click', handleSearchBar);

/* API Requests and Functions GLOBAL PAGE */
var $marketCap = document.querySelector('.for-header1');
var $volume24H = document.querySelector('.for-header2');
var $marketChange = document.querySelector('.for-header3');
var $cryptosNumber = document.querySelector('.for-header4');

var targetUrl = encodeURIComponent('https://api.coinpaprika.com/v1/global');
var apiUrl = encodeURIComponent('https://www.cryptingup.com/api/assets/');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.setRequestHeader('token', 'abc123');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  $marketCap.textContent = '$ ' + xhr.response.market_cap_usd;
  $volume24H.textContent = '$ ' + xhr.response.volume_24h_usd;
  $marketChange.textContent = xhr.response.market_cap_change_24h;
  $cryptosNumber.textContent = xhr.response.cryptocurrencies_number;
});
xhr.send();

/* API Search Function and Data */
var $rank = document.querySelector('.for-rank');
var $Symbol = document.querySelector('.for-symbol');
var $CurrentPrice = document.querySelector('.for-price');
var $Cap = document.querySelector('.for-cap');
var $volume = document.querySelector('.for-volume');
var $subHeader = document.querySelector('.sub-header-crypto');
var $mainHeader = document.querySelector('.main-header');

function handleId(id) {
  var value = id.toUpperCase();
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + apiUrl + value);
  xhr2.setRequestHeader('token', 'abc123');
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {
    var crypto = xhr2.response.asset;

    $subHeader.textContent = crypto.name;
    $mainHeader.textContent = 'CryptoCurrency Assets';
    $rank.textContent = Math.round(crypto.change_24h) + '%';
    $Symbol.textContent = crypto.asset_id;
    $CurrentPrice.textContent = '$ ' + Math.round(crypto.price);
    $Cap.textContent = '$ ' + Math.round(crypto.market_cap);
    $volume.textContent = '$ ' + Math.round(crypto.volume_24h);
  });
  xhr2.send();
}

handleId('Eth');
/* Data View function */
var $view = document.querySelectorAll('.view');

function dataView(string) {
  data.view = string;
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === string) {
      $view[i].classList.remove('hidden');
    } else {
      $view[i].classList.add('hidden');
    }
  }
}
dataView('cryptos');
