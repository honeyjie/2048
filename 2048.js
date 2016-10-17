	
	function up() {
		for (var i = 1; i < 4; i++) {
			for (var j = 0 ; j < 4; j++) {//1,3
				if (board[i][j] != 0) {//(j, i)
					lookup(j, i);

				}
			}
		}
	}
	function down() {
		for (var i = 2; i >= 0; i--) {//从下面开始遍历！
			for (var j = 0 ; j < 4; j++) {//1,3
				if (board[i][j] != 0) {//(j, i)
					lookdown(j, i);
				}
			}
		}
	}
	function left() {
		for (var i = 0; i < 4; i++) {
			for (var j = 1 ; j < 4; j++) {//1,3
				if (board[i][j] != 0) {//(j, i)
					lookleft(j, i);
					
				}
			}
		}
	}

	function right() {
		for (var i = 0; i < 4; i++) {
			for (var j = 2 ; j >= 0; j--) {//1,3
				if (board[i][j] != 0) {//(j, i)
					lookright(j, i);
				}
			}
		}

	}
	function leftpad(m) {
		return (m + 1)*d + w*m;
	}
	function toppad(n) {
		return (n + 1)*d + w*n;
	}
	//移动函数，遍历若前
	function lookup(j, i) {
		for (var y = 0; y < i; y++) {
			if (board[y][j] == 0) {//j表示列
				if (emptyup(j, y, i)) {
					move(j, i, board[i][j], j, y);
					return;
				}
			} else if(board[y][j] == board[i][j]) {
				if (emptyup(j, y, i)) {
					addscores += 2*board[i][j];
					move(j, i, 2*board[i][j], j, y);
					scores.innerHTML = addscores;
				}
			}	
		}
	}

	function lookdown(j, i) {
		for (var y = 3; y > i; y--) {
			if (board[y][j] == 0) {//j表示列
				if (emptydown(j, y, i)) {
					move(j, i, board[i][j], j, y);
					return;
				}
			} else if(board[y][j] == board[i][j]) {
				if (emptydown(j, y, i)) {
					addscores += 2*board[i][j];	
					move(j, i, 2*board[i][j], j, y);
					scores.innerHTML = addscores;
				}
			}
			
		}
	}
	function lookleft(j, i) {//i不变
		for (var y = 0; y < j; y++) {
			if (board[i][y] == 0) {//j表示列
					if (emptyleft(y, i, j)) {
						move(j, i, board[i][j], y, i);
						return;
					}

			} else if(board[i][y] == board[i][j]) {
				if (emptyleft(y, i, j)) {
					addscores += 2*board[i][j];	
					move(j, i, 2*board[i][j], y, i);
					scores.innerHTML = addscores;
				}
			}	
		}

	}

	function lookright(j, i) {//i不变
		for (var y = 3; y > j; y--) {
			if (board[i][y] == 0) {//j表示列
				if (emptyright(y, i, j)) {
					move(j, i, board[i][j], y, i);
					return;
				}

			} else if(board[i][y] == board[i][j]) {
				if (emptyright(y, i, j)) {
					addscores += 2*board[i][j];
					move(j, i, 2*board[i][j], y, i);
					scores.innerHTML = addscores;
				}
			}	
		}
	}
	function emptyup(j, y, i) {//j表示列，y表示行
		if (y + 1 < i) {
			for (var y1 = y + 1; y1 < i; y1++) {//对于前面某个格
				if (board[y1][j] != 0) {//注意行、列顺序
					return false;
				} 
				return true;
			};
			
		} else {
			return true;
		}
		
	};
	function emptydown(j, y, i) {//j表示列，y表示行
		if (y > i + 1) {
			for (var y1 = i + 1; y1 < y; y1++) {//对于前面某个格
				if (board[y1][j] != 0) {//注意行、列顺序
					return false;
				} 
				return true;
			};
		} else {
			return true;
		}
	};

	function emptyleft(y, i, j) {//j表示列，y表示行
		if (y + 1 < j) {
			for (var y1 = y + 1; y1 < j; y1++) {//对于前面某个格
				if (board[i][y1] != 0) {//注意行、列顺序
					return false;
				} 
				return true;
			};
		} else {
			return true;
		}
	};
	function emptyright(y, i, j) {//j表示列，y表示行
		if (y > j + 1) {
			for (var y1 = j + 1; y1 < y; y1++) {//对于前面某个格
				if (board[i][y1] != 0) {//注意行、列顺序
					return false;
				} 
				return true;
			};
		} else {
			return true;
		}
	};