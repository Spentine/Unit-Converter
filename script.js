import { convert, data } from "./converter.js"

var valueElement = document.getElementById("valueChosen");
var fromElement = document.getElementById("fromUnit");
var toElement = document.getElementById("toUnit");
var result = document.getElementById("result");

function unitMenu() {
  let r = "";
  Object.keys(data).forEach((k) => {
    r += `<option value="${k}">${data[k].plural}</option>`;
  });
  document.getElementById("fromUnit").innerHTML = r;
  document.getElementById("toUnit").innerHTML = r;
}

function plural(unit, value) {
  if (value == 1) {
    return unit;
  }
  return data[unit].plural;
}

function updateResult() {
  const val = document.getElementById("valueChosen").value;
  const calc = convert(val, fromElement.value, toElement.value);
  console.log(val, calc);
  result.innerHTML = `${val} ${plural(fromElement.value, val)} = ${calc} ${plural(toElement.value, calc)}`;
}

unitMenu();

valueElement.addEventListener("input", (event) => updateResult());
fromElement.addEventListener("change", (event) => updateResult());
toElement.addEventListener("change", (event) => updateResult());