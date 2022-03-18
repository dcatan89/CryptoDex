/* exported data */
let data = {
  added: false,
  view: 'global',
  nextId: 1,
  watchlist: [],
  edit: null
};

const previousDataJSON = localStorage.getItem('data-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', e => {
  const $data = JSON.stringify(data);
  localStorage.setItem('data-local-storage', $data);
}
);
