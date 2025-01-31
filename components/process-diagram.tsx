import { MessageCircle, Bone, Mail, Stethoscope } from "lucide-react"

export function ProcessDiagram() {
  return (
    <div className="relative mx-auto max-w-2xl py-24">
      <div className="flex items-center justify-center">
        {/* Center message icon with enhanced bright gradient lines */}
        <div className="relative">
          {/* Left connecting line */}
          <div className="absolute left-1/2 top-1/2 h-[2px] w-48 -translate-y-1/2 -translate-x-full 
            bg-gradient-to-r from-blue-400/50 via-purple-500/40 to-red-400/50 
            opacity-90" />
          {/* Right connecting line */}
          <div className="absolute left-1/2 top-1/2 h-[2px] w-48 -translate-y-1/2 
            bg-gradient-to-r from-red-400/50 via-purple-500/40 to-blue-400/50 
            opacity-90" />
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <MessageCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Left icon with brighter gradient overlay */}
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[200px]">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/40 to-purple-500/40 
            rounded-full opacity-70" />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Bone className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Right icons with brighter gradient overlays and adjusted spacing */}
      <div className="absolute left-1/2 top-[35%] translate-x-[150px]">
        <div className="relative">
          {/* Vertical connecting line to Stethoscope */}
          <div className="absolute left-1/2 top-[100%] h-24 w-[2px]
            bg-gradient-to-b from-purple-500/40 to-red-400/40 
            opacity-70" />
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/40 to-red-400/40 
            rounded-full opacity-70" />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Mail className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-[65%] translate-x-[150px]">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-red-400/40 to-blue-400/40 
            rounded-full opacity-70" />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Stethoscope className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
