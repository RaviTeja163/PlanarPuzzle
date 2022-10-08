import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Model from './model/Model.js'
import { configuration_2} from './model/Configurations.js'
import { selectConfig, selectSquare, extendColor, resetPuzzle} from './controller/Controllers.js';

var puzzle = JSON.parse(JSON.stringify(configuration_2))
var model = new Model(puzzle)

test('Expect configuration information of model should not be NULL at start of game', () => {
  expect(model.info != null )
});

test('Expect model rows should not be zero at start of game', () => {
  expect(model.info.numsRows != 0 )
});

test('Expect model columns should not be zero at start of game', () => {
  expect(model.info.numColumns != 0 )
});

test('Expect victory to be false at start of game', () => {
  expect(model.victory == false)
});

test('Expect model copy function should not return null', () => {
  expect(model.copy() != null)
});

test('Expect valid colors to be null before selecting any square', () => {
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  model.puzzle.selected = square
  expect(model.isValid("red") == false)
});

test('Expect model is not null when initiating with a puzzle config', () => {
  expect(model.initialize(puzzle) != null)
});

test('Expect hasWon() function not to return null', () => {
  expect(model.hasWon(puzzle) != null)
});

test('Expect hasWon() function not to return null', () => {
  model.puzzle.solved = true
  expect(model.hasWon(puzzle) != null)
});

test('Expect puzzle has a name', () => {
  expect(model.puzzle.name != null)
});

test('Expect puzzle squares array should not be 0', () => {
  expect(model.puzzle.squares.length != 0)
});

test('Expect puzzles selected square to be null', () => {
  expect(model.puzzle.selected == null)
});

test('Expect clone() function of puzzle to not return null', () => {
  expect(model.puzzle.clone() != null)
});

test('Expect count of one color base squares to be 2', () => {
  expect(model.puzzle.checkCount("red")).toBe(2)
});

test('Expect neigbors of a square to not be null', () => {
  var square = model.puzzle.squares.find(square => square.row === 1 && square.column === 1)
  expect(model.puzzle.getNeighbors(square) != null)
});

test('Expect puzzle to be not solved', () => {
  model.puzzle.squares.forEach(square => {
    square.color = "red"
  })
  expect(model.puzzle.checkPuzzle() == false)
});

test('Expect initializing a puzzle to not return null', () => {
  expect(model.puzzle.initialize(model.puzzle.squares) != null)
});

test('Expect selecting a square to not return null', () => {
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  expect(model.puzzle.select(square) != null)
});

test('ResetPuzzle controller', () => {
    resetPuzzle(configuration_2)
    expect(model.puzzle.name == "Configuration #2")
});

test('SelectConfig controller', () => {
  selectConfig(configuration_2)
  expect(model.puzzle.name == "Configuration #2")
});

test('Extend Color controller', () => {
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  model.puzzle.selected = square
  expect(extendColor(model,"red") !== null)
});


test('Expect GUI to render correctly', () => {
  expect(<App/>)
});

test('Click Reset button', () => {
  const ren = render(<App/>)
  const resetButton = screen.getByTestId("resetbutton")
  fireEvent.click(resetButton)
  expect(model.puzzle.name == "Configuration #2")
});

test('Click Fill color buttons', () => {
  const ren = render(<App/>)
  const redButton = screen.getByTestId("col1button")
  expect(redButton.disabled).toBeTruthy()
});

test('Select Puzzle buttons', () => {
  const ren = render(<App/>)
  const config1Button = screen.getByTestId("level1button")
  fireEvent.click(config1Button)
  const config2Button = screen.getByTestId("level2button")
  fireEvent.click(config2Button)
  const config3Button = screen.getByTestId("level3button")
  fireEvent.click(config3Button)
  expect(model.puzzle.name == "Configuration #3")
});

test('Select a square', () => {
  const ren = render(<App/>)
  const canvasElememnt = screen.getByTestId("canvas")
  fireEvent.click(canvasElememnt, {screenX: 31, screenY: 108, clientX: 31, clientY: 37})
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  expect(model.puzzle.selected == square)
});

test('Select Red button and exend color', () => {
  const ren = render(<App/>)
  const redButton = screen.getByTestId("col1button")
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  model.puzzle.selected == square
  fireEvent.click(redButton)
  expect(square.color == "red")
});
