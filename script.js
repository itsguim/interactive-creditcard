// Inputs
const nameInput = document.querySelector('#cardname')
const numberInput = document.querySelector('#cardnumber')
const monthInput = document.querySelector('#month')
const yearInput = document.querySelector('#year')
const cvcInput = document.querySelector('#cardcvc')

function initCardInteraction() {

  // Card field selectors / Seletores do cartão
  const cardName = document.querySelector('.card__name')
  const cardNumber = document.querySelector('.card__number')
  const cardMonth = document.querySelector('.js__mm')
  const cardYear = document.querySelector('.js__yy')
  const cardCvc = document.querySelector('.card__cvc')

  function passCardName(e) {
    let inputValue = e.target.value
    cardName.innerText = inputValue
    if (!inputValue) {
      cardName.innerText = 'Erick Cabral'
    }
  }

  function passCardNumber(e) {
    let inputValue = e.target.value
    if (inputValue) {
      inputValue = inputValue.replace(/[-.]+/g, ' ')
      cardNumber.innerText = inputValue
    } else if (!inputValue) {
      cardNumber.innerText = `0000 0000 0000 0000`
    }
  }

  function passCardDate() {
    let month = monthInput.value
    let year = yearInput.value
    cardMonth.innerText = month
    cardYear.innerHTML = year
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

  // Card interaction events / Listeners pra interação com cartão 
  nameInput.addEventListener('keyup', passCardName)
  numberInput.addEventListener('keyup', passCardNumber)
  monthInput.addEventListener('keyup', passCardDate)
  yearInput.addEventListener('keyup', passCardDate)
  cvcInput.addEventListener('keyup', passCvc)
}
initCardInteraction()

// Error Passing
function passInvalidStyling(fieldId, inputId, errorText) {
  const fieldSelect = document.getElementById(fieldId)
  const inputSelect = document.getElementById(inputId)
  // Cria mensagem
  let error = document.createElement('span')
  error.setAttribute('class', 'error-msg')
  error.innerText = errorText
  // Add borda
  inputSelect.classList.add('js-invalid')

  // Append msg
  // Necessario criar uma condicional pra só adicionar 1x apenas- 
  fieldSelect.appendChild(error) // <- Condicionar
}


// Validation (Testing)
function validateInput() {
  const numReg = /(\d{4}-\d{4}-\d{4}-\d{4})/g

  function testRegex() {
    const value = this.value
    if (!numReg.test(value)) {
      passInvalidStyling('numberfield', 'cardnumber', 'Esse campo está inválido')
    }
  }
  numberInput.addEventListener('blur', testRegex)
}
validateInput()
