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

    isBottom(y){
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


    isBottom(){
        return this.position.some(element => { 
            let y = element[1] + this.current.y 
            return this.playground.isBottom(y)
        })
    }

    nextFreezed(){
        return this.position.some(element => {
            let x = element[0] + this.current.x
            let y = element[1] + this.current.y 
            return  this.playground.maps[y+1][x].classList.contains('freezed')
        })
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
 

//수정할 내용 
//컨트롤러 함수를 테트로미노 클래스에서 컨트롤러 클래스를 만들고 그리로 옮기자.

document.addEventListener('DOMContentLoaded',() => {
     
    const playground = new Playground(playgroundWith, playgroundHeight);
    playground.build();

    let tetromino = new Tetromino(tTetromino, 0, new Point(0,0), playground)
    tetromino.show()
 
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
                //moveDown()
                moveToDown()
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

        let isBottom = tetromino.isBottom() ? true : tetromino.nextFreezed()

        if(isBottom){
            console.log('no more play')
            tetromino.freeze()
            anotherTetromino()
        }else{
            tetromino.move(new Point(0,1))
        }
    }

    function moveLeft(){     
        tetromino.move(new Point(-1,0))
    } 

    function moveRight(){  
        tetromino.move(new Point(1,0))
    }

     
    
    let current = new Point(0, 0);

    function erase(){
        tetromino.position.forEach(element => {            
            let col = element[0] + current.x
            let row = element[1] + current.y
            playground.maps[row][col].classList.remove('tetromino')
            playground.maps[row][col].style.backgroundColor = ''
        });
    }

    function draw(point){
        tetromino.position.forEach(element => {   
            let col = element[0] + current.x
            let row = element[1] + current.y
            playground.maps[row][col].classList.add('tetromino')
            playground.maps[row][col].style.backgroundColor = COLORS[tetromino.type]
        });
    }


    function isMovableDown(){
        let isBottom = tetromino.position.some(element => { 
            let y = element[1] + current.y
            return playground.isBottom(y)
        })
         
        return isBottom ? false : !tetromino.position.some(element => {
            let x = element[0] + current.x
            let y = element[1] + current.y + 1 
            return playground.maps[y][x].classList.contains('freezed')
        }) 
    }

    function isMovableLeft(){

    }

    function isMovableRight(){

    }

    function moveToDown(){
        let movable = isMovableDown()
        if(movable) {
            erase()        
            current.y += 1
            draw()
        }else{
            //tetromino.freeze()
            //anotherTetromino()   
            //여기에 프리즈하고 
            //새로운 테트로미노 하나 생성해라.
        }
    }

    function moveToLeft(){
        let movable = isMovableLeft()
        if(ok) {
            erase()        
            current.x -= 1
            draw()
        }
    }

    function moveToRight(){
        let movable = isMovableRight()
        if(ok) {
            erase()        
            current.x += 1
            draw()
        }
    }










    document.addEventListener('keydown', move)

 
})