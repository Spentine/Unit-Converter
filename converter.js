/*
STANDARD UNITS:

length: meter
time: second
*/

const standardUnits = {
  
  /* LENGTH */
  
  "meter": ["length", 1, "meters"],
  "kilometer": ["length", 1000, "kilometers"],
  "decimeter": ["length", 0.1, "decimeters"],
  "centimeter": ["length", 0.01, "centimeters"],
  "millimeter": ["length", 0.001, "millimeters"],
  "micrometer": ["length", 1e-6, "micrometers"],
  "nanometer": ["length", 1e-9, "nanometers"],
  "picometer": ["length", 1e-12, "picometers"],
  "femtometer": ["length", 1e-15, "femtometers"],
  "attometer": ["length", 1e-18, "attometers"],
  "zeptometer": ["length", 1e-21, "zeptometers"],
  "yoctometer": ["length", 1e-24, "yoctometers"],
  /*
  "rontometer": ["length", 1e-27, "rontometers"],
  "quectometer": ["length", 1e-30, "quectometers"],
  "decameter": ["length", 10, "decameters"],
  "hectometer": ["length", 100, "hectometers"],
  "megameter": ["length", 1e6, "megameters"],
  "gigameter": ["length", 1e9, "gigameters"],
  "terameter": ["length", 1e12, "terameters"],
  "petameter": ["length", 1e15, "petameters"],
  "exameter": ["length", 1e18, "exameters"],
  "zettameter": ["length", 1e21, "zettameters"],
  "yottameter": ["length", 1e24, "yottameters"],
  "ronnameter": ["length", 1e27, "ronnameters"],
  "quettameter": ["length", 1e30, "quettameters"],
  */
  
  "light-second": ["length", 299792458, "light-seconds"],
  "light-minute": ["length", 17987547480, "light-minutes"],
  "light-hour": ["length", 1079252848800, "light-hours"],
  "light-day": ["length", 25902068371200, "light-days"],
  "light-year": ["length", 9454254955488000, "light-years"],
  "astronomical unit": ["length", 149597870700, "astronomical units"],
  "parsec": ["length", 30856775814913700, "parsecs"],
  
  "inch": ["length", 0.0254, "inches"], // 2.54 / 100
  "foot": ["length", 0.3048, "feet"], // inch * 12
  "yard": ["length", 0.9144, "yards"], // foot * 3
  "mile": ["length", 1609.344, "miles"], // foot * 5280
  
  /* TIME */
  
  "second": ["time", 1, "seconds"],
  "minute": ["time", 60, "minutes"],
  "hour": ["time", 3600, "hours"],
  "day": ["time", 86400, "days"],
  "month": ["time", 2592000, "months"], // 30 day month
  "year": ["time", 31536000, "years"],
};

export var data = {};

export function importUnits(u) {
  Object.keys(u).forEach((k) => {
    data[k] = {"type": u[k][0], "factor": u[k][1], "plural": u[k][2]};
  });
}

importUnits(standardUnits);

export function convert(value=1, fromUnit="meter", toUnit="meter") {
  const fUnit = data[fromUnit];
  const tUnit = data[toUnit];
  if (fUnit.type !== tUnit.type) { // you can't convert kilograms to inches or something
    return undefined;
  }
  return value * fUnit.factor / tUnit.factor;
}