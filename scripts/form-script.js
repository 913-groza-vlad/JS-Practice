

// display and hide the dropdown options
(() => {
  const selectFaq = document.getElementById('faq');
  const optionsList = document.getElementById('dropdown-options');
  const formLayout = document.getElementsByClassName('form');
 
  let isDropdownVisible = false;

  selectFaq.addEventListener('click', () => {
    if (isDropdownVisible) {
      optionsList.style.display = 'none';
      formLayout[0].style.height = '963px';
    } else {
      optionsList.style.display = 'block';
      formLayout[0].style.height = '1100px';
    }
    isDropdownVisible = !isDropdownVisible;
  });
  
  optionsList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      optionsList.style.display = 'none';
      formLayout[0].style.height = '963px';
      isDropdownVisible = false;
    }
  });
})();


// validate the input fields and submit the form
(function() {
  const form = document.getElementById('contact-form');

  const emailInput = document.getElementById('email');
  const emailLabel = document.getElementById('email-label');
  const invalidEmailMessage = document.getElementById('email-invalid');

  const nameInput = document.getElementById('name');
  const nameLabel = document.getElementById('name-label');
  const invalidNameMessage = document.getElementById('name-invalid');

  const birthInput = document.getElementById('birth');
  const birthLabel = document.getElementById('birth-label');
  const invalidBirthMessage = document.getElementById('birth-invalid');

  const phoneInput = document.getElementById('phone');
  const phoneLabel = document.getElementById('phone-label');
  const invalidPhoneMessage = document.getElementById('phone-invalid');

  const addressInput = document.getElementById('address');
  const addressLabel = document.getElementById('address-label');
  const invalidAddressMessage = document.getElementById('address-invalid');

  const termsCheckbox = document.getElementById('terms');
  const checkLabel = document.getElementById('check');

  const questionInput = document.getElementById('question');
  const questionLabel = document.getElementById('question-label');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isNameValid = validateName(nameInput, nameLabel, invalidNameMessage);
    const isEmailValid = validateEmail(emailInput, emailLabel, invalidEmailMessage);
    const isBirthDateValid = validateBirthDate(birthInput, birthLabel, invalidBirthMessage);
    const isPhoneNumberValid = validatePhoneNumber(phoneInput, phoneLabel, invalidPhoneMessage);
    const isAddressValid = validateAddress(addressInput, addressLabel, invalidAddressMessage);
    const isCheckboxChecked = checkCheckbox(termsCheckbox, checkLabel);
    const isQuestionNotEmpty = isQuestionEmpty(questionInput, questionLabel);
  
    if (isNameValid && isEmailValid && isBirthDateValid && isPhoneNumberValid && isAddressValid && isCheckboxChecked && isQuestionNotEmpty) {
      document.querySelector('.modal').style.display = 'flex';
    }

  });

  const inputFields = [
    { input: nameInput, label: nameLabel, message: invalidNameMessage, labelValue: 'Name', invalidMessage: 'The name is not valid' },
    { input: birthInput, label: birthLabel, message: invalidBirthMessage, labelValue: 'Birth Date', invalidMessage: 'The birth date is not valid' },
    { input: emailInput, label: emailLabel, message: invalidEmailMessage, labelValue: 'Email', invalidMessage: 'The email address is not valid' },
    { input: phoneInput, label: phoneLabel, message: invalidPhoneMessage, labelValue: 'Phone Number', invalidMessage: 'The phone number is not valid' },
    { input: addressInput, label: addressLabel, message: invalidAddressMessage, labelValue: 'Address', invalidMessage: 'The address is not valid, please add all the details'}
  ];

  inputFields.forEach(inputData => onInputChange(inputData));

  termsCheckbox.addEventListener('click', function () {
    checkLabel.classList.remove('invalid');
    document.getElementById('terms-invalid').style.display = 'none';
    checkLabel.textContent = 'I accept the terms and conditions';
    checkLabel.style.setProperty('--buttons-color', '#37efa8');
  });

  questionInput.addEventListener('input', function () {
    questionLabel.textContent = 'Your Question';
  });


  // close the modal by clicking the ok-button or clicking anywhere outside the modal
  const modal = document.querySelector('.modal');
  const okButton = document.querySelector('#ok-button');
  okButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

})();

// function to revalidate the input fields on change
function onInputChange(inputData) {
  const { input, label, message, labelValue, invalidMessage } = inputData;

  input.addEventListener('input', function () {
    input.style.border = '1px solid #525B78';
    label.style.color = '#525B78';
    label.textContent = labelValue;
    message.style.display = 'none';
    message.textContent = invalidMessage;
  });
}

// function to invalidate the input fields
const invalidateInput = (inputFields) => {
  const {input, label, invalidMessage, labelcontent} = inputFields;
  input.style.border = '1px solid #E3132F';
  label.style.color = '#E3132F';
  label.textContent = labelcontent;
  invalidMessage.style.display = 'block';
};

// validate email

let validateEmail = (emailInput, emailLabel, invalidEmailMessage) => {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%]+@gmail\.com$/;

    if (emailValue === '') {
      // Empty email
      invalidEmailMessage.textContent = 'This field is mandatory';
    }

    if (emailRegex.test(emailValue)) {
      // Valid email format
      return true;
    } else {
      // Invalid email format
      invalidateInput({input: emailInput, label: emailLabel, invalidMessage: invalidEmailMessage, labelcontent: 'Email*'});
    }

    return false;
}


// validate name

let validateName = (nameInput, nameLabel, invalidNameMessage) => {
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

    if (nameValue === '') {
      // Empty name
      invalidNameMessage.textContent = 'This field is mandatory';
    }

    if (nameRegex.test(nameValue)) {
      // Valid name format
      return true;
    } else {
      // Invalid name format
      invalidateInput({input: nameInput, label: nameLabel, invalidMessage: invalidNameMessage, labelcontent: 'Name*'});
    }

    return false;
}



// validate birth date

let validateBirthDate = (birthInput, birthLabel, invalidBirthMessage) => {
    const birthValue = birthInput.value.trim();
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (birthValue === '') {
      // Empty birth date
      invalidBirthMessage.textContent = 'This field is mandatory';
    }

    if (dateRegex.test(birthValue)) {
      // Valid name format
      return true;
    } else {
      // Invalid name format
      invalidateInput({input: birthInput, label: birthLabel, invalidMessage: invalidBirthMessage, labelcontent: 'Birth Date*'});
    }

    return false;
}


// validate phone number

let validatePhoneNumber = (phoneInput, phoneLabel, invalidPhoneMessage) => {
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^\+40\d{3}\d{3}\d{3}$/;

    if (phoneValue === '') {
      // Empty phone number
      invalidPhoneMessage.textContent = 'This field is mandatory';
    }

    if (phoneRegex.test(phoneValue)) {
      // Valid phone format
      return true;
    }
    else {
      // Invalid phone format
      invalidateInput({input: phoneInput, label: phoneLabel, invalidMessage: invalidPhoneMessage, labelcontent: 'Phone Number*'});
    }

    return false;
}


// validate address

let validateAddress = (addressInput, addressLabel, invalidAddressMessage) => {
    const addressValue = addressInput.value.trim();
    const addressRegex = /^[a-zA-Z0-9\s,'-]{3,}$/;

    if (addressValue === '') {
      // Empty address
      invalidAddressMessage.textContent = 'This field is mandatory';
    }

    if (addressRegex.test(addressValue)) {
      // Valid address format
      return true;
    } else {
      // Invalid address format
      invalidateInput({input: addressInput, label: addressLabel, invalidMessage: invalidAddressMessage, labelcontent: 'Address*'});
    }

    return false;
}

// validate checkbox

let checkCheckbox = (termsCheckbox, checkLabel) => {
  if (!termsCheckbox.checked) {
    checkLabel.classList.add('invalid');
    document.getElementById('terms-invalid').style.display = 'block';
    checkLabel.textContent = 'I accept the terms and conditions*';
    checkLabel.style.setProperty('--buttons-color', '#E3132F');
    return false;
  }

  return true;
}


// check if the question field is not empty
let isQuestionEmpty = (questionInput, questionLabel) => {
  const questionValue = questionInput.value.trim();

  if (questionValue === '') {
    // Empty question
    questionLabel.textContent = 'Your Question*'
    return false;
  }

  return true;
};
