/*
This module implements the observer design pattern and allows
other modules to register/unregister a callback function that
will be invoked when the battery's charge level or charging status
changes.

This module currently only works with Chrome, Opera & Samsung browsers.
You can read the Battery Status API specification here:
https://w3c.github.io/battery/

Additional events/properties available but not used in this module:
- chargingtimechange/chargingTime
- ondischargingtimechange/dischargingTime
*/

let battery;
const observerCallbacks = [];

async function initBattery() {
  battery = await navigator.getBattery();
  battery.addEventListener("levelchange", notifyObservers);
  battery.addEventListener("chargingchange", notifyObservers);
  notifyObservers();
}

initBattery();

function getBatteryData() {
  return {
    level: battery.level,
    charging: battery.charging
  };
}

function notifyObservers() {
  observerCallbacks.forEach(cb => cb(getBatteryData()));
}

export function register(callback) {
  if (observerCallbacks.indexOf(callback) !== -1) return;
  observerCallbacks.push(callback);
  if (battery) {
    callback(getBatteryData());
  }
}

export function unregister(callback) {
  let idx = observerCallbacks.indexOf(callback);
  if (idx !== -1) observerCallbacks.splice(idx, 1);
}