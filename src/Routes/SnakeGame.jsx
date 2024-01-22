import React, { useState, useEffect, useRef } from "react";
import BarraNav from "../components/BarraNav";

const SnakeGame = () => {
  const generateFood = () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return { x, y };
  };

  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("UP");
          break;
        case "ArrowDown":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
          setDirection("LEFT");
          break;
        case "ArrowRight":
          setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    while (gameOver) {
      const moveSnake = () => {
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood()); // Mover la generación de comida aquí
        } else {
          newSnake.pop();
        }

        setSnake(newSnake);
        drawCanvas(); // Llamar a drawCanvas después de actualizar la serpiente

        if (checkCollision(newSnake)) {
          setGameOver(false);
          drawCanvas();
        } else {
          setSnake(newSnake);
          drawCanvas();
        }
      };

      const gameInterval = setInterval(moveSnake, 100);

      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [snake, direction, gameOver, food]);

  const checkCollision = (snake) => {
    const head = snake[0];
    console.log(head.x)
    return (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= 20 ||
      head.y >= 20 
    );
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar serpiente
    ctx.fillStyle = "green";
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    // Dibujar comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
  };

  useEffect(() => {
    drawCanvas();
  }, [snake, food]);

  return (
    <>
      <BarraNav />
      <div style={{ backgroundColor: "#234757" }}>
        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          style={{ border: "1px solid #000", backgroundColor: "#73C991" }}
        />
        {!gameOver && <p>Game Over</p>}
      </div>
    </>
  );
};

export default SnakeGame;
