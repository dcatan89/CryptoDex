/* exported data */
var data = {
  added: false,
  view: 'global',
  nextId: 1,
  watchlist: [],
  edit: null
};

var previousDataJSON = localStorage.getItem('data-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function beforeUnloadListener(event) {
  var $data = JSON.stringify(data);
  localStorage.setItem('data-local-storage', $data);
}

window.addEventListener('beforeunload', beforeUnloadListener);
