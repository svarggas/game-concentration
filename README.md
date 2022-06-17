# Memory game

A demo of this app can be found here: [https://concentration-memory-game.netlify.app]

## Available Scripts

In the project directory, you can run: 

### `npm install`, to install all the packages

### `npm start`, to start the app

Runs the app in the development mode. \
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Run `npm test`, to run the tests in the app

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. \
It correctly bundles React in production mode and optimizes the build for the best performance.

## Complete process

Please run the next commands in order to run the application:
- npm install
- npm start

## Some packages used

create-react-app, Bootstrap, Jest, React Testing Library, PropTypes, Eslint, Prettier.

## Thought process that went into the application

### Project structure

Knowing that is a game and it can barely scale because of the specifications of it. I used a simple folder structure based on functionality per file. So, a folder for components, styles and tests. \
For a bigger application would be better to manage each per feature/component, so folder should contain the component perse, the css and the test.

### Design desiciones

The idea is having a main component(App) who manages all the logic as the father and children as stateless components with none or little logic. \
Some patterns used: Stateless components, conditional rendering, controlled components and the use of react hooks.

### Coding conventions

Naming conventions using "-" instead of spaces for css classes and camelCase. \
The use of a linter in the project(eslint). \
Encapsulation. \
Mantaining naming standards in the applications. \
Testing the code written.

## Biggest challenge

Css, in the sense of the animations when selecting the card. Took most of my time, the game logic was pretty straight forward.

## Things that can be improved if I have had more time

App is created for desktop, so true responsiveness is a problem. \
Better UI overall, like image sizing management, flashy animations and accessability. \
Deeper testing for the components
