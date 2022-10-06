

module.exports = function waiter(db){

    async function addName(name) {
        var staff = await db.oneOrNone("INSERT into waiters (name) values($1)",[name]);
        // console.log(staff)
        return staff;
    }
    async function getName(name){
        let [getstaff] = await db.manyOrNone('select name from waiters where name=$1', [name]);
        return getstaff;

    }

   async function selectDays(){
        let getWaiter = await db.any("select * from working_days ")
        return getWaiter
   }

   async function admin(){
       let waiters = await db.manyOrNone("SELECT * FROM shifts join working_days on day_id = working_days.id ")
       console.log(waiters)
       return waiters
   }

   async function clear() {
    await db.none('delete from shifts')

  }


  

    return{
        addName,
        getName,
        selectDays,
        admin,
        clear
    }
}