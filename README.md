# SquadUp

## High level Description:
A social platform where people can play sports together.

### Steps to get the server (backend) running:
1. Download and Install node: https://nodejs.org/en/download/
2. Clone the repo
3. in the backend folder, Type in the command line: 'npm install'
4. create a config folder in the root dir
5. add auth.js file from slack to config folder (this file stores our keys)
6. To run the app type 'npm start' or 'node app.js'
7. If testing backend, download nodemon: 'npm install -g nodemon'
8. Type 'npm test' to run app in testing mode

### Steps to get the client (Frontend) running:
1. Install gatsby, https://www.gatsbyjs.org/docs/
2. in the frontend folder, Type in the command line: 'npm install'
3. To run the server you must run the command: 'gatsby develop'
4. Then go to http://localhost:8000 on a web browser.

### Style guide for coding
1. Classes/Methods - camel case - i.e. isMethod(){}, myClass(){}, etc.
File naming - all lower case - i.e. my_file_name.js, index.html
3. Variable names - all lower case - i.e. var numeric_example = 10; , var my_favorite_number = 7; , var domain = "www.google.com";
4. Brackets - Please use this style for brackets - 

myClass(){ ... 
}
