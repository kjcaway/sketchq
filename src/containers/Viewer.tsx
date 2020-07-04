/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback } from 'react'

interface ViewerProps {
  width: number;
  height: number;
}

type Coordinate = {
  x: number;
  y: number;
};

function Viewer({ width, height }: ViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const webSocketUrl = "ws://localhost:8080/drawing";
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      
      context.strokeStyle = 'red';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  const startTouch = useCallback((event: TouchEvent) => {
    event.preventDefault();
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    // mousePos = getTouchPos(canvas, event);
    var touch = event.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, []);

  const touch = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      var touch = event.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    },
    []
  );

  const exitTouch = useCallback((event: TouchEvent) => {
    event.preventDefault();

    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    canvas.addEventListener('touchstart', startTouch);
    canvas.addEventListener('touchmove', touch);
    canvas.addEventListener('touchend', exitTouch);

    if(!connected){
      ws.current = new WebSocket(webSocketUrl);
      
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setConnected(true)
      };
      ws.current.onerror = error => {
        console.log("could not connect to " + webSocketUrl);
        console.log(error);
      };
      ws.current.onmessage = (evt: MessageEvent) => {
        console.log(evt.data)
        const { color, originP, newP } = JSON.parse(evt.data);
        const originPosition = {
          x: originP[0],
          y: originP[1]
        }
        const newPosition = {
          x: newP[0],
          y: newP[1]
        }
        
        drawLine(originPosition, newPosition);
      };
      ws.current.onclose = error => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
      };
    }

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);

      canvas.removeEventListener('touchstart', startTouch);
      canvas.removeEventListener('touchmove', touch);
      canvas.removeEventListener('touchend', exitTouch);
    };
  }, [startPaint, paint, exitPaint, connected]);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    };
  };

  return (
    <div>
      <h2>뭘까요?</h2>
      <canvas ref={canvasRef} height={height} width={width} />
    </div>
  )
}

Viewer.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Viewer
