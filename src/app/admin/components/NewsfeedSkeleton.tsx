'use client';

export default function NewsfeedSkeleton() {
  return (
    <div style={{
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Header Skeleton */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          height: '3rem',
          width: '250px',
          background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
          borderRadius: '8px',
          marginBottom: '0.5rem',
          animation: 'shimmer 2s infinite linear'
        }} />
        <div style={{
          height: '1.5rem',
          width: '400px',
          background: 'linear-gradient(90deg, rgba(209, 213, 219, 0.1) 0%, rgba(209, 213, 219, 0.2) 50%, rgba(209, 213, 219, 0.1) 100%)',
          borderRadius: '4px',
          animation: 'shimmer 2s infinite linear'
        }} />
      </div>

      {/* Action Buttons Skeleton */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          height: '3rem',
          width: '180px',
          background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
          borderRadius: '12px',
          animation: 'shimmer 2s infinite linear'
        }} />
        <div style={{
          height: '3rem',
          width: '150px',
          background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(34, 197, 94, 0.1) 100%)',
          borderRadius: '12px',
          animation: 'shimmer 2s infinite linear'
        }} />
      </div>

      {/* Filter Bar Skeleton */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(248, 223, 165, 0.3)',
        borderRadius: '20px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{
            height: '2.5rem',
            width: '200px',
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.3) 100%)',
            borderRadius: '8px',
            animation: 'shimmer 2s infinite linear'
          }} />
          <div style={{
            height: '2.5rem',
            width: '120px',
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.3) 100%)',
            borderRadius: '8px',
            animation: 'shimmer 2s infinite linear'
          }} />
          <div style={{
            height: '2.5rem',
            width: '100px',
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.3) 100%)',
            borderRadius: '8px',
            animation: 'shimmer 2s infinite linear'
          }} />
        </div>
      </div>

      {/* News Items Skeleton */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(248, 223, 165, 0.3)',
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        {/* Table Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(248, 223, 165, 0.3)',
          background: 'rgba(248, 223, 165, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            height: '1.5rem',
            width: '200px',
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.2) 0%, rgba(248, 223, 165, 0.3) 50%, rgba(248, 223, 165, 0.2) 100%)',
            borderRadius: '4px',
            animation: 'shimmer 2s infinite linear'
          }} />
          <div style={{
            height: '1rem',
            width: '80px',
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
            borderRadius: '4px',
            animation: 'shimmer 2s infinite linear'
          }} />
        </div>

        {/* Table Rows */}
        <div style={{ overflowX: 'auto' }}>
          {[...Array(8)].map((_, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 100px 100px 120px 150px',
              gap: '1rem',
              padding: '1.5rem',
              borderBottom: index < 7 ? '1px solid rgba(248, 223, 165, 0.1)' : 'none',
              alignItems: 'center'
            }}>
              {/* Title & Content */}
              <div style={{ minWidth: '250px' }}>
                <div style={{
                  height: '1.2rem',
                  width: '80%',
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  animation: 'shimmer 2s infinite linear'
                }} />
                <div style={{
                  height: '1rem',
                  width: '60%',
                  background: 'linear-gradient(90deg, rgba(209, 213, 219, 0.1) 0%, rgba(209, 213, 219, 0.2) 50%, rgba(209, 213, 219, 0.1) 100%)',
                  borderRadius: '4px',
                  animation: 'shimmer 2s infinite linear'
                }} />
              </div>

              {/* Status */}
              <div style={{
                height: '1.5rem',
                width: '80px',
                background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(34, 197, 94, 0.1) 100%)',
                borderRadius: '12px',
                animation: 'shimmer 2s infinite linear'
              }} />

              {/* Category */}
              <div style={{
                height: '1.2rem',
                width: '70px',
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 100%)',
                borderRadius: '12px',
                animation: 'shimmer 2s infinite linear'
              }} />

              {/* Priority */}
              <div style={{
                height: '1.2rem',
                width: '60px',
                background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.2) 50%, rgba(245, 158, 11, 0.1) 100%)',
                borderRadius: '12px',
                animation: 'shimmer 2s infinite linear'
              }} />

              {/* Date */}
              <div style={{
                height: '1rem',
                width: '90px',
                background: 'linear-gradient(90deg, rgba(209, 213, 219, 0.1) 0%, rgba(209, 213, 219, 0.2) 50%, rgba(209, 213, 219, 0.1) 100%)',
                borderRadius: '4px',
                animation: 'shimmer 2s infinite linear'
              }} />

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{
                  height: '2rem',
                  width: '60px',
                  background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 100%)',
                  borderRadius: '8px',
                  animation: 'shimmer 2s infinite linear'
                }} />
                <div style={{
                  height: '2rem',
                  width: '60px',
                  background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.2) 50%, rgba(239, 68, 68, 0.1) 100%)',
                  borderRadius: '8px',
                  animation: 'shimmer 2s infinite linear'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <div style={{
          height: '2.5rem',
          width: '80px',
          background: 'linear-gradient(90deg, rgba(107, 114, 128, 0.1) 0%, rgba(107, 114, 128, 0.2) 50%, rgba(107, 114, 128, 0.1) 100%)',
          borderRadius: '8px',
          animation: 'shimmer 2s infinite linear'
        }} />
        <div style={{
          height: '1rem',
          width: '120px',
          background: 'linear-gradient(90deg, rgba(209, 213, 219, 0.1) 0%, rgba(209, 213, 219, 0.2) 50%, rgba(209, 213, 219, 0.1) 100%)',
          borderRadius: '4px',
          animation: 'shimmer 2s infinite linear'
        }} />
        <div style={{
          height: '2.5rem',
          width: '80px',
          background: 'linear-gradient(90deg, rgba(107, 114, 128, 0.1) 0%, rgba(107, 114, 128, 0.2) 50%, rgba(107, 114, 128, 0.1) 100%)',
          borderRadius: '8px',
          animation: 'shimmer 2s infinite linear'
        }} />
      </div>

      {/* Shimmer Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
    </div>
  );
}