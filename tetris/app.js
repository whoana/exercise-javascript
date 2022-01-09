//after being loaded document.
//https://ko.wikipedia.org/wiki/테트리스

const BLOCK_TYPE = {
    I : 0, 
    J : 1,
    L : 2,
    O : 3,
    S : 4,
    T : 5,
    Z : 6,
}

const ROTATION = {
    CW : 0, 
    CCW: 1,
}
const iTetromino = Symbol('iTetromino')
const jTetromino = Symbol('jTetromino')
const lTetromino = Symbol('lTetromino')
const oTetromino = Symbol('oTetromino')
const sTetromino = Symbol('sTetromino')
const tTetromino = Symbol('tTetromino')
const zTetromino = Symbol('zTetromino')

const tetrominoSymbols = [
    iTetromino,
    jTetromino,
    lTetromino,
    oTetromino,
    sTetromino,
    tTetromino,
    zTetromino,
]

const COLORS = {
    [iTetromino]: "magenta",
    [jTetromino]: "blue",
    [lTetromino]: "orange",
    [oTetromino]: "yellow",
    [sTetromino]: "green",
    [tTetromino]: "violet",
    [zTetromino]: "red"
}
const POSITIONS ={
    [iTetromino]: [
        [[1,2], [2,2], [3,2], [4,2]],
        [[2,1], [2,2], [2,3], [2,4]],
        [[0,2], [1,2], [2,2], [3,2]],
        [[2,0], [2,1], [2,2], [2,3]],
    ],
    [jTetromino]: [
        [[0,0], [0,1], [1,1], [2,1]],
        [[1,0], [1,1], [1,2], [2,0]],
        [[0,1], [1,1], [2,1], [2,2]],
        [[1,0], [1,1], [1,2], [0,2]],
    ],
    [lTetromino]: [
        [[0,1], [1,1], [2,1], [2,0]],
        [[1,0], [1,1], [1,2], [2,2]],
        [[0,2], [0,1], [1,1], [2,1]],
        [[0,0], [1,0], [1,1], [1,2]],
    ],
    [oTetromino]: [
        [[1,0], [2,0], [1,1], [2,1]],
        [[1,1], [2,1], [1,2], [2,2]],
        [[0,1], [1,1], [0,2], [1,2]],
        [[0,0], [1,0], [0,1], [1,1]],
    ],
    [sTetromino]: [
        [[1,0], [2,0], [0,1], [1,1]],
        [[1,0], [1,1], [2,1], [2,2]],
        [[0,2], [1,2], [1,1], [2,1]],
        [[0,0], [0,1], [1,1], [1,2]],
    ],
    [tTetromino]: [
        [[0,1], [1,1], [1,0], [2,1]],
        [[1,0], [1,1], [1,2], [2,1]],
        [[0,1], [1,1], [1,2], [2,1]],
        [[0,1], [1,0], [1,1], [1,2]],
    ],
    [zTetromino]: [
        [[0,0], [1,0], [1,1], [2,1]],
        [[2,0], [1,1], [2,1], [1,2]],
        [[0,1], [1,1], [1,2], [2,2]],
        [[1,0], [0,1], [1,1], [0,2]],
    ]
}
 
const playgroundWith = 10 
const playgroundHeight = 20  
let playground
let oldTetromino
let tetromino
let current
let score = 0
let timerId
let gameOver = false
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
        this.maps = Array.from(Array(height),() => Array(width).fill(null))
        // this.build = this.build.bind(this)
        // this.rebuild = this.rebuild.bind(this)
    }
    build(){
        this.playground = document.getElementById('playground')
        for(let y = 0 ; y < this.height ; y++ ){
            for(let x = 0 ; x < this.width ; x ++) {
                this.maps[y][x] = document.createElement('div')
                this.playground.appendChild(this.maps[y][x])
            }
        }
        this.playground.classList.add('playground')
    }
 
    
    rebuild(addRow){
        let rows = Array.from(Array(addRow),() => Array(this.width).fill(null))
        for(let y = 0 ; y < addRow ; y++ ){
            for(let x = 0 ; x < this.width ; x ++) {
                rows[y][x] = document.createElement('div')
            }
        }
        this.maps = rows.concat(this.maps)
        
        for(let y = 0 ; y < this.height ; y++ ){
            for(let x = 0 ; x < this.width ; x ++) {
                this.playground.appendChild(this.maps[y][x])
            }
        }

    }
}

class Tetromino {
    constructor(type, direction){
        this.type = type 
        this.direction = direction
        this.position = POSITIONS[this.type][this.direction];
    }
}
 

//수정할 내용 
//컨트롤러 함수를 테트로미노 클래스에서 컨트롤러 클래스를 만들고 그리로 옮기자.

document.addEventListener('DOMContentLoaded',() => {
    playground = new Playground(playgroundWith, playgroundHeight);
    playground.build();
    


    current = new Point(3, 0)
    let type = iTetromino
    //let type = tetrominoSymbols[Math.floor(Math.random() * 7)]
    
    tetromino = new Tetromino(type, 0)
    
    
    draw()
 
    
    ///move 
    function move(event){ 
        if(gameOver){ return true}
         

        switch(event.keyCode) {
            case 32 : 
                for(let i = current.y  ; i < 19 ; i ++){
                    moveToDown()
                }
                break
            case 37 : 
                moveToLeft() 
                break
            case 38 :
                rotate()
                break
            case 40 :
                moveToDown()
                break
            case 39 :
                moveToRight()      
                break
            default:
                break;
        }
    }
 
    function erase(){
        tetromino.position.forEach(element => {            
            let col = element[0] + current.x
            let row = element[1] + current.y
            playground.maps[row][col].classList.remove('tetromino')
            playground.maps[row][col].style.backgroundColor = ''
        });
    }

    function draw(){
        tetromino.position.forEach(element => {   
            let col = element[0] + current.x
            let row = element[1] + current.y
            playground.maps[row][col].classList.add('tetromino')
            playground.maps[row][col].style.backgroundColor = COLORS[tetromino.type]
        });
    }

    function movable(point){
        return !tetromino.position.some(element => {
            let x = element[0] + current.x + point.x
            let y = element[1] + current.y + point.y 
            return x < 0 || x > playground.width - 1 || y > playground.height - 1 || playground.maps[y][x].classList.contains('freezed')
        }) 
    }

    function isMovableDown(){
        return movable(new Point(0, 1))
    }

    function isMovableLeft(){
        return movable(new Point(-1, 0)) 
    }

    function isMovableRight(){
        return movable(new Point(1, 0))
    }

    function isRotatable(position){
        return !position.some(element => {
            let x = element[0] + current.x
            let y = element[1] + current.y 
            return x < 0 || x > playground.width - 1 || y > playground.height - 1 || playground.maps[y][x].classList.contains('freezed')
        }) 
    }

    function freeze(){
        tetromino.position.forEach(element => {            
            let col = element[0] + current.x
            let row = element[1] + current.y
            playground.maps[row][col].classList.remove('tetromino')
            playground.maps[row][col].classList.add('freezed')
            playground.maps[row][col].style.backgroundColor = COLORS[tetromino.type]
        });
    }

    function newTetromino() {
        oldTetromino = Object.assign({}, tetromino)
        let type = tetrominoSymbols[Math.floor(Math.random() * 7)]
        tetromino = new Tetromino(type, 0)
        current = new Point(3, 0);
        draw()
        
    }

    function moveToDown(){

        let movable = isMovableDown()
        if(movable) {
            erase()        
            current.y += 1
            draw()
        }else{
            
            
            freeze()
            caculateScore()        
            newTetromino()   
            endOfGame()
        }
    }
 
    function moveToLeft(){
        let movable = isMovableLeft()
        if(movable) {
            erase()        
            current.x -= 1
            draw()
        }
    }

    function moveToRight(){
        let movable = isMovableRight()
        if(movable) {
            erase()        
            current.x += 1
            draw()
        }
    }

    function rotate(){
        let direction = tetromino.direction == 3 ? 0 : tetromino.direction + 1
        let position = POSITIONS[tetromino.type][direction]
        let rotatable = isRotatable(position)
        if(rotatable){
            erase()        
            tetromino.direction = direction
            tetromino.position = position
            draw()
        }
    }
 
    function caculateScore(){
        //debugger
        let addRow = 0
        playground.maps.forEach((row, rowIndex) => {
            if(row.every(col => col.classList.contains('freezed'))){
                row.forEach((element) => {
                    element.remove()
                    score ++
                })
                playground.maps.splice(rowIndex,1)
                addRow ++
            }        
        }) 
        playground.rebuild(addRow)
        console.log(`score: ${score}`)
    }

    

    function endOfGame(){
        if(!movable(new Point(0,1))){
            console.log('end of game')
            clearInterval(timerId)
            gameOver = true;
            
        } 
    }
 
    document.addEventListener('keydown', move)


    timerId = setInterval(()=>{ moveToDown() }, 1000)

})