var BOXSIZE = 70;
const OFFSET = 5;

export class Rectangle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    contains(x, y) {
      return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height);
    }
}

export function computeRectangle(square) {
    return new Rectangle(BOXSIZE*square.column + OFFSET, BOXSIZE*square.row + OFFSET, 
                         BOXSIZE*1 - 2*OFFSET, BOXSIZE*1 - 2*OFFSET);
}

function drawPuzzle(ctx, puzzle) {

    ctx.shadowColor = "black"
    let selected = puzzle.selected

    puzzle.squares.forEach(square => {
        let rect = computeRectangle(square)

        if (square === selected) {
            ctx.fillStyle = "lightblue"
        } else {            
            ctx.fillStyle = square.color
        }
         
        ctx.shadowBlur = 10
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)

        if (square.color !== "white" && square.count > 0) {
            ctx.fillStyle = "black"
            ctx.font = "20px Calibri"
            ctx.fillText(square.count, rect.x + 25, rect.y + 35)
        }
    })
}

export function redrawCanvas(model, canvasObj, appObj) {

    const ctx = canvasObj.getContext("2d")
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)

    if (model.puzzle) {
        drawPuzzle(ctx, model.puzzle)
    }
}
