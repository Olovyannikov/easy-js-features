const closeBtn = document.getElementById('close-btn');
const rulesBtn = document.getElementById('rules-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;

// Create ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

// Create paddle props
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

// Create brick props
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Draw ball on canvas

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw paddle

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw score

const drawScore = () => {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// Create bricks

const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];

    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo};
    }
}

const drawBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

//Draw elements

const draw = () => {
    // Clear ctx canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

// Move paddle
const movePaddle = () => {
    paddle.x += paddle.dx;

    // Wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

// Move ball

const moveBall = () => {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision detection (x)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    // Wall collision detection (y)

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    if (ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }

    // Bricks collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });

    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

// Increase Score
const increaseScore = () => {
    score++;

    if (score === brickRowCount * brickColumnCount) {
        showAllBricks();
    }
}

// Make all bricks appear
const showAllBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    })
}


//Update canvas drawing and animation
const update = () => {
    movePaddle();
    moveBall();

    // Draw game
    draw();

    requestAnimationFrame(update);
}

update();

// Keyboard events
const keyDown = e => {
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    } else if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    }
}

const keyUp = e => {
    if (e.key === 'Right' || e.key === 'ArrowRight' ||
        e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules events

rulesBtn.addEventListener('click', () => {
    rules.classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});
