# Using the app:
1. clone the repo `git clone https://github.com/Ibrahim9595/guest-book.git`
2. `cd guest-book`
3. `cd backend`
4. `npm install`
5. recomended `npm run migrate`
6. `npm start`
7. follow the link in the terminal
## Notes:
- you can change the database config and port config from ./config/index.js
- The frontend folder contains the source code to the SPA the built version is in ./backend/public

# Folder Structure
## The app is splitted into 2 main dirictories
1. backend where all server files are located
2. front end where all the react-app source files are located
I have choosed this approach to be able to make the whole code in one github repo.
# Backend Architucture
-- The backend app is architectured using MVC architecture pattern
**The app has the following folder structure**
--- app
&nbsp;&nbsp;&nbsp;|---config
&nbsp;&nbsp;&nbsp;|---controllers
&nbsp;&nbsp;&nbsp;|---core
&nbsp;&nbsp;&nbsp;|---middleware
&nbsp;&nbsp;&nbsp;|---models
&nbsp;&nbsp;&nbsp;|---validation
---database
&nbsp;&nbsp;&nbsp;|---migrations
---public

- Lets start with the **config** directory it contains all files that has configration constants like that in index contains the database, port and environment.
- Second folder is **core** in core the files that has useful functionality to the whole app like the **validation.js** where the validation code occurs and **database.js** where the connction with database is maintained inside the DB instance
- **validation** is where request validation rules are kept they are simple json objects to validate incoming request bodies
- **middleware** is where all app middlewares are kept such as **CORS.js** to handle cross origin requests for development, **auth.js** to handle token authurization against incoming requests **validator.js** that use the validation rule to validate the incoming requests bodies and **error.js** that handles un handled exceptions of the app and **index.js** that export all these modules
- The **public** folder contains the static files of the SPA
- The remaining directories are **Model** where all files that deals with database logic lives, **Controllers** where the method that handles incoming requests lives

-- I have choosed to write **BaseModel.js** that contains the shared logic for database operations such as find, update, delete, create and etc. so that all other models can benifite from that code, for **MessageModel.js** a special function to get the messages joined with the users , replies and replies user is created as for **ReplyModel.js** a special function to get all replies joined with thier users.

-- For Controllers I have done the same wrote a shared controller to and created success and failed methods to handle succes responses and failed responses in a uniform way through the app.

--The models abstract the complex database operations and export clean api for the controllers which focus on extracting required data from the request and delivering the right response to the client.

--I have choosed to have database migrations to create database with validation schema and required indecies a single npm command will perform the migrations.

# Frontend Architucture
**The front end app has a simple architucture**
--- src
&nbsp;&nbsp;&nbsp;|---components
&nbsp;&nbsp;&nbsp;|---logic
&nbsp;&nbsp;&nbsp;|---screens
&nbsp;&nbsp;&nbsp;|---utils
---public
- The **public** directory contains static files.
- The **src** directory contains the actual code to the app
- **components** a list of reusable components to be used in the whole app they are dump components they don't interact with api calls or shared state instead they communicate throug **props**.
- **utils** contains helpers functions that can be used in the app such that validate which is used in login and signup for validating user input
- **screens** that contains components that communicate with api and shared state and use the dump components to build functional screen the screens are
&nbsp;&nbsp;&nbsp; - **Auth** that interface the user to login or signup the logic behind login and signup is splitted into 2 more screens **loginScreen** & **signupScreen**
&nbsp;&nbsp;&nbsp; -**GuestBook** the screen where all the real action happens I choosed to make the messages state managed by this screen because no other screen needs this state if it was needed by other screens I would have implemented a **contextProvider** and **useReducer** or my favourite way is to use rxjs which give
the ability to implement a more robust push based architucture
- **logic** this dirctory contains business logic for the app such as httpHelper that helps the app to communicate with the http server and the **UserContextProvider**
 that provide a shared AuthUserState to the whole app in **I have tried to implement a push based pattern in the login & signup where the screens just passively react to the authState changes for example in login screen I don't await the login method call the ui has a span which whatches the login error to react or success to move the user to GuestBookScreen**
### Things I wish I had the time to do
- Refactor the GuestBookScreen state I feel it's not fully DRY.
### Notes:
- The whole backend app could have been written in a single file with native http module and a switch statement to handle routing, but I feel my approach is more clean.
- I did not implement a router in the react app because in this case it's just 2 screens Auth & guestbook it is unnecessary hassle.
