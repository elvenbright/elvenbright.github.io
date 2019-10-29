//request by url
const getInfAwait = async (url) => {
    try{
        let answer = await fetch("https://fe.it-academy.by/Examples/words_tree/"+url, {
            method: 'GET',
        });
        let text = await answer.text();

        responseHandler(text);
        
    }
    catch(err){
        console.error('---error request',err);
    }
};

let answerArr = [];

const responseHandler = async (answer) => {
   
    if(answer.length>3 && answer[0]==="[" && answer[answer.length-1] === "]"){
        let toArr = JSON.parse(answer);

        
        for(let i=0;toArr.length>i;i++) {
            await getInfAwait(toArr[i]);
        }
            
        
    }
    else if(typeof answer === 'string'){
        answerArr.push(answer);
    }

}
