import { obj } from './ocr-values.js';
window.addEventListener("DOMContentLoaded", () => {
    const SIZE = 5;
    let matrix = [];
    const container = document.getElementById('container');
    const grid = document.getElementById('grid');
    const checkBtn = document.getElementById('check');
    const resetBtn = document.getElementById('reset');
    const output = document.getElementById('output');
    let isMoving = false;
    function initializeMatrix(matrix) {
        matrix = [];
        for (let i = 0; i < SIZE; i++) {
            let arr = [];
            for (let j = 0; j < SIZE; j++) {
                arr.push(false);
            }
            matrix.push(arr);
        }
        return matrix;
    }
    matrix = initializeMatrix(matrix);
    container.addEventListener('mousedown', () => {
        isMoving = true;
    });
    container.addEventListener('mouseup', () => {
        isMoving = false;
    });
    function createGrid() {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                let div = document.createElement('div');
                div.id = i + '-' + j;
                div.addEventListener('mouseenter', () => {
                    if (isMoving) {
                        let x, y;
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
        let key = "";
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (matrix[i][j])
                    key += "1";
                else
                    key += "0";
            }
        }
        let value = obj[key];
        output.innerHTML = value;
        output.classList.remove('hide');
    });
    resetBtn.addEventListener('click', () => {
        matrix = initializeMatrix(matrix);
        resetGrid();
        output.classList.add('hide');
    });
    function resetGrid() {
        let children = grid.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            child.classList.remove('black');
        }
    }
});
//# sourceMappingURL=index.js.map