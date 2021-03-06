// maga a mátrix, egyelőre csak egy üres tömb
const matrix = [];
// sorok és oszlopok száma, hátha nem nágyzetes
const rows = 3;
const cols = 3;
// lépések száma
let stepCount = 0;
// az aktuális jel
let mark = 'X'

// csak feltöltöm a mátrixot (valjában opcionális lépés is lehet)
const initState = () => {
    // ehelyett a fill metódussal szebb lenne
    for (let i = 0; i < rows; i += 1) {
        matrix[i] = [];
        for (let j = 0; j < cols; j += 1) {
            matrix[i][j] = null;
        }
    }
}

// a mátrix egy elemének értéket adok, az adott elem data attrinutumait 
// felhasználva nyerem ki az értéket
const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
}

// kattintáskor mi történjen, érdemes lenne több függvényre bontani
const handleClick = (event) => {
    stepCount += 1;
    event.target.removeEventListener('click', handleClick);
    event.target.textContent = mark;
    mark = mark === 'X' ? 'O' : 'X';
    changeMatrixValue(event.target);
    checkWinner();
}

// minden elemhez hozzáadom az eseményfigyelőt
const addListener = () => {
    document.querySelectorAll('.tictactoe__cell').forEach(element => {
        element.addEventListener('click', handleClick)
    });
}

// ha van győrztes minden elemről eltávolítom az eseményfigyelőt
const removeListener = () => {
    document.querySelectorAll('.tictactoe__cell').forEach(element => {
        element.removeListener('click', handleClick)
    });
}

// Megnézem hogy van e olyan sor, ahol minden elem ugyanaz
const checkRowValues = (arr) => {
    const values = arr.map(row =>
        row.every((value) => value === 'X') ||
        row.every((value) => value === 'O'))
    return values.indexOf(true) !== -1 ? true : false;
}

// Megnézem hogy van e olyan oszlop, ahol minden elem ugyanaz
// TODO: Meg kell írnod, boolean adjon vissza
const checkColumnValues = () =>
checkRowValues(matrix.map((arr, row) => arr.map((rows,cell) => matrix[cell][row])))

// Megnézem hogy van e olyan oszlop, ahol minden elem ugyanaz
// TODO: Meg kell írnod, boolean adjon vissza
const checkDiagonalValues = () => 
checkRowValues([
    matrix.map((arr, i) => matrix[i][i]),
    matrix.map((arr, i) => matrix[i][matrix[i.length - i]])
])
    
 


// TODO: Meg kell írnod, nincs befejezve
const checkWinner = () => {
   
    if (checkRowValues(matrix) || checkColumnValues() || checkDiagonalValues()) {
        alert('The winner is: ' + (mark === 'X' ? 'O' : 'X'));
    removeAllClickListener();
    }
    
}

initState();
addListener();