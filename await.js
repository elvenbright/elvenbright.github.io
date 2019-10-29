//request by url
const getInfAwait = async (url) => {
    try{
        let answer = await fetch("https://fe.it-academy.by/Examples/words_tree/"+url, {
            method: 'GET',
        });
        let text = await answer.text();
        
        responseHandler(url, text);
    }
    catch(err){
        console.error('---error request',err);
    }
};



const responseHandler=(url, answer)=>{
    console.log('---url',url);
    console.log('---answer',answer);
}