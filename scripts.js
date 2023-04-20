/* save and restore :checked */

const checkedElements = document.querySelectorAll('[type="checkbox"], [type="radio"]');
window.addEventListener('load', restoreCheckedState)

function restoreCheckedState() {
  if (sessionStorage.getItem('checkedState')) {
    const storage = JSON.parse(sessionStorage.getItem('checkedState'));
    checkedElements.forEach( (el, index) => el.checked = storage[index] );
    console.log('restore', sessionStorage.getItem('checkedState'));
  }
}

checkedElements.forEach( el => el.addEventListener('change', saveCheckedState) );
window.addEventListener('blur', saveCheckedState)

function saveCheckedState() {
  const checkeds = [];
  checkedElements.forEach( el => checkeds.push(el.checked) );
  sessionStorage.setItem( 'checkedState', JSON.stringify(checkeds) );
  console.log('saved', JSON.stringify(checkeds));
}

/* show value after input change */

function showInputValue(input) {
  const span = input.closest('li').querySelector('span');
  if ( input.type === 'checkbox' ) {
    span.textContent = input.getAttribute('value') ? input.value : input.checked;
  } else if ( input.type === 'radio' ) {
    if ( input.name ){
      span.textContent = document.querySelector(`[name="${input.name}"]:checked`).value
    } else {
      span.textContent = input.checked;
    }
  } else {
    span.textContent = input.value;
  }
}

const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach( el => el.addEventListener( 'input', () => showInputValue(el) ) );

/* initial show values */

window.addEventListener('load', () => {
  inputs.forEach( el => showInputValue(el) );
})