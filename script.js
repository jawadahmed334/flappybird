const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score');
let birdY = 200;
let gravity = 0.6;
let jump = -12; // Adjusted jump value
let isGameOver = false;
let score = 0;
let birdVelocity = 0;

// Function to handle bird jump
function jumpBird() {
    if (!isGameOver) {
        birdVelocity = jump;
    }
}

// Listen for keyboard and touch events
document.addEventListener('keydown', jumpBird);
document.addEventListener('click', jumpBird); // For touch on mobile devices

function createPipe() {
    const pipe = document.createElement('div');
    pipe.classList.add('pipe');
    const pipeHeight = Math.random() * (window.innerHeight - 200) + 50; // Random height
    pipe.style.height = `${pipeHeight}px`;
    pipe.style.left = '100%';
    document.querySelector('.game-container').appendChild(pipe);

    movePipe(pipe);
}

function movePipe(pipe) {
    let pipeX = window.innerWidth;

    const pipeInterval = setInterval(() => {
        if (pipeX < -50) {
            clearInterval(pipeInterval);
            pipe.remove();
            score++;
            scoreDisplay.innerText = score;
        } else if (checkCollision(pipe)) {
            clearInterval(pipeInterval);
            alert(`Game Over! Your score: ${score}`);
            isGameOver = true;
            document.location.reload();
        } else {
            pipeX -= 5; // Move pipe left
            pipe.style.left = `${pipeX}px`;
        }
    }, 20);
}

function checkCollision(pipe) {
    const pipeRect = pipe.getBoundingClientRect();
    const birdRect = bird.getBoundingClientRect();

    return !(
        birdRect.top > pipeRect.bottom ||
        birdRect.bottom < pipeRect.top ||
        birdRect.right < pipeRect.left ||
        birdRect.left > pipeRect.right
    );
}

function gameLoop() {
    if (!isGameOver) {
        birdY += birdVelocity;
        birdVelocity += gravity; // Apply gravity to the velocity
        bird.style.top = `${birdY}px`;

        if (birdY + bird.offsetHeight > window.innerHeight) {
            alert(`Game Over! Your score: ${score}`);
            isGameOver = true;
            document.location.reload();
        }

        // Reset bird position if it goes off-screen
        if (birdY < 0) {
            birdY = 0;
        }
    }
}

setInterval(createPipe, 2000);
setInterval(gameLoop, 20);
