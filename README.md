The game can be played at https://RaviTeja163.github.io/PlanarPuzzle

## PLAYING RULES:
- The game initially loads with the easy puzzle. We can choose others puzzles by clicking the configuration buttons.
- We are allowed to select any empty square. We cannot select base squares (already colored) or the unused squares (black).
- Fill a color to the selected square. We only have the color options of that of the neighbor squares. Other color buttons will be disabled. 
- You cannot fill a color to a square without having a neighbor square of the same color with the highest label in that color.
- Continue to fill the squares, and when the puzzle is solved, we automatically get a Congratulations message on the screen.
- We can reset to the starting configuration at any time by clicking the Reset button.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The first time you retrieve this code, you will need to install the react scripts to work properly. To do this, type:

### `npm install react-scripts --save`

This is a one-time action for this project, which downloads and retrieves the necessary artifacts.

To execute the code, go to the project directory and run:

### `npm start`

This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

To execute the test cases, run:

### `npm test`

This launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Code Coverage

To generate the code coverage, launch `npm test -- --coverage` which produces a file that contains a breakdown of all code files.

--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   90.54 |    83.89 |   90.74 |    93.3 |                   
 src                |   83.78 |       75 |   64.28 |   83.78 |                   
  App.js            |   83.33 |       75 |   64.28 |   83.33 | 32-33,74-77       
  Layout.js         |     100 |      100 |     100 |     100 |                   
 src/boundary       |      88 |    83.33 |     100 |      88 |                   
  Boundary.js       |      88 |    83.33 |     100 |      88 | 40-42
 src/controller     |      80 |    66.66 |     100 |   83.33 | 
  Controllers.js    |      80 |    66.66 |     100 |   83.33 | 25,37-39
 src/model          |   94.81 |     87.2 |     100 |   99.18 | 
  Configurations.js |     100 |      100 |     100 |     100 | 
  Model.js          |   94.69 |     87.2 |     100 |   99.16 | 79
--------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       27 passed, 27 total
Snapshots:   0 total
Time:        3.457 s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.

If you don't see the above input, then set the environment variable "CI" to be true, something like `set CI=true`, then rerun the instruction.
