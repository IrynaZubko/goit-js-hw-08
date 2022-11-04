import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Remove state error: ", error.message);
  }
}

export default {
  save,
  load,
  remove,
};

const formData = {};
let savedData = load(STORAGE_KEY);

formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onFormSubmit);

populateInputs();

function onInputChange(event) {
  if (savedData) {
    Object.keys(savedData).map(key => {
      formData[key] = savedData[key];
      return;
    });
  }

  formData[event.target.name] = event.target.value;

  save(STORAGE_KEY, formData);
  savedData = load(STORAGE_KEY);
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formEl.name.value) {
    return alert("Please, fill in all the fields!");
  }

  console.log(savedData);
  event.currentTarget.reset();
  savedData = remove(STORAGE_KEY);
}

function populateInputs() {
  if (savedData) {
    Object.keys(savedData).map(key => {
      if (formEl.name = formEl[key]) {
        formEl[key].value = savedData[key];
      }
    });
  }
}