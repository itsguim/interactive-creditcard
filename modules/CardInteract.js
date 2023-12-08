import { nameInput, numberInput, monthInput, yearInput, cvcInput } from "../main.js"

export default function initCardInteraction() {
  // Card field selectors
  const cardName = document.querySelector('.card__name'),
    cardNumber = document.querySelector('.card__number'),
    cardMonth = document.querySelector('.js__mm'),
    cardYear = document.querySelector('.js__yy'),
    cardCvc = document.querySelector('.card__cvc')

  function passCardName(e) {
    const inputValue = e.target.value
    cardName.innerText = inputValue
    if (!inputValue) {
      cardName.innerText = 'Titular do Cartão'
    }
  }

  function passCardNumber(e) {
    let inputValue = e.target.value.replace(/\s/g, '')
    if (inputValue) {
      inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ')
      e.target.value = inputValue
      cardNumber.innerText = inputValue
    } else if (!inputValue) {
      cardNumber.innerText = `0000 0000 0000 0000`
    }
  }

  function passCardDate() {
    let month = monthInput.value
    let year = yearInput.value
    cardMonth.innerText = month
    cardYear.innerText = year
    if (!month && !year) {
      cardMonth.innerText = '00'
      cardYear.innerText = '00'
    }
  }

  function passCvc(e) {
    let inputValue = e.target.value
    cardCvc.innerText = inputValue
    if (!inputValue) { cardCvc.innerText = '000' }
  }

  nameInput.addEventListener('keyup', passCardName)
  numberInput.addEventListener('keyup', passCardNumber)
  monthInput.addEventListener('keyup', passCardDate)
  yearInput.addEventListener('keyup', passCardDate)
  cvcInput.addEventListener('keyup', passCvc)
}