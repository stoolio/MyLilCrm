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

-EDIT-
npm doesn't like stuff that works just fine on the command line. Just use the separate tasks below.
-END EDIT-

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

## Frontend (scripts/)

This is the juicy fun part, but it has grown in complexity quite a bit, so I have to steel myself to (attempt) to fully document it.

In addition, it's much messier than the backend. Features generally start as a mess of code in one or many components, and later get factored out into juicy reusable bits.

Here are the basic:

* `actions/`: Reflux actions. Very simple. Have a look. These should be called in routes to load and massage data
* `stores/`: These correspond to their sibling actions. They listen for actions and do the actual work
* `api/`: These are responsible for all communication to the server. Stores use these when they need to get some data. They are currently a very light wrapper around superagent.
* `components/`: React components! These should be, in a perfect world, purely props driven and as stupid as possible.
* `layout/`: These are components. I'm not sure they need to be in a special folder. The idea is that they are generic elements of the site structure, but I think some shuffling is in order to make that really true.
* 'routes/': These are components which layout pages using a collection of components. They divvy up the app wide state passed down from on high, explicity passing down props to their children. They also call actions.
* `lib/`: helper functions and reusable bits of code that aren't the other things belong here
* `App.js`: This is the main layout. It is the home of app wide state, and it listens to the StateStore, a special store that listens to all other stores and combines their state into one big happy family. No other components listen to stores. The StateStore simplifies listening a bit, App doesn't have to listen to store after store, and stores can be added without changing to much code. Just access the props in the child routes.
* `index.js`: This just pulls in all the pieces and runs react-router
* `Routes.js`: Route definitions! Not much to say.
* `index.scss`: This file is here so it's easy to require in `index.js`.  Webpack will hot load them, re-compile them etc.

Currently, there are a few components that have state. THey are all forms fields of some sort, and it's not consistent. Some are in `components/` and some are in `routes/`. The plan is to create a FormStore handle pulling that data out to the top.

Maybe something like:

```
FormActions.store(someKey, field, data);
// using curry, the routes can have
curry(FormActions.store, [someKey])
// and/or pass down to their components
curry(FormActions.store, [someKey, field])
// the store would then
onStore(key, field, data) {
  this.state[key][field] = data;
  this.trigger(this.state);
}
// routes would pass values down as props
// the child components would be none the wiser
<Field value={this.props.form.key.field} ... />
```

It seems easy now that I've typed that out, but who knows if it will end up working the way I want it. Only time will tell.

Immutable data sounds interesting as well, in addition to a lib which simplifies all this data passing like cortex or baobab. Either of these seem like a big job, however, and not entirely necessary. Features are first in line (although putting these decisions off will probably make them harder to implement in the future).

Currently, we have contacts and leads. New ones can be added, and contacts can be removed. There is an inteface to add and re-order lead stages (via drag-n-drop!).

Contacts can be sorted, and both can be searched, which all takes place client side.

Next on the agenda (in no particular order):

#### Basics

* a drag-n-drop interface to move leads between stages
* more in depth lead filtering (by stage, etc)
* basic dashboard with stats (how many of this and that)
* lead and contact 'cards' to display them usefully anywhere
* adding features to sort leads, particularly by age
* buttons with fancy icons to associate notes with a form of contact (phone, email)
* full on auth, requiring login
* image upload for contacts, perhaps using clearbit to auto grab other info
* appointment functionality
* tasks (which will take some thought). having auto tasks based on lead status and stage would be interesting
* integration with email. pull in emails and display on associated lead/contact pages. allow sending email
* way more in-depth contact info

#### Jeweler/GDC Specific

* diamond request interface to create, view, and edit
* tracking of vendors and memo goods
* job tracking, both custom and repairs, auto send CAD to customers. Allow customers to auto approve (send email with Yes in the subject and we will get your job in work)
* customer portal, perhaps a separate app which consumes part of this api, or its api gets posted to from here, to share data and allow them set preferences, imagine they get an auto text (or their preferred form of communication) when we mark their job as finished

#### Looking to the Future

Authorization via JWT!

Real Time Features!

My plan is to bootstrap and load data as it is needed on the client **once**. Future updates to data will be pushed to the client. As for how, that remains to be seen. There are great options like Socket.io and SSE for realtime. In terms of getting the changes, a message bus or Event Emitter sorta thing could implemented and the various routes could publish their changes. Another option that looks interesting could be a DB that supports this feature natively like RethinkDB. The DB and query language looks sweet and the data format wouldn't need much changing.
