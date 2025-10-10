'use client';

export default function DashboardSkeleton() {
  return (
    <div style={{
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Header Skeleton */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          height: '3rem',
          width: '300px',
          background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
          borderRadius: '8px',
          marginBottom: '0.5rem',
          animation: 'shimmer 2s infinite linear'
        }} />
        <div style={{
          height: '1.5rem',
          width: '500px',
          background: 'linear-gradient(90deg, rgba(209, 213, 219, 0.1) 0%, rgba(209, 213, 219, 0.2) 50%, rgba(209, 213, 219, 0.1) 100%)',
          borderRadius: '4px',
          marginBottom: '1rem',
          animation: 'shimmer 2s infinite linear'
        }} />

        {/* Update Button Skeleton */}
        <div style={{
          height: '3rem',
          width: '280px',
          background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.2) 50%, rgba(245, 158, 11, 0.1) 100%)',
          borderRadius: '0.5rem',
          animation: 'shimmer 2s infinite linear'
        }} />
      </div>

      {/* Stats Grid Skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[...Array(4)].map((_, index) => (
          <div key={index} style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            padding: '1.5rem'
          }}>
            {/* Icon and Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                borderRadius: '50%',
                animation: 'shimmer 2s infinite linear'
              }} />
              <div style={{
                width: '80px',
                height: '24px',
                background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(34, 197, 94, 0.1) 100%)',
                borderRadius: '12px',
                animation: 'shimmer 2s infinite linear'
              }} />
            </div>

            {/* Number */}
            <div style={{
              width: '120px',
              height: '2.5rem',
              background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              animation: 'shimmer 2s infinite linear'
            }} />

            {/* Label */}
            <div style={{
              width: '160px',
              height: '1rem',
              background: 'linear-gradient(90deg, rgba(209, 213, 219, 0.1) 0%, rgba(209, 213, 219, 0.2) 50%, rgba(209, 213, 219, 0.1) 100%)',
              borderRadius: '4px',
              animation: 'shimmer 2s infinite linear'
            }} />
          </div>
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Left Card - Top Crypto */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
              borderRadius: '4px',
              animation: 'shimmer 2s infinite linear'
            }} />
            <div style={{
              width: '200px',
              height: '20px',
              background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
              borderRadius: '4px',
              animation: 'shimmer 2s infinite linear'
            }} />
          </div>

          {/* Crypto Items */}
          {[...Array(5)].map((_, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem',
              background: 'rgba(248, 223, 165, 0.05)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(248, 223, 165, 0.1)',
              marginBottom: index < 4 ? '1rem' : '0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.2) 0%, rgba(248, 223, 165, 0.3) 50%, rgba(248, 223, 165, 0.2) 100%)',
                  borderRadius: '50%',
                  animation: 'shimmer 2s infinite linear'
                }} />
                <div>
                  <div style={{
                    width: '80px',
                    height: '14px',
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)',
                    borderRadius: '4px',
                    marginBottom: '4px',
                    animation: 'shimmer 2s infinite linear'
                  }} />
                  <div style={{
                    width: '40px',
                    height: '12px',
                    background: 'linear-gradient(90deg, rgba(209, 213, 219, 0.1) 0%, rgba(209, 213, 219, 0.2) 50%, rgba(209, 213, 219, 0.1) 100%)',
                    borderRadius: '4px',
                    animation: 'shimmer 2s infinite linear'
                  }} />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  width: '60px',
                  height: '14px',
                  background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  animation: 'shimmer 2s infinite linear'
                }} />
                <div style={{
                  width: '40px',
                  height: '12px',
                  background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(34, 197, 94, 0.1) 100%)',
                  borderRadius: '4px',
                  animation: 'shimmer 2s infinite linear'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Right Card - Exchange Performance */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: '1.5rem'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '200px',
              height: '20px',
              background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
              borderRadius: '4px',
              animation: 'shimmer 2s infinite linear'
            }} />
          </div>

          {/* Exchange Items */}
          {[...Array(8)].map((_, index) => (
            <div key={index} style={{
              padding: '0.75rem 1rem',
              borderBottom: index < 7 ? '1px solid rgba(248, 223, 165, 0.1)' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '4px'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                    borderRadius: '4px',
                    animation: 'shimmer 2s infinite linear'
                  }} />
                  <div style={{
                    width: '80px',
                    height: '14px',
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)',
                    borderRadius: '4px',
                    animation: 'shimmer 2s infinite linear'
                  }} />
                </div>
                <div style={{
                  width: '120px',
                  height: '12px',
                  background: 'linear-gradient(90deg, rgba(156, 163, 175, 0.1) 0%, rgba(156, 163, 175, 0.2) 50%, rgba(156, 163, 175, 0.1) 100%)',
                  borderRadius: '4px',
                  animation: 'shimmer 2s infinite linear'
                }} />
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px'
              }}>
                <div style={{
                  width: '40px',
                  height: '14px',
                  background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                  borderRadius: '4px',
                  animation: 'shimmer 2s infinite linear'
                }} />
                <div style={{
                  width: '30px',
                  height: '12px',
                  background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(34, 197, 94, 0.1) 100%)',
                  borderRadius: '4px',
                  animation: 'shimmer 2s infinite linear'
                }} />
              </div>
            </div>
          ))}
        </div>
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