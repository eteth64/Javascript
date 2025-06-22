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


    }
    let d = "right";
    let playgame = setInterval(draw, 100);


    function draw() {
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = "green";
            ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
        }


        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        console.log(snakeX);
        if (d === "right") snakeX += scale;
        if (d === "left") snakeX -= scale;
        if (d === "up") snakeY -= scale;
        if (d === "down") snakeY += scale;

        let newHead = {
            x: snakeX,
            y: snakeY
        };
        snake.pop();
        snake.unshift(newHead);

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



    };
    // snake.pop();
    // snake.unshift(newHead);

}