/* exported data */
var data = {
  added: null,
  view: 'global',
  nextId: 1,
  watchlist: []
};

var targetUrl = encodeURIComponent('https://api.coinpaprika.com/v1/coins');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.setRequestHeader('token', 'abc123');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {

});
xhr.send();
