
/* Hamburger Icon click and Dropdown Menu */
var $hamburgerIcon = document.querySelector('.hamburger-icon');
var $dropMenu = document.querySelector('.choice-list');
var $menuSearch = document.querySelector('.search-header');
var $searchBar = document.querySelector('.search-nav-row');
var $watchList = document.querySelector('.watchlist-header');
var $watchListAnchor = document.querySelector('.watchlist-anchor');
var $noEntriesMsg = document.querySelector('.no-entries');
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
  var viewName = event.target.textContent;

  if (viewName === 'Watchlist') {
    dataView('watchlist');
    $dropMenu.classList.add('hidden');
    $searchBar.classList.add('hidden');
    menu = 'closed';
    bar = 'closed';
  } else if (bar === 'closed' || event.target.textContent === $menuSearch.textContent) {
    $searchBar.classList.remove('hidden');
    $dropMenu.classList.add('hidden');
    bar = 'open';
  } else {
    $searchBar.classList.add('hidden');
    bar = 'closed';
  }
}

$hamburgerIcon.addEventListener('click', hamburgerClick);
$menuSearch.addEventListener('click', handleSearchBar);
$watchList.addEventListener('click', handleSearchBar);
$watchListAnchor.addEventListener('click', handleSearchBar);
window.addEventListener('scroll', function (e) {
  $dropMenu.classList.add('hidden');
  menu = 'closed';
  bar = 'closed';
});

/* Home Button */
var homeButton = document.querySelector('#home-button');

homeButton.addEventListener('click', function (e) {
  dataView('global');
  $mainHeader.textContent = 'Global';
});

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
  $marketChange.textContent = xhr.response.market_cap_change_24h + '%';
  $cryptosNumber.textContent = xhr.response.cryptocurrencies_number;
});
xhr.send();

/* API Search Function and Data */
var $formSearch = document.querySelector('#form-search');
var $formSearch2 = document.querySelector('#form-search2');
var $percentChange = document.querySelector('.for-rank');
var $Symbol = document.querySelector('.for-symbol');
var $CurrentPrice = document.querySelector('.for-price');
var $Cap = document.querySelector('.for-cap');
var $volume = document.querySelector('.for-volume');
var $subHeader = document.querySelector('.sub-header-crypto');
var $mainHeader = document.querySelector('.main-header');

function searchID(id) {
  var value = id.toUpperCase();
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + apiUrl + value);
  xhr2.setRequestHeader('token', 'abc123');
  xhr2.responseType = 'json';
  xhr2.addEventListener('load', function () {

    var crypto = xhr2.response.asset;

    $subHeader.textContent = crypto.name;
    $mainHeader.textContent = 'Assets: ' + crypto.asset_id;
    $percentChange.textContent = Math.round(crypto.change_24h * 1000) / 1000 + '%';
    $Symbol.textContent = crypto.asset_id;
    $CurrentPrice.textContent = '$ ' + Math.round(crypto.price * 100000) / 100000;
    $Cap.textContent = '$ ' + Math.round(crypto.market_cap);
    $volume.textContent = '$ ' + Math.round(crypto.volume_24h);
    dataView('cryptos');

  });
  xhr2.send();
}

/* Search Bar/Submit Event Listeners */

function handleSubmit1(event) {
  event.preventDefault();
  var searchBar1Value = $formSearch.elements.searchbar.value;
  searchID(searchBar1Value);
  dataView('cryptos');
  data.added = false;
  $formSearch.reset();
}

function handleSubmit2(event) {
  event.preventDefault();
  var searchBar2Value = $formSearch2.elements.searchbar2.value;
  searchID(searchBar2Value);
  $dropMenu.classList.add('hidden');
  dataView('cryptos');
  data.added = false;
  $formSearch2.reset();
}

$formSearch.addEventListener('submit', handleSubmit1);
$formSearch2.addEventListener('submit', handleSubmit2);

/* Data View function */
var $view = document.querySelectorAll('.view');

function dataView(string) {
  data.view = string;

  if (data.view === 'watchlist') {
    $mainHeader.textContent = 'My WatchList';
  }
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === string) {
      $view[i].classList.remove('hidden');
    } else {
      $view[i].classList.add('hidden');
    }
  }
  if (data.watchlist.length !== 0) {
    $noEntriesMsg.classList.add('hidden');
  }
}

/* Add to WatchList Event Listeners/functions */
var timeStamp = new Date();
var $watchListButton = document.querySelector('.watchlist-button');
var $showtimeStamp = document.querySelector('.time-stamp');

function handleWatchList(event) {

  if (data.added === true) {
    return;
  }

  data.added = true;
  var entryValues = {
    id: data.nextId,
    added: true,
    name: $subHeader.textContent,
    percentChange: $percentChange.textContent,
    symbol: $Symbol.textContent,
    price: $CurrentPrice.textContent,
    marketCap: $Cap.textContent,
    volume24h: $volume.textContent,
    timeStamp: timeStamp
  };
  $showtimeStamp.textContent = timeStamp;
  data.watchlist.unshift(entryValues);
  data.nextId++;
  $ulEntries.prepend(watchListDomTree(entryValues));
  dataView('watchlist');
}

$watchListButton.addEventListener('click', handleWatchList);

/* DOM TREE CREATION */
function watchListDomTree(entries) {
  /* <li class="col-third ">
        <div class="row wrap margin-top info-box">
          <div class="row col-full  justify-center">
            <h2 class="sub-header-crypto">BTC</h2>
          </div>
          <div class="col-full row">
            <div class="col-half div-headers">
              <h2 class="data-rank row justify-center">Market Change</h2>
              <h2 class="data-symbol row justify-center">Symbol</h2>
              <h2 class="data-price row justify-center">Current Price</h2>
              <h2 class="data-cap row justify-center">Market Cap</h2>
              <h2 class="data-volume row justify-center">Volume 24h</h2>
            </div>
            <div class="col-half div-headers ">
              <h2 class="for-rank row justify-center "></h2>
              <h2 class="for-symbol row justify-center"></h2>
              <h2 class="for-price row justify-center"></h2>
              <h2 class="for-cap row justify-center"></h2>
              <h2 class="for-volume row justify-center"></h2>
            </div>
          </div>
          <div class="col-full row justify-center">
            <button class="view-button">View</button>
          </div>
          <div class="col-full time-stamp row justify-center"></div>
        </div>
      </li>
  */
  var $li = document.createElement('li');
  var $divSubHead = document.createElement('div');
  var $divH2SubHead = document.createElement('div');
  var $h2SubHead = document.createElement('h2');
  var $divforContent = document.createElement('div');
  var $div4ContentHeaders = document.createElement('div');
  var $div4ContentData = document.createElement('div');
  var $MrktChangeh2 = document.createElement('h2');
  var $symbolh2 = document.createElement('h2');
  var $priceh2 = document.createElement('h2');
  var $caph2 = document.createElement('h2');
  var $volumeh2 = document.createElement('h2');
  var $dataMrkth2 = document.createElement('h2');
  var $dataSymbolh2 = document.createElement('h2');
  var $dataPriceh2 = document.createElement('h2');
  var $datacaph2 = document.createElement('h2');
  var $datavolumeh2 = document.createElement('h2');
  var $divButton = document.createElement('div');
  var $button = document.createElement('button');
  var $divtimeStamp = document.createElement('div');

  $li.className = 'col-third';
  $li.setAttribute('entryId', data.id);
  $li.setAttribute('data-added', true);
  $divSubHead.className = 'row wrap margin-top info-box';
  $divH2SubHead.className = 'row col-full justify-center';
  $h2SubHead.className = 'sub-header-crypto';
  $divforContent.className = 'col-full row';
  $div4ContentHeaders.className = 'col-half div-headers';
  $div4ContentData.className = 'col-half div-headers';
  $MrktChangeh2.className = 'row justify-center';
  $symbolh2.className = 'row justify-center';
  $priceh2.className = 'row justify-center';
  $caph2.className = 'row justify-center';
  $volumeh2.className = 'row justify-center';
  $dataMrkth2.className = 'row justify-center';
  $dataSymbolh2.className = 'row justify-center';
  $dataPriceh2.className = 'row justify-center';
  $datacaph2.className = 'row justify-center';
  $datavolumeh2.className = 'row justify-center';
  $divButton.className = 'col-full row justify-center';
  $button.className = 'view-button';
  $divtimeStamp.className = 'col-full row justify-center';

  $h2SubHead.textContent = entries.name;
  $MrktChangeh2.textContent = 'Market Change';
  $symbolh2.textContent = 'Symbol';
  $priceh2.textContent = 'Current Price';
  $caph2.textContent = 'Market Cap';
  $volumeh2.textContent = 'Volume 24h';
  $dataMrkth2.textContent = entries.percentChange;
  $dataSymbolh2.textContent = entries.symbol;
  $dataPriceh2.textContent = entries.price;
  $datacaph2.textContent = entries.marketCap;
  $datavolumeh2.textContent = entries.volume24h;
  $button.textContent = 'View';
  $divtimeStamp.textContent = entries.timeStamp;

  $li.appendChild($divSubHead);
  $divSubHead.appendChild($divH2SubHead);
  $divH2SubHead.appendChild($h2SubHead);

  $divSubHead.appendChild($divforContent);
  $divforContent.appendChild($div4ContentHeaders);
  $divforContent.appendChild($div4ContentData);
  $div4ContentHeaders.appendChild($MrktChangeh2);
  $div4ContentHeaders.appendChild($symbolh2);
  $div4ContentHeaders.appendChild($priceh2);
  $div4ContentHeaders.appendChild($caph2);
  $div4ContentHeaders.appendChild($volumeh2);
  $div4ContentData.appendChild($dataMrkth2);
  $div4ContentData.appendChild($dataSymbolh2);
  $div4ContentData.appendChild($dataPriceh2);
  $div4ContentData.appendChild($datacaph2);
  $div4ContentData.appendChild($datavolumeh2);

  $divSubHead.appendChild($divButton);
  $divButton.appendChild($button);
  $divSubHead.appendChild($divtimeStamp);

  return $li;
}

/* Dom ContentLoaded Event Listener */

var $ulEntries = document.querySelector('#ul-entries');

function domContentLoadedHandle(event) {
  for (var index = 0; index < data.watchlist.length; index++) {
    var $entries = watchListDomTree(data.watchlist[index]);
    $ulEntries.appendChild($entries);
  }
  if (data.view === 'cryptos') {
    dataView('global');
  }
  dataView(data.view);
}

window.addEventListener('DOMContentLoaded', domContentLoadedHandle);
