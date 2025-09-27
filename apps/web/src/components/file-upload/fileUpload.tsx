import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileIcon,
  FileUpIcon,
  TrashIcon,
  UploadIcon,
  X,
  XCircleIcon
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Logo from '../logo/logo'
import cloud from '@/assets/upload_background.png'
import { useRouter, usePathname } from 'next/navigation'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isValidatingFile, setIsValidatingFile] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [isSavingMetadata, setIsSavingMetadata] = useState(false)
  const [active, setActive] = useState<'upload' | 'drive'>('upload')
  const router = useRouter()
  const pathname = usePathname()

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
    if (!selectedFile.name.endsWith('.xlsx')) {
      setValidationError('Please upload a valid file')
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
          'Invalid file format. Please ensure your file contains domain names in the first column.'
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
          console.error('Failed to update metadata', err)
          setUploadError('Something went wrong while saving your data.')
          setIsSavingMetadata(false)
        }
      }, 2000)
    }, 2000)
  }

  const handleActive = (id: string) => {
    if (id === 'drive') {
      setActive('drive')
    } else {
      setActive('upload')
    }
  }

  const handleBack = () => {
    // Implement your back navigation logic here
    console.log('Back button clicked')
    router.back()
  }

  return (
    <div className="w-full h-screen flex justify-center items-center text-6xl font-bold ">
      <div className="w-[35%] h-[55%] rounded-xl shadow-2xl backdrop-blur-2xl border flex flex-col justify-center items-center text-2xl font-bold px-3 py-2 gap-6 border-gray-200">
        <div className="w-full flex justify-between items-center pr-7">
          <Logo />
          <button onClick={() => handleBack()}>
            <X />
          </button>
        </div>

        <div className="w-full flex flex-row pl-10 gap-6 text-sm font-medium border-b text-gray-600 cursor-pointer">
          <div
            onClick={() => {
              handleActive('upload')
            }}
            className="flex flex-col gap-2"
          >
            <div className={` ${active === 'upload' ? 'text-[#1a73eB]' : ''}`}>
              Upload
            </div>
            <div
              className={` w-full h-0.5 rounded-t-sm ${active === 'upload' ? 'bg-[#1a73eB]' : ''}`}
            ></div>
          </div>
          <div
            onClick={() => {
              handleActive('drive')
            }}
            className="flex flex-col gap-2"
          >
            <div className={` ${active === 'drive' ? 'text-[#1a73eB]' : ''}`}>
              Google Drive
            </div>
            <div
              className={` w-full h-0.5 rounded-t-sm ${active === 'drive' ? 'bg-[#1a73eB]' : ''}`}
            ></div>
          </div>
        </div>

        {active === 'upload' ?
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full h-[90%] flex flex-col justify-center items-center gap-6 rounded-sm $ px-4 py-2 ${!file ? 'border-2 border-dashed' : 'border-2 border-dashed border-[#1a37eB]/40'} `}
          >
            <div className="flex flex-row justify-center items-center gap-3 bg-gray-100 px-3 py-2 rounded-sm mt-3">
              <UploadIcon className="text-black " size={16} />
              <p className="text-xs font-normal">
                Upload 1 supported file format: .csv, .xlsx Max 5 MB. A copy of
                the selected file will be uploaded.
              </p>
            </div>

            {!file ?
              <div className="w-full h-[80%] flex flex-col justify-center items-center gap-12">
                <UploadIcon className="text-[#1a37eB]" size={50} />
                <div className="text-center text-sm text-gray-500 font-normal px-10">
                  Drag and drop your file here, or
                  <label className="text-white bg-[#0f26ba]/90 text-sm font-semibold py-[8px] px-4 rounded-full cursor-pointer mx-1">
                    Browse
                    <input
                      type="file"
                      accept=".xlsx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            : <div className="w-full h-[80%] flex flex-col justify-center items-center gap-8">
                <div className="w-fit flex flex-row justify-center gap-10 items-center px-3 border border-gray-200 rounded-lg">
                  <div className="flex flex-row justify-center items-center gap-1 ">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <FileIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="w-fit flex flex-col justify-center text-base gap-1.5 items-start px-5 py-3">
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleRemoveFile}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <TrashIcon className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
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
                  <div className="mt-3 p-2 w-[80%] bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center gap-2">
                    <AlertCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    {validationError}
                  </div>
                )}
                {!isValidatingFile && !validationError && (
                  <div className="mt-3 p-2 w-[80%] bg-green-50 border border-green-200 text-green-700 rounded-md text-sm flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    File is valid and ready to upload
                  </div>
                )}
              </div>
            }
            {uploadError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center">
                <XCircleIcon className="h-5 w-5 mr-2" />
                {uploadError}
              </div>
            )}
          </div>
        : <div className="w-full h-[70%] flex flex-col justify-center items-center gap-6"></div>
        }

        <div className="mt-6 flex justify-end w-full h-fit px-8 mb-5">
          <button
            onClick={handleUpload}
            disabled={
              !file || isUploading || !!validationError || isValidatingFile
            }
            className={`px-3 py-1.5 rounded-[1.25rem] font-bold flex items-center text-sm
                  ${!file || isUploading || !!validationError || isValidatingFile ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3D3A92] hover:bg-[#2e2a9a] text-white '}`}
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </div>
    </div>
  )
}
