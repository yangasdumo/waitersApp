const assert = require('assert');
const reggie = require('../waiters');



const pgp = require('pg-promise')();
const local_database_url = 'postgres://postgres:codex123@localhost:5432/my_waiter';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config = {
  connectionString
}

if (process.env.NODE_ENV == "production") {
  config.ssl = {
    rejectUnauthorized: false
  }
}

const db = pgp(config);
const staff = reggie(db)


describe("The Waiters Availabilty  Database tests", async function () {
    
    beforeEach(async function(){
        await db.none('delete from shifts')
        await db.none('delete from waiters')
    }); 
        it("Should be able to allow user to sign in ", async function () {
              const theName = "John";
              await staff.addName(theName);
              const getTheName = await staff.getName(theName);
              const nammy = getTheName.waiter;
              assert.equal("John", nammy)
        }); 

        it("Should be able to select the days if a user has sign in ", async function () {
          const theName1 = "dudu";
          const theName2 = "bobo";
          const theName3 = "zeze";
          const days = 15
          await staff.addName("zozo");
          const nameId = await staff.getName("zozo")
          await staff.addAdmin(nameId.id,[1,2,3]);
          const getAllShifts = await staff.getAllShift();
          const shifty = getAllShifts[0].waiter_id;
          const addy = shifty;
          assert.deepEqual(getAllShifts, [
            { day_id: 1, waiter_id: addy },
            { day_id: 2,waiter_id: addy  },
            { day_id: 3,waiter_id: addy  }
          ]);    
        }); 

        
        it("Should be able to select the days if a user has sign in ", async function () {
          const theName1 = "dudu";
          const theName2 = "bobo";
          const theName3 = "zeze";
          const days = 15
          await staff.addName("bobo");
          const nameId = await staff.getName("bobo")
          await staff.addAdmin(nameId.id,[1,2,3]);
          const getAllShifts = await staff.getAllShift();
          const shifty = getAllShifts[0].waiter_id;
          const addy = shifty;
          assert.deepEqual(getAllShifts, [
            { day_id: 1, waiter_id: addy },
            { day_id: 2,waiter_id: addy },
            { day_id: 3,waiter_id: addy }
          ]);    
        }); 

        it("should be able to get the count of all the waiters", async function () {
          await staff.addName("zozo");
          await staff.addName("dudu");
          await staff.addName("zeze");
          const numberofWaiters= await staff.getTheNames();
          assert.equal(numberofWaiters.length,3);
        });
        
         
    
        it("should be able remove the data when clear button is pressed", async function () {
          
          await staff.addName("zozo");
          await staff.addName("dudu");
          await staff.addName("zeze");
          await staff.Theclear();
          const nammy = await staff.getTheNames();
          assert.deepEqual(0, nammy.length)
        });
          
});