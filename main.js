let dir = [];
loadJson();
function save(data, vn){
    localStorage.setItem(vn,JSON.stringify(data));
}
async function loadJson(num) {
    
    let url = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';
    let rootChk = true;
    let location = 'main';

    if(num !== undefined){
      console.log("cccc")
      url = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/'+num;
      rootChk = false;
      location = num;
    }
    
    let localSaveChk = localStorage.getItem(location);
    console.log("localSaveChk",localSaveChk)
    document.querySelector(".Nodes").innerHTML="load";
    if(localSaveChk !== null){
        console.log("====local");
        displayItems(localSaveChk,rootChk,"l");
    }
    else{
        console.log("====fetch");
        await fetch(url)
        .then(res => {
          // response 처리
          
          console.log(res);
          // 응답을 JSON 형태로 파싱
          return res.json();
        })
        .then(data => {
          // json 출력
          console.log(data)
          console.log("url",url,rootChk)
          
          save(data, rootChk ? 'main': num);
          
          displayItems(data,rootChk,"f");
        })
        .catch(err => {
          // error 처리
          console.log('Fetch Error', err);
        });
    }
}


function displayNav(name,id){
    const subject = document.querySelector(".Breadcrumb");
    let div = document.createElement("div");
    let textnode = document.createTextNode(`- ${name}`); 
    div.appendChild(textnode);   
    
    dir.push(id);
    subject.appendChild(div);  
    
}

function displayRemNav(name){
const subject = document.querySelector(".Breadcrumb");
let last = subject.lastChild;
dir.pop();

subject.removeChild(last);  
loadJson(dir[dir.length-1]);
    
}

function displayItems(data, rootChk, type){

    const container = document.querySelector(".Nodes");
    if(type==="l"){
        data = JSON.parse((data))
    }

    console.log(data);
    let prev="";
    if(!rootChk){
    prev = `<div class="Node" onclick="displayRemNav();">
    <img src="./assets/prev.png" ></div>`;   
    }
    container.innerHTML = prev + data.map((item)=>createHTMLString(item)).join("");
}
   
function createHTMLString(item){
let img = '<img src="./assets/directory.png">';
let clickChk = "";


if(item.type ==="FILE"){
    img ='<img src="./assets/file.png">';
    
    return `<div class="Node" onclick="doImgPop('${item.filePath}')">
    ${img}  
    <div>${item.name}</div>
    </div>`;
}
else{
//${item.id}<div class="Node" onclick="displayNav('${item.name}',${item.id}); loadJson(${item.id});">
    return `<div class="Node" onclick="displayNav('${item.name}',${item.id}); loadJson(${item.id});">
    ${img}  
    <div>${item.name}</div>
</div>`;
}
}

function doImgPop(path){ 
const modalChk = document.querySelector(".App");

let div = document.createElement("div");
div.id = 'modal';
div.className = 'modal-overlay';

let div2 = document.createElement("div");
div2.className = 'modal_content';

let div3 = document.createElement("div");
div3.className = 'modal_layer';

let img = document.createElement("img");
img.src = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'+path;

div2.appendChild(img);   
div.appendChild(div2);  

modalChk.appendChild(div);
div.appendChild(div3);  

const modal = document.querySelector("#modal");

modal.style.display="block";

modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal_layer")) {
        modal.remove();
    }
})

window.addEventListener("keyup", e => {
    if(modal.style.display === "block" && e.key === "Escape") {
        modal.remove();
    }
})

}