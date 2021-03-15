![](https://i.imgur.com/hA8ZNev.png)

# Intro to Node.js

## Learning Objectives

| Students Will Be Able To |
|---|
| Explain the Use Case for Node.js |
| Use Node.js to Execute JavaScript |
| Create and Use Node Modules |
| Use NPM to Install External Packages |

## Road Map

- Setup
- What is Node.js?
- Why the Enthusiasm for Node.js?
- Using Node to Execute JavaScript
- Node Modules
- Our First Module
- NPM - Node Package Manager
- Essential Questions
- Node.js Module Practice

## Setup

- Get inside of your `~/code` folder, then:

	```sh
	$ mkdir first-node
	$ cd first-node
	$ touch main.js
	$ code .
	```

## What is Node.js?

<img src="https://i.imgur.com/nXTOu8F.jpg">

- **Node.js is a runtime environment for executing JavaScript outside of the browser!**

- Created in 2009 by Ryan Dahl with Joyent, Inc.

- Uses the same _V8 JavaScript Engine_ used in the Chrome browser to compile JS programs into machine code.

- Node's runtime environment for JS is different than that in the browser, primarily because:
	- It doesn't have the browser's DOM or [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API).
	- Node has low-level networking and file system APIs that browser JS does not (for security reasons).

- In addition to being used to build high-performance web applications, Node is also a great tool for building command-line tools.

- Node is an open source project governed by the [OpenJSFoundation/Node.js Foundation](https://foundation.nodejs.org/) with board representation from companies such as:

  <img src="https://i.imgur.com/8fZqO3E.png">

- Node is very "lightweight", i.e., only low-level "core" modules for networking, filesystem access, etc. are baked-in.

- Node's functionality is extended via open source libraries called packages.  These packages are managed using the `npm` command installed with Node.

- Node's package ecosystem is the largest open source ecosystem in the world.

## Node's REPL

- **REPL** is an acronym for Read-Evaluate-Print-Loop.

- Programming languages such as Python and Ruby also have REPLs.

- To start [Node's interactive REPL](https://nodejs.org/api/repl.html) we type `node` in Terminal.

- In the REPL we can write JS and even load Node modules, which we're going to learn about in this lesson:

	```sh
	> 10 + 5
	15
	> function sayHello() {
	... console.log('Hello');
	... }
	undefined
	> sayHello()
	Hello
	undefined
	> const http = require('http');
	undefined
	> http
	[ a large JS object representing Node's 'http' module ]
	```

- Press `control-c` twice to exit REPL.

## Why the Enthusiasm for Node.js?

- First and foremost, **performance** - businesses can handle more traffic with less hardware!

- Secondly, developer **synergy**. Developers can use JavaScript on both client & server, thus becoming a full-stack dev is more obtainable and companies can better utilize their developer resources across the front and back-ends.

- The improvements in server performance and developer productivity result in **businesses saving money**.

- Businesses saving money results in **wide adoption**:

	<img src="https://i.imgur.com/5nvUBa3.jpg">

	Most importantly, wide adoption of Node.js results in strong demand for Node developers!

## Why is Node.js so Performant?

- First, it's important to understand how time consuming ("expensive") Input/Output operations are:

	<img src="https://i.imgur.com/iXshhYh.jpg">

- Node's **Asynchronous / Event-driven** design enables<br>**non-blocking** Input/Output:

	<img src="https://i.imgur.com/ARbweHg.jpg">

- A typical Node server is capable of supporting _tens of thousands_ of concurrent connections!

- For more information regarding performance, check the references at the end of this presentation.

### Asynchronous Programming Model

- High-performance, non-blocking I/O operations must be designed as **asynchronous methods**.

- Therefore, a Node developer will use _callback functions_ and/or _promises_ extensively.

## ❓ Review Questions - What is Node.js?

1. **Is Node.js a programming language?**

2. **Is...<br>`const el = document.getElementById('my-list');`<br>a valid JavaScript statement in a Node app?**

Now that you've learned how awesome Node is, let's see how it runs JavaScript programs!

## Using Node to Execute JavaScript

- Let's type the following JavaScript in **main.js**:

	```js
	const multiply = (a, b) => a * b;
		
	let n = multiply(5, 8);
		
	console.log(n);
	```

- Press `ctrl + backtick` to open the integrated terminal in VS Code and type the following to execute **main.js**:

	```sh
	$ node main
	40
	```
	Note how you don't need to include the ".js" file extension.
	
- Yes, running a Node app is that easy!

Cool, let's learn about Node Modules...

## Node Modules

- Modules in Node allow us to **modularize** and **reuse** code in a Node app.

- Node itself comes with several _core modules_, such as the `http` and `fs` modules.

- There are thousands of open-source modules available.

- Let's use the core `fs` module to create a file. Replace the code in **main.js** with this:

	```js
	const fs = require('fs');
	console.log(typeof fs);
	
	fs.writeFile('./hello.txt', 'Hello!', function() {
	  console.log('done creating file');
	});
	```

- We can see that the `fs` module "exports" an `object` that has methods such as `writeFile`.

- Okay, now let's see how we can create our own modules.

- In a Node application, **every** JavaScript file is a module!

- A Node app's modules (files) can be put in any folder within the project.

- This allows us to create modules inside of aptly named folders, such as `models`, `routes`, `controllers`, `views`, etc.

- A module is "loaded" into a Node app using the `require` function we just used to load the `fs` module.

- Whatever functionality the module "exports" is returned by the `require` function.

- How does a module "export" its functionality?  Let's create a module and see...

- Let's create a file/module named **days-of-week.js**: `touch days-of-week.js`

- Okay, each Node module has a variable inside of it named `module` that holds an object containing information about that module.

- Let's see what the `module` object it looks like:

	```js
	// days-of-week.js
	
	console.log(module);
	``` 

- Even the file we run using `node` is a module, so let's type<br>`node days-of-week` and check out what's logged.

- We're getting an inside look at how Node implements its module system...

- Each module is uniquely identified by its fully qualified filename. This allows modules to be named the same, as long as they exist in different folders.

- The property on `module` that we're really interested in though is `exports`. **What value is it initialized to?**

- **So, this is a key point to remember...**<br>Whatever value is assigned to `module.exports`, is what the `require` function returns!

- Let's verify this by assigning a string to it:

	```js
	// days-of-week.js
	
	module.exports = 'SEI';
	```

- Now let's require the module inside of **main.js**...

- Replace the code in **main.js** with this:

	```js
	// main.js
	
	let daysOfWeek = require('./days-of-week');
	console.log(daysOfWeek);
	```
	Then type `node main`

- Note that when we require our app's custom modules, we need to provide a relative path - always starting with either a `.` or `..`

- It is convention to name the variable the same as, or similar to, the name of the module being required. 

- 💪 **You Do:** Instead of exporting a string, change **days-of-week.js** to export the following array instead:

	```js
	['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
	```

- Run **main.js** to check it out.

- Since modules are about code reuse, they can be required an unlimited number of times throughout the application.

- However, the code in the module **only runs the first time the module is required**.<br>Allow me demo this for you.

- Remember how `module.exports` was initialized to an object by default?

- This is because exporting multiple pieces of functionality by creating properties on `module.exports` is very common.

- Let's try it out:

	```js	
	module.exports.weekdays = 
	  ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	
	module.exports.getWeekday = function(dayNo) {
	  if (dayNo < 0 || dayNo > 6) dayNo = 0;
	  return exports.weekdays[dayNo];
	};
	```

- Now let's test it in **main.js**:

	```js
	const daysOfWeek = require('./days-of-week');
	
	const day = daysOfWeek.getWeekday(5);
	console.log(day);
	```
	`Fr` should be logged out.
	
- Questions?

- Node also provides a "shortcut" variable named `exports` that references that very same object that `module.exports` does.

- You can try it by removing `module.` to create this line of code:<br>`exports.weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];`

- **IMPORTANT:** It is not possible to _**assign**_ functionality to the `exports` shortcut variable because it will stop referencing `module.exports`.

- One last thing about modules, any variables declared within a module are local to the module - they do not pollute the global scope.

- BTW, the global scope in a Node application is represented by an object named `global`, **unlike the browser's ________ object**.

## ❓ Review Questions - Modules

1. **What are modules used for in Node?**

2. **How many modules can be defined in a single file?**

3. **What is the special object we use in our module to attach or assign functionality to?**

4. **How many times can we `require` a module in our program?**

5. **Why won't the following code work as intended?**

	```js
	// add.js module
	exports = function (x, y) { return x + y };
	```
	and
	 
	```js
	// use the add.js module
	const add = require('./add');
	let sum = add(5, 10);
	```
	
Now that you've created and used your own modules, let's see how we can install open-source packages and use the modules they contain...

## NPM - Node Package Manager

- Node uses a package management system to distribute open-source packages called **N**ode **P**ackage **M**anager (_npm_).

- Usually a package distributes a Node module, however, sometimes the package distributes a CLI instead of a module we would use in our program.

- Node programs use a `package.json` file that tracks the installed modules that the app depends upon.

- Tracking an application's dependencies in `package.json` removes the necessity to push the app's node modules to the projects GitHub repo - this saves **MASSIVE** file storage and bandwidth.

- If you start a Node app from scratch, the first thing you should do is create the `package.json` file by entering the following command:

	```sh
	$ npm init
	```

- It's okay to accept all of the default settings.  To accept the defaults without being prompted, you can run the command as follows:

	```sh
	$ npm init -y
	```

- Now, let's use `npm` to download and install a package:

	```sh
	$ npm install request
	```

- There is now a `node_modules` folder that contains a folder for the `request` module and its many dependencies.

- There's also a new `package-lock.json` file that npm uses to track dependencies and unlike `package.json`, should not be edited.

- Note: it's highly recommended that `node_modules` be added to your `.gitignore` file.

- We can now require the `request` module in **main.js** and make HTTP requests:

	```js
	// Don't specify path when module is in node_modules
	const request = require('request');
	request(
	  'http://jsonplaceholder.typicode.com/users',
	  function(err, res, body) {
	    console.log(body);
	  }
	);
	```
	> Note the first parameter in the callback is `err`.<br>This "error-first" callback signature is prevalent throughout Node.

- Type `node main` to try it out.

- Let's examine the `request()` call a little closer...

- **Why did a callback have to be provided?**

- Examining the `packages.json` file reveals that it's structured something like this:

	```js
	{
	  "name": "first-node",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "Jim Clark <email@jim-clark.com>",
	  "license": "MIT",
	  "dependencies": {
	    "request": "^2.88.0"
	  }
	}
	```

- The `package.json` is used to install a project's dependencies.

- Installing dependencies is necessary after cloning a repo or when using starter code for a lesson. 

- To demonstrate this, first delete the `node_modules` file, then...

- Now we can install our app's dependencies like this:

	```sh
	$ npm install
	```
	Witness the return of `node_modules`!

## Conclusion

- In the next lesson, you will use one of the most popular Node modules, `Express`, that turns Node into a capable web server.

- **Questions?**

- There are a couple of practice exercises following...

### 💪 Practice - Modules #1

Create a module named `random.js`:

1. That has a function **assigned** to the `module.exports` object.
2. The function should define two parameters, `min` & `max`.
3. The function should return a random number, as an integer, between `min` & `max`, inclusive.
4. Test the module in `main.js` like this:
	
	```js
	const random = require('./utilities/random');
	for (let i = 0; i < 10; i++) {
	  console.log( random(100, 200) );
	}
	```

### 💪 Practice - Modules #2

Create a module named `circle.js`:

1. That exports two functions, both of which have a `radius` parameter defined.
2. The functions should be named `area` & `circumference`.
3. The functions should...
	- `area`: Computes the area of a circle (radius squared X Pi), with the radius provided as an argument. 
	- `circumference`: Computes the circumference of a circle (radius X 2 X Pi), with the radius provided as an argument
4. Hint: This is JS, so `Math.PI` is available.
5. Test the module in `main.js` like this:

	```js
	const circle = require('./utilities/circle');
	console.log( circle.area(50) );  // 7853.98...
	console.log( circle.circumference(75) );  // 471.23...
	```

## References

[NodeJS Homepage](https://nodejs.org/)

[Node Package Manager](https://www.npmjs.com/)

[Blocking/Non-Blocking, Async/Sync](http://stackoverflow.com/questions/10570246/what-is-non-blocking-or-asynchronous-i-o-in-node-js)

