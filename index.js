const Conf = require("conf");
const config = new Conf({
  cwd: "./data",
  configName: "settings",
  defaults: { test: "test", message: "Oh, yeah, this works!" }
});

config.set("appType", "web");
console.log(`appType is "${config.get("appType")}"`);

config.set("foo.bar.goo.boo", true);
console.log(`foo.bar.goo.boo is "${config.get("foo.bar.goo.boo")}"`);

config.set("foo.bar.name", "this is the name");
console.log(`foo.bar.name is "${config.get("foo.bar.name")}"`);
// config.delete('foo.bar.name');
// console.log(`foo.bar.name is "${config.get('foo.bar.name')}"`);

console.log(`config file path is "${config.path}"`);

console.log(`has foo.bar is ${config.has("foo.bar")}`);

// set multiple items at once
// --------------------------------------------------------
const myObj = {
  numberOne: 1,
  numberTwo: {
    title: "nothing spectacular to see here"
  }
};
config.set(myObj);

// replaces the whole foo structure!
// --------------------------------------------------------
/*
const updObj = {
  foo: {
    title: "an amazing title for foo!"
  }
};
config.set(updObj);
*/

const anArrayObj = ["one", "two", "three", { flag: true }];
config.set("appType.options", anArrayObj);

// delete all items!
// config.clear();

// get all the config as an object
// --------------------------------------------------------
console.log(config.store);
// console.log(`the whole config object: ${config.store}`);


// get the item count
// --------------------------------------------------------
console.log(`item count: ${config.size}`);

// watch a given key for changes
// --------------------------------------------------------
config.onDidChange("test", (newValue, oldValue) => {
  console.log(`Yep, "test" changed from "${oldValue}" to "${newValue}"`);
});

// change "test" to see if watch is working
// --------------------------------------------------------
config.set("test", "test change");

// change "test" again to see if watch is working
// --------------------------------------------------------
config.set("test", "test change again");


// watch another given key for changes
// --------------------------------------------------------
config.onDidChange("foo.bar.goo.boo", (newValue, oldValue) => {
  console.log(`Yep, "foo.bar.goo.boo" changed from "${oldValue}" to "${newValue}"`);
});

// change "foo.bar.goo.boo" to see if watch is working
config.set("foo.bar.goo.boo", false);