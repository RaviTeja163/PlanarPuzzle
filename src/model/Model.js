export class Coordinate {
    constructor(row, column) {
        this.row = row
        this.column = column
    }
}

export class Square {
    constructor(row, column, color, count) {
        this.row = row
        this.column = column
        this.color = color || "white"
        this.count = count || 0
    }

    place(row, col) {
        this.row = row;
        this.column = col;
    }

    location() {
        return new Coordinate(this.row, this.column)
    }

    copy() {
        let s = new Square(this.row, this.column, this.color, this.count);
        s.place(this.row, this.column);
        return s;
    }    
}

export class PlanarPuzzle {
    constructor(name, numRows, numColumns, unusedSquares, baseSquares) {
        this.name = name
        this.numRows = numRows
        this.numColumns = numColumns
        this.selected = null
        this.unusedSquares = unusedSquares
        this.baseSquares = baseSquares
        this.solved = false
    }

    initialize(squares) {
        this.squares = squares.map(s => s.copy())
    }

    select(square) {
        if (square === null) { return }
        if (square.color === "black") { return } 
        if (this.selected === square) { this.selected = null; return}   

        this.selected = square;        
    }

    checkPuzzle() {
        if (this.checkCount("white") > 0) { return false}

        var baseColors = []
        this.squares.forEach(square => {
            if (square.color !== "white" && square.color !== "black" ){
                if (baseColors.includes(square.color) === false) { 
                    baseColors.push(square.color)
                }
            }
        })
        // console.log(baseColors)

        var count = 0
        baseColors.forEach(color => {
            let maxNum = this.checkCount(color)-2

            // let colorSolved = false
            this.squares.forEach(square => {
                if (square.color === color && square.count === 0) {

                    var neighbors = this.getNeighbors(square)

                    if (JSON.stringify(neighbors).includes(JSON.stringify([square.color, 1])) || JSON.stringify(neighbors).includes(JSON.stringify([square.color, maxNum]) ))  {
                        count += 1
                    }         
                }
            })
        })

        // console.log("count", count)
        if (count === 2*baseColors.length) { return true }

        return false
    }

    getNeighbors(sq) {
        let coordinate = sq.location()
        let neighbors = []
        var color = ["white", 0]

        // Check color on left
        if (coordinate.column > 0) {
            let coord = new Coordinate(coordinate.row, coordinate.column - 1)
            this.squares.findIndex(square => {
                if (coord.row === square.row && coord.column === square.column) {
                    color = [square.color, square.count]
                    // console.log("colorleft", color)
                }
            })  
        }
        if (color[0] !== "white" && color[0] !== "black") { 
            neighbors.push(color)}

        // Check color on right
        color = ["white", 0]
        if (coordinate.column < this.numColumns) {
            let coord = new Coordinate(coordinate.row, coordinate.column + 1)
            this.squares.findIndex(square => {
                if (coord.row === square.row && coord.column === square.column) {
                    color = [square.color, square.count]
                    // console.log("colorright", color)
                }
            })  
        }
        if (color[0] !== "white" && color[0] !== "black") { 
            neighbors.push(color)}
                
        // Check color on top
        color = ["white", 0]
        if (coordinate.row > 0 ) {
            let coord = new Coordinate(coordinate.row - 1, coordinate.column)
            this.squares.findIndex(square => {
                if (coord.row === square.row && coord.column === square.column) {
                    color = [square.color, square.count]
                    // console.log("colortop", color)
                }
            })  
        }
        if (color[0] !== "white" && color[0] !== "black") { 
            neighbors.push(color)}

        // Check color on bottom
        color = ["white", 0]
        if (coordinate.row < this.numRows) {
            let coord = new Coordinate(coordinate.row + 1, coordinate.column)
            this.squares.findIndex(square => {
                if (coord.row === square.row && coord.column === square.column) {
                    color = [square.color, square.count]
                    // console.log("colordown", color)
                }
            })  
        }
        if (color[0] !== "white" && color[0] !== "black") { 
            neighbors.push(color)}

        // console.log("listc",colors)
        // console.log("listn",neighbors)
        return neighbors
    }

    checkCount(color) {
        let count = 0
        this.squares.forEach(square => {
            if (square.color === color) {
                count += 1
            }
        })
        return count
    }

    clone() {
        let copy = new PlanarPuzzle(this.name, this.numRows, this.numColumns, this.unusedSquares, this.baseSquares);
        copy.squares = [];
        for (let s of this.squares) {
            let duplicate = s.copy();
            copy.squares.push(duplicate);
            if (s === this.selected) {
                copy.selected = duplicate;
            }
        }       
        return copy;
    }
}

export default class Model {
    constructor(info) {
        this.initialize(info)
        this.info = info
    }

    initialize(info) {
        let numRows = parseInt(info.numRows)
        let numColumns = parseInt(info.numColumns)
        this.victory = false

        var allSquares = []

        for(let i=0; i<numRows; i++) {
            for(let j=0; j<numColumns; j++) {
                
                const baseSq = info.baseSquares.find(sq => sq.row === i.toString() && sq.column === j.toString())
                const unusedSq = info.unusedSquares.find(sq => sq.row === i.toString() && sq.column === j.toString())

                let sq = new Square(i,j);
                if (baseSq){
                    sq = new Square(i, j, baseSq.color)
                }else if(unusedSq) {
                    sq = new Square(i, j, unusedSq.color)
                }
                allSquares.push(sq)
            }
        }
        
        this.puzzle = new PlanarPuzzle(info.name, numRows, numColumns, info.unusedSquares, info.baseSquares)
        this.puzzle.initialize(allSquares)
    }

    isValid(color) {
        if (!this.puzzle.selected) { return false } 

        let neighborColors = []
        let neighbors = this.puzzle.getNeighbors(this.puzzle.selected)

        neighbors.forEach(n => {
            if (!neighborColors.includes(n[0])) {
                neighborColors.push(n[0]) 
            }
        })
        return neighborColors.includes(color)
    }

    hasWon() {
        if (this.puzzle.solved === true) {
            this.victory = true
        }
        else {
            this.victory = false
        }
    }

    copy() {
        let m = new Model(this.info);              
        m.puzzle = this.puzzle.clone();
        m.victory = this.victory;
        return m;
    }
}
