#PayX

###How to run the projects
####To run the client:
- cd to the client folder `cd payX-client`, then run `npm install`.
- Go to [http://localhost:8080](http://localhost:8080).
- Done.

####To run the server:
- cd to the server folder `cd payX-server`, then run `npm install`.
- Done. The server is available at [http://localhost:3000](http://localhost:3000).

####Notes:
- Client works best in newest version of Chrome, in `Mobile` mode, with `iPhone 5` size.
- The mock data of transaction is generated by running `payX-server/generate-transactions-script.js` with **babel-node** *(babel-node is required)*.
- To generate mock data: `babel-node generate-transactions-script.js`, the mock transactions are in `payX-server/app/data/transactions.json`.

###Future enhancements:

####Client side:
- Make sure it runs well in all the window sizes.

####Server side:
- Validate the `send-money` api at the server side.
- Need to store data in real DB, we're using dummy data for now.
- Need to cache history transactions by using `redis` or `memcached`.
