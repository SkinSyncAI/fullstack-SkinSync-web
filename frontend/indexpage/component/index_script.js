let s=document.getElementById('search');
let sb=document.getElementById('search_box');
let sm=document.getElementById('submit');
let a=false;

document.addEventListener("click", function(e) {
    if(e.target.id == "search" || e.target.id == "search_box" || e.target.id == "search_text"){
        this.getElementById('export').style.display='none';
        sb.style.display='flex';
        s.style.transform='translate(-102px, 2px)';
        if(e.target.id == "search_box" || e.target.id == "search_text"){
            this.getElementById('search_text').style.display='block';
            sb.style.width='50vw';
            sb.style.border='none';
            a=true;
            s.style.transform='translate(-59px, 2px)';
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
        this.getElementById('line').style.backgroundColor="rgb(197,180,184)";
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
        this.getElementById('search_text').style.display='none';
        sb.style.width='30vw';
        sb.style.border='1px solid black';
        a=false;
    }
});
s.addEventListener("transitionend", () => {
    if(a){
        s.style.visibility='hidden';
        sm.style.visibility='visible';
    }
});
function setClass(id){
    document.getElementById(id)
}