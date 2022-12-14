const nameInput = document.querySelector('#cardname'),
  numberInput = document.querySelector('#cardnumber'),
  monthInput = document.querySelector('#month'),
  yearInput = document.querySelector('#year'),
  cvcInput = document.querySelector('#cardcvc');
// Inputs

// Card Interaction
function initCardInteraction() {
  // Card field selectors
  const cardName = document.querySelector('.card__name')
  const cardNumber = document.querySelector('.card__number')
  const cardMonth = document.querySelector('.js__mm')
  const cardYear = document.querySelector('.js__yy')
  const cardCvc = document.querySelector('.card__cvc')

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

  nameInput.addEventListener('keyup', passCardName)
  numberInput.addEventListener('keyup', passCardNumber)
  monthInput.addEventListener('keyup', passCardDate)
  yearInput.addEventListener('keyup', passCardDate)
  cvcInput.addEventListener('keyup', passCvc)
}
initCardInteraction()

// Invalid Styling
const isInvalid = {
  clearErrorFrom(inputId) {
    const target = document.querySelector(inputId)
    // Execute the clear error only if the class is already added
    if (target.classList.contains('js-invalid')) {
      target.nextElementSibling.remove()
      target.classList.remove('js-invalid')
    } else {
      return
    }
  },

  passInvalid(fieldId, inputId, errorTxt) {
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

// Input Validation
const validate = {
  inputName() {
    const nameValue = nameInput.value
    const nameRegTest = /^[a-zA-ZÀ-ú?.\s]+$/g.test(nameValue)
    if (nameValue === '') {
      isInvalid.clearErrorFrom('#cardname')
      isInvalid.passInvalid('#namefield', '#cardname', 'Por favor, preencha o campo')
    } else if (!nameRegTest) {
      isInvalid.clearErrorFrom('#cardname')
      isInvalid.passInvalid('#namefield', '#cardname', 'Apenas letras, por gentileza')
    } else {
      isInvalid.clearErrorFrom('#cardname')
    }
    return nameRegTest
  },

  inputNumber() {
    const numValue = numberInput.value
    const numRegTest = /(\d{4}-\d{4}-\d{4}-\d{4})/g.test(numValue)
    if (numValue === '') {
      isInvalid.clearErrorFrom('#cardnumber')
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Por favor, preencha o campo')
    } else if (!numRegTest) {
      isInvalid.clearErrorFrom('#cardnumber')
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Formato inválido, ex: (1111-2222-3333-0000)')
    } else {
      isInvalid.clearErrorFrom('#cardnumber')
    }
    return numRegTest
  },

  inputDates() {
    const monVal = monthInput.value,
      yearVal = yearInput.value;
    const monReg = /^[0-9]{2}$/.test(monVal)
    const yearReg = /^[0-9]{2}$/.test(yearVal)
    if (monVal === '' || yearVal === '') {
      isInvalid.clearErrorFrom('#year')
      isInvalid.passInvalid('#datefield', '#year', 'Preencha os campos vazios')
      monthInput.classList.add('js-invalid')
    } else if (!monReg || !yearReg) {
      isInvalid.clearErrorFrom('#year')
      isInvalid.passInvalid('#datefield', '#year', 'Formato incorreto')
      monthInput.classList.add('js-invalid')
    } else {
      isInvalid.clearErrorFrom('#year')
      monthInput.classList.remove('js-invalid')
    }
    let testValues = { monReg, yearReg } // Returning regex.test from both values
    return testValues
  },

  inputCVC() {
    const cvcValue = cvcInput.value
    const cvcRegTest = /^[0-9]{3}$/.test(cvcValue)
    if (cvcValue === '') {
      isInvalid.clearErrorFrom('#cardcvc')
      isInvalid.passInvalid('#cvcfield', '#cardcvc', 'Preencha o campo')
    } else if (!cvcRegTest) {
      isInvalid.clearErrorFrom('#cardcvc')
      isInvalid.passInvalid('#cvcfield', '#cardcvc', 'Formato incorreto')
    } else {
      isInvalid.clearErrorFrom('#cardcvc')
    }
    return cvcRegTest
  },
}

nameInput.addEventListener('blur', validate.inputName)
numberInput.addEventListener('blur', validate.inputNumber)
yearInput.addEventListener('blur', validate.inputDates)
cvcInput.addEventListener('blur', validate.inputCVC)

// Submit/Reset Form
const form = document.querySelector('#form-main')
const reset = document.querySelector('#reset-btn')

function checkInputs(evt) {
  evt.preventDefault()
  if (validate.inputName() && validate.inputNumber() && validate.inputDates() && validate.inputCVC()) {
    document.querySelector('#input-screen').classList.add('hidden')
    document.querySelector('#success-screen').classList.add('active')
    this.reset()
  } else {
    return
  }
}
form.addEventListener('submit', checkInputs)

reset.onclick = () => {
  document.querySelector('#input-screen').classList.remove('hidden')
  document.querySelector('#success-screen').classList.remove('active')
}