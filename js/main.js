/* Hamburger Icon click */
var $hamburgerIcon = document.querySelector('.hamburger-icon');
var $dropMenu = document.querySelector('.choice-list');
function hamburgerClick(event) {
  $dropMenu.classList.remove('hidden');
  $dropMenu.classList.add('open');
}

$hamburgerIcon.addEventListener('click', hamburgerClick);
