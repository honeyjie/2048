	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var ratio = getPixelRatio("ctx");
	ctx.scale(ratio, ratio);
	
window.onload = function(){
		var canvas = document.getElementById("canvas");	

		//解决模糊效果
		canvas.width = 	document.documentElement.clientWidth*ratio;
		canvas.height = document.documentElement.clientWidth*ratio;//关键点！！
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;

		canvas.style.width = width*0.5/12 + "rem";
		canvas.style.height = width*0.5/12 + "rem";
		

		var W = width;
		var H = width;
		var w = 1/5*W;
		var d = 1/25*W;
		var r = 1/75*W;

		canvas.style.top = W*0.1/12 + "rem";
		canvas.style.left = W*0.25/12 + "rem";

		var scores = document.getElementById("score");
		var scoretext = document.getElementById("scoretext");
		scoretext.style.left = W*0.25/12 + "rem";
		scoretext.style.top = W*0.03/12 + "rem";
		var addscores = 0;
		var newgame = document.getElementById("newgame");
		newgame.style.right = W*0.24/12+ "rem";
		newgame.style.top = W*0.05/12 + "rem";
		var x0,y0;

	function pathRoundRect3(r, w, ctx) { 
		ctx.beginPath();
		ctx.arc(r, r, r, 3*Math.PI/2, Math.PI, true);
		ctx.lineTo(0, w - r);
		ctx.arc(r, w - r, r, Math.PI, 0.5*Math.PI, true);
		ctx.lineTo( w - r, w);
		ctx.arc(w - r, w - r , r, 0.5*Math.PI, 0, true);
		ctx.lineTo(w , r);
		ctx.arc(w - r, r, r, 0, 3*Math.PI/2, true);
		ctx.lineTo(r, 0);
		ctx.closePath();
	}

	function fillRoundRect3(x, y, r, w, ctx, n) {
		ctx.save();
		ctx.translate(x, y);
		pathRoundRect3(r, w, ctx);
		ctx.fillStyle = num_color(n);
 		ctx.fill();
		ctx.restore();
	}

	fillRoundRect3(0, 0, r, W, ctx, 1);
	var board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]
	// for (var i = 0; i < 4; i++) {
	// 	for (var j = 0; j < 4; j++) {
	// 		fillRoundRect3( (j+1)*d + w*j, (i+1)*d + w*i, r, w, ctx, 0);
	// }

	//根据数字随机一种颜色
	function num_color(n){
		return "rgb(" + (240 - 10*n) + "," + (250 - 5*n) + "," + (250 - n) + ")"
	}

	//随机一个数字的函数
	function boardarr() {
		var arr = [];
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					arr.push(j + "-" + i);
				}
			}
		}
		return arr;
	}

	function leftpad(m) {
		return (m + 1)*d + w*m;
	}
	function toppad(n) {
		return (n + 1)*d + w*n;
	}
	newgame.addEventListener("click", function() {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				fillRoundRect3( (j+1)*d + w*j, (i+1)*d + w*i, r, w, ctx, 0);
				board[i][j] = 0;

			}
		}
		addnum();
	}, true)
	newgame.click();
	function addnum() {
		var arr = boardarr();
		if (arr.length == 0) {
			alert("game over!");
			return;
		}
		var randnum = Math.floor(Math.random()*arr.length);
		var point = arr[randnum];

		var m = parseInt(point.substr(0, 1));
		var n = parseInt(point.substr(2, 1));
		var num = Math.random() >= 0.5 ? 4 : 2;
		board[n][m] = num;
		fillRoundRect3( leftpad(m), toppad(n), r, w, ctx, num);
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle"//得写在font之前

		ctx.font = "bold 8rem Arial";
		ctx.fillText(num, leftpad(m) + w/2, toppad(n) + w/2)
		ctx.closePath();
	}

	window.addEventListener("keyup", function(event) {
		var event = event || document.event;
		switch (event.keyCode) {
			case 38: //向上
				up();
				addnum();
				return false;
				break;
			case 40: //向下
				down();
				addnum();
				return false;
				break;
			case 37: //向左
				left();
				addnum();
				return false;
				break;
			case 39: //向右
				right();
				addnum();
				return false;
				break;
			default:
		}
	}, true)
	
	window.addEventListener("touchstart", function(event) {
		var event = event || document.event;
		x0 = event.touches[0].clientX/ratio;
		y0 = event.touches[0].clientY/ratio;
		return false;
	});
	window.addEventListener("touchend", function(event){
		var event = event || document.event;
		var X = event.changedTouches[0].clientX/ratio;
		var Y = event.changedTouches[0].clientY/ratio;
		var addX = X - x0;
		var addY = Y - y0;
		var percent = Math.abs(addX)/Math.abs(addY) >= 1 ? true : false;
		if (Math.abs(addX) < W/10 && Math.abs(addY) < W/10) {
			return;
		};
		if ( - addX > W/10 && percent) {
			left();
			addnum();
			return false;
		}
		if ( addX > W/10 && percent) {
			right();
			addnum();
			return false;
		}
		if ( - addY > W/10 && !percent) {
			up();
			addnum();
			return false;
		}
		if ( addY > W/10 && !percent) {
			down();
			addnum();
			return false;
		}
		return false;
	});

	function move(m, n, num, M, N) {
		fillRoundRect3( leftpad(M), toppad(N), r, w, ctx, num);
		if (num != 0) {
			text(M ,N, num);
		}
		board[N][M] = num;
		fillRoundRect3( leftpad(m), toppad(n), r, w, ctx, 0);
		board[n][m] = 0;

	}

	function text(m, n, num) {
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle"

		ctx.font = "bold 8rem Arial";
		ctx.fillText(num, leftpad(m) + w/2, toppad(n) + w/2)
		ctx.closePath();
	}
};
