// // 클릭 시 빨간 테두리 토글
// box.addEventListener('click',() => {
//     box.classList.toggle('clicked'); // 클릭할 때마다 'clicked' 클래스 토글
// })

// 클릭 시 빨간 테두리
// document.addEventListener('DOMContentLoaded', () => {
//     const oText = document.querySelector('.o_text');
//     const oNoncircledBack = document.querySelector('.o_noncircled_back');

//     const toggleActive = () => {
//         oNoncircledBack.classList.toggle('active');
//     };

//     oText.addEventListener('click', toggleActive);
//     oNoncircledBack.addEventListener('click', toggleActive);
// });

// document.querySelectorAll('.answer-circle').forEach(circle => {
//     circle.addEventListener('click', function() {
//       // 모든 circle에서 'selected' 클래스 제거
//       document.querySelectorAll('.answer-circle').forEach(el => el.classList.remove('selected'));
      
//       // 클릭된 circle에 'selected' 클래스 추가
//       this.classList.add('selected');
//     });
//   });
  
//   document.querySelectorAll('.o_answer_text, .x_answer_text').forEach(text => {
//     text.addEventListener('mouseover', function() {
//       this.closest('.answer-circle').style.borderColor = 'red';
//     });
//     text.addEventListener('mouseout', function() {
//       // 텍스트의 부모 circle이 'selected' 클래스가 없을 때만 테두리 제거
//       if (!this.closest('.answer-circle').classList.contains('selected')) {
//         this.closest('.answer-circle').style.borderColor = 'transparent';
//       }
//     });
//     text.addEventListener('click', function() {
//       // 클릭 시, 'selected' 클래스를 부모 circle에 추가
//       this.closest('.answer-circle').click();
//     });
//   });