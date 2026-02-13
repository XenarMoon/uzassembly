export default function Loading() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block relative">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
          
          {/* Logo background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-gold-500/20 to-gold-600/20 rounded-lg" />
          </div>
        </div>
        
        <p className="mt-4 text-white/50 text-sm">Yuklanmoqda...</p>
      </div>
    </div>
  )
}
