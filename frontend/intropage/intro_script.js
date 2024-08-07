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
    
    // 결과 텍스트를 화면에 업데이트 하는 함수
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
    
    // 선택된 답변을 boolean 값으로 변환하는 함수
    // function transformAnswerToBoolean(answer){
    //     return answer === '0';
    // }
    function getAnswerBoolean(questionId, text) {
        const mapping = {
            1: { 'O': true, 'D': false },
            2: { 'S': true, 'R': false },
            3: { 'P': true, 'N': false },
            4: { 'W': true, 'T': false }
        };
        return mapping[questionId][text];
    }
    

    // 서버로 데이터를 전송하는 함수
    function sendDataToServer() {
        const query = document.querySelector('.search-input').value.trim();
        
        const resultData = {
            1: getAnswerBoolean(1, answers[1]),
            2: getAnswerBoolean(2, answers[2]),
            3: getAnswerBoolean(3, answers[3]),
            4: getAnswerBoolean(4, answers[4])
        };
        
        // const resultText = [
        //     answers[1] || '', // answers[1]에 값이 있다면 1 키의 값 사용, 없다면 빈 문자열로 사용
        //     answers[2] || '',
        //     answers[3] || '',
        //     answers[4] || ''
        // ].join('');

        // json 형식으로 변환
        // const dataToSend = JSON.stringify({ query, resultArray });
        const dataToSend = {
            query: query,
            skinTypeQ1: resultData[1],
            skinTypeQ2: resultData[2],
            skinTypeQ3: resultData[3],
            skinTypeQ4: resultData[4]
        }

        const jsonData = JSON.stringify(dataToSend);

        console.log('Search Query:', query);
        console.log('Result Text:', resultData);

        fetch('http://localhost:3000/api/submit', { // Replace with your server URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ query, resultText }),
            body: jsonData
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







  
  