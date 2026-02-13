export default function Loading() {
  return (
    <div className="min-h-screen bg-navy-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Header skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-8 w-32 bg-white/5 rounded-lg mx-auto mb-4" />
          <div className="h-12 w-96 bg-white/10 rounded-xl mx-auto mb-4" />
          <div className="h-6 w-[500px] bg-white/5 rounded-lg mx-auto" />
        </div>
        
        {/* Grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                <div className="h-12 w-12 bg-gold-500/10 rounded-xl mb-4" />
                <div className="h-6 w-3/4 bg-white/10 rounded-lg mb-2" />
                <div className="h-4 w-full bg-white/5 rounded-lg mb-4" />
                <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
