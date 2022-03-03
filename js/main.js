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

/* API Search Function */
var $formSearchBar = document.querySelector('#form-search');

function handleSearchSubmit(event) {
  event.preventDefault();

}

$formSearchBar.addEventListener('submit', handleSearchSubmit);
