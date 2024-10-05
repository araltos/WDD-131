const steps = ["one", "two", "three"];

function listTemplate(step) {
    return `<li>${step}</li>`;
  }

const htmlListItems = steps.map(listTemplate);
const myList = htmlListItems.join('');
const finalList = `<ul>${myList}</ul>`;

document.querySelector("#myList").innerHTML = finalList;