"use client";

import { Stage, Layer, Image, Text } from "react-konva";
import { useRef, useState, useEffect } from "react";
import useImage from "use-image";
import { MemeTemplate } from "@/types";

interface MemeEditorProps {
  template?: MemeTemplate;
  onSave?: (imageData: string, topText: string, bottomText: string) => void;
  initialTopText?: string;
  initialBottomText?: string;
  initialImageUrl?: string;
}

export default function MemeEditor({
  template,
  onSave,
  initialTopText = "",
  initialBottomText = "",
  initialImageUrl,
}: MemeEditorProps) {
  const [imageUrl, setImageUrl] = useState<string>(
    initialImageUrl || template?.imageUrl || ""
  );
  const [topText, setTopText] = useState(initialTopText);
  const [bottomText, setBottomText] = useState(initialBottomText);
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);

  const stageRef = useRef<any>(null);
  const [image] = useImage(imageUrl);

  useEffect(() => {
    if (template) {
      setImageUrl(template.imageUrl);
      setTopText("");
      setBottomText("");
    }
  }, [template]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    if (!stageRef.current || !onSave) return;

    const dataURL = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/png",
    });
    onSave(dataURL, topText, bottomText);
  };

  const canvasWidth = 600;
  const canvasHeight = image ? (image.height / image.width) * canvasWidth : 400;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Top Text
          </label>
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="Top text..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bottom Text
          </label>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="Bottom text..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Font Size: {fontSize}px
          </label>
          <input
            type="range"
            min="24"
            max="96"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Text Color
          </label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Stroke Color
          </label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Stroke Width: {strokeWidth}px
          </label>
          <input
            type="range"
            min="0"
            max="8"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </div>
      </div>

      <div className="flex justify-center rounded-lg border-2 border-gray-300 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800">
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          ref={stageRef}
          className="bg-white"
        >
          <Layer>
            {image && (
              <Image
                image={image}
                width={canvasWidth}
                height={canvasHeight}
                x={0}
                y={0}
              />
            )}
            {topText && (
              <Text
                text={topText}
                x={canvasWidth / 2}
                y={40}
                fontSize={fontSize}
                fill={textColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fontFamily="Impact"
                fontStyle="bold"
                align="center"
                offsetX={canvasWidth / 2}
                offsetY={fontSize / 2}
              />
            )}
            {bottomText && (
              <Text
                text={bottomText}
                x={canvasWidth / 2}
                y={canvasHeight - 60}
                fontSize={fontSize}
                fill={textColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fontFamily="Impact"
                fontStyle="bold"
                align="center"
                offsetX={canvasWidth / 2}
                offsetY={fontSize / 2}
              />
            )}
          </Layer>
        </Stage>
      </div>

      {onSave && (
        <button
          onClick={handleExport}
          disabled={!imageUrl}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Save Meme
        </button>
      )}
    </div>
  );
}

