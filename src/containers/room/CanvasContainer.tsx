import React, { useEffect, useRef, useState, useCallback, useContext } from 'react'
import '../../App.css';
import { WebSocketContext } from '../../hoc/WebSocketProvider';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import * as draw from '../../store/reducer/draw';

interface CanvasProps {
  width: number;
  height: number;
}

type Coordinate = {
  x: number;
  y: number;
};

function CanvasContainer({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ws = useContext(WebSocketContext);
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const userRole = useSelector((store: any) => store.websocket.userRole, shallowEqual);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
  const [isPainting, setIsPainting] = useState(false);
  
  const drawStatus = useSelector((store: any) => store.draw.status);
  const originX = useSelector((store: any) => store.draw.originX);
  const originY = useSelector((store: any) => store.draw.originY);
  const newX = useSelector((store: any) => store.draw.newX);
  const newY = useSelector((store: any) => store.draw.newY);
  const drawColor = useSelector((store: any) => store.draw.color);
  
  const dispatch = useDispatch();

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

  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    const color = drawColor.toLowerCase();

    if (context) {
      context.strokeStyle = color;
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      
      if(userRole === 1){
        const data = {
          messageType: "DRAW",
          sender: {
            id: userId
          },
          drawing: {
            color: color,
            originP : [originalMousePosition.x, originalMousePosition.y],
            newP: [newMousePosition.x, newMousePosition.y]
          }
        }
        ws.current.send(JSON.stringify(data));
      }

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
          if(userRole === 1){
            drawLine(mousePosition, newMousePosition);
          }
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

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);

    dispatch({type: draw.INIT})
  }

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

    return () => {
      /** useEffect clean */
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);

      canvas.removeEventListener('touchstart', startTouch);
      canvas.removeEventListener('touchmove', touch);
      canvas.removeEventListener('touchend', exitTouch);
    };
  }, [startPaint, paint, exitPaint]);

  return (
    <div className="canvas" >
      {
        userRole === 2?drawLine({x: originX, y: originY}, {x: newX, y: newY}):null
      }
      {
        drawStatus === 'CLEAR'?clearCanvas():null
      }
      <canvas ref={canvasRef} height={height} width={width} />
    </div>
  )
}

CanvasContainer.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default CanvasContainer
