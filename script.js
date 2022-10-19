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

  // 
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
      inputValue = inputValue.replace(/[-.=,\/]+/g, ' ')
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

  // Card interaction events / Listeners pra interação com cartão 
  nameInput.addEventListener('keyup', passCardName)
  numberInput.addEventListener('keyup', passCardNumber)
  monthInput.addEventListener('keyup', passCardDate)
  yearInput.addEventListener('keyup', passCardDate)
  cvcInput.addEventListener('keyup', passCvc)
}
initCardInteraction()

const isInvalid = {
  clearErrorMsg: function (textClearField) {
    const errorSpans = document.querySelectorAll(textClearField)
    errorSpans.forEach((el) => {
      el.remove()
    })
    /* textClearField being the id+span of the formfield which I want to remove the error message from. e.g: ('#numberfield span')...
    Prevents deleting all the error messages on other fields*/
  },

  passInvalid: function (fieldId, inputId, errorTxt, textClearField) {
    const fieldSelect = document.querySelector(fieldId)
    const inputSelect = document.querySelector(inputId)
    // Create and set the msg
    let error = document.createElement('span')
    error.setAttribute('class', 'error-msg')
    error.innerText = errorTxt
    // Add invalid border on input
    inputSelect.classList.add('js-invalid')
    // Clear all previous error messages before adding a new one
    this.clearErrorMsg(textClearField)
    // Append msg
    fieldSelect.appendChild(error)
  },
}

// Validation(Testing)
function validateInputs() {

  function validateName() {
    let value = this.value
    if (value === '') {
      isInvalid.passInvalid('#namefield', '#cardname', 'Por favor, preencha o campo', '#namefield span')
    } else {
      isInvalid.clearErrorMsg('#namefield span')
      this.classList.remove('js-invalid')
    }
  }
  nameInput.addEventListener('blur', validateName)
  //

  function validateCardNum() {
    let value = this.value
    const numRegTest = /(\d{4}-\d{4}-\d{4}-\d{4})/g.test(value)
    if (value === '') {
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Por favor, preencha o campo', '#numberfield span')
    } else if (!numRegTest) {
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Formato incorreto', '#numberfield span')
    } else {
      this.classList.remove('js-invalid')
      isInvalid.clearErrorMsg('#numberfield span')
    }
    return numRegTest
  }
  numberInput.addEventListener('blur', validateCardNum)

}
validateInputs()
