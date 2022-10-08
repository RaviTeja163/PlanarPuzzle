import { computeRectangle } from "../boundary/Boundary";
import Model from "../model/Model";

export function selectConfig(config) {
    return new Model(config)
}

export function selectSquare(model, canvas, event) {
    const canvasRect = canvas.getBoundingClientRect()
    
    let idx = model.puzzle.squares.findIndex(square => {
        let rect = computeRectangle(square);
        return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
    });

    let selected = null;
    if (idx >= 0) {
      selected = model.puzzle.squares[idx];
    } 

    if (idx >= 0 && selected.color === "white"){
        model.puzzle.select(selected);
        return model.copy();
    } else {
        return model
    }    
}

export function extendColor(model, color) {
    let selected = model.puzzle.selected
    if (!selected) { return model }

    let neighborSquares = model.puzzle.getNeighbors(selected);

    for(let sq of neighborSquares) {
        if(sq[0] === color && sq[1] === model.puzzle.checkCount(color)-2) {
            model.puzzle.selected.color = color
            model.puzzle.selected.count = model.puzzle.checkCount(color) - 2
            model.puzzle.selected = null
        }
    }
    model.puzzle.solved = model.puzzle.checkPuzzle()
    model.hasWon()
    return model.copy()
}

export function resetPuzzle(config) {
    return new Model(config)
}
