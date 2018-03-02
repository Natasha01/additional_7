module.exports = function solveSudoku(matrix) {
  
  //making a copy of matrix
	let i, j;
	let sudoku = new Array(9);
	for (i = 0; i < 9; i++)
		sudoku[i] = new Array(9);
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			sudoku[i][j] = matrix[i][j];
		}
	}

	//check whether N is suitable for the given place in sudoku
	function checkCorrectN(row, col, N) {
		let b = 0;
		while (b < 9) {
			if ((sudoku[row][b] === N) || (sudoku[b][col] === N)) {
				return false;
			}
			b++;
		}		
		let max_a = Math.floor(row / 3) * 3 + 3;
		let max_b = Math.floor(col / 3) * 3 + 3; 
		for (let a = max_a - 3; a < max_a; a++){
			for (b = max_b - 3; b < max_b; b++){
				if (sudoku[a][b] === N){
					return false;
				}
			}
		}
		return true;
	}

	//find the previous empty space in matrix
	function searchPreviousZero(row, col) {
		let a = row;
		let b = col - 1;
		while (a >= 0) {
			while (b >= 0) {
				if (matrix[a][b] === 0) {
					return [a, b];
				}
				b--;
			}
			a--;
			b = 8;
		}
		return [a, b];
	}

	//fill sudoku
	let number;
	i = 0;
	while (i < 9) {
		j = 0;
		while (j < 9) {
			if (matrix[i][j] === 0) {
				number = 0;
				do {
					number++;
				} while (!checkCorrectN(i, j, number));
				if (number <= 9) {
					sudoku[i][j] = number;
				} else {
					while ((i > 0) || (j > 0)) {
						[i, j] = searchPreviousZero(i, j);
						number = sudoku[i][j];
						sudoku[i][j] = 0;
						do {
							number++;
						} while (!checkCorrectN(i, j, number));
						if (number <= 9) {
							sudoku[i][j] = number;
							break;
						}
					}
				}
			}
			j++;
		}
		i++;
	}
	
	return sudoku;
  
}
