// 'use client'

// import { useState, useRef } from 'react'
// import Image from 'next/image'

// export default function NiveaPosterGenerator() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         setError('Please select a valid image file')
//         return
//       }
      
//       // Validate file size (max 10MB)
//       if (file.size > 10 * 1024 * 1024) {
//         setError('File size must be less than 10MB')
//         return
//       }

//       setSelectedFile(file)
//       setError(null)
      
//       // Create preview URL
//       const url = URL.createObjectURL(file)
//       setPreviewUrl(url)
//     }
//   }

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault()
//     const file = event.dataTransfer.files?.[0]
//     if (file && file.type.startsWith('image/')) {
//       setSelectedFile(file)
//       const url = URL.createObjectURL(file)
//       setPreviewUrl(url)
//       setError(null)
//     }
//   }

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault()
//   }

//   const generateImage = async () => {
//     if (!selectedFile) return

//     setIsLoading(true)
//     setError(null)

//     try {
//       const formData = new FormData()
//       formData.append('file', selectedFile)

//       // Replace with your actual API endpoint
//       const response = await fetch('https://node.hivoco.com/upload', {
//         method: 'POST',
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error('Failed to generate poster')
//       }

//       const data = await response.json()
//       setGeneratedImageUrl(data.url) // Assuming API returns { s3Url: "..." }
//     } catch (err) {
//       setError("Please upload a valid photo.");
//       console.error('Error generating poster:', err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const resetUpload = () => {
//     setSelectedFile(null)
//     setPreviewUrl(null)
//     setGeneratedImageUrl(null)
//     setError(null)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//             Transform Your Photo
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-300 mb-2">
//             Create Stunning Nivea Posters
//           </p>
//           <p className="text-sm md:text-base text-gray-400">
//             Upload your image and watch it transform with beautiful Nivea products around it
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Upload Section */}
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold mb-4">Upload Your Image</h2>
            
//             {/* File Upload Area */}
//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                 selectedFile
//                   ? 'border-green-500 bg-green-500/10'
//                   : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
//               }`}
//             >
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileSelect}
//                 className="hidden"
//               />
              
//               {previewUrl ? (
//                 <div className="space-y-4">
//                   <div className="relative w-full h-64 mx-auto">
//                     <Image
//                       src={previewUrl}
//                       alt="Preview"
//                       fill
//                       className="object-contain rounded-lg"
//                     />
//                   </div>
//                   <p className="text-green-400 font-medium">
//                     ✓ Image ready for transformation
//                   </p>
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="text-blue-400 hover:text-blue-300 underline"
//                   >
//                     Choose different image
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="text-6xl text-gray-500 mb-4">📷</div>
//                   <div>
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//                     >
//                       Choose Image
//                     </button>
//                     <p className="text-gray-400 mt-2">
//                       or drag and drop your image here
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     Supports JPG, PNG, GIF (max 10MB)
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
//                 <p className="text-red-300">{error}</p>
//               </div>
//             )}

//             {/* Generate Button */}
//             <button
//               onClick={generateImage}
//               disabled={!selectedFile || isLoading}
//               className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
//                 !selectedFile || isLoading
//                   ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
//               }`}
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   <span>Generating Your Nivea Poster...</span>
//                 </div>
//               ) : (
//                 'Generate Nivea Poster ✨'
//               )}
//             </button>

//             {selectedFile && !isLoading && (
//               <button
//                 onClick={resetUpload}
//                 className="w-full py-2 px-4 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
//               >
//                 Start Over
//               </button>
//             )}
//           </div>

//           {/* Result Section */}
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold mb-4">Your Nivea Poster</h2>
            
//             <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 h-96 flex items-center justify-center">
//               {generatedImageUrl ? (
//                 <div className="relative w-full h-full">
//                   <Image
//                     src={generatedImageUrl}
//                     alt="Generated Nivea Poster"
//                     fill
//                     className="object-contain rounded-lg"
//                   />
//                 </div>
//               ) : isLoading ? (
//                 <div className="text-center space-y-4">
//                   <div className="animate-pulse">
//                     <div className="text-4xl mb-4">🎨</div>
//                     <p className="text-gray-300">Creating your masterpiece...</p>
//                     <p className="text-sm text-gray-500">This may take a few moments</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center text-gray-500">
//                   <div className="text-4xl mb-4">✨</div>
//                   <p>Your generated poster will appear here</p>
//                 </div>
//               )}
//             </div>

//             {generatedImageUrl && (
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <a
//                   href={generatedImageUrl}
//                   download="nivea-poster.jpg"
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors"
//                 >
//                   Download Poster
//                 </a>
//                 <button
//                   onClick={resetUpload}
//                   className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
//                 >
//                   Create Another
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Features */}
//         <div className="mt-16 text-center">
//           <h3 className="text-xl font-semibold mb-6 text-gray-300">Why Choose Our Poster Generator?</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
//               <div className="text-3xl mb-3">🚀</div>
//               <h4 className="font-semibold mb-2">Lightning Fast</h4>
//               <p className="text-sm text-gray-400">Generate your poster in seconds with our AI-powered technology</p>
//             </div>
//             <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
//               <div className="text-3xl mb-3">🎯</div>
//               <h4 className="font-semibold mb-2">Perfect Integration</h4>
//               <p className="text-sm text-gray-400">Seamlessly blend Nivea products with your image</p>
//             </div>
//             <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
//               <div className="text-3xl mb-3">📱</div>
//               <h4 className="font-semibold mb-2">Mobile Friendly</h4>
//               <p className="text-sm text-gray-400">Works perfectly on all devices and screen sizes</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function NiveaPosterGenerator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("nivea_auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Check credentials
    if (loginEmail === "admin@hivoco.com" && loginPassword === "ad#@89") {
      setIsAuthenticated(true);
      setShowLogin(false);
      localStorage.setItem("nivea_auth", "authenticated");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
    localStorage.removeItem("nivea_auth");
    // Reset form states
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
    resetUpload();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const generateImage = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Replace with your actual API endpoint
      const response = await fetch("https://node.hivoco.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate poster");
      }

      const data = await response.json();
      setGeneratedImageUrl(data.url); // Assuming API returns { s3Url: "..." }
    } catch (err) {
      setError("Please upload a valid photo.");
      console.error("Error generating poster:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setGeneratedImageUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Login Modal Component
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome</h2>
          <p className="text-gray-400">
            Please login to access Nivea Poster Generator
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          {loginError && (
            <div className="bg-red-900/50 border border-red-700 rounded-md p-3">
              <p className="text-red-300 text-sm">{loginError}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );

  // Show login modal if not authenticated
  if (showLogin && !isAuthenticated) {
    return <LoginModal />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Logout */}
        <div className="text-center mb-12 relative">
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Logout
          </button>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Transform Your Photo
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Create Stunning Nivea Posters
          </p>
          <p className="text-sm md:text-base text-gray-400">
            Upload your image and watch it transform with beautiful Nivea
            products around it
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Upload Your Image</h2>

            {/* File Upload Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                selectedFile
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-600 hover:border-gray-500 bg-gray-800/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {previewUrl ? (
                <div className="space-y-4">
                  <div className="relative w-full h-64 mx-auto">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-green-400 font-medium">
                    ✓ Image ready for transformation
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Choose different image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl text-gray-500 mb-4">📷</div>
                  <div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Choose Image
                    </button>
                    <p className="text-gray-400 mt-2">
                      or drag and drop your image here
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG, GIF (max 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateImage}
              disabled={!selectedFile || isLoading}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                !selectedFile || isLoading
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Your Nivea Poster...</span>
                </div>
              ) : (
                "Generate Nivea Poster ✨"
              )}
            </button>

            {selectedFile && !isLoading && (
              <button
                onClick={resetUpload}
                className="w-full py-2 px-4 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
              >
                Start Over
              </button>
            )}
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Your Nivea Poster</h2>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 h-96 flex items-center justify-center">
              {generatedImageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={generatedImageUrl}
                    alt="Generated Nivea Poster"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              ) : isLoading ? (
                <div className="text-center space-y-4">
                  <div className="animate-pulse">
                    <div className="text-4xl mb-4">🎨</div>
                    <p className="text-gray-300">
                      Creating your masterpiece...
                    </p>
                    <p className="text-sm text-gray-500">
                      This may take a few moments
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">✨</div>
                  <p>Your generated poster will appear here</p>
                </div>
              )}
            </div>

            {generatedImageUrl && (
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={generatedImageUrl}
                  download="nivea-poster.jpg"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors"
                >
                  Download Poster
                </a>
                <button
                  onClick={resetUpload}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Create Another
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-300">
            Why Choose Our Poster Generator?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-semibold mb-2">Lightning Fast</h4>
              <p className="text-sm text-gray-400">
                Generate your poster in seconds with our AI-powered technology
              </p>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2">Perfect Integration</h4>
              <p className="text-sm text-gray-400">
                Seamlessly blend Nivea products with your image
              </p>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold mb-2">Mobile Friendly</h4>
              <p className="text-sm text-gray-400">
                Works perfectly on all devices and screen sizes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}