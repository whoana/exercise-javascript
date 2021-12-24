let myObject = {
name:"whoana",
age: 50,
[Symbol.toPrimitive]: function(){



;
;
let obj = {
name: "whoana",
age: 50,
[Symbol.toPrimitive]: function(hint){
  if(hint=='string') return this.name;
  else if(hint=='number') return this.age;
  else return this.name;
  }
};
console.log(obj);
1 + obj;
+obj
let obj1 = {
name: "whoana",
age: 50,
[Symbol.toPrimitive]: function(hint){
  console.log(`hint:${hint}`);
  if(hint=='string') return this.name;
  else if(hint=='number') return this.age;
  else return this.name;
  }
};
obj1 + 1
obj1[Symbol.toPrimitive]();
obj1[Symbol.toPrimitive]('string');
obj1[Symbol.toPrimitive]('number');
//좀 구식이긴 하지만 예전 방식으로 오브젝트를 원시 유형으로 변경해 보자.
//여기서는 toString, valueOf 를 이용한다.
let obj2 = {
name:"whoana",
age:40,
toString(){
  return this.name;
  },
valueOf(){
  return this.age;
  }
};
obj2
obj2 + obj2
obj2 + "a"
//객체에 Symbol.toPrimitive 가 없으면 hint 가 'string' 이면 toString 먼저 호출하고 없으면 valueOf 를 호출합니다. 그 외(hint 가 number or default 일 경우)는 valueOf -> toString 순입니다.
//toString, valueOf 는 반드시 원시값을 반환해야 합니다.개체를 반환하면 그 결과는 무시됩니다.
//일반적인 객체는 toString 은 문자열 "[object Object]"를 반환합니다.
//valueOf는 객체 자신을 반환합니다.
이단원은 의외로 복잡하고 이해하기 어렵네요. 재미도 없고. 다음에 다시 한번 봅시다.
//이단원은 의외로 복잡하고 이해하기 어렵네요. 재미도 없고. 다음에 다시 한번 봅시다
//https://ko.javascript.info/object-toprimitive