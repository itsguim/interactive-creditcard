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
      cardName.innerText = 'Titular do Cartão'
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
  clearErrorFrom: function (inputId) {
    const target = document.querySelector(inputId)
    // Execute the clear error only if the class is already added
    if (target.classList.contains('js-invalid')) {
      target.nextElementSibling.remove()
      target.classList.remove('js-invalid')
    } else {
      return
    }
  },

  passInvalid: function (fieldId, inputId, errorTxt) {
    const fieldSelect = document.querySelector(fieldId)
    const inputSelect = document.querySelector(inputId)
    // Create and set the msg
    let error = document.createElement('span')
    error.setAttribute('class', 'error-msg')
    error.innerText = errorTxt
    // Add invalid border on input
    inputSelect.classList.add('js-invalid')
    // Append msg
    fieldSelect.appendChild(error)
  },
}

// Validation(Testing)
function validateInputs() {

  function validateCardName() {
    let value = this.value
    let nameRegTest = /[a-zA-Z]+/g.test(value)
    if (value === '') {
      isInvalid.clearErrorFrom('#cardname')
      isInvalid.passInvalid('#namefield', '#cardname', 'Por favor, preencha o campo')
    } else if (!nameRegTest) {
      isInvalid.clearErrorFrom('#cardname')
      isInvalid.passInvalid('#namefield', '#cardname', 'Apenas letras, por gentileza')
    } else {
      isInvalid.clearErrorFrom('#cardname')
    }

    return nameRegTest
  }
  nameInput.addEventListener('blur', validateCardName)

  function validateCardNum() {
    let value = this.value
    const numRegTest = /(\d{4}-\d{4}-\d{4}-\d{4})/g.test(value)
    if (value === '') {
      isInvalid.clearErrorFrom('#cardnumber')
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Por favor, preencha o campo')
    } else if (!numRegTest) {
      isInvalid.clearErrorFrom('#cardnumber')
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Formato inválido')
    } else {
      isInvalid.clearErrorFrom('#cardnumber')
    }
    return numRegTest
  }
  numberInput.addEventListener('blur', validateCardNum)

  function validateCardDate() {
    const monVal = monthInput.value,
      yearVal = yearInput.value;
    ;
    const monReg = /^[0-9]*$/.test(monVal)
    const yearReg = /^[0-9]*$/.test(yearVal)

    if (monVal === '' || yearVal === '') {
      isInvalid.clearErrorFrom('#year')
      isInvalid.passInvalid('#datefield', '#year', 'Preencha os campos vazios')
      monthInput.classList.add('js-invalid')
    } else if (!monReg || !yearReg) {
      isInvalid.clearErrorFrom('#year')
      isInvalid.passInvalid('#datefield', '#year', 'Apenas números')
      monthInput.classList.add('js-invalid')
    } else {
      isInvalid.clearErrorFrom('#year')
      monthInput.classList.remove('js-invalid')
    }

    let testValues = { monReg, yearReg } // Returning regex.test from both values
    return testValues
  }
  yearInput.addEventListener('blur', validateCardDate) // Triggers when finish typing year input


}
validateInputs()
