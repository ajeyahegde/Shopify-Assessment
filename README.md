# Shopify-Assessment
Shopify Backend Developer Intern  Challenge - Summer 2022

Demo of the Application:
https://user-images.githubusercontent.com/89498859/149862609-5ac8b225-695d-4cb4-8964-c3368232c947.mp4

**Summary:**

In this application, I have used AWS DynamoDB for Data Storage, integrated with AWS Lambda and AWS API gateway for the REST APIs. Lamdba function handles all the REST API calls to the backend.
Backend : DynamoDB, AWS Lambda, API Gateway

For front-end and middleware, I have used NodeJS and Express to handle HTTP requests and frontend in HTML and CSS.
Frontend & Middleware: NodeJS, Express,HTML, CSS

I have deployed the application in Google Cloud Platform (GCP) App Engine.
**Link to the Application:** [Application Link](https://shopify-inventory-338601.ue.r.appspot.com/)

REST APIs-

**Get Inventory Item** - https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory/{id}
HTTP Method - GET
Example: https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory/PC121

**Get All Inventory Items** - https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory
HTTP Method - GET

**Create/Update Inventory Item** - https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory
HTTP Method - PUT
Sample HTTP Body: {
    "id": "200",
    "name": "Trousers",
    "price": 75,
    "desc": "Menswear",
    "quantity": 75
}

**Delete Inventory Item** - https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory/{id}
HTTP Method - DELETE
Example: https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory/100

Instructions to use the Applications:
1) Instructions on how to use the app is shown in Demo.
2) To install the local version of the app using GitHub:
3) Download and install NodeJS 14 and npm in the computer. You can follow steps in the following link for help in installation: (https://phoenixnap.com/kb/install-node-js-npm-on-windows) 
4) Download Visual Studio Code. For help in installation of VS Code Editor: (https://medium.com/nerd-for-tech/install-visual-studio-code-fe3908c5cf15).
5) Create a Project Folder and copy and all the files from GitHub into the Project Folder.
6) Type command: "npm install" to install dependiencies for the project.
7) OR you can install each package individually by typing "npm install express", "npm install request","npm install body-parser","npm install excel4node" commands.
8) Once installed you can run the application server by typing command "node inventory.js" in the command line from same directory as the inventory.js file.
9) Server is started.
10) Go to the Web Browser and enter "http://localhost:3000/" to open the application locally.
11) You can follow the Demo to use the application to Create, View, Update and Delete Inventory Items. You can also export the data to CSV by clicking on Export to Excel button.

Features Implemented:
Basic CRUD Functionality
1) Create inventory items
2) Edit Item
3) Delete Item
4) View a list of Inventory Items

One Functionality from the list: Push a button export product data to a CSV






