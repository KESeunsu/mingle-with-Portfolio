window.addEventListener('load',()=>{
    let menus=document.body.querySelectorAll('div.container > div.container-item.menu-container > div.menu-container-item');
    let elNavigator=document.body.querySelector('div.navigator');
    let elNavigatorPos= elNavigator.querySelector('div.navigator-item.position');
    let counter=1;
    for(let i=0;i<menus.length;i++){
        setTimeout(()=>{
            menus[i].classList.add('visible');
        },100*counter++);
    }
    setTimeout(()=>{

        for(let i=0;i<menus.length;i++){
            menus[i].classList.add('activated');
        }
        elNavigator.classList.add('visible');
    },100*counter+250);

    let elContainer=document.body.querySelector('div.container');
    elContainer.addEventListener('wheel',(e)=>{
        let scrollFactor=25;
        let scrollDelay=10;
        if(e.deltaY>0){
            for(let i=0;i<scrollFactor;i++){
                setTimeout(()=>{
                    elContainer.scrollTo(elContainer.scrollLeft+scrollFactor,0);
                    scrollFactor-=1;
                },i*scrollDelay);
            }
        }else{
            for(let i=0;i<scrollFactor;i++){
                setTimeout(()=>{
                    elContainer.scrollTo(elContainer.scrollLeft-scrollFactor,0);
                    scrollFactor-=1;
                },i*scrollDelay);
            }
        }
    });

    calcNavigator();
    function calcNavigator(){
        let totalPos=elContainer.scrollWidth - elContainer.clientWidth;
        let currentPos=elContainer.scrollLeft;
        elNavigatorPos.style.width=(currentPos/totalPos)*100+'%';

        setTimeout(calcNavigator,10);
    }
});