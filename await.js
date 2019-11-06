//init run
const startAwait=async(url)=>{
    //cycle
    insertMess(await cycleReq(await getInfAwait(url)));
}

// cycleReq
cycleReq=async(e)=>{
    let isNotReady = false; //if array contain ".txt" file

    let result = [];

    let arr = [];
    for(let i=0;e.length>i;i++){
        if(e[i].slice(-4,e[i].length) === '.txt'){
            arr.push(getInfAwait(e[i]));
            isNotReady=true;
        }
        else{
            arr.push(e[i]);
        }
        
        
    }
    await Promise.all(arr).then(res => {
        result.push(res.flat());
    });

    if(isNotReady){
        return await cycleReq(result.flat());
    }
    else{
        return result.flat();

    }
}


//request
const getInfAwait = async (url) => {
    try{
        let answer = await fetch("https://fe.it-academy.by/Examples/words_tree/"+url, {
            method: 'GET',
        });
        let response = await answer.text();

        if(response.length>3 && response[0]==="[" && response[response.length-1] === "]"){
            return JSON.parse(response);
        }
        else if(typeof response === 'string'){
            return response;
        }
    }
    catch(err){
        console.error('---error request',err);
        return "";
    }
};

// insert text
const insertMess = (arr) =>{
    let elem = document.getElementById('container');

    let str = "";
    for(let i=0;arr.length>i;i++){
        str+=arr[i];
        if(arr.length-1!==i&&arr[i]!==""){
            str+=" ";
        }
    };

    elem.innerHTML = "";
    elem.innerHTML += `<h3>Await</h3>`;
    elem.innerHTML += `<div>${str}</div>`;
}