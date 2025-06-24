window.onload = function() {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");
    const scale = 30;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;
    let snake = [];
    snake[0] = {
        x: (Math.floor(Math.random() * columns)) * scale,
        y: (Math.floor(Math.random() * rows)) * scale
    };
    let food = {
        x: Math.floor((Math.random() * columns)) * scale,
        y: Math.floor((Math.random() * rows)) * scale
    };
    let d = "right";
    let score = 0; // Added score variable
    document.onkeydown = direction;
    let playGame = setInterval(draw, 100); // Consolidated setInterval

    function direction(event) {
        let key = event.keyCode;
        if (key == 37 && d != "right") {
            d = "left";
        } else if (key == 38 && d != "down") {
            d = "up";
        } else if (key == 39 && d != "left") {
            d = "right";
        } else if (key == 40 && d != "up") {
            d = "down";
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = "green";
            ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
        }
        // draw food
        ctx.fillStyle = "yellow";
        ctx.fillRect(food.x, food.y, scale, scale);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(food.x, food.y, scale, scale);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        console.log(snakeX);
        if (d === "right") snakeX += scale;
        if (d === "left") snakeX -= scale;
        if (d === "up") snakeY -= scale;
        if (d === "down") snakeY += scale;

        if (snakeX > canvas.width) {
            snakeX = 0;
        }
        if (snakeY > canvas.height) {
            snakeY = 0;
        }
        if (snakeX < 0) {
            snakeX = canvas.width;
        }
        if (snakeY < 0) {
            snakeY = canvas.height;
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        // Check if snake eats food
        if (snakeX === food.x && snakeY === food.y) {
            score++;
            food = {
                x: Math.floor((Math.random() * columns)) * scale,
                y: Math.floor((Math.random() * rows)) * scale
            };
        } else {
            // remove the tail of the snake
            snake.pop();
        }

        // Add new head
        snake.unshift(newHead);

        // Check for self-collision after adding new head
        if (eatself(snakeX, snakeY)) {
            clearInterval(playGame);
        }
    };

    function eatself(snakeX, snakeY) {
        // Skip the head (index 0) to avoid false collision
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snakeX && snake[i].y === snakeY) {
                return true;
            }
        }
        return false;
    }
}