
/* Hamburger Icon click and Dropdown Menu */
var $hamburgerIcon = document.querySelector('.hamburger-icon');
var $dropMenu = document.querySelector('.choice-list');
var $menuSearch = document.querySelector('.search-header');
var $searchBar = document.querySelector('.search-nav-row');
var $watchList = document.querySelector('.watchlist-header');
var $watchListAnchor = document.querySelector('.watchlist-anchor');
var $trending = document.querySelector('.trending-header');
var $trendingAnchor = document.querySelector('.trending-anchor');
var $noEntriesMsg = document.querySelector('.no-entries');
var menu = 'closed';
var bar = 'closed';

function viewBox(anchor) {
  if (anchor === 'Watchlist') {
    $watchListAnchor.classList.add('white-bg-box');
    $trendingAnchor.classList.remove('white-bg-box');
  } else if (anchor === 'Trending') {
    $trendingAnchor.classList.add('white-bg-box');
    $watchListAnchor.classList.remove('white-bg-box');
  } else {
    $watchListAnchor.classList.remove('white-bg-box');
    $trendingAnchor.classList.remove('white-bg-box');
  }
}

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
  if (viewName === 'Trending') {
    $mainHeader.textContent = 'Trending Top 100';
    dataView('trending');
    viewBox(viewName);
    $dropMenu.classList.add('hidden');
    $searchBar.classList.add('hidden');
    menu = 'closed';
    bar = 'closed';
    $searchBar.classList.remove('fixed-postion');
    $navBar.classList.remove('fixed-position');
  } else if (viewName === 'Watchlist') {
    dataView('watchlist');
    viewBox(viewName);
    $dropMenu.classList.add('hidden');
    $searchBar.classList.add('hidden');
    $searchBar.classList.remove('fixed-postion');
    $navBar.classList.remove('fixed-position');
    menu = 'closed';
    bar = 'closed';
  } else if (bar === 'closed' || event.target.textContent === $menuSearch.textContent) {
    $searchBar.classList.remove('hidden');
    $dropMenu.classList.add('hidden');
    bar = 'open';
  } else {
    $searchBar.classList.remove('fixed-postion');
    $navBar.classList.remove('fixed-position');
    $searchBar.classList.add('hidden');
    bar = 'closed';
  }
  if (window.scrollY !== 0) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    $searchBar.classList.remove('fixed-postion');
    $navBar.classList.remove('fixed-position');
  }
}

$hamburgerIcon.addEventListener('click', hamburgerClick);
$menuSearch.addEventListener('click', handleSearchBar);
$watchList.addEventListener('click', handleSearchBar);
$watchListAnchor.addEventListener('click', handleSearchBar);
$trending.addEventListener('click', handleSearchBar);
$trendingAnchor.addEventListener('click', handleSearchBar);
window.addEventListener('scroll', function (e) {
  $dropMenu.classList.add('hidden');
  menu = 'closed';
});

/* Home Button */
var homeButton = document.querySelector('#home-button');

homeButton.addEventListener('click', function (e) {
  var viewName = event.target.textContent;
  dataView('global');
  $mainHeader.textContent = 'Global';
  $dropMenu.classList.add('hidden');
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  $searchBar.classList.remove('fixed-postion');
  $navBar.classList.remove('fixed-position');
  viewBox(viewName);
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
  $marketCap.textContent = '$ ' + xhr.response.market_cap_usd.toLocaleString('en-US');
  $volume24H.textContent = '$ ' + xhr.response.volume_24h_usd.toLocaleString('en-US');
  $marketChange.textContent = xhr.response.market_cap_change_24h + '%';
  $cryptosNumber.textContent = xhr.response.cryptocurrencies_number.toLocaleString('en-US');
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
    $CurrentPrice.textContent = '$ ' + (Math.round(crypto.price * 100000) / 100000).toLocaleString('en-US');
    $Cap.textContent = '$ ' + Math.round(crypto.market_cap).toLocaleString('en-US');
    $volume.textContent = '$ ' + Math.round(crypto.volume_24h).toLocaleString('en-US');
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

function handleWatchList(event) {

  if (data.added === true) {
    return;
  }

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
  $li.setAttribute('data-id', entries.id);
  $li.setAttribute('data-added', true);
  $divSubHead.className = 'row wrap margin-top info-box';
  $divH2SubHead.className = 'row col-full justify-center ';
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
  $button.setAttribute('data-id', entries.id);
  $button.setAttribute('data-view', 'edit-list');
  $divtimeStamp.className = 'col-full row justify-center time-stamp';

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

/* TOP 100API DOM TREE */
function generateTrendingDOM(trending, i) {
  /*  <li class="col-fourth margin-sides ">
        <div class="row wrap margin-top info-box">
          <div class="row col-full  justify-center">
            <h2 class="sub-header-crypto">entries.name</h2>
          </div>
          <div class="col-full row">
            <div class="col-half div-headers">
              <h2 class="row justify-center">Rank</h2>
              <h2 class="row justify-center">Symbol</h2>
              <h2 class="row justify-center">Current Price</h2>
              <h2 class="row justify-center">%Change1H</h2>
            </div>
            <div class="col-half div-headers">
              <h2 class=" row justify-center ">i</h2>
              <h2 class=" row justify-center">entries.asset_id</h2>
              <h2 class=" row justify-center">entries.price</h2>
              <h2 class=" row justify-center">entries.change_1h</h2>
            </div>
          </div>
        </div>
      </li>
  */
  var $li = document.createElement('li');
  var $divBlueBox = document.createElement('div');
  var $divHeader = document.createElement('div');
  var $divContent = document.createElement('div');
  var $divContentHeader = document.createElement('div');
  var $divContentData = document.createElement('div');
  var $h2Header = document.createElement('h2');

  var $h2Rank = document.createElement('h2');
  var $h2Symbol = document.createElement('h2');
  var $h2Price = document.createElement('h2');
  var $h2Change = document.createElement('h2');
  var $h2DataRank = document.createElement('h2');
  var $h2DataSymbol = document.createElement('h2');
  var $h2DataPrice = document.createElement('h2');
  var $h2DataChange = document.createElement('h2');

  $li.className = 'col-fourth margin-sides';
  $divBlueBox.className = 'row wrap margin-top info-box';
  $divHeader.className = 'row col-full  justify-center';
  $divContent.className = 'col-full row';
  $divContentHeader.className = 'col-half div-headers';
  $divContentData.className = 'col-half div-headers';
  $h2Header.className = '';
  $h2Rank.className = 'row justify-center';
  $h2Symbol.className = 'row justify-center';
  $h2Price.className = 'row justify-center';
  $h2Change.className = 'row justify-center';
  $h2DataRank.className = 'row justify-center';
  $h2DataSymbol.className = 'row justify-center';
  $h2DataPrice.className = 'row justify-center';
  $h2DataChange.className = 'row justify-center';

  if (trending.name) {
    $h2Header.textContent = trending.name;
  } else {
    $h2Header.textContent = trending.asset_id;
  }

  $h2Rank.textContent = 'Rank';
  $h2Symbol.textContent = 'Symbol';
  $h2Price.textContent = 'Price';
  $h2Change.textContent = '%Change 1H';

  $h2DataRank.textContent = i;
  $h2DataSymbol.textContent = trending.asset_id;
  $h2DataPrice.textContent = '$' + Math.round(trending.price * 10000) / 10000;
  $h2DataChange.textContent = Math.round(trending.change_1h * 100000) / 100000 + '%';

  $li.appendChild($divBlueBox);
  $divBlueBox.appendChild($divHeader);
  $divBlueBox.appendChild($divContent);
  $divHeader.appendChild($h2Header);
  $divContent.appendChild($divContentHeader);
  $divContent.appendChild($divContentData);
  $divContentHeader.appendChild($h2Rank);
  $divContentHeader.appendChild($h2Symbol);
  $divContentHeader.appendChild($h2Price);
  $divContentHeader.appendChild($h2Change);
  $divContentData.appendChild($h2DataRank);
  $divContentData.appendChild($h2DataSymbol);
  $divContentData.appendChild($h2DataPrice);
  $divContentData.appendChild($h2DataChange);
  return $li;
}

/* TOP 100 API function */

const apiUrlAll = encodeURIComponent('https://www.cryptingup.com/api/assets');
const $ulTrending = document.querySelector('#trending');

function top100API() {
  const xhr3 = new XMLHttpRequest();
  xhr3.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + apiUrlAll);
  xhr3.setRequestHeader('token', 'abc123');
  xhr3.responseType = 'json';
  xhr3.addEventListener('load', function () {
    for (let i = 0; i <= 100; i++) {
      const $entries = generateTrendingDOM(xhr3.response.assets[i], i + 1);
      $ulTrending.appendChild($entries);
    }
  });
  xhr3.send();
}

/* Bubbling Click Event for Watchlist */
/* Numbers Correspond to the edit list order */
var $timeStamp = document.querySelector('.tstamp');
var $subHead = document.querySelector('.edit-subhead');
var $edit1 = document.querySelector('.edit1');
var $edit2 = document.querySelector('.edit2');
var $edit3 = document.querySelector('.edit3');
var $edit4 = document.querySelector('.edit4');
var $edit5 = document.querySelector('.edit5');

function handleEdit(event) {
  var viewName = event.target.getAttribute('data-view');
  var entryId = event.target.getAttribute('data-id');

  if (event.target.matches('.view-button')) {
    dataView(viewName);
    data.edit = parseInt(entryId);
    dataForWatchList();
  }
}

function dataForWatchList() {
  if (data.view === 'trending') {
    $mainHeader.textContent = 'Trending Top 100';
  } else if (data.view === 'watchlist') {
    $mainHeader.textContent = 'My WatchList';
  } else if (data.view === 'global') {
    $mainHeader.textContent = 'Global';
  } else {
    $mainHeader.textContent = 'Asset Overview';
  }
  for (var i = 0; i < data.watchlist.length; i++) {
    if (data.edit === data.watchlist[i].id) {
      $subHead.textContent = data.watchlist[i].name;
      $edit1.textContent = data.watchlist[i].percentChange;
      $edit2.textContent = data.watchlist[i].symbol;
      $edit3.textContent = data.watchlist[i].price;
      $edit4.textContent = data.watchlist[i].marketCap;
      $edit5.textContent = data.watchlist[i].volume24h;
      $timeStamp.textContent = data.watchlist[i].timeStamp;
    }
  }
}

/* Back to Watchlist handleClick */
var $backtoWatchlist = document.querySelector('#back-to-list');
function backtoWatchlistHandle(event) {
  dataView('watchlist');
  data.edit = null;
}
$backtoWatchlist.addEventListener('click', backtoWatchlistHandle);

/* Open and Close Modal
  Confirm Removal Function-Removes from Watchlist */
var $openModal = document.querySelector('#remove-button');
var $cancelButton = document.querySelector('.cancel');
var $removeButton = document.querySelector('.confirm');
var $modalOverlay = document.querySelector('.overlay');
var modal = 'closed';

function modalToggle(event) {
  if (modal === 'closed') {
    $modalOverlay.classList.remove('hidden');
    modal = 'open';
  } else {
    $modalOverlay.classList.add('hidden');
    modal = 'closed';
  }
}

$openModal.addEventListener('click', modalToggle);
$cancelButton.addEventListener('click', modalToggle);

/* Deleting from the list function/event listener */
$removeButton.addEventListener('click', function (e) {
  var $li = document.querySelectorAll('li');
  for (var i = 0; i < data.watchlist.length; i++) {
    if (data.edit === data.watchlist[i].id) {
      data.watchlist.splice(data.watchlist.length - data.edit, 1);
      $li[i].remove();
    }
  }
  data.nextId--;
  data.edit = null;
  $modalOverlay.classList.add('hidden');
  modal = 'closed';
  dataView('watchlist');
});

/* Dom ContentLoaded Event Listener */

var $ulEntries = document.querySelector('#ul-entries');

function domContentLoadedHandle(event) {
  for (var index = 0; index < data.watchlist.length; index++) {
    var $entries = watchListDomTree(data.watchlist[index]);
    $ulEntries.appendChild($entries);
  }
  dataForWatchList();
  top100API();

  if (data.view === 'cryptos') {
    dataView('global');
  }
  dataView(data.view);
}

$ulEntries.addEventListener('click', handleEdit);
window.addEventListener('DOMContentLoaded', domContentLoadedHandle);

/* Scrool Event to keep nav bar fixed */
var $navBar = document.querySelector('.nav-bar');
window.addEventListener('wheel', function (e) {
  if (e.deltaY < 0) {
    $searchBar.classList.add('fixed-postion');
    $navBar.classList.add('fixed-position');
  }

  if (window.scrollY === 0) {
    $searchBar.classList.remove('fixed-postion');
    $navBar.classList.remove('fixed-position');
  }

});
