import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ScanLine, Upload, Camera, FileText, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

export function OCRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState('');
  const [solution, setSolution] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate OCR process
    await new Promise((r) => setTimeout(r, 2000));
    setScannedText(`Solve for x: 2x + 5 = 15

Step 1: Subtract 5 from both sides
2x + 5 - 5 = 15 - 5
2x = 10

Step 2: Divide both sides by 2
2x/2 = 10/2
x = 5`);
    setIsScanning(false);

    // Simulate AI solution
    setTimeout(() => {
      setSolution(`The equation 2x + 5 = 15 has been solved!

Answer: x = 5

Explanation:
1. First, we isolate the variable term (2x) by subtracting 5 from both sides
2. This gives us 2x = 10
3. Then we divide both sides by 2 to find x = 5

Check: 2(5) + 5 = 10 + 5 = 15 \u2713

Would you like me to explain this in Hindi or Telugu?`);
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleScan();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/25">
            <ScanLine className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">OCR Question Solver</h1>
            <p className="text-white/50">Upload or take a photo of handwritten questions. AI will solve them instantly.</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-accent" />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleScan(); }}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    dragOver ? 'border-accent bg-accent/10' : 'border-white/10 hover:border-accent/30 hover:bg-white/5'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Camera className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-white font-medium mb-1">Upload a photo of your question</p>
                  <p className="text-white/40 text-sm">Drag & drop or click to browse</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-white/50">JPG</span>
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-white/50">PNG</span>
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-white/50">WEBP</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full mt-4"
                  icon={isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanLine className="w-5 h-5" />}
                  onClick={handleScan}
                  loading={isScanning}
                >
                  {isScanning ? 'Scanning...' : 'Scan & Solve'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Supported Languages */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-warning" />
                  Supported Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada'].map((lang) => (
                    <span key={lang} className="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Extracted Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scannedText ? (
                  <div className="p-4 bg-primary/50 rounded-xl">
                    <pre className="text-white/80 text-sm font-mono whitespace-pre-wrap">{scannedText}</pre>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <FileText className="w-10 h-10 text-white/20 mx-auto mb-3" />
                    <p className="text-white/40">No text scanned yet</p>
                    <p className="text-white/30 text-sm">Upload an image to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {solution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card variant="accent" glow>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    AI Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-white/90 leading-relaxed whitespace-pre-wrap">{solution}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    Explain in Hindi
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
