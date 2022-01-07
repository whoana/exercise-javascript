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
    [tTetromino]: "grey",
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
    }
    build(){
        this.playground = document.getElementById('playground')
        for(let y = 0 ; y < this.height ; y++ ){
            for(let x = 0 ; x < this.width ; x ++) {
                let point = document.createElement('div')
                point.id = `p-${x}-${y}`
                this.maps[y][x] = point
                this.playground.appendChild(point)
            }
        }
        this.playground.classList.add('playground')
    }

    isOutOfBoundary(x, y){
        return x < 0 || x > this.width - 1 || y > this.height - 1
    }

    isBottom(x, y){
        return y >= this.height - 1
    }
}



//retation : cw, ccw 
//position : a
class Tetromino {
    constructor(type, direction, current, playground){
        this.type = type 
        this.direction = direction
        this.position = POSITIONS[this.type][this.direction];
        this.current = current
        this.playground = playground
    }
    
    show(){
        this.draw()
    }

    move(point){ 
        if(this.endOfMap(this.position, point)) return
        this.erase()        
        this.current.x += point.x
        this.current.y += point.y
        this.draw()
    }

    endOfMap(position, point){
        return position.some(element => this.playground.isOutOfBoundary(element[0] + this.current.x + point.x, element[1] + this.current.y + point.y))
    }

    // isBottom(){
    //     return position.some(element => this.playground.isBottom(element[0] + this.current.x, element[1] + this.current.y))
    // }
    
    draw(){ 
        this.position.forEach(element => {   
            let col = element[0] + this.current.x
            let row = element[1] + this.current.y
            this.playground.maps[row][col].classList.add('tetromino')
            this.playground.maps[row][col].style.backgroundColor = COLORS[this.type]
        });
    }

    erase(){
        this.position.forEach(element => {            
            let col = element[0] + this.current.x
            let row = element[1] + this.current.y
            this.playground.maps[row][col].classList.remove('tetromino')
            this.playground.maps[row][col].style.backgroundColor = ''
        });
    }
 

    rotate(){
        //debugger
        let direction = this.direction == 3 ? 0 : this.direction + 1
        let position = POSITIONS[this.type][direction]
        if(this.endOfMap(position, new Point(0,0))) return
        this.erase()        
        this.direction = direction
        this.position = position
        this.draw()
    }

    playMore(){
        let isBottom = this.position.some(element => this.playground.isBottom(element[0] + this.current.x, element[1] + this.current.y))
        if(!isBottom){
            let atFreezed = this.position.some(element => {
                    let col = element[0] + this.current.x
                    let row = element[1] + this.current.y  + 1
                    this.playground.maps[row][col].classList.contains('freezed')
                }
            )
            if(atFreezed) {
                return false
            }else{
                return true
            }
        }else{
            return false
        }
    }

    freeze(){
        this.position.forEach(element => {            
            let col = element[0] + this.current.x
            let row = element[1] + this.current.y
            this.playground.maps[row][col].classList.remove('tetromino')
            this.playground.maps[row][col].classList.add('freezed')
            this.playground.maps[row][col].style.backgroundColor = COLORS[this.type]
        });
    }
}
 



const playgroundWith = 10 
const playgroundHeight = 20  
 


document.addEventListener('DOMContentLoaded',() => {
     
    const playground = new Playground(playgroundWith, playgroundHeight);
    playground.build();

    let tetromino = new Tetromino(tTetromino, 0, new Point(0,0), playground)
    tetromino.show()


    let timerId = setInterval(()=>{
        moveDown()
        if(!tetromino.playMore()){
            tetromino.freeze()
            anotherTetromino()
        }
        
    },1000);

    /*
    let timerId = setInterval(()=>{
         
        if(tetromino.endOfMap(tetromino.position, new Point(0,1))) {
            freeze()
            anotherTetromino()
        }else{
            moveDown() 
        }

    },1000);
    */

    let oldTetromino
    function anotherTetromino(){
        oldTetromino = Object.assign({}, tetromino)
        tetromino = new Tetromino(tTetromino, 0, new Point(0,0), playground)
        tetromino.show()
    }

    function freeze(){
        tetromino.freeze()
        console.log("I died.")
    }

    ///move 
    function move(event){ 
        switch(event.key) {
            case 'ArrowUp' : 
                rotate()
                break
            case 'ArrowDown' : 
                moveDown()
                break
            case 'ArrowRight' : 
                moveRight()      
                break
            case 'ArrowLeft' :  
                moveLeft() 
                break
            default:
                break;
        }
    }

    function rotate(){
        tetromino.rotate()
    }

    function moveDown(){     
        tetromino.move(new Point(0,1))
    }

    function moveLeft(){     
        tetromino.move(new Point(-1,0))
    } 

    function moveRight(){  
        tetromino.move(new Point(1,0))
    }
    document.addEventListener('keydown', move)

 
})