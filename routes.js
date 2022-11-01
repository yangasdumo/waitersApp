module.exports = function Routes(routes) {
    
    async function home(req, res) {
        res.render("index", {
            user: req.session.user
        });
    }

    async function loginPage(req, res) {
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
    }


    async function findDays (req, res) {
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
    }

    async function getDays(req, res) {
        let username = req.params.name
        let weekDays = await routes.selectDays()
        let result = await routes.getcheckDay(username)
        res.render('days', {
            weekDays,
            result
        }
        );
    }

    async function AdminDays(req, res) {
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
    }

    async function getAdmin(req, res) {
        res.redirect('/admin')
    }

    async function clear(req, res) {
        await routes.clear()
        req.flash('message', "All Data Has Been Cleared !!")
        res.redirect('/admin')
    }

    async function logoutPage(req, res) {
        delete req.session.user
        res.redirect('/')
    }

return{
    home,
    loginPage,
    findDays,
    getDays,
    AdminDays,
    getAdmin,
    clear,
    logoutPage
}
}
