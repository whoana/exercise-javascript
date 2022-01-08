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

const COLORS = {
    [iTetromino]: "grey",
    [jTetromino]: "grey",
    [lTetromino]: "grey",
    [oTetromino]: "grey",
    [sTetromino]: "grey",
    [tTetromino]: "yellow",
    [zTetromino]: "grey"
}
const POSITIONS ={
    [iTetromino]: [
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
    ],
    [jTetromino]: [
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
    ],
    [lTetromino]: [
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
    ],
    [oTetromino]: [
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
    ],
    [sTetromino]: [
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [1,3]],
        [[0,1], [1,1], [2,1], [3,1]],
    ],
    [tTetromino]: [
        [[0,1], [1,1], [1,0], [2,1]],
        [[1,0], [1,1], [1,2], [2,1]],
        [[0,1], [1,1], [1,2], [2,1]],
        [[0,1], [1,0], [1,1], [1,2]],
    ],
    [zTetromino]: [
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
        [[0,1], [1,1], [2,1], [3,1]],
    ]
}
 
const playgroundWith = 10 
const playgroundHeight = 20  
let playground
let oldTetromino
let tetromino
let current
let score = 0

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
    
    current = new Point(0, 0)
    tetromino = new Tetromino(tTetromino, 0)
    draw()
 
    
    ///move 
    function move(event){ 
        switch(event.key) {
            case 'ArrowUp' : 
                rotate()
                break
            case 'ArrowDown' : 
                moveToDown()
                break
            case 'ArrowRight' : 
                moveToRight()      
                break
            case 'ArrowLeft' :  
                moveToLeft() 
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
        tetromino = new Tetromino(tTetromino, 0, new Point(0,0), playground)
        current = new Point(0, 0);
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
            console.log(playground.maps)
            newTetromino()   
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
    document.addEventListener('keydown', move)


    let timeerId = setInterval(()=>{
        moveToDown()
    }, 1000)

})