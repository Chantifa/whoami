import * as fs from "fs";

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const characters = JSON.parse(fs.readFileSync('characters.json'))
export function getTopics(){
    return Object.keys(characters)
}

export function getRandomCharacterName(topic){
    return randomChoice(characters[topic])
}

export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}