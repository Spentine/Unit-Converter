import { convert, data, importUnits } from "./converter.js"

var valueElement = document.getElementById("valueChosen");
var fromElement = document.getElementById("fromUnit");
var toElement = document.getElementById("toUnit");
var result = document.getElementById("result");
var roundoffElement = document.getElementById("roundoff");
var customUnitsElement = document.getElementById("customUnits");
var roundingCutoff = 10;
var currentURL = window.location.href;
var customUnits = localStorage.getItem("customUnits");

roundoffElement.value = roundingCutoff;

if (customUnits !== null) {
  customUnitsElement.value = customUnits;
  try {
    customUnits = JSON.parse(customUnits);
    importUnits(customUnits);
  } catch {
    console.log("invalid JSON!");
  }
}

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

function setRounding() {
  const r = roundoffElement.value;
  roundingCutoff = Number(r);
  console.log(roundingCutoff);
}

function roundOff(value, rounding) {
  if (value <= 1e-80) {
    return 0;
  }
  if (rounding === 0) {
    return value;
  }
  const s = rounding - Math.floor(Math.log10(value));
  if (s < 0) {
    return value;
  }
  return Number(value.toFixed(s));
}

function saveUnits() {
  localStorage.setItem("customUnits", customUnitsElement.value);
}

function updateResult() {
  const val = Number(document.getElementById("valueChosen").value);
  const calc = roundOff(convert(val, fromElement.value, toElement.value), roundingCutoff);
  
  result.innerHTML = `${val} ${plural(fromElement.value, val)} = ${calc} ${plural(toElement.value, calc)}`;
}

unitMenu();

valueElement.addEventListener("input", (event) => updateResult());
fromElement.addEventListener("change", (event) => updateResult());
toElement.addEventListener("change", (event) => updateResult());
roundoffElement.addEventListener("change", (event) => setRounding());
customUnitsElement.addEventListener("change", (event) => saveUnits());