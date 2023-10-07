# TestTaskHighLoad

TASK:
Create a simple webApp using Node.js (Express), PostgresQL (Sequelize ORM). It is highly advisable to use JavaScript.
When launched, the application must create a “users” table in the database using migration and add one user account to it, which will have only one “balance” field with the value 10000.
Write a route to update the user's balance, taking the userId and amount parameters.
An important condition is that the user’s balance cannot be negative.

This task will be tested by sending 10,000 requests at one time to try to withdraw 2 units from the user’s balance. 5000 requests should be processed successfully, the second half of them should receive an adequate error stating that there are not enough funds on the balance.

Implemented:
Endpoint: http://localhost:7000/api/charge?userId=1&amount=2
query.userId  and query.amount is necessary
1 time launched migration implemented with  https://www.npmjs.com/package/umzug

How to use:
1. Create PostgresQL database with name "TestTaskHighLoad" with owner "postgres" and password "b00b00"
2. node  src/server.js
3. 1 time launch will create table 'users' with only 1 user with userId=1 and ballance 10000. 
If you still have table 'users' nothing change in db/
4. Use endpoint http://localhost:7000/api/charge?userId=1&amount=2 for try to withdraw 2 units from the user’s balance