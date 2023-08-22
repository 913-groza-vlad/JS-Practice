

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

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isNameValid = validateName(nameInput, nameLabel, invalidNameMessage);
    const isEmailValid = validateEmail(emailInput, emailLabel, invalidEmailMessage);
    const isBirthDateValid = validateBirthDate(birthInput, birthLabel, invalidBirthMessage);
    const isPhoneNumberValid = validatePhoneNumber(phoneInput, phoneLabel, invalidPhoneMessage);
    const isAddressValid = validateAddress(addressInput, addressLabel, invalidAddressMessage);
    const isCheckboxChecked = checkCheckbox(termsCheckbox, checkLabel);
  
    if (isNameValid && isEmailValid && isBirthDateValid && isPhoneNumberValid && isAddressValid && isCheckboxChecked) {
      document.querySelector('.modal').style.display = 'flex';
    }

  });

  nameInput.addEventListener('input', function () {
    nameInput.classList.remove('invalid');
    nameInput.style.border = '1px solid #525B78';
    nameLabel.style.color = '#525B78';
    nameLabel.textContent = 'Name';
    invalidNameMessage.style.display = 'none';
    invalidNameMessage.textContent = 'The name is not valid';
  });

  birthInput.addEventListener('input', function () {
    birthInput.classList.remove('invalid');
    birthInput.style.border = '1px solid #525B78';
    birthLabel.style.color = '#525B78';
    birthLabel.textContent = 'Birth Date';
    invalidBirthMessage.style.display = 'none';
    invalidBirthMessage.textContent = 'The birth date is not valid';
  });

  emailInput.addEventListener('input', function () {
    emailInput.classList.remove('invalid');
    emailInput.style.border = '1px solid #525B78';
    emailLabel.style.color = '#525B78';
    emailLabel.textContent = 'Email';
    invalidEmailMessage.style.display = 'none';
    invalidEmailMessage.textContent = 'The email address is not valid';
  });

  phoneInput.addEventListener('input', function () {
    phoneInput.classList.remove('invalid');
    phoneInput.style.border = '1px solid #525B78';
    phoneLabel.style.color = '#525B78';
    phoneLabel.textContent = 'Phone Number';
    invalidPhoneMessage.style.display = 'none';
    invalidPhoneMessage.textContent = 'The phone number is not valid';
  });

  addressInput.addEventListener('input', function () {
    addressInput.classList.remove('invalid');
    addressInput.style.border = '1px solid #525B78';
    addressLabel.style.color = '#525B78';
    addressLabel.textContent = 'Address';
    invalidAddressMessage.style.display = 'none';
    invalidAddressMessage.textContent = 'The address is not valid, please add all the details';
  });

  termsCheckbox.addEventListener('click', function () {
    checkLabel.classList.remove('invalid');
    document.getElementById('terms-invalid').style.display = 'none';
    checkLabel.textContent = 'I accept the terms and conditions';
    checkLabel.style.setProperty('--buttons-color', '#37efa8');
  });

})();


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
      emailInput.classList.remove('invalid');
      return true;
    } else {
      // Invalid email format
      emailInput.classList.add('invalid');
      emailInput.style.border = '1px solid #E3132F';
      emailLabel.style.color = '#E3132F';
      emailLabel.textContent = 'Email*'
      invalidEmailMessage.style.display = 'block';
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
      nameInput.classList.remove('invalid');
      return true;
    } else {
      // Invalid name format
      nameInput.classList.add('invalid');
      nameInput.style.border = '1px solid #E3132F';
      nameLabel.style.color = '#E3132F';
      nameLabel.textContent = 'Name*'
      invalidNameMessage.style.display = 'block';
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
      birthInput.classList.remove('invalid');
      return true;
    } else {
      // Invalid name format
      birthInput.classList.add('invalid');
      birthInput.style.border = '1px solid #E3132F';
      birthLabel.style.color = '#E3132F';
      birthLabel.textContent = 'Birth Date*'
      invalidBirthMessage.style.display = 'block';
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
      phoneInput.classList.remove('invalid');
      return true;
    }
    else {
      // Invalid phone format
      phoneInput.classList.add('invalid');
      phoneInput.style.border = '1px solid #E3132F';
      phoneLabel.style.color = '#E3132F';
      phoneLabel.textContent = 'Phone Number*'
      invalidPhoneMessage.style.display = 'block';
    }

    return false;
}


// validate address

let validateAddress = (addressInput, addressLabel, invalidAddressMessage) => {
  const addressValue = addressInput.value.trim();
    const addressRegex = /^[a-zA-Z0-9\s,'-]+$/;

    if (addressValue === '') {
      // Empty address
      invalidAddressMessage.textContent = 'This field is mandatory';
    }

    if (addressRegex.test(addressValue)) {
      // Valid address format
      addressInput.classList.remove('invalid');
      return true;
    } else {
      // Invalid address format
      addressInput.classList.add('invalid');
      addressInput.style.border = '1px solid #E3132F';
      addressLabel.style.color = '#E3132F';
      addressLabel.textContent = 'Address*'
      invalidAddressMessage.style.display = 'block';
    }

    return false;
}


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

