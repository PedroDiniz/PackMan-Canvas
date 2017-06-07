//declaração das variáveis
var score = 0,
    gscore = 0,
    countblink = 10,
    ghost = false;
    ghost2 = false;

var player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32,
    speed: 12
};
var enemy = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false
};
var enemy2 = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false
};
var powerdot = {
    x: 10,
    y: 10,
    powerup: false,
    pcountdown: 0,
    ghostNum: 0,
    ghostNum2: 0
};

//acionar o canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;

//importar a imagem
var mainImage;
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "img/pac.png";

//adicionando monitoramento de teclas
var keyclick = {};
document.addEventListener("keydown", function (event) {
    keyclick[event.keyCode] = true;
    move(keyclick);
}, false);
document.addEventListener("keyup", function (event) {
    delete keyclick[event.keyCode];
}, false);


//definindo função das teclas
function move(keyclick) {
    //checando o valor do click (teclas)
    if (37 in keyclick) {
        player.x -= player.speed;
        player.pacdir = 64;
    }
    if (38 in keyclick) {
        player.y -= player.speed;
        player.pacdir = 96;
    }
    if (39 in keyclick) {
        player.x += player.speed;
        player.pacdir = 0;
    }
    if (40 in keyclick) {
        player.y += player.speed;
        player.pacdir = 32;
    }

    //previnindo que os objetos não saiam da tela do canvas
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    }
    if (player.y >= (canvas.height - 32)) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = (canvas.width - 32);
    }
    if (player.y < 0) {
        player.y = (canvas.height - 32);
    }

    //ação de abrir e fechar a boca
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
    }
    //render();
}

//função para começar o game (once ready)
function checkReady() {
    this.ready = true;
    playgame();
}


// função para fazer o loop do game
function playgame() {
    render();
    requestAnimationFrame(playgame);
}


// função de números aleatórios
function myNum(n) {
    return Math.floor(Math.random() * n);
}

// draw on canvas (fundo de tela)
function render() {
    context.fillStyle = "rgba(0, 0, 0, 0.31)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //checando se a bolinha branca (powerup) está na tela
    if (!powerdot.powerup && powerdot.pcountdown < 5) {
        powerdot.x = myNum(420) + 30;
        powerdot.y = myNum(250) + 30;
        powerdot.powerup = true;
    }

    // checando se os fantasmas estão na tela
    if (!ghost) {
        enemy.ghostNum = myNum(5) * 64;
        enemy.x = myNum(450);
        enemy.y = myNum(250) + 30;
        ghost = true;
    }

    // checando se os fantasmas estão na tela
    if (!ghost2) {
        enemy2.ghostNum = myNum(5) * 64;
        enemy2.x = myNum(450);
        enemy2.y = myNum(250) + 30;
        ghost2 = true;
    }

    // definição dos movimentos dos inimigos
    if (enemy.moving < 0) {
        enemy.moving = (myNum(20) * 3) + myNum(1);
        enemy.speed = myNum(2) + 1;
        enemy.dirx = 0;
        enemy.diry = 0;
        if (powerdot.ghosteat) {
            enemy.speed = enemy.speed * -1;
        }
        if (enemy.moving % 2) {
            if (player.x < enemy.x) {
                enemy.dirx = -enemy.speed;
            } else {
                enemy.dirx = enemy.speed;
            }
        } else {
            if (player.y < enemy.y) {
                enemy.diry = -enemy.speed;
            } else {
                enemy.diry = enemy.speed;
            }
        }
    }
    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;

    // previnindo que os inimigos saiam da tela do canvas
    if (enemy.x >= (canvas.width - 32)) {
        enemy.x = 0;
    }
    if (enemy.y >= (canvas.height - 32)) {
        enemy.y = 0;
    }
    if (enemy.x < 0) {
        enemy.x = (canvas.width - 32);
    }
    if (enemy.y < 0) {
        enemy.y = (canvas.height - 32);
    }
    if (enemy2.moving < 0) {
        enemy2.moving = (myNum(20) * 3) + myNum(1);
        enemy2.speed = myNum(2) + 1;
        enemy2.dirx = 0;
        enemy2.diry = 0;
        if (powerdot.ghosteat) {
            enemy2.speed = enemy2.speed * -1;
        }
        if (enemy2.moving % 2) {
            if (player.x < enemy2.x) {
                enemy2.dirx = -enemy2.speed;
            } else {
                enemy2.dirx = enemy2.speed;
            }
        } else {
            if (player.y < enemy2.y) {
                enemy2.diry = -enemy2.speed;
            } else {
                enemy2.diry = enemy2.speed;
            }
        }
    }
    enemy2.moving--;
    enemy2.x = enemy2.x + enemy2.dirx;
    enemy2.y = enemy2.y + enemy2.diry;

    // previnindo que os inimigos saiam da tela do canvas
    if (enemy2.x >= (canvas.width - 32)) {
        enemy2.x = 0;
    }
    if (enemy2.y >= (canvas.height - 32)) {
        enemy2.y = 0;
    }
    if (enemy2.x < 0) {
        enemy2.x = (canvas.width - 32);
    }
    if (enemy2.y < 0) {
        enemy2.y = (canvas.height - 32);
    }

    // detecção de colisão com inimigo (fantasma)
    if (player.x <= (enemy.x + 26) && enemy.x <= (player.x + 26) && player.y <= (enemy.y + 26)
        && enemy.y <= (player.y + 32)) {
        console.log('ghost');
        if (powerdot.ghosteat) {
            score++;
        } else {
            gscore++;
        }
        player.x = 10;
        player.y = 100;
        enemy.x = 300;
        enemy.y = 200;
        powerdot.pcountdown = 0;
    }
    if (player.x <= (enemy2.x + 26) && enemy2.x <= (player.x + 26) && player.y <= (enemy2.y + 26
    ) && enemy2.y <= (player.y + 32)) {
        console.log('ghost');
        if (powerdot.ghosteat) {
            score++;
        } else {
            gscore++;
        }
        player.x = 10;
        player.y = 100;
        enemy2.x = 300;
        enemy2.y = 200;
        powerdot.pcountdown = 0;
    }

    //detecção de colisão com a bola branca (powerup)
    if (player.x <= powerdot.x && powerdot.x <= (player.x + 32) && player.y <= powerdot.y &&
        powerdot.y <= (player.y + 32)) {
        console.log('hit');
        powerdot.powerup = false;
        powerdot.pcountdown = 500;
        powerdot.ghostNum = enemy.ghostNum;
        powerdot.ghostNum2 = enemy2.ghostNum;
        enemy.ghostNum = 384;
        enemy2.ghostNum = 384;
        powerdot.x = 0;
        powerdot.y = 0;
        powerdot.ghosteat = true;
        player.speed = 15;
    }

    // contagem regressiva para que apareça outra bola branca (powerup)
    if (powerdot.ghosteat) {
        powerdot.pcountdown--;
        if (powerdot.pcountdown <= 0) {
            powerdot.ghosteat = false;
            enemy.ghostNum = powerdot.ghostNum;
            enemy2.ghostNum = powerdot.ghostNum2;
            player.speed = 12;
        }
    }

    //desenhando bola branca (powerup)
    if (powerdot.powerup) {
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(powerdot.x, powerdot.y, 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    // efeito de inimigos piscando quando o powerup é ativado
    if (countblink > 0) {
        countblink--;
    } else {
        countblink = 20;
        if (enemy.flash == 0) {
            enemy.flash = 32;
            enemy2.flash = 32;
        } else {
            enemy.flash = 0;
            enemy2.flash = 0;
        }
    }

    //escrevendo pontuação
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Pacman: " + score + " vs Fantasma:" + gscore, 2, 18);
    
    // desenhando as animações
    context.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 32,
        32);
    context.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 32, 32);
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, 32,
        32);
}
