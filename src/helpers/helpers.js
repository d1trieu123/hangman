export function showNotification(setter){
    setter(true);
    setTimeout(() =>{
        setter(false);

    }, 2000)
}

export function checkWin(correct,wrong,word){
    let status = "win"
    //win check
    word.split("").forEach(letter =>{
        if(!correct.includes(letter)){
            status = ""
        }
    })
    //loss check
    if(wrong.length === 6) status = "lose"

    return status
}