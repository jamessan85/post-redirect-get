# Post-Redirect-Get

### Description
Web app that does a post-redirect-get that takes in a text field and validates the length is correct. 

### Installtion

Clone the repository and run `npm i` inside the folder.

### Running the application

`npm start`

Application will start on port 3000

### Test

Tests can be run with `npm test` this run the full set of tests together eslint, mocha and cypress. If cypress doesn't start try running `npx cypress valid` and `npx cypress open` 

### To Do
* Further improve integrations tests, use jest snapshots for checking HTML is valid.
* Improve validation logic
* Fix cookie issue in intergration test, test should be able to run individually with saving cookie on get request