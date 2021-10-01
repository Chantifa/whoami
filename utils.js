import * as fs from "fs";

export function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const {characters} = JSON.parse(fs.readFileSync('characters.json'))
export function getRandomCharacterName(){
    return randomChoice(characters).name
}
/**
 * Shuffles array in place. ES6 version
 * https://stackoverflow.com/a/6274381
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}