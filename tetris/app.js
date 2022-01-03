//after being loaded document.
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

    console.log(playground);

})