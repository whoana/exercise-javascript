//심볼형 
//심볼형은 유일성을 보장한다. 이름이 같더라도 서로 다름 
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 == id2);//false
console.log(id1);//에러발생하나...?
console.log(id1.toString());
console.log(id1.description);
//심볼을 이용한 숨김 프로퍼티 만들기, 외부에서 덮어쓰지 못하게 하기 위함.
//좀더 그럴싸한 예를 들어보자, 외부 라이브러를 참조하여 코드 작성시 
//3rd 라이브러리내의 객에에 새로운 프로퍼티를 추가하여 사용할 경우 
//함부로 추가하기가 망설여집니다. 이럴경우 문자열 키를 사용하여 프로퍼티를 추가하기 보단 심볼을 생성하여 추가하도록 해주면 해당 프로퍼티는 숨김 프로퍼티가 되어 외부 코드에서 접근이 불가능하게 됩니다.
//아래 오브젝트 user 는 외부 라이브러리라 해봅시다.
let user = {name: "whoana"};
//user 사용하는 작성자가 id 프로퍼티를 추가한다고 가정해 봅시다.
user.id = "현재ID값1";
//또 다른 작성 스크립트에서 user 에 동일 id 프로퍼티를 추가한다고 가정해 봅시다.
user.id = "현재ID값2";
//의도치 않게 값이 덮어 쓰여서 이전 스크립트의 식별자는 무의미해집니다.
console.log(user.id);
//리터럴 표현식 내에서 심볼을 사용해 봅시다.
let nick = Symbol("nick");
let friend = {
name : "whoana",
[nick]: "playboy"
};
//리터럴 표현식 내부에서 심볼 사용시에는 [] 대괄호를 이용해야합니다.
friend.nick;
friend.[nick];
friend[nick];
 //심볼을 사용한 프로퍼티 접근은 대괄호를 이용해야 합니다.
//심볼은 for in에서 배제됩니다.
for(let key in friend){console.log(key)};
//프로퍼티 [nick]은 보이지 않습니다.(은닉화)
//그러나 직접 접근은 가능합니다.
console.log(friend[nick]);// "playbody"
//Object.keys(friend) 에서도 키가 심볼인 프로퍼티는 배제됩니다.
//이는 심볼형 프로퍼티 숨기기(hiding symbolic property) 라 불리는 원칙 덕분
//그러나 Object.assign은 심볼을 이용한 프로퍼티도 복사합니다.
let anotherFriend = Object.assign({}, friend);
console.log(anotherFriend);
//복제된 anotherFriend 에서도 키가 심볼인 프로퍼티에 접근할때는 .[심볼]을 이용해야 합니다.
//전역심볼레지스트리(global symbol registry)
//동일한 이름의 심볼을 전역 레지스트리에 등록하고 어디서든 사용 가능하도록 한다.
let gId = Symbol.for("id");
let anotherGid = Symbol.for("id);
let anotherGid = Symbol.for("id");
console.log(gId == anotherGid);
//Symbol.for 는 없으면 만들고 있으면 기존 Symbol 값을 참조하게 해준다.
//전역심볼의 이름값은 Symbol.keyFor 로 검색한다.
//로컬심볼의 이름값은 symbol.description 을 통해 얻는다.
//시스템심볼
//시스템심볼은 자바스크립트 내부에서 사용되는 심볼 , 이건 나중에 살펴볼게요.
//여기서 끝 바이바이 