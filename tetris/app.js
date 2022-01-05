//after being loaded document.
//https://ko.wikipedia.org/wiki/테트리스

class Point {
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

class Playground {
    constructor(width, height){
        this.width = width
        this.height = height
        this.playground = null;
    }
    build(){
        this.playground = document.getElementById('playground')
        for(let x = 0 ; x < this.width ; x ++) {
            for(let y = 0 ; y < this.height ; y++ ){
                let point = new Point(x, y)
                let block = document.createElement('div')
                block.id = `bl${x}-${y}`
                this.playground.appendChild(block)
            }
        }
        this.playground.classList.add('playground')
    }
}

const playgroundWith = 10 
const playgroundHeight = 20  
 


document.addEventListener('DOMContentLoaded',() => {
     
    const playground = new Playground(playgroundWith, playgroundHeight);
    playground.build();

    /*


    //building a playground having 20 rows and 10 cols
    let squares = Array.from(document.querySelectorAll('.playground div'))  

    let playground = Array.from(Array(rowNum),() => Array(colNum).fill(null))
    for(let i = 0 ; i < rowNum ; i ++){
         
        let start = i * colNum
        let end = start + colNum
        playground[i] = squares.slice(start, end)

    }

    const iTetromino = [
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
    ]
    const tetrominos = [iTetromino]

    let deltaX = 4
    let deltaY = 0
    tetrominos[0][0].forEach(element => {
        let row = element[0] + deltaY
        let col = element[1] + deltaX
        playground[row][col].classList.add('tetromino')
        //playground[element[0]][element[1]].classList.remove('tetromino')
    })

    let timeId = setInterval(()=>{

        let isBottom = tetrominos[0][0].some(element => {
            let row = element[0] + deltaY 
            return (row == 19)  
        })

        if(isBottom){
            clearInterval(timeId)
            console.log("here is bottom line.")
            return
        }

        tetrominos[0][0].forEach(element => {
            let row = element[0] + deltaY
            let col = element[1] + deltaX
            playground[row][col].classList.remove('tetromino')
        })
        
        deltaY = deltaY + 1
       
        tetrominos[0][0].forEach(element => {
            let row = element[0] + deltaY
            let col = element[1] + deltaX
            playground[row][col].classList.add('tetromino')
        })

    }, 1000)


    */
})