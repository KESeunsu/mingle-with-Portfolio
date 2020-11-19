document.addEventListener('DOMContentLoaded',init);

function init() {
    let xhr= new XMLHttpRequest();
    xhr.open('GET','https://mingle-with.com/xhr/string.mgw');
    xhr.onreadystatechange=function(){
        if(xhr.readyState===XMLHttpRequest.DONE){
            if(xhr.status===200){
                document.body.innerHTML=xhr.responseText;
            }else{
                alert('서버의 문제가 생김')
            }
        }
    }
    xhr.send();
}