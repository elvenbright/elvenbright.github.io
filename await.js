let answerArr = []; 

const startAwait=async(url)=>{
    let answer = await getInfAwait(url);
    
    //если ответ json
    if(answer.length>3 && answer[0]==="[" && answer[answer.length-1] === "]"){
        let answArr = new Promise((resolve, reject) => {
            resolve(сorrelation(JSON.parse(answer)));
        })
        answArr.then((value)=>{
            console.log('---value',value)
        })
        console.log('---wtf in answArr',answArr);
        answerArr.push(...answArr);
        console.log('---wtf in answerArr',answerArr);
    }
    //если ответ строка
    else if(typeof answer === 'string'){
        answerArr.push(answer);
    }
    
}

const getInfAwait = async (url) => {
    try{
        let answer = await fetch("https://fe.it-academy.by/Examples/words_tree/"+url, {
            method: 'GET',
        });
        let text = await answer.text();

        return text;
    }
    catch(err){
        console.error('---error request',err);
    }
};



//получает массив - возвращает массив ответов
const сorrelation = async (array) => {
    console.log('---сorrelation in',array);
   let resultArr = [];
   for(let i=0;array.length>i;i++){
        let answer = await getInfAwait(array[i]);
        resultArr.push(answer);
   }
   console.log('---сorrelation out',resultArr);
   return resultArr;
}


