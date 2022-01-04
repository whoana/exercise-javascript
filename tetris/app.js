//after being loaded document.
//https://ko.wikipedia.org/wiki/테트리스
document.addEventListener('DOMContentLoaded',() => {
     
    let squares = Array.from(document.querySelectorAll('.playground div'))  
    const rowNum = 20; 
    const colNum = 10;  
    let playground = Array.from(Array(rowNum),() => Array(colNum).fill(null));
    for(let i = 0 ; i < rowNum; i ++){
         
        let start = i * colNum;
        let end = start + colNum;
        playground[i] = squares.slice(start, end);

    }

    const iTetromino = [
        [
            [0,0],
            [1,0],
            [2,0],
            [3,0]
        ]
    ]
    const tetrominos = [iTetromino]

    let deltaX = 4;
    let deltaY = 0;
    tetrominos[0][0].forEach(element => {
        let row = element[0] + deltaY
        let col = element[1] + deltaX
        playground[row][col].classList.add('tetromino')
        //playground[element[0]][element[1]].classList.remove('tetromino')
    })

    let timeId = setInterval(()=>{

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

})