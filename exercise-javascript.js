//심볼형 
//심볼형은 유일성을 보장한다. 이름이 같더라도 서로 다름 
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 == id2);//false