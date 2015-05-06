# MyLilCrm

This is a monster of a repo, and it features both an express-mongoose powered api server (in app) and a react-react-router-reflux powered frontend in scripts.

The folders don't really make sense at this point, they happened by accident. Eventually this will get organized a bit better, or, I may break them out into separate repos and have a collection repo via git submodules.

## How do I start this thing?

You will have to install mongodb yourself. Download it from [their website](http://www.mongodb.org/downloads). If you need help [find installation instructions for your platform here](http://docs.mongodb.org/manual/installation/).

You should, of course, have (node and npm)[https://nodejs.org/] installed on on your path.

* `git clone`
* `cd MyLilCrm`
* `npm install`

This will install all of the packages required.

There are three separate elements to run the full app.

To start everything in one fell swoop:

* `npm start`

It runs each in the background of the current shell, so you will get a jumble of the output from each.

If you want, running them each in their own terminal might be easier for debugging

You can start them separately via:

* `npm run mongo`
* `npm run backend`
* `npm run frontend`

You'll want to start mongodb before the backend so it can connect properly.

## Backend (app/)

Basic Express app with Mongoose for persistence.

Everything is written in Babel flavored ES6. If you take a look at `app/index.js` it does `require('babel-core/register')` and finally requires the 'real' file `server.js`. This means you can just run it with `node app/` and the Babel register hook takes care of transformation.

The files in app:

* `db.js`: Sets up the connection the database!
* `index.js`: see above, requires Bable register hook and loads up the app so we can have ES6 *almost* everywhere
# `server.js`: This could probably be split up. At the lease config information should be pulled out to assist in per environment config information. Otherwise, this configures Express and wires up routes.

The following lists the folders in `app/` and what they're all about:

* `api/`: Each file represents a resource and exports an object containing (mostly) RESTful functions
* `lib/`: This is a rather small potpourri of helpers and other things. Useful but general code goes here
* `model/`: The files in this directory export either a Mongoose model or Schema. A capitalized file is a model, lowercased files with schema in the name are obviously Schemas.
* `validation/`: Any special validation logic should be generalized and placed here to aid in future use client-side. Currently these are just a collection of arrays for Mongoose enum validation.

This is a fairly basic app. There is currenly no authorization. This is most likely going to be added via JWT at a future date.

The routes are also very basic with no search or filter support. Any such features will be kept to a minimum. Searching and filtering will be done client-side if possible.

#### Looking to the Future

Authorization via JWT!

Real Time Features!

My plan is to bootstrap and load data as it is needed on the client **once**. Future updates to data will be pushed to the client. As for how, that remains to be seen. There are great options like Socket.io and SSE for realtime. In terms of getting the changes, a message bus or Event Emitter sorta thing could implemented and the various routes could publish their changes. Another option that looks interesting could be a DB that supports this feature natively like RethinkDB. The DB and query language looks sweet and the data format wouldn't need much changing.

## Frontend (scripts/)

Insert info here
