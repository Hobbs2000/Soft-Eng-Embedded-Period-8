var resources = require('./resources/model')

var handler = {
  set(target, key, value) {
    console.log(`Setting ${key} as ${value}`)
    target[key] = value;
  },
};

var m = new Proxy(resources.pi.actuators.leds.one, handler);
console.log(resources.pi.actuators.leds.one.value);
m.value = true;
console.log(resources.pi.actuators.leds.one.value); 