const taskInput = document.querySelector("#content");
const dateInput = document.querySelector("#date");
const category = document.querySelector("#category");
 

const validateInputField = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
    input.classList.remove('error-prompt');
})
  if (taskInput.value === "") {
    inputs.forEach(input => {
        input.classList.add('error-prompt');
    })
    return false;
  }
  return true;
};

const getTaskFields = () => {
    taskInput = content.value;
	category = category.value;
	dateInput = date.value;
    // const task = taskInput.value;
    // const date = dateInput.value;
    // const time = timeInput.value;
    return {
        taskInput,category,dateInput
        // task,date, time
    }
}

const reset = () => {
    taskInput.value = '';
    dateInput.value = '';
    category.value = '';
}

export { validateInputField, getTaskFields, reset }