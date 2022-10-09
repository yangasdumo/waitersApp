

module.exports = function waiter(db) {

    async function addName(name) {
        var staff = await db.oneOrNone("INSERT into waiters (name) values($1)", [name]);
        return staff;
    }
    async function getName(name) {
        let [getstaff] = await db.manyOrNone('select name from waiters where name=$1', [name]);
        return getstaff;

    }

    async function selectDays() {
        let getWaiter = await db.any("select * from working_days ")
        return getWaiter
    }

     // getting the the names of the admin 
    // async function addAdmin(waiters,working_days) {
    //     return await db.none(`INSERT INTO shifts where (waiter_id,day_id) VALUES($1,$2)`,[waiters,working_days]);
    // }
     
    // async function getadmin(day_id,working_days) {
    //     let waiters = await db.manyOrNone("SELECT  * from shift")
    //     return waiters
    // }



    async function clear() {
        await db.none('delete from shifts')

    }

    return {
        addName,
        getName,
        selectDays,
        // addAdmin,
        // getadmin,
        clear
    }
}