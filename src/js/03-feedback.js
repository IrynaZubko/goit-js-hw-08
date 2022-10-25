import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const formEl = document.querySelector(".feedback-form");

const formData = {};
const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onFormSubmit);

populateInputs();

function onInputChange(event) {
    formData[event.target.name] = event.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();

    event.currentTarget.reset();
    console.log(savedData);
    localStorage.removeItem(STORAGE_KEY);
}

function populateInputs() {
    if (savedData) {
        Object.keys(savedData).map(key => {
            if (formEl.name = formEl[key]) {
                formEl[key].value = savedData[key];
            }
        })
    }
}