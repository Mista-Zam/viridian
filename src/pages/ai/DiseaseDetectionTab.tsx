import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Bug, AlertTriangle, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { diseaseData } from '../../data/ai';

export default function DiseaseDetectionTab() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState<{ name: string; symptoms: string; treatment: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = () => {
    setDetecting(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * diseaseData.length);
      setResult(diseaseData[randomIdx]);
      setDetecting(false);
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Crop Image</h2>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/30 transition-colors"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {selectedImage ? (
                <div className="relative">
                  <img src={selectedImage} alt="Uploaded crop" className="max-h-64 mx-auto rounded-lg object-cover" />
                  <p className="text-sm text-gray-500 mt-2">Click to change image</p>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={28} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">Drag & drop an image here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                  <p className="text-xs text-gray-300 mt-3">Supports JPG, PNG, WEBP</p>
                </div>
              )}
            </div>
            {selectedImage && !result && (
              <Button
                onClick={handleDetect}
                loading={detecting}
                className="mt-4 w-full"
                size="lg"
                icon={<Bug size={18} />}
              >
                {detecting ? 'Analyzing...' : 'Detect Disease'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        {result ? (
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={22} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Detection Result</h2>
                  <p className="text-sm text-gray-500">Disease identified with high confidence</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-red-800 text-lg">{result.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Affected crops: {result.symptoms}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Stethoscope size={16} className="text-emerald-600" />
                  Symptoms
                </h4>
                <p className="text-sm text-gray-600">{result.symptoms}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Bug size={16} className="text-emerald-600" />
                  Treatment Recommendations
                </h4>
                <p className="text-sm text-gray-600">{result.treatment}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <ImageIcon size={48} className="text-gray-200 mb-3" />
              <p className="text-gray-400">Upload an image of your crop</p>
              <p className="text-sm text-gray-300 mt-1">to detect potential diseases</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
