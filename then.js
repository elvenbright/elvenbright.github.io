//request by url
function getInfThen (url){
    try{
        fetch("https://fe.it-academy.by/Examples/words_tree/"+url, {
            method: 'GET',
        }).then( function(response) {
            return response.text();
        }).then( function(answer) {
            if(typeof answer === 'string'){
                response(answer, url);
            }
        }).catch( function(error) {
            console.error('---error response',error);
            //set isFetching false
            for(let i=0;responseObj.length>i;i++){
                if(responseObj[i].requestUrl===url){
                    responseObj[i].isError = true;
                    responseObj[i].isFetching = false;
                }
            }
        });
    }
    catch(err){
        console.error('---error request',err);
    }
};

//array of objects {requestUrl: "root.txt", requestAnswer: "welocom", isFetching: false, isLoaded: false, isError:false}
let responseObj = [];

function response(answer, url){

    // if array
    if(answer.length>3 && answer[0]==="[" && answer[answer.length-1] === "]"){
   
        let toArr = JSON.parse(answer);
        let arrToPush = [];
        for(let i=0;toArr.length>i;i++){
            arrToPush.push({requestUrl:toArr[i],requestAnswer:null,isFetching:false,isLoaded:false,isError:false});
        }
        // insert in responseObj
        if(responseObj.length===0){
            responseObj = arrToPush;
        }
        else{
            for(let i=0;responseObj.length>i;i++){
                if(responseObj[i].requestUrl===url){
                    responseObj.splice(i, 1, ...arrToPush);
                } 
            }
        }
    }

    // if string
    else if(typeof answer === 'string'){
        for(let i=0;responseObj.length>i;i++){
            if(responseObj[i].requestUrl===url){
                responseObj[i].requestAnswer=answer;
                responseObj[i].isFetching=false;
                responseObj[i].isLoaded=true;
            }
        }
    }

    //cycle request
    for(let i=0;responseObj.length>i;i++){
        if(responseObj[i].requestAnswer===null && responseObj[i].isFetching===false && responseObj[i].isLoaded===false && responseObj[i].isError===false){
            responseObj[i].isFetching=true;
            getInfThen(responseObj[i].requestUrl);
        }
    }

    //check isLoaded
    let loadedStatus = {requestDone:0, isLoadedWithError:false};
    for(let i=0;responseObj.length>i;i++){
        if(responseObj[i].isLoaded===true){
            loadedStatus.requestDone+=1;
        }
        if(responseObj[i].isError){
            loadedStatus.requestDone+=1;
            loadedStatus.isLoadedWithError = true;
        }
    }

    //insert text
    if(loadedStatus.requestDone === responseObj.length){
        insertText(loadedStatus);
    }
   
}

// insert text
function insertText(status){
    let elem = document.getElementById('container');

    let str = "";
    for(let i=0;responseObj.length>i;i++){
        if(typeof responseObj[i].requestAnswer === 'string'){
            str+=responseObj[i].requestAnswer;
            
            if(i!==responseObj.length-1 ){
                str+=" ";
            }
        }
        
        
    };

    elem.innerHTML = "";
    elem.innerHTML += `<h3>Then</h3>`;
    elem.innerHTML += `<div>${str}</div>`;

    // if error
    if(status.isLoadedWithError){
        elem.innerHTML += '<div style="font-size:8px">(loaded with error)</div>';
    }
}