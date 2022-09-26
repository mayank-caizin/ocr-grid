import {obj, OCRValues} from './ocr-values.js';
window.addEventListener("DOMContentLoaded", () => {
    const SIZE = 5;
    let matrix: boolean[][] = [];
    const container: HTMLDivElement =<HTMLDivElement> document.getElementById('container');
    const grid: HTMLDivElement =<HTMLDivElement> document.getElementById('grid');
    const checkBtn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('check');
    const resetBtn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('reset');
    const output: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById('output');
    let isMoving = false;

    // const ans: HTMLInputElement = <HTMLInputElement> document.getElementById('answer');
    // const addBtn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('addAnswer');
    // const doneBtn: HTMLButtonElement = <HTMLButtonElement> document.getElementById('done');
    // let result:string = '';


    function initializeMatrix(matrix: boolean[][]) {
        matrix = [];
        for(let i: number = 0; i < SIZE; i++) {
            let arr: boolean[] = [];
            for(let j: number = 0; j < SIZE; j++) {
                arr.push(false);
            }
            matrix.push(arr);
        }

        return matrix;
    }
    matrix = initializeMatrix(matrix);
    container.addEventListener('mousedown', () => {
        isMoving = true;
    })

    container.addEventListener('mouseup', () => {
        isMoving = false;
    })

    function createGrid() {
        for(let i: number = 0; i < SIZE; i++) {
            for(let j: number = 0; j < SIZE; j++) {
                let div = document.createElement('div');
                div.id = i + '-' + j;
                div.addEventListener('mouseenter', () => {
                    if(isMoving) {
                        let x: number, y: number;
                        [x, y] = div.id.split('-').map(e => parseInt(e));
                        matrix[x][y] = !matrix[x][y];
                        div.classList.toggle('black');
                    }
                });
                grid.append(div);
            }
        }
    }
    createGrid();

    checkBtn.addEventListener('click', () => {
        let key: string = "";
        for(let i: number = 0; i < SIZE; i++) {
            for(let j: number = 0; j < SIZE; j++) {
                if(matrix[i][j]) key += "1";
                else key += "0";
            }
        }

        let value = obj[key];
        output.innerHTML = value;
        output.classList.remove('hide');
    })

    resetBtn.addEventListener('click', () => {
        matrix = initializeMatrix(matrix);
        resetGrid();
        output.classList.add('hide');
    })

    function resetGrid() {
        let children = grid.children;
        for(let i: number = 0; i < children.length; i++) {
            let child = children[i];
            child.classList.remove('black');
        }
    }

    // addBtn.addEventListener('click', () => {
    //     let key: string = "'";
    //     for(let i: number = 0; i < SIZE; i++) {
    //         for(let j: number = 0; j < SIZE; j++) {
    //             if(matrix[i][j]) key += "1";
    //             else key += "0";
    //         }
    //     }
    //     key += "'";
    //     let value = ans.value;

    //     result += key + ': ' + "'" + value + "'" + ',\n';
    //     matrix = initializeMatrix(matrix);
    //     resetGrid();
    // });

    // doneBtn.addEventListener('click', () => {
    //     console.log(result);
    //     result = '';
    // })
});