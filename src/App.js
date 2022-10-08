import React from 'react';
import './App.css';
import { layout } from './Layout.js'
import { configuration_1, configuration_2, configuration_3 } from './model/Configurations.js'
import { redrawCanvas } from './boundary/Boundary.js';
import { selectConfig, selectSquare, extendColor, resetPuzzle} from './controller/Controllers.js';
import Model from './model/Model.js'

var puzzle1 = JSON.parse(JSON.stringify(configuration_1))
var puzzle2 = JSON.parse(JSON.stringify(configuration_2))
var puzzle3 = JSON.parse(JSON.stringify(configuration_3))

var config_selected = puzzle1

function App() {

  const [model, setModel] = React.useState(new Model(config_selected))

  const appRef = React.useRef(null)
  const canvasRef = React.useRef(null)

    React.useEffect (() => {
      redrawCanvas(model, canvasRef.current, appRef.current)
    }, [model]) 

    const handleClick = (e) => {
      let newModel = selectSquare(model, canvasRef.current, e)
      setModel(newModel)
    }
  
    const extenColorHandler = (color) => {
      let newModel = extendColor(model, color)
      setModel(newModel)
    }

    const selectConfigHandler = (level) => {
      if (level === 1){
        config_selected = puzzle1
      }
      else if (level === 2){
        config_selected = puzzle2
      }
      else if (level === 3){
        config_selected = puzzle3
      }

      let newModel = selectConfig(config_selected)
      setModel(newModel)
    }

    const resetPuzzleHandler = () => {
      let newModel =  resetPuzzle(config_selected)
      setModel(newModel)
    }

  return (
    <main style={layout.Appmain} ref={appRef}>
    <canvas tabIndex="1"  
      data-testid="canvas"
      className="App-canvas"
      ref={canvasRef}
      width={layout.canvas.width}
      height={layout.canvas.height}
      onClick={handleClick}
      style={layout.canvas}
      />

      <div style={layout.buttons}>
         <label data-testid="text1" style={layout.text1}>{"Select Puzzle"}</label>
         <button data-testid="level1button" style={layout.level1button} onClick={(e) => selectConfigHandler(1)}>EASY</button>
         <button data-testid="level2button" style={layout.level2button} onClick={(e) => selectConfigHandler(2)}>MEDIUM</button>
         <button data-testid="level3button" style={layout.level3button} onClick={(e) => selectConfigHandler(3)}>HARD</button>

         <button data-testid="col1button" style={layout.col1button} onClick={(e) => extenColorHandler("red")} disabled={!model.isValid("red")}></button>
         <button data-testid="col2button" style={layout.col2button} onClick={(e) => extenColorHandler("orange")} disabled={!model.isValid("orange")}></button>
         <button data-testid="col3button" style={layout.col3button} onClick={(e) => extenColorHandler("yellow")} disabled={!model.isValid("yellow")}></button>
         <button data-testid="col4button" style={layout.col4button} onClick={(e) => extenColorHandler("blue")} disabled={!model.isValid("blue")}></button>
         
         <button data-testid="resetbutton" style={layout.resetbutton} onClick={(e) => resetPuzzleHandler()}>Reset</button>

         <label data-testid="text2" style={layout.text2}>{"Fill Color"}</label>
         
         { model.victory ? (<label data-testid="victory" style={layout.victory}>Congratulations!</label>) : null }
      </div>
  </main>
  );
}

export default App;
