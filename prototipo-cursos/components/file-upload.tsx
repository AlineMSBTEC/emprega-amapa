"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, X, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import { validateFile } from "@/lib/validations"

interface UploadedFile {
  file: File
  name: string
  size: number
  type: string
  error?: string
}

interface FileUploadProps {
  requiredDocuments: string[]
  onFilesChange: (files: File[]) => void
}

export function FileUpload({ requiredDocuments, onFilesChange }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    const newFiles: UploadedFile[] = files.map((file) => {
      const validation = validateFile(file)
      return {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        error: validation.valid ? undefined : validation.error,
      }
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])
    onFilesChange([...uploadedFiles.map((f) => f.file), ...newFiles.map((f) => f.file)])

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    onFilesChange(newFiles.map((f) => f.file))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const validFiles = uploadedFiles.filter((f) => !f.error)
  const hasErrors = uploadedFiles.some((f) => f.error)

  return (
    <div className="space-y-4">
      {/* Required Documents List */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Documentos Necessários
        </h4>
        <ul className="space-y-1">
          {requiredDocuments.map((doc, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {doc}
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
          <p>
            <strong>Formatos aceitos:</strong> PDF, JPG, PNG
          </p>
          <p>
            <strong>Tamanho máximo:</strong> 5MB por arquivo
          </p>
        </div>
      </div>

      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Selecionar Arquivos
          </Button>
        </label>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">
              Arquivos Selecionados ({validFiles.length})
            </h4>
            {hasErrors && (
              <Badge variant="destructive" className="text-xs">
                Alguns arquivos têm erros
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  file.error
                    ? "bg-destructive/10 border-destructive/50"
                    : "bg-card"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {file.error ? (
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                    {file.error && (
                      <p className="text-xs text-destructive mt-1">{file.error}</p>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      {uploadedFiles.length === 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Você pode selecionar múltiplos arquivos de uma vez
        </p>
      )}
    </div>
  )
}