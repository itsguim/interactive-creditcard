import { nameInput, numberInput, monthInput, yearInput, cvcInput } from "../main.js"

// ---------------- Invalid Styling (Is used to apply a "invalid" message or clear if already have one, selecting the Field(div) / Input we want)

const isInvalid = {
  clearErrorMsgFrom(inputId) { /* The function removes the error-message div that comes after the input selected on @param inputId. */
    const target = document.querySelector(inputId)
    if (target.classList.contains('js-invalid')) { // Executing the clear only if class is already added (if already have a error msg).
      target.nextElementSibling.remove()
      target.classList.remove('js-invalid')
    }
  },

  passInvalid(fieldId, inputId, errorTxt) { /* The function apply an error message and styles. */
    const fieldSelect = document.querySelector(fieldId) // @param fieldId being the div which each input belongs, to append the error message into it.
    const inputSelect = document.querySelector(inputId) // @param inputId being the input we want to style with the "invalid" border.
    // Create and set the msg
    let error = document.createElement('span')
    error.classList.add('error-msg')
    error.innerText = errorTxt
    // Add invalid border on input
    inputSelect.classList.add('js-invalid')
    // Append error msg
    fieldSelect.appendChild(error)
  },
}

// -------------------------- Input Validation
const validate = {
  inputName() {
    const nameValue = nameInput.value
    const nameRegTest = /^[a-zA-ZÀ-ú?.\s]+$/g.test(nameValue)
    isInvalid.clearErrorMsgFrom('#cardname') // Invalid Checking
    if (nameValue === '') {
      isInvalid.passInvalid('#namefield', '#cardname', 'Por favor, preencha o campo')
    } else if (!nameRegTest) {
      isInvalid.passInvalid('#namefield', '#cardname', 'Apenas letras, por gentileza')
    }
    return nameRegTest
  },

  inputNumber() {
    const numValue = numberInput.value
    const numRegTest = /^\d{4}( \d{4}){3}$/.test(numValue)
    isInvalid.clearErrorMsgFrom('#cardnumber')
    if (numValue === '') {
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Por favor, preencha o campo')
    } else if (!numRegTest) {
      isInvalid.passInvalid('#numberfield', '#cardnumber', 'Formato inválido, apenas números.')
    }
    return numRegTest
  },

  inputDates() {
    const monVal = monthInput.value,
      yearVal = yearInput.value,
      monReg = /^[0-9]{2}$/.test(monVal),
      yearReg = /^[0-9]{2}$/.test(yearVal)

    isInvalid.clearErrorMsgFrom('#year')
    if (monVal === '' || yearVal === '') {
      isInvalid.passInvalid('#datefield', '#year', 'Preencha os campos vazios')
      monthInput.classList.add('js-invalid')
    } else if (!monReg || !yearReg) {
      isInvalid.passInvalid('#datefield', '#year', 'Formato incorreto')
      monthInput.classList.add('js-invalid')
    } else {
      monthInput.classList.remove('js-invalid')
    }
    return ((monReg && yearReg) ? true : false)
  },

  inputCVC() {
    const cvcValue = cvcInput.value
    const cvcRegTest = /^[0-9]{3}$/.test(cvcValue)
    isInvalid.clearErrorMsgFrom('#cardcvc')
    if (cvcValue === '') {
      isInvalid.passInvalid('#cvcfield', '#cardcvc', 'Preencha o campo')
    } else if (!cvcRegTest) {
      isInvalid.passInvalid('#cvcfield', '#cardcvc', 'Formato incorreto')
    }
    return cvcRegTest
  },
}

export { validate }