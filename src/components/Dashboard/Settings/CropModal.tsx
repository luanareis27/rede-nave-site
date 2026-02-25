import Cropper from "react-easy-crop";
import { useState } from "react";

type Props = {
  image: string;
  onCancel: () => void;
  onSave: (croppedImage: string) => void;
};

export default function CropModal({ image, onCancel, onSave }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = (_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  async function generateCroppedImage() {
    if (!croppedAreaPixels) return;

    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = image;

    await new Promise((resolve) => (img.onload = resolve));

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    onSave(canvas.toDataURL("image/jpeg"));
  }

  return (
    <div className="crop-overlay">
      <div className="crop-modal">
        <h5>Ajustar foto</h5>

        <div className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(+e.target.value)}
        />

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-light" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={generateCroppedImage}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
