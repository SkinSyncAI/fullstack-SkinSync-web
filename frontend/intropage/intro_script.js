// // script.js

// // 입력창과 버튼 요소 선택
// const searchInput = document.querySelector('.search-input');
// const searchButton = document.querySelector('.search-button');
// const box = document.querySelector('.o_noncircled_back');


// console.log('JavaScript code is running.');

// // 검색 기능을 수행하는 함수
// function performSearch() {
//     const query = searchInput.value.trim(); // 입력값 가져오기
//     if (query) {
//         // 입력값 데이터 string
//         console.log(`Searching for: ${query}`); // 검색어를 콘솔에 출력 (여기에서 실제 검색 로직을 구현)
//         // 페이지 전환
//         // window.location.href = `page2.html?search=${encodeURIComponent(query)}`;
        
        
//         // 입력값의 데이터는 string
//         // console.log(typeof(query));
        
//     } else {
//         console.log('No query entered.');
//     }
// }

// // 버튼 클릭 시 검색 수행
// searchButton.addEventListener('click', performSearch);

// // 엔터 키를 눌렀을 때 검색 수행
// searchInput.addEventListener('keypress', function(event) {
//     if (event.key === 'Enter') {
//         performSearch();
//         event.preventDefault(); // 기본 엔터키 동작 방지 (폼 제출 등)
//     }
// });


/*----------------------클릭시 빨간 테두리 표시--------------------------*/
// document.querySelectorAll('.answer-circle').forEach(circle => {
//     circle.addEventListener('click', function() {
//         // 클릭된 질문 ID와 답변 데이터 가져오기
//         const questionContainer = this.closest('.question-container');
//         const questionId = questionContainer.getAttribute('data-question-id');
//         const answer = this.getAttribute('data-answer');

//         // 모든 버튼에서 선택된 클래스 제거
//         questionContainer.querySelectorAll('.answer-circle').forEach(btn => {
//             btn.classList.remove('selected');
//         });

//         // 클릭된 버튼에 선택된 클래스 추가
//         this.classList.add('selected');

//         // 서버로 보낼 데이터를 저장하거나 처리
//         // 예: 서버로 데이터 전송
//         // sendDataToServer({ questionId, answer });

//         console.log(`Question ${questionId} answered with: ${answer}`);
//     });
// });

// // script.js
// document.addEventListener('DOMContentLoaded', function() {
//     // 각 질문 컨테이너에 대해 이벤트 리스너를 설정
//     document.querySelectorAll('.question-container').forEach(function(container) {
//         const questionId = container.getAttribute('data-question-id');
//         const answerCircles = container.querySelectorAll('.answer-circle');
        
//         answerCircles.forEach(function(circle) {
//             circle.addEventListener('click', function() {
//                 // 모든 선택된 스타일을 제거
//                 answerCircles.forEach(function(c) {
//                     c.classList.remove('selected');
//                 }); 
                
//                 // 클릭된 요소에 선택된 스타일 추가
//                 this.classList.add('selected');

//                 // 선택된 답변 값을 저장하거나 서버로 전송
//                 const selectedAnswer = this.getAttribute('data-answer');
//                 console.log(`Question ${questionId} answered: ${selectedAnswer}`);
//             });
//         });
//     });
// });


// script.js

// // html 문서 모든 내용 완전 로드되고, dom이 완성된 후에 이 함수 실행
// document.addEventListener('DOMContentLoaded', function() {
//     // 결과를 표시할 요소 가져오기 (사용하지 않음)
//     // const resultText = document.getElementById('result-text');

//     // question-container 클래스의 모든 요소에 대해 반복작업 수행.
//     document.querySelectorAll('.question-container').forEach(function(container) {
//         // 현재 질문 컨테이너 안에서 클래스가 'answer-circle'인 모든 요소 선택, 'answerCircles' 변수에 저장
//         const answerCircles = container.querySelectorAll('.answer-circle');
        
//         // 모든 버튼에 대해서 반복작업 수행
//         answerCircles.forEach(function(circle) {
//             // 클릭 이벤트 리스너 추가 ( 사용자가 버튼 클릭시 아래 코드 실행 )
//             circle.addEventListener('click', function() {
//                 // 모든 선택된 스타일을 제거
//                 answerCircles.forEach(function(c) {
//                     c.classList.remove('selected');
//                 });
                
//                 // 클릭된 요소에 선택된 스타일 추가
//                 this.classList.add('selected');

//                 // 선택된 답변 값을 저장
//                 const selectedAnswer = this.getAttribute('data-answer');
//                 const answerText = this.querySelector('.o_answer_text') ? this.querySelector('.o_answer_text').textContent : this.querySelector('.x_answer_text').textContent;
                
//                 const questionId = container.getAttribute('data-question-id');
//                 // 결과를 콘솔에 출력
//                 console.log(`Question ${questionId} answered: ${answerText}`);
//             });
//         });
//     });

//     function sendAnswersToServer() {
//         const answers = [];
//         document.querySelectorAll('.question-container').forEach(container => {
//             const questionId = container.getAttribute('data-question-id');
//             const selectedCircle = container.querySelector('.answer-circle.selected');
            
//             if (selectedCircle) {
//                 const answer = selectedCircle.getAttribute('data-answer');
//                 const answerText = selectedCircle.querySelector('.o_answer_text') ? selectedCircle.querySelector('.o_answer_text').textContent : selectedCircle.querySelector('.x_answer_text').textContent;
//                 answers.push({ questionId, answer, answerText });
//             }
//         });

//         const query = document.getElementById('search-input').value.trim();
        
//         // 결과를 콘솔에 출력
//         console.log('Search Query:', query);
//         console.log('Answers:', answers);

//         fetch('https://your-server-url.com/api/submit', { // Replace with your server URL
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ query, answers }),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             // Handle success (e.g., redirect to a results page)
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }

//     const searchButton = document.getElementById('search-button');
//     const searchInput = document.getElementById('search-input');

//     if (searchButton) {
//         searchButton.addEventListener('click', function() {
//             sendAnswersToServer();
//         });
//     }

//     if (searchInput) {
//         searchInput.addEventListener('keypress', function(event) {
//             if (event.key === 'Enter') {
//                 sendAnswersToServer();
//                 event.preventDefault(); // 기본 엔터키 동작 방지
//             }
//         });
//     }
// });


document.addEventListener('DOMContentLoaded', function() {
    // 각 질문에 대한 답변을 저장할 객체
    const answers = {
        1: null,
        2: null,
        3: null,
        4: null
    };

    // 각 답변 버튼 클릭 시 처리 함수
    // event 객체는 클릭 이벤트에 대한 정보 담고있음
    function handleAnswerClick(event) {
        // 클릭된 요소의 가장 가까운 조상 요소 찾기 ( 어떤 질문에 대한 버튼인지 식별 )
        const container = event.currentTarget.closest('.question-container');
        // data-question-id 속성 값을 questionId 변수에 저장 ( 고유 식별자 )
        const questionId = container.getAttribute('data-question-id');
        // 현재 질문 컨테이너 내의 모든 .answer-circle 클래스 요소 변수에 저장
        const answerCircles = container.querySelectorAll('.answer-circle');

        // 선택된 스타일 제거
        answerCircles.forEach(function(circle) {
            circle.classList.remove('selected');
        });

        // 클릭된 답변에 선택된 스타일 추가
        event.currentTarget.classList.add('selected');

        // 선택된 답변 저장
        const selectedAnswer = event.currentTarget.getAttribute('data-answer');
        answers[questionId] = getAnswerText(questionId, selectedAnswer);
        
        // 결과 텍스트를 콘솔에 출력
        console.log('Updated Answers:', answers);

        // 결과 텍스트 화면에 출력
        displayAnswers();
    }

    // 각 답변 버튼에 클릭 이벤트 추가
    document.querySelectorAll('.answer-circle').forEach(function(circle) {
        circle.addEventListener('click', handleAnswerClick);
    });

    // 각 질문 ID와 답변에 따른 텍스트 매핑
    function getAnswerText(questionId, answer) {
        const mapping = {
            1: { 'O': 'O', 'X': 'D' },
            2: { 'O': 'S', 'X': 'R' },
            3: { 'O': 'P', 'X': 'N' },
            4: { 'O': 'W', 'X': 'T' }
        };
        return mapping[questionId][answer];
    }

    // 결과 텍스트를 화면에 업데이트하는 함수
    // function updateResultTexts() {
    //     const resultTexts = document.querySelectorAll('.result-text');
        
    //     resultTexts.forEach((element, index) => {
    //         const questionNumber = index + 1;
    //         element.textContent = answers[questionNumber] || '';
    //     });
    // }
    function displayAnswers() {
        const resultText = [
            answers[1] || '',
            answers[2] || '',
            answers[3] || '',
            answers[4] || ''
        ].join('');
    
        // 각 클래스에 텍스트를 설정
        document.querySelector('.result-texts.skintype1').textContent = answers[1] || '';
        document.querySelector('.result-texts.skintype2').textContent = answers[2] || '';
        document.querySelector('.result-texts.skintype3').textContent = answers[3] || '';
        document.querySelector('.result-texts.skintype4').textContent = answers[4] || '';
    }
    

    // 서버로 데이터를 전송하는 함수
    function sendDataToServer() {
        const query = document.querySelector('.search-input').value.trim();
        const resultText = [
            answers[1] || '',
            answers[2] || '',
            answers[3] || '',
            answers[4] || ''
        ].join('');

        console.log('Search Query:', query);
        console.log('Result Text:', resultText);

        fetch('http://localhost:3000/api/submit', { // Replace with your server URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, resultText }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // 검색 버튼 클릭 시 데이터 전송
    document.querySelector('.search-button').addEventListener('click', sendDataToServer);

    // 엔터키를 눌렀을 때 데이터 전송
    document.querySelector('.search-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendDataToServer();
            event.preventDefault(); // 기본 엔터키 동작 방지
        }
    });
});







  
  