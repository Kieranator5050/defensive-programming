import data from './data.json';

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCatData() {
    return new Promise((resolve, reject)=>{
        const rand = generateRandomInt(0,3);
        if (rand===1) {
            data.cats[1].brainCellArr = null;
        }
        setTimeout(()=>resolve(data.cats),500);
    });
}

export {
    getCatData
}