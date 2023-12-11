import cardInteract from "./modules/CardInteract.js";
import { validate } from "./modules/Validation.js";

const nameInput = document.querySelector('#cardname'),
  numberInput = document.querySelector('#cardnumber'),
  monthInput = document.querySelector('#month'),
  yearInput = document.querySelector('#year'),
  cvcInput = document.querySelector('#cardcvc');
// Inputs

cardInteract() // Init card Interaction



// ------------------------------------------------

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

export { nameInput, numberInput, monthInput, yearInput, cvcInput }
