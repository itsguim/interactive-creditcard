const cardNumberInput = document.querySelector('#cardnumber')
const cardNumberField = document.querySelector('.card__number')

function passCardNumber(evt) {
  let getInputValue = evt.target.value

  if (!getInputValue == '') {
    getInputValue = getInputValue.replace(/[-.]+/g, ' ')
    cardNumberField.innerText = getInputValue
  } else if (getInputValue == '') {
    cardNumberField.innerText = `0000 0000 0000 0000`
  }

}

cardNumberInput.addEventListener('keyup', passCardNumber)

