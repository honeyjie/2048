var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ratio = getPixelRatio("ctx");
// ctx.scale(ratio, ratio);
var width;
var height;
window.onload = function(){

    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;


    var scores = document.getElementById("score");
    var scoretext = document.getElementById("scoretext");
    var addscores = 0;
    var newgame = document.getElementById("newgame");
    var h1 = document.getElementsByTagName("h1")[0];

    var W;

    if (width > 800) {
        console.log(canvas.style.height)
        canvas.style.marginLeft = -width*0.4*0.5 + "px";
        canvas.style.left = "50%";
        h1.style.margin = "2%";
        canvas.style.width = width*0.4 + "px";
        canvas.style.height  = width*0.4 + "px";
        canvas.height = canvas.width = width*0.4*ratio;

        scoretext.style.marginLeft = width*0.3 + "px";
        newgame.style.marginRight = width*0.3 + "px"

        W = width*0.4;
    } else{
        canvas.style.left = "10%";
        canvas.style.width = width*0.8 + "px"//自适应布局
        canvas.style.height =  width*0.8 + "px";
        canvas.width = canvas.height = width*0.8*ratio;

        scoretext.style.marginLeft = width*0.1 + "px";
        newgame.style.marginRight = width*0.1 + "px";

        W = width*0.8
    };

        var w = 1/5*W;
        var d = 1/25*W;
        var r = 1/75*W;
        var x0;
        var y0;
        var board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        fillRoundRect3(0, 0, r, W, ctx, 1);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                fillRoundRect3( (j+1)*d + w*j, (i+1)*d + w*i, r, w, ctx, 0);
                board[i][j] = 0;
            }
        }
        addnum();   

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
    newgame.addEventListener("click", function() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                fillRoundRect3( (j+1)*d + w*j, (i+1)*d + w*i, r, w, ctx, 0);
                board[i][j] = 0;
            }
        }
        addnum();
    }, true);

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

        ctx.font = "bold 3rem Arial";
        ctx.fillText(num, leftpad(m) + w/2, toppad(n) + w/2)
        ctx.closePath();
    }
    function num_color(n){
        return "rgb(" + (240 - 10*n) + "," + (250 - 5*n) + "," + (250 - n) + ")"
    }
    function leftpad(m) {
        return (m + 1)*d + w*m;
    }
    function toppad(n) {
        return (n + 1)*d + w*n;
    }
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
        ctx.font = "bold 3rem Arial";
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
        if (Math.abs(addX) < W/50 && Math.abs(addY) < W/50) {
            return;
        };
        if ( - addX > W/50 && percent) {
            left();
            addnum();
            console.log(addX, addY, "向左")
        }else if ( addX > W/50 && percent) {
            right();
            addnum();
            console.log(addX, addY, "向右")
        }else if ( - addY > W/50 && !percent) {
            up();
            addnum();
            console.log(addX, addY, "向上")
        }else if ( addY > W/50 && !percent) {
            down();
            addnum();
            console.log(addX, addY, "向下")
        }
    });
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
};
