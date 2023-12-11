import { nameInput, numberInput, monthInput, yearInput, cvcInput } from "../main.js"

// -------------------------- Just Invalid Styling
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

// -------------------------- Input Validation
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
    const numRegTest = /^\d{4}( \d{4}){3}$/.test(numValue)
    isInvalid.clearErrorFrom('#cardnumber')
    if (numValue === '') {
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Por favor, preencha o campo')
    } else if (!numRegTest) {
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Formato inválido, apenas números.')
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
    return ((monReg && yearReg) ? true : false)
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

export { validate }