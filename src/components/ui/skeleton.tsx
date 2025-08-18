import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Enhanced skeleton components for pagodas page
function PagodaCardSkeleton() {
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-amber-100/50">
      {/* Image skeleton */}
      <div className="relative h-72">
        <Skeleton className="w-full h-full" />
        {/* Badge skeletons */}
        <div className="absolute top-4 right-4">
          <Skeleton className="w-20 h-8 rounded-full" />
        </div>
        <div className="absolute top-4 left-4">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <div className="absolute bottom-4 right-4">
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-8">
        <Skeleton className="w-3/4 h-8 mb-4" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-2/3 h-4 mb-6" />
        <Skeleton className="w-full h-20 rounded-2xl" />
      </div>
    </div>
  )
}

function HeroSkeleton() {
  return (
    <div className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        <Skeleton className="w-96 h-20 mx-auto mb-6" />
        <Skeleton className="w-24 h-1 mx-auto mb-8" />
        <Skeleton className="w-3/4 h-8 mx-auto" />
      </div>
    </div>
  )
}

export { Skeleton, PagodaCardSkeleton, HeroSkeleton }
