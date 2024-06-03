"use client";
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Component() {
  // Initialize state with an empty array of textual inputs
  const [textualInputs, setTextualInput] = useState<string[]>([]);
  // addedInput is the value of the textarea. The function setAddedInput is used to update the value of the textarea.
  const [addedInput, setAddedInput] = useState<string>("");

  // State to manage the current image
  const [currentImage, setCurrentImage] = useState<string>("/assets/model1.jpg");

  // State to manage the visibility of the canvas
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  // Reference to the canvas and image
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // State to manage drawing
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [canvasContext, setCanvasContext] = useState(null);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      setCanvasContext(ctx);
    }
  }, [showCanvas]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    setLastPosition({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  };
  
  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const currentPosition = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
    if (canvasContext) {
      canvasContext.beginPath();
      canvasContext.moveTo(lastPosition.x, lastPosition.y);
      canvasContext.lineTo(currentPosition.x, currentPosition.y);
      canvasContext.strokeStyle = "black";
      canvasContext.lineWidth = 4;
      canvasContext.stroke();
      setLastPosition(currentPosition);
    }
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleToggleCanvas = () => {
    const canvas = canvasRef.current;
    if (showCanvas) {
      if (canvas) {
        canvas.classList.add('fade-out');
        setTimeout(() => {
          setShowCanvas(false);
          canvas.classList.remove('fade-out');
        }, 300); // Match the duration of the CSS transition
      }
    } else {
      setShowCanvas(true);
      if (canvas) {
        canvas.classList.remove('fade-out');
      }
    }
  };  

  const clearCanvas = () => {
    if (canvasContext) {
      canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    }
  };

  // Event handler to add a new textual input
  const handleAddTextualInputClick = () => {
    // Ensure the text is not empty
    if (addedInput.trim()) {
      setTextualInput([...textualInputs, addedInput]);
      // Clear the textarea after adding
      setAddedInput("");
    }
  };

  // Event handler to change the current image
  const handleImageChange = (newImage: string) => {
    setCurrentImage(newImage);
    setShowCanvas(false); // Hide canvas when image changes
  };

  // Event handler to remove a textual input
  const handleRemoveTextualInput = (index: number) => {
    setTextualInput(textualInputs.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-8">
            <div className="relative">
              <img
                ref={imgRef}
                alt="Model"
                className={`max-w-full h-auto rounded-lg ${showCanvas ? 'faded' : ''}`} // Apply faded class conditionally
                height={1024}
                src={currentImage}
                width={768}
                onLoad={() => {
                  if (canvasRef.current && imgRef.current) {
                    const canvas = canvasRef.current;
                    const img = imgRef.current;
                    canvas.width = img.clientWidth;
                    canvas.height = img.clientHeight;
                  }
                }}
              />
              {showCanvas && (
                <canvas
                ref={canvasRef}
                id="design-canvas"
                className={`absolute top-0 left-0 w-full h-full rounded-lg ${!showCanvas ? 'fade-out' : ''}`}
                style={{ display: showCanvas ? 'block' : 'none' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                />
              )}
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={() => handleImageChange("/assets/model1.jpg")}>
                <img
                  alt="Model 1"
                  className="rounded-md"
                  height={50}
                  src="/assets/model1.jpg"
                  style={{
                    aspectRatio: "40/50",
                    objectFit: "cover",
                  }}
                  width={40}
                />
              </Button>
              <Button size="icon" variant="outline" onClick={() => handleImageChange("/assets/model2.jpg")}>
                <img
                  alt="Model 2"
                  className="rounded-md"
                  height={50}
                  src="/assets/model2.jpg"
                  style={{
                    aspectRatio: "40/50",
                    objectFit: "cover",
                  }}
                  width={40}
                />
              </Button>
              <Button size="icon" variant="outline" onClick={() => handleImageChange("/assets/model3.jpg")}>
                <img
                  alt="Model 3"
                  className="rounded-md"
                  height={50}
                  src="/assets/model3.jpg"
                  style={{
                    aspectRatio: "40/50",
                    objectFit: "cover",
                  }}
                  width={40}
                />
              </Button>
              <Button size="icon" variant="outline" onClick={() => handleImageChange("/assets/model4.jpg")}>
                <img
                  alt="Model 4"
                  className="rounded-md"
                  height={50}
                  src="/assets/model4.jpg"
                  style={{
                    aspectRatio: "40/50",
                    objectFit: "cover",
                  }}
                  width={40}
                />
              </Button>
              <Button size="icon" variant="outline" onClick={() => handleImageChange("/assets/model5.jpg")}>
                <img
                  alt="Model 5"
                  className="rounded-md"
                  height={50}
                  src="/assets/model5.jpg"
                  style={{
                    aspectRatio: "40/50",
                    objectFit: "cover",
                  }}
                  width={40}
                />
              </Button>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Design Your Shirt</h1>
            <div className="space-y-4">
              <div>
                <Label htmlFor="text">Add Textual Input</Label>
                <div className="relative">
                  <Textarea className="w-full pr-12" id="text" value={addedInput} onChange={(e) => setAddedInput(e.target.value)} placeholder="Enter your text here..." rows={3} />
                  <Button className="absolute top-1/2 -translate-y-1/2 right-3" size="icon" variant="outline" onClick={handleAddTextualInputClick}>
                    <PlusIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="balloon-container space-y-2">
                {textualInputs.map((text, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between mb-2 balloon">
                    <span>{text}</span>
                    <Button
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemoveTextualInput(index)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div>
                <Label>Draw on the Shirt</Label>
                <div className="flex items-center justify-center">
                  <Button className="mr-2" size="icon" variant="outline" onClick={handleToggleCanvas}>
                    <PencilIcon className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={clearCanvas}>
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="balloon-container space-y-2" />
            <Button className="w-full">Generate Shirt Design</Button>
            <div className="flex items-center justify-center">
              <img
                alt="Latest Generated Design"
                className="rounded-lg"
                height={375}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/375",
                  objectFit: "cover",
                }}
                width={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
