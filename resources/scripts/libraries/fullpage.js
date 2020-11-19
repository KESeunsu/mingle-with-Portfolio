class FullPage{
    container;
    childMain;
    childrenVertical;
    childrenHorizontal;
    verticalTopArray;
    horizontalLeftArray;
    activePage;
    activePageIndex;
    params;

    constructor(element, params){
        let instance=this;
        instance.initContainer(instance, element);
        instance.initParameters(instance, params);
        instance.initChildren(instance);
        instance.attachEvents(instance);

        instance.activePage=instance.childMain;
        instance.activePageIndex=-1;
    }

    initContainer(instance, element){
        if(!(element instanceof HTMLElement)){
            console.error('[FullPage] [Critical] Parameter "element" should be passed as HTML element. For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            return;
        }
        instance.container=element;

        if(getComputedStyle(element)['position']==='static'){
            console.error('[FullPage] [Critical] Position attribute of container element should not be "static". For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            return;
        }
    }

    initParameters(instance, params){
        if(!(params instanceof Map)){
            console.error('[FullPage] [Critical] Parameter "params" should be passed as Map object. For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            return;
        }
        instance.params=params;

        if(typeof instance.params.get('direction')!=='string' || (instance.params.get('direction')!==FullPage.Direction.VERTICAL && instance.params.get('direction')!==FullPage.Direction.HORIZONTAL && instance.params.get('direction')!==FullPage.Direction.BOTH)){
            console.warn('[FullPage] [Warning] Parameter "direction" should be passed as string and it should be one of followings: "vertical", "horizontal" or "both". For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            instance.params.set('direction',FullPage.Direction.VERTICAL);
        }

        if(typeof instance.params.get('speed')!=='number' || instance.params.get('speed')<1){
            console.warn('[FullPage] [Warning] Parameter "speed" should be number and cannot be smaller than 1. For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            instance.params.set('speed',FullPage.Speed.NORMAL);
        }

        if(typeof instance.params.get('easing')!=='string'){
            console.warn('[FullPage] [Warning] Parameter "easing" should be string. For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            instance.params.set('easing',FullPage.Easing.LINEAR);
        }

        if(typeof instance.params.get('minScrollPixel')!=='number' || instance.params.get('minScrollPixel')<0){
            console.warn('[FullPage] [Warning] Parameter "minScrollPixel" should be number and must be equal to or bigger than 0. For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            instance.params.set('minScrollPixel',50);
        }
    }

    initChildren(instance){
        instance.childMain=instance.container.querySelectorAll('div.fp-child-main');
        instance.childrenVertical=instance.container.querySelectorAll('div.fp-child-vertical');
        instance.childrenHorizontal=instance.container.querySelectorAll('div.fp-child-horizontal');
        if(instance.childMain.length!==1){
            console.error('[FullPage] [Critical] Submitted element does not have any child which have "fp-child-main" as its class name. Container should have at least one child to be initialized. For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            return;
        }else{
            instance.childMain=instance.childMain[0];
        }
        if(instance.params.get('direction')!==FullPage.Direction.HORIZONTAL && instance.childrenVertical.length===0){
            console.error('[FullPage] [Critical] Submitted element does not have any children which have "fp-child-vertical" as its class name. Container should have at least one child to be initialized. For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            return;
        }
        if(instance.params.get('direction')!==FullPage.Direction.VERTICAL && instance.childrenHorizontal.length===0){
            console.error('[FullPage] [Critical] Submitted element does not have any children which have "fp-child-horizontal" as its class name. Container should have at least one child to be initialized. For more information, please visit https://www.yhquant.dev/libraries/fullpage/');
            return;
        }

        let sumTop=0;
        let sumLeft=0;
        instance.childMain.classList.add('fp-child-style-main');
        instance.childMain.classList.add('fp-child-style-position');
        for(let i=0; i<instance.childrenVertical.length; i++){
            sumTop+=(
                i===0?
                    instance.childMain.offsetHeight:
                    instance.childrenVertical[i-1].offsetHeight
            );
            instance.childrenVertical[i].style.top=sumTop+'px';
            instance.childrenVertical[i].classList.add('fp-child-style-position');
            instance.childrenVertical[i].classList.add('fp-child-style-vertical');
        }
        for(let i=0; i<instance.childrenHorizontal.length; i++){
            sumLeft+=(
                i===0?
                    instance.childMain.offsetWidth:
                    instance.childrenHorizontal[i-1].offsetWidth
            );
            instance.childrenHorizontal[i].style.left=sumLeft+'px';
            instance.childrenHorizontal[i].classList.add('fp-child-style-position');
            instance.childrenHorizontal[i].classList.add('fp-child-style-horizontal');
        }
    }

    attachEvents(instance){
        let lastPositionX=0;

        let lastPositionY=0;
        let isMove=false;
        instance.container.addEventListener('mousemove',function(e){
            if(!isMove) return;
            let currentPositionY=e.y;
            let positionDifference=lastPositionY-currentPositionY;
            for(let i=0; i<instance.childrenVertical.length; i++){
                instance.childrenVertical[i].style.transition='none';
                instance.childrenVertical[i].style.transform=`translateY(-${positionDifference}px)`;
            }
        });
        instance.container.addEventListener('mouseleave',function(e){
            for(let i=0; i<instance.childrenVertical.length; i++){
                instance.childrenVertical[i].style.transition='all 150ms linear';
                instance.childrenVertical[i].style.transform='none';
            }
            isMove=false;
        });
        instance.container.addEventListener('mousedown',function(e){
            lastPositionX=e.x;
            lastPositionY=e.y;
            isMove=true;
        });
        instance.container.addEventListener('mouseup',function(e){
            let differenceX=lastPositionX-e.x;
            let differenceY=lastPositionY-e.y;
            let absoluteDifferenceX=Math.abs(differenceX);
            let absoluteDifferenceY=Math.abs(differenceY);
            let isScrollingOccurred=false;
            if(absoluteDifferenceX>absoluteDifferenceY && absoluteDifferenceX>instance.params.get('minScrollPixel')){
                //HORIZONTAL ONLY ZONE
                if(differenceX>0){
                    //NEXT PAGE
                    console.log('Horizontal : Next');
                    isScrollingOccurred=true;
                }else if(differenceX<0){
                    //PREV PAGE
                    console.log('Horizontal : Prev');
                    isScrollingOccurred=true;
                }
            }else if(absoluteDifferenceX<absoluteDifferenceY && absoluteDifferenceY>instance.params.get('minScrollPixel')){
                if(differenceY>0){
                    //VERTICAL NEXT PAGE
                    console.log('Vertical : Next');

                    for(let i=0; i<instance.childrenVertical.length; i++){
                        let currentTop=parseInt((instance.childrenVertical[i].style.top).replace('px',''));
                        instance.childrenVertical[i].style.top=(currentTop-instance.activePage.offsetHeight)+'px';
                    }
                    if(instance.activePage===instance.childMain){
                        instance.activePage=instance.childrenVertical[0];
                        instance.activePageIndex=0;
                    }else{
                        instance.activePage=instance.childrenVertical[++instance.activePageIndex];
                    }
                    isScrollingOccurred=true;
                }else if(differenceY<0){
                    //PREV PAGE
                    console.log('Vertical : Prev');
                    isScrollingOccurred=true;
                }
            }

            for(let i=0; i<instance.childrenVertical.length; i++){
                if(!isScrollingOccurred) {
                    instance.childrenVertical[i].style.transition = 'all 150ms cubic-bezier(0,0.6,0.6,1)';
                }
                instance.childrenVertical[i].style.transform='none';
            }
            isMove=false;
        });
    }
}

FullPage.Direction=class{};
FullPage.Direction.VERTICAL='vertical';
FullPage.Direction.HORIZONTAL='horizontal';
FullPage.Direction.BOTH='both';

FullPage.Speed=class{};
FullPage.Speed.SLOW=500;
FullPage.Speed.NORMAL=300;
FullPage.Speed.FAST=100;
FullPage.Speed.INSTANT=1;

FullPage.Easing=class{};
FullPage.Easing.LINEAR='linear';
FullPage.Easing.CUBIC_BEZIER='cubicBezier(0,0.6,0.6,1)';
FullPage.Easing.SPRING='spring';