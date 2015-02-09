Through Company
======================

##Setup

1) Install dependencies

``` shell
npm install
```

2) You need to have mongo db running

3) You need to load some intial seed data

``` shell
grunt db-seed
```
4) start node in the root directory of the project

``` shell
node app.js
```

5) the app will startup on port 3000, you will need to register and create an account to login

##Grunt Tasks

####Misc Tasks
---

JShint for linting
``` javascript
grunt run-jshint
```

####Testing Tasks
---

Run Mocha tests
``` javascript
grunt run-tests
```

####Database Tasks
---

Seed the database with lookup data, seed data, etc...
``` javascript
grunt db-seed
```

Cleanup all database collections
``` javascript
grunt db-clean
```
####Deployment Tasks
---

Deploy the app to Heroku
``` javascript
grunt deploy-app
```


##MVC
This app uses a simple MVC pattern. The ```app.js``` file requires ```lib/controllerconfig.js``` which will find all files in your controllers directory and register any functions you export in a controller module as routes.

``` javascript
// app.js
//

require('./lib/controllerconfig.js').registerControllers(app, path.join(__dirname, '/controllers'));
```

Controllers should export actions in the following format :

``` javascript
// accountcontroller.js
//

module.exports.signin = {
  route  : 'signin',
  method : 'GET',
  action : function(req, res) {
    if(req.method === 'GET') {
      //do get stuff
    }
    else if(req.method === 'POST') {
      //do post stuff
    }
  }
};
```

which would register a ```GET``` request with Express at this route ```/account/signin```

middleware can also be specified :

``` javascript
middleware : function(req, res, next) {
  //some middleware stuff
}
```

A default route can be specified which will be used for the route ```/```

``` javascript
// app.js
//

require('./lib/controllerconfig.js').registerControllers(app, path.join(__dirname, '/controllers'), '/home/index');
```

##Code Style Rules

javascript : https://github.com/felixge/node-style-guide

html & css : http://mdo.github.io/code-guide/

##Error Handling/Throwing
http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
