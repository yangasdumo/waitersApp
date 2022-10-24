const assert = require('assert');
const reggie = require('./waiters');



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


describe("The Waiters Availabilty  Database tests", async function () {
    
    beforeEach(async function(){
        await db.none('delete from ')
    }); 
        it("Should return all ", async function () {
        
      
        }); 

        it("Should return all ", async function () {
        
             
        }); 

        
        it("Should return all", async function () {
        

            
        }); 

        it("Should be no waiters in a database when the clear button is pressed ", async function () {
        
           
        }); 

        it("Should ", async function () {
        
            
        }); 
       
        it("Should ", async function () {
        
            
        }); 

        it("Should", async function () {
        
          
          
      }); 

        
});