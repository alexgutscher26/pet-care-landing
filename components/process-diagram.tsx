import { MessageCircle, Bone, Mail, Stethoscope } from "lucide-react"

export function ProcessDiagram() {
  return (
    <div className="relative mx-auto max-w-5xl py-32">
      <div className="flex items-center justify-center">
        {/* Center message icon with enhanced bright gradient lines */}
        <div className="relative">
          {/* Left connecting line */}
          <div className="absolute left-1/2 top-1/2 h-[3px] w-72 -translate-y-1/2 -translate-x-full 
            bg-gradient-to-r from-blue-400/50 via-purple-500/40 to-red-400/50 
            opacity-90" />
          {/* Right connecting line */}
          <div className="absolute left-1/2 top-1/2 h-[3px] w-72 -translate-y-1/2 
            bg-gradient-to-r from-red-400/50 via-purple-500/40 to-blue-400/50 
            opacity-90" />
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <MessageCircle className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Left icon with brighter gradient overlay */}
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[300px]">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/40 to-purple-500/40 
            rounded-full opacity-70" />
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Bone className="h-7 w-7" />
          </div>
        </div>
      </div>

      {/* Right icons with brighter gradient overlays and adjusted spacing */}
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[300px]">
        <div className="relative">
          {/* Vertical connecting line to Stethoscope */}
          <div className="absolute left-1/2 top-[calc(100%+16px)] h-32 w-[3px]
            bg-gradient-to-b from-purple-500/40 to-red-400/40 
            opacity-70" />
          <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/40 to-red-400/40 
            rounded-full opacity-70" />
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Mail className="h-7 w-7" />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-[calc(50%+64px)] translate-x-[300px]">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-br from-red-400/40 to-blue-400/40 
            rounded-full opacity-70" />
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-muted">
            <Stethoscope className="h-7 w-7" />
          </div>
        </div>
      </div>
    </div>
  )
}
