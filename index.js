const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const Routes = require('./waiters');
const waiter = require('./waiters.js');


const app = express();
app.use(flash());


//database
const pgp = require('pg-promise')({});

const local_database_url = 'postgres://postgres:codex123@localhost:5432/thewaiters';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config = {
    connectionString
}

if (process.env.NODE_ENV == "production") {
    config.ssl = {
        rejectUnauthorized: false
    }
}

app.use(session({
    secret: 'this is my longest string that is used to test my registration with routes app for browser',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const db = pgp(config)

const routes = Routes(db)

app.get("/", function (req, res) {
    res.render("index", {
        user: req.session.user
    });
})

app.post('/login', async function (req, res) {
    let name = req.body.letters;
    let toUpperCase = name.toUpperCase();
    let user = await routes.addName(toUpperCase);
    if (user) {
        res.session.user = user
    }
    let getTheName = await routes.getName(toUpperCase);

    req.flash('message', "Welcome to the Waiters App !!")
    let myName = getTheName.waiter;
    res.redirect(`/days/${myName}`);
});

app.post('/days/:name', async function (req, res) {
    let theName = req.params.name;
    let days = req.body.thedays;
    let workers = Array.isArray(days) ? days : [days];
   var  work = workers.filter(function(item) {return typeof item === "string";}).length;
      if(work >= 3){
          let name = await routes.getName(theName);
          await routes.addAdmin(name.id, days);
      }
    req.flash('message', "Your days has been submited !!");
    res.redirect(`/days/${theName}`);
});

app.get('/days/:name', async function (req, res) {
    let username = req.params.name
    let weekDays = await routes.selectDays()
    let result = await routes.getcheckDay(username)
    res.render('days', {
        weekDays,
        result
    }
    );
});

app.get('/admin', async function (req, res) {
    let mondayWaiters = await routes.getAdmin('monday');
    let tuesdayWaiters = await routes.getAdmin('tuesday');
    let wednesdayWaiters = await routes.getAdmin('wednesday');
    let thursdayWaiters = await routes.getAdmin('thursday');
    let fridayWaiters = await routes.getAdmin('friday');
    let sartudayWaiters = await routes.getAdmin('saturday');
    let sundayWaiters = await routes.getAdmin('sunday');
    let weeklyDays = await routes.daysSchedule();
    res.render('admin', {
        mondayWaiters,
        tuesdayWaiters,
        wednesdayWaiters,
        thursdayWaiters,
        fridayWaiters,
        sartudayWaiters,
        sundayWaiters,
        weeklyDays,
    }
    );
});

app.get('/admin', async function (req, res) {
    res.redirect('/admin')
});

app.post('/admin', async function (req, res) {
    await routes.clear()
    req.flash('message', "All Data Has Been Cleared !!")
    res.redirect('/admin')
});

app.get('/logout', async function (req, res) {
    delete req.session.user
    res.redirect('/')
});

const PORT = process.env.PORT || 2040;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
