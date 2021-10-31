import * as fs from "fs";

export function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const {characters} = JSON.parse(fs.readFileSync('characters.json'))
export function getRandomCharacterName(){
    return randomChoice(characters).name
}

export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function apply(schema, data) {

    if (!data) {
        return schema
    }

    const obj = schema;
    for (const [key, value] of Object.entries(data)) {
        if (schema.hasOwnProperty(key)) {
            obj[key] = value
        }
    }
    console.log("applied")
    console.log(obj)
    return obj;

}