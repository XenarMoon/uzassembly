export default function Loading() {
  return (
    <div className="min-h-screen bg-navy-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Header skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-8 w-32 bg-white/5 rounded-lg mx-auto mb-4" />
          <div className="h-12 w-[600px] bg-white/10 rounded-xl mx-auto mb-4" />
          <div className="h-6 w-[500px] bg-white/5 rounded-lg mx-auto" />
        </div>
        
        {/* Key facts skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10" />
              <div className="flex-1">
                <div className="h-6 w-12 bg-white/10 rounded mb-1" />
                <div className="h-3 w-20 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Team skeleton */}
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5">
                <div className="aspect-[3/4] bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
