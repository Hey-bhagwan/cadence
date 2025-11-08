// components/SkeletonLoader.tsx
export default function SkeletonLoader() {
    return (
        <div className="min-h-screen bg-[#F7FAFC] text-[#1A202C] font-inter">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-3 border-b border-gray-200 bg-white">
          <div className="h-6 w-24 shimmer rounded-md" />
          <div className="h-8 w-8 shimmer rounded-full" />
        </header>
  
        {/* Main Content */}
        <main className="grid grid-cols-12 gap-8 px-8 py-8">
          {/* LEFT COLUMN */}
          <section className="col-span-12 md:col-span-8 space-y-6">
            {/* Add Task Form Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
              <div className="h-5 w-32 shimmer rounded-md" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 shimmer rounded-lg col-span-2" />
                <div className="h-20 shimmer rounded-lg col-span-2" />
                <div className="h-10 shimmer rounded-lg" />
                <div className="h-10 shimmer rounded-lg" />
                <div className="h-10 shimmer rounded-lg col-span-2" />
              </div>
            </div>
  
            {/* Task View Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
              <div className="flex justify-end gap-3 mb-4">
                <div className="h-8 w-20 shimmer rounded-lg" />
                <div className="h-8 w-20 shimmer rounded-lg" />
              </div>
  
              {/* Mock Task Items */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 mb-4">
                  <div className="h-5 w-5 shimmer rounded-md" />
                  <div className="flex-1">
                    <div className="h-4 w-3/4 shimmer rounded-md mb-2" />
                    <div className="h-3 w-1/3 shimmer rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* RIGHT COLUMN */}
          <aside className="col-span-12 md:col-span-4 space-y-6">
            {/* Habit Insight */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
              <div className="h-5 w-40 shimmer rounded-md" />
              <div className="h-4 w-full shimmer rounded-md" />
              <div className="h-4 w-3/4 shimmer rounded-md" />
            </div>
  
            {/* AI Suggestion */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
              <div className="h-5 w-32 shimmer rounded-md" />
              <div className="h-4 w-full shimmer rounded-md" />
              <div className="h-4 w-2/3 shimmer rounded-md" />
            </div>
          </aside>
        </main>
      </div>
    );
  }