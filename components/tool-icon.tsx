import {
  FileImage,
  FileVideo,
  FileAudio,
  FileText,
  Archive,
  File,
  FileImageIcon as Jpg,
  PinIcon as Png,
  FileType,
  Video,
  Music,
  FileArchiveIcon as Zip,
  FileIcon as FilePdf,
} from "lucide-react"

interface ToolIconProps {
  type: string
  className?: string
}

export function ToolIcon({ type, className = "h-5 w-5" }: ToolIconProps) {
  switch (type.toLowerCase()) {
    case "image":
      return <FileImage className={className} />
    case "jpeg":
    case "jpg":
      return <Jpg className={className} />
    case "png":
      return <Png className={className} />
    case "webp":
      return <FileImage className={className} />
    case "gif":
      return <FileImage className={className} />
    case "video":
      return <FileVideo className={className} />
    case "mp4":
      return <Video className={className} />
    case "mov":
      return <FileVideo className={className} />
    case "avi":
      return <FileVideo className={className} />
    case "audio":
      return <FileAudio className={className} />
    case "mp3":
      return <Music className={className} />
    case "wav":
      return <FileAudio className={className} />
    case "document":
      return <FileText className={className} />
    case "pdf":
      return <FilePdf className={className} />
    case "docx":
      return <FileType className={className} />
    case "pptx":
      return <FileType className={className} />
    case "xlsx":
      return <FileType className={className} />
    case "archive":
      return <Archive className={className} />
    case "zip":
      return <Zip className={className} />
    case "rar":
      return <Archive className={className} />
    case "7z":
      return <Archive className={className} />
    default:
      return <File className={className} />
  }
}
