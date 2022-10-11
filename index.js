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
    });
})

app.post('/login', async function (req, res) {
    let name = req.body.letters;
    await routes.addName(name);
    let getTheName = await routes.getName(name);
    req.flash('message', "Welcome to the Waiters App !!")
    let myName = getTheName.waiter;
    res.redirect(`/days/${myName}`);
});

app.post('/days/:name', async function (req, res) {
    let theName = req.params.name
    let days = req.body.thedays;
    let name = await routes.getName(theName)
    await routes.selectDays(days);
    await routes.addAdmin(name.id,days);
    req.flash('message', "Your days has been subbited !!");
    res.redirect(`/days/${theName}`);
});

app.get('/days/:name', async function (req, res) {
    let weekDays = await routes.selectDays()
    res.render('days', {
        weekDays
    }
    );
});

app.get('/admin', async function (req, res) {
    let mondayWaiters = await routes.getAdmin('monday');
    let tuesdayWaiters = await routes.getAdmin('tuesday');
    let wednsdayaiters = await routes.getAdmin('wednesday');
    let thursdayWaiters = await routes.getAdmin('thursday');
    let fridayWaiters = await routes.getAdmin('friday');
    let sartudayWaiters = await routes.getAdmin('saturday');
    let sundayWaiters = await routes.getAdmin('sunday');
    res.render('admin', {
        mondayWaiters,
        tuesdayWaiters,
        wednsdayaiters,
        thursdayWaiters,
        fridayWaiters,
        sartudayWaiters,
        sundayWaiters
    }
    );
});

app.get('/admin', async function (req, res) {
    res.redirect('/admin')
});

app.post('/admin',async function (req, res){
    await routes.clear()
    req.flash('message', "All Data Has Been Cleared !!")
        
    res.redirect('/admin')
});


const PORT = process.env.PORT || 2040;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
