import { MessageCircle, Bone, Mail, Stethoscope } from "lucide-react"

export function ProcessDiagram() {
  return (
    <div className="relative mx-auto max-w-2xl py-12">
      <div className="flex items-center justify-center">
        {/* Center message icon with enhanced gradient lines */}
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-[2px] w-48 -translate-y-1/2 -translate-x-full 
            bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-red-500/30 
            opacity-70 blur-sm" />
          <div className="absolute left-1/2 top-1/2 h-[2px] w-48 -translate-y-1/2 
            bg-gradient-to-r from-red-500/30 via-purple-500/20 to-blue-500/30 
            opacity-70 blur-sm" />
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <MessageCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Left icon with gradient overlay */}
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[200px]">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
            rounded-full opacity-50 blur-md" />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Bone className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Right icons with gradient overlays and adjusted spacing */}
      <div className="absolute left-1/2 top-[25%] translate-x-[150px]">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-red-500/20 
            rounded-full opacity-50 blur-md" />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Mail className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-[75%] translate-x-[150px]">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-red-500/20 to-blue-500/20 
            rounded-full opacity-50 blur-md" />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Stethoscope className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
