export const getGuessNumber = (number) => {
    const numbers_list = ["0","1","2","3","4","5","6","7","8","9"];
    const guess_digit_list = []
    for (let i = 0; i < number; i++) {
        let rand_index = Math.floor(Math.random() * 10)
        guess_digit_list.push(numbers_list[rand_index])
    }

    return guess_digit_list
}

export const checkNumberGuess = (guess, userGuess) => {
    let deadCount = 0;
    let injCount = 0;
    const possibleInjuredList = [];
    
    for (let i = 0; i < guess.length; i++) {
        if(guess[i] === userGuess[i]){
            deadCount += 1
        }else {
            possibleInjuredList.push(i);
        }
    }

    if(possibleInjuredList.length == 0){
        return { isWinner: true , dead: deadCount, inj: injCount };
    }

    for(let i = 0; i < possibleInjuredList.length; i++){
        let idx =  possibleInjuredList[i];
        if(userGuess.includes(guess[idx])){
            injCount += 1;
        }
    }

    return { isWinner: false, dead: deadCount, inj: injCount};
}
