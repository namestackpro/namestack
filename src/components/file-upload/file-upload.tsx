import { AlertCircleIcon, CheckCircleIcon, FileIcon, FileUpIcon, TrashIcon, UploadIcon, XCircleIcon } from "lucide-react"
import { useState, useEffect } from "react"




const fileUpload = () => {

    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [isValidatingFile, setIsValidatingFile] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [isSavingMetadata, setIsSavingMetadata] = useState(false)  

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }
    const handleDragLeave = () => {
        setIsDragging(false)
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelection(e.dataTransfer.files[0])
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0])
        }
    }

    const handleFileSelection = (selectedFile: File) => {
        // Check if file is CSV
        if (!selectedFile.name.endsWith('.csv')) {
        setValidationError('Please upload a CSV file')
        return
        }
        setFile(selectedFile)
        setValidationError('')
        setUploadError('')
        // Simulate file validation
        setIsValidatingFile(true)
        setTimeout(() => {
        setIsValidatingFile(false)
        // Randomly show validation error for demo purposes
        if (Math.random() > 0.7) {
            setValidationError(
            'Invalid file format. Please ensure your CSV contains domain names in the first column.',
            )
        }
        }, 1500)
    }

    const handleRemoveFile = () => {
    setFile(null)
    setValidationError('')
    setUploadError('')
  }

  const handleUpload = () => {
    if (!file) return
    if (validationError) return
    setIsUploading(true)
    setUploadError('')
    // Simulate upload process
    setTimeout(async () => {
      setIsUploading(false)
      // Randomly show upload error for demo purposes
      if (Math.random() > 0.8) {
        setUploadError('Upload failed. Please try again.')
        return
      }
      // Start processing
      setIsProcessing(true)
      // Simulate processing and redirect to dashboard
      setTimeout(async () => {
        setIsProcessing(false)
        try {
          // ✅ Save onboarding flag in Clerk metadata
          setIsSavingMetadata(true)
           // need to figure out how to save data here
          setIsSavingMetadata(false)
        } catch (err) {
          console.error("Failed to update metadata", err)
          setUploadError("Something went wrong while saving your data.")
          setIsSavingMetadata(false)
        }

      }, 2000)
    }, 2000)
  }




  return (
    <div className="w-full h-[100vh] border flex justify-center items-center text-6xl font-bold ">
        <div className=" xl:w-[50%] max-xl:w-[65%]  h-[70%] flex justify-between rounded-3xl backdrop-blur-md border-2 border-[#110f40] shadow-2xl bg-[#19183B]">
            <div className={`bg-transparent w-full rounded-l-3xl flex justify-center items-center max-lg:hidden `}> 

                <div className="p-3 flex flex-row  text-foreground font-bold text-xl gap-[.6rem] justify-center items-center">
                    <div className="rotate-[-45deg] ">
                        <div className="h-15 w-14 max-lg:h-10 max-lg:w-9 bg-[#D183C9] flex items-center justify-center rounded-r-full">
                            <div className="h-10 w-10   bg-[#FFEBF0] rounded-r-4xl border-4 border-[#19183B]"></div>
                        </div>
                    </div>
                    <span className='text-[#F1F1F9] flex flex-row justify-center items-end text-3xl'>Namestack</span>
                </div>  



            </div>


            <div id="float" className="w-full text-center py-8 flex flex-col rounded-3xl gap-16 justify-center items-center bg-[#f5f6f6] hover:translate-x-[-1rem] transition duration-800">   
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="md:text-3xl max-md:text-2xl font-black text-[#221e8f] mb-4">
                        Upload Your Domains
                    </h1>
                    <p className="text-gray-700 mb-6 text-sm w-[80%] ">
                        Upload a CSV file containing your domain names to start tracking
                        them.
                    </p>
                </div>
                {!file ? (
                    <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed w-[90%] h-[40%] rounded-lg p-2 text-center cursor-pointer flex justify-center items-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
                    >

                        <div className="bg-gray-400 w-[90%] text-base rounded-2xl h-[90%] flex flex-col font-normal justify-center items-center gap-6 py-2">
                            <FileUpIcon className="text-blue-600 h-8 w-8"/>
                            <div className="flex gap-1.5 flex-col justify-center items-center">
                                    <p className="text-gray-100 text-sm font-bold ">Drag & Drop your file here </p>
                                    <p className="text-sm uppercase font-bold">or</p> 
                                    <label className="bg-blue-500 w-fit hover:bg-blue-700 text-xs font-bold text-white py-2 px-4 rounded-lg cursor-pointer">
                                        Browse Files
                                        <input
                                            type="file"
                                            accept=".csv"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                            </div>
                            
                            
                        </div>
                   </div>
                ):(
                    <div className={`bg-gray-400 w-[78%] text-base rounded-2xl h-[33%] flex flex-col font-normal justify-center items-center gap-7 ${ uploadError ? 'py-4':'py-0'}`}>


                        <div className="border rounded-lg p-4 w-[80%] flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                                        <FileIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{file.name}</p>
                                        <p className="text-sm text-gray-500">
                                        {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                                <button
                                onClick={handleRemoveFile}
                                className="text-gray-500 hover:text-red-500"
                                >
                                <TrashIcon className="h-5 w-5 text-red-500" />
                                </button>
                            </div>

                            {isValidatingFile && (
                                <div className="mt-3 text-sm text-gray-600 flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        ></circle>
                                        <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Validating file...
                                </div>
                            )}
                            {validationError && (
                                <div className="mt-3 p-2 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-start">
                                    <AlertCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                    {validationError}
                                </div>
                            )}
                            {!isValidatingFile && !validationError && (
                                <div className="mt-3 p-2 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm flex items-center">
                                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                                    File is valid and ready to upload
                                </div>
                            )}
                        </div>

                    </div>
                )}
                {uploadError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center">
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    {uploadError}
                    </div>
                )}
                <div className="mt-6 flex justify-center w-fit h-fit  ">
                    <button
                    onClick={handleUpload}
                    disabled={
                        !file || isUploading || !!validationError || isValidatingFile
                    }
                    className={`
                        px-4 py-3.5 rounded-[1.25rem] font-bold flex items-center text-sm
                        ${!file || isUploading || !!validationError || isValidatingFile ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3D3A92] hover:bg-[#2e2a9a] text-white '}
                        `}
                    >
                        {isUploading && (
                            <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                >

                                </circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        )}
                    {isUploading ? 'Uploading...' : 'Upload and Process Domains'}
                    </button>
                </div>
                




            </div>

        </div>
    </div>
  )
}
export default fileUpload