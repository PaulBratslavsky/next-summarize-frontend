"use client";
import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SwitchButton } from "@/components/custom/SwitchButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ImagePickerProps {
  id: string;
  name: string;
  label: string;
  showCard?: boolean;
  previewUrl?: string;
}

function generateDataUrl(file: File, callback: (imageUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result as string);
  reader.readAsDataURL(file);
}

function ImagePreview({ dataUrl }: { readonly dataUrl: string }) {
  return <img src={dataUrl} alt="preview" className="rounded-lg" />
}

function ImageCard({ dataUrl, fileInput }: {
  readonly dataUrl: string;
  readonly fileInput: React.RefObject<HTMLInputElement>;
  readonly cardView: boolean;
  readonly callback: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  
  const imagePreview = dataUrl 
    ? <ImagePreview dataUrl={dataUrl} />
    : <p>No image selected</p>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          {imagePreview}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="w-full"
        >
          Choose File
        </Button>
      </CardFooter>
    </Card>
  );
}



export default function ImagePicker({
  id,
  name,
  label,
  previewUrl,
  showCard,
}: Readonly<ImagePickerProps>) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(previewUrl || null);
  const [cardView, setCardView] = useState<boolean>(showCard || false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) generateDataUrl(file, setDataUrl);
  };

  return (
    <React.Fragment>
      <div className={cardView ? "hidden" : ""}>
        <Label htmlFor={name}>{label}</Label>
        <Input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          ref={fileInput}
          accept="image/*"
        />
      </div>
      {cardView && (
        <ImageCard
          dataUrl={dataUrl || ""}
          fileInput={fileInput}
          cardView={cardView}
          callback={setCardView}
        />
      )}
      <SwitchButton checked={cardView} callback={setCardView} />
    </React.Fragment>
  );
}
