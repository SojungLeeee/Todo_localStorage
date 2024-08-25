function keyCodeCheck () {
    if(event.key=='Enter' && todoInput.value !== ''){
        createTodo();
        saveItemsFn();
    }
}

const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener('click', () => { // + 버튼으로 추가시키기
    if(todoInput.value !== ''){ // 빈 값 입력 방지
        createTodo();
        saveItemsFn();
    }
})

function createTodo(storageData) {

    const todoInput = document.querySelector('#todoInput');

    let todoContents = todoInput.value;
    if (storageData){ //storageData가 존재한다면 
        todoContents = storageData.contents;
        //todoContents 변수에 storageData.contents를 재할당
    }

    //요소 생성
    const newLi = document.createElement('li'); // li 생성
    const newBtn = document.createElement('button'); // 체크박스 button 생성
    const newSpan = document.createElement('span'); // li 안 텍스트 span 생성


    // newSpan.textContent = todoInput.value; // span 안에 입력된 value값 담기
    newSpan.textContent = todoContents;

    newLi.appendChild(newBtn); // li안에 button 담기
    newLi.appendChild(newSpan); // li안에 span 담기
    console.log(newLi)

    const todoList = document.querySelector('#todoList');
    const liList = document.querySelectorAll('#todoList li');
    todoList.appendChild(newLi);
    console.log(todoList)

    
    todoInput.value = ''; // value 값에 빈 문자열 담기

    newBtn.addEventListener('click', () => {
        newLi.classList.toggle('complete');
        saveItemsFn();
    });

    if (storageData && storageData.complete === true) {
        newLi.classList.add('complete')
    }

    //class가 존재함 -> 없앰
    //class가 존재하지 않음 -> complete 클래스를 만듬

    //li를 더블클릭하면 해당 li가 삭제되는 것
    newLi.addEventListener('dblclick', () => {
        newLi.remove();
        saveItemsFn();
    });

    const removeAll = document.querySelector('.delete-btn-wrap');
    removeAll.addEventListener('click', () => {
        const liList = document.querySelectorAll('#todoList li');
        for ( let i = 0; i < liList.length; i++){
            liList[i].remove();
        }
        saveItemsFn();
    });
    // 왜 위 코드는 안되는걸까? 
    //for문 위에서 querySelectorAll('#todoList li')를 해주니까 작동함


    
}


// onclick="deleteAll();" 를 사용하여 삭제시키는 방법
// function deleteAll() { // 전체 삭제 버튼
//     const liList = document.querySelectorAll('#todoList li');
//     for ( let i = 0; i < liList.length; i++){
//         liList[i].remove();
//     }
// }

// 리스트의 텍스트데이터 가져오는 방법
// const todoList = document.querySelector('#todoList');
// todoList.children[i].querySelector('span').textContent;



//todoObj라는 이름을 가진 변수에 객체를 만든다
//contents key에는 위에서 확인해 본 리스트의 텍스트 데이터
//complete key에는 contains 메소드로 complete라는 클래스명이 있는지 확인

function saveItemsFn () { // 로컬에 데이터 저장하기
    const saveItems = []; // 여러개의 데이터를 담을 빈 배열 할당
  	for (let i = 0; i < todoList.children.length; i++){
        const todoObj = {
            contents : todoList.children[i].querySelector('span').textContent, //리스트 목록
            complete : todoList.children[i].classList.contains('complete') //완료 표시된 리스트
        }
		saveItems.push(todoObj); // 배열을 추가하는 push 메소드 사용
        //saveItems 배열에 todoObj 추가
    }
    // console.log(JSON.stringify(saveItems));
    // localStorage.setItem('saved-items', JSON.stringify(saveItems));


    if (saveItems.length === 0) { // 데이터가 없다면 값 삭제
        localStorage.removeItem('saved-items');
    }else{
        localStorage.setItem('saved-items', JSON.stringify(saveItems));
    }

}

// 로컬에는 문자열만 저장이 가능하다...
// -> 해결을 위해 배열이나 객체 자체를 문자열로 변환해 줄 수 있는 JSON 이라는 데이터 포맷 존재
// JSON은 데이터 통신할 때 많이 사용
// 로컬 스토리지에 배열이나 객체 데이터를 저장할 때도 많이 사용

// JSON 사용 방법은 .stringify() 라는 메소드와 같이 쓰임
// JSON.stringify() 의 ()안에 문자열로 변환하고 싶은 데이터를 넣어주면 됨



//로컬 스토리지에 저장하는 방법 -> setItem() 사용
// localStorage.setItem(key,value)
// key 값으로는 saved-items라는 이름
// value 값으로는 문자열로 변환된 JSON.stringify(saveItems) 넣어주기

// 개발자 도구를 열어서 Application에 들어가면 localStorage에 저장됨



//로컬 스토리지에서 가져오는 방법 -> getItem() 사용
// localStorage.getItem(key)

//const savedTodoList = localStorage.getItem('saved-items');
// 하면 객체 형태로 저장했는데 들어갈때 JSON으로 문자열로 변환되어 저장되었기 때문에
// savedTodoList를 하면 문자열 형태로 나옴 -> 다시 객체 형태로 바꾸어주어야함


// JSON 문자열을 객체나 배열로 변환하는 메소드 -> JSON.parse() 사용
//const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));


const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));

if (savedTodoList) {  //savedTodoList(로컬 데이터)가 존재하면 실행하기
    for(let i=0; i<savedTodoList.length; i++){
        createTodo(savedTodoList[i]);
    }
}


// 전체 삭제를 눌렀을 때 Application에 [] 빈배열이 남음
// 삭제시켜주기 -> removeItem() 사용
// localStorage.removeItem(key)

