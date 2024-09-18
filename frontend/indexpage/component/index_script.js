const mask=document.getElementById('mask');
const s=document.getElementById('search');
const sm=document.getElementById('submit');
let st=document.getElementById('search_text');
let search=false;
let cells;

document.addEventListener('DOMContentLoaded', () => {
    // 서버에서 데이터를 가져오기 위한 AJAX 요청
    fetch('/api/submit') // 서버의 실제 엔드포인트로 교체하세요
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            // 데이터가 정상적으로 응답된 경우
            const score = data.score;
            const cosmetic = data.cosmetic;

            // HTML 요소에 데이터 표시
            document.querySelector('.m_score #score').textContent = score;

            // 이미지 경로를 가져와서 이미지 태그에 삽입
            if (cosmetic && cosmetic.img) {
                document.getElementById('main_cos_img').src = cosmetic.img;
            } else {
                console.error('Cosmetic data does not contain image path.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


//화장품가져오기
$.ajax({
    url:'/component/list.cosmetic.csv',
    dataType:'text',
}).done(func);
function func(data){
    let rows=data.split(/\r\n|\r/);
    cells=new Array(5);
    for(let i=1; i<rows.length; i++){
        cells[i-1]=rows[i].split(',');
    }
}

//화장품 매칭
function apply(cos_number){
    st.value="";
    let cos=cells[cos_number];
    if(cos==undefined){
        alert("invalid input!");
    }
    document.getElementById('main_cos_img').src=cos[4];
    document.getElementById('main_cos_id').innerText=cos[2];
    document.getElementById('main_cos_brand').innerText=cos[3];
}
//로딩
window.addEventListener('DOMContentLoaded', ()=>{
    mask.style.display='block';
    document.querySelector('body').style="overflow:hidden";
})
window.addEventListener('load', function(){
    setTimeout(function(){
        mask.style.display='none';
        document.querySelector('body').style="overflow:auto";
    }, 1000);
})
//검색
document.addEventListener("click", function(e) {
    let sb=document.getElementById('search_box');
    if(e.target.id == "search" || e.target.id == "search_box" || e.target.id == "search_text"){
        this.getElementById('export').style.display='none';
        sb.style.display='flex';
        s.style.transform='translate(-25vw, 1%)';
        if(e.target.id == "search_box" || e.target.id == "search_text"){
            st.style.display='block';
            sb.style.width='50vw';
            sb.style.border='none';
            search=true;
            s.style.transform='translate(-15vw, 1%)';
        }
    }else if(e.target.id=="hyd"){
        this.getElementById('line').style.backgroundColor="aqua";
        this.getElementsByClassName('chosen_compo_title').item(0).classList.remove('chosen_compo_title');
        this.getElementById('hyd').classList.add('chosen_compo_title');
    }else if(e.target.id=="mois"){
        this.getElementById('line').style.backgroundColor="pink";
        this.getElementsByClassName('chosen_compo_title').item(0).classList.remove('chosen_compo_title');
        this.getElementById('mois').classList.add('chosen_compo_title');
    }else if(e.target.id=="barr"){
        this.getElementById('line').style.backgroundColor="rgb(100,90,90)";
        this.getElementsByClassName('chosen_compo_title').item(0).classList.remove('chosen_compo_title');
        this.getElementById('barr').classList.add('chosen_compo_title');
    }else if(e.target.id=="sooth"){
        this.getElementById('line').style.backgroundColor="rgb(180,180,208)";
        this.getElementsByClassName('chosen_compo_title').item(0).classList.remove('chosen_compo_title');
        this.getElementById('sooth').classList.add('chosen_compo_title');
    }else{
        this.getElementById('export').style.display='block';
        s.style.visibility='visible';
        s.style.transform='translate(0)';
        sb.style.display='none';
        sm.style.visibility='hidden';
        st.style.display='none';
        sb.style.width='30vw';
        sb.style.border='1px solid black';
        search=false;
    }
});
s.addEventListener("transitionend", () => {
    if(search){
        s.style.visibility='hidden';
        sm.style.visibility='visible';
    }
});