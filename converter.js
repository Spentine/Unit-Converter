/*
STANDARD UNITS:

length: meter
*/

export const data = {
  "kilometer": ["length", 1000, "kilometers"],
  "meter": ["length", 1, "meters"],
  "decimeter": ["length", 0.1, "decimeters"],
  "centimeter": ["length", 0.01, "centimeters"],
  "millimeter": ["length", 0.001, "millimeters"],
  
  "inch": ["length", 0.0254, "inches"], // 2.54 / 100
  "foot": ["length", 0.3048, "feet"], // inch * 12
  "mile": ["length", 1609.344, "miles"], // feet * 5280
};

Object.keys(data).forEach((k) => {
  data[k] = {"type": data[k][0], "factor": data[k][1], "plural": data[k][2]};
});

export function convert(value=1, fromUnit="meter", toUnit="meter") {
  const fUnit = data[fromUnit];
  const tUnit = data[toUnit];
  if (fUnit.type !== tUnit.type) { // you can't convert kilograms to inches or something
    return undefined;
  }
  return value * fUnit.factor / tUnit.factor;
}