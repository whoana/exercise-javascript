let message = "Hello";
let phrase = message;
console.log(message);
console.log(phrase == message);
console.log(phrase === message);
let a = {};
let b = {};
console.log(a == b);
console.log(a === b);
let user = {name:"whoana"};
let clone = {};
for(let key in user){
clone[key] = user[key];
}
console.log(clone);
clone.name = "Pete";
user.name;
const antherUser = Object.assign({},user);
antherUser
const antherUser2 = Object.assign(user,{age:30});
antherUser2
user
delete user;
user = null;
function makeUser(){
return {
  name: "John",
  ref(){
    return this;
    }
  }
}
let user2 = makeUser();
user2
user2.ref().name
let calculator = {
input1:0,
input2:0,
read(){
  this.input1 = 100;
  this.input2 = 200;
  },
sum(){
  return this.input1 + this.input2;
  }
,
mul(){
  return this.input1 * this.input2;
  }
}
calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());
let ladder = {
step: 0,
up() {
  this.step++;
  return this;
  },
down(){
  this.step--;
  return this;
  },
showStep(){console.log(this.step);}
};
ladder.up().up().down().showStep();
function AUser(name){
//this
//this = {}; //빈객체만들기
this.name = name;
this.isAdmin = false;
//return this; this 가 암시적으로 반환됨
}
const mike = new AUser('Mike');
//생성자함수의 의미-> 재사용할 수 있는 개체 생성 코드를 구현하는 것.

function BUser(name){
 this.name = name;
 function sayName(){
    console.log(this.name);
   }
}
let bora = BUser("보라");
bora
let bora2 = new BUser("보라");
function Accumulator(startingValue){
this.value = startingValue;
read = function(){
  this.value += 1;
  };
}
let acc = new Accumulator(1);
acc.read = function(){ acc.value += 1;};
acc.read();
acc.read();
acc.value