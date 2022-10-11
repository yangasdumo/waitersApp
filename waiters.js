

module.exports = function waiter(db) {

    async function addName(name) {
        var staff = await db.oneOrNone("INSERT into waiters (waiter) values($1)", [name]);
        return staff;
    }
    async function getName(name) {
        let [getstaff] = await db.manyOrNone('select * from waiters where waiter=$1', [name]);
        return getstaff;

    }

    async function selectDays() {
        let getWaiter = await db.any("select * from working_days")
        return getWaiter
    }

    // getting the the names of the admin 
    async function addAdmin(waiters, working_days) {
        // loop over your days
        for (let i = 0; i < working_days.length; i++) {
            const element = working_days[i];
            console.log(element);
             await db.none(`INSERT INTO shifts (waiter_id,day_id) VALUES($1,$2)`, [waiters, element]);
        }
    }

    async function getAdmin(weekDay) {
        let waiters = await db.manyOrNone("SELECT * from shifts join waiters on waiter_id = waiters.id join working_days on day_id = working_days.id where day = $1",[weekDay])
        return waiters
    }

    async function clear() {
        let remove =  await db.none('delete from shifts')
        return remove

    }

    return {
        addName,
        getName,
        selectDays,
        addAdmin,
        getAdmin,
        clear
    }
}