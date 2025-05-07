"use client"

import { useEffect, useState } from "react"

export function TrustedBrands() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        if (prev <= -15) return 0
        return prev - 0.05
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-4 md:py-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
      </div>
      <div className="max-w-6xl mx-auto px-2 md:px-4 relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1]/10 to-[#EC4899]/10 text-[#6366F1] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            <span className="flex h-1.5 md:h-2 w-1.5 md:w-2">
              <span className="animate-ping absolute inline-flex h-1.5 md:h-2 w-1.5 md:w-2 rounded-full bg-[#6366F1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 md:h-2 w-1.5 md:w-2 bg-[#6366F1]"></span>
            </span>
            TRUSTED BY INDUSTRY LEADERS
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-[#6366F1] to-gray-900 bg-clip-text text-transparent mb-3 md:mb-4">
            Empowering Global Brands
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 px-4 md:px-0">
            Join thousands of leading companies who trust our AI-powered compression tools for their creative needs
          </p>
          <div className="relative mx-2 md:mx-4 bg-gradient-to-b from-transparent via-white/50 to-transparent p-0.5 rounded-xl md:rounded-2xl backdrop-blur-sm">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 rounded-l-xl md:rounded-l-2xl"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 rounded-r-xl md:rounded-r-2xl"></div>
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-white/30 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
              <div className="flex overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div
                  className="flex gap-12 items-center whitespace-nowrap"
                  style={{ transform: `translateX(${scrollPosition}%)` }}
                >
                  {[
                    {
                      name: "Adobe",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/220px-Adobe_Corporate_Logo.png",
                    },
                    {
                      name: "Microsoft",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/220px-Microsoft_logo_%282012%29.svg.png",
                    },
                    {
                      name: "Google",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/220px-Google_2015_logo.svg.png",
                    },
                    {
                      name: "Amazon",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/220px-Amazon_logo.svg.png",
                    },
                    {
                      name: "Apple",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/220px-Apple_logo_black.svg.png",
                    },
                    {
                      name: "Meta",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/220px-Meta_Platforms_Inc._logo.svg.png",
                    },
                    {
                      name: "IBM",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/220px-IBM_logo.svg.png",
                    },
                    {
                      name: "Intel",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/220px-Intel_logo_%282006-2020%29.svg.png",
                    },
                  ].map((brand, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-32 h-12 relative hover:scale-110 transition-transform duration-300 rounded-lg flex items-center justify-center"
                    >
                      <img
                        alt={`${brand.name} logo`}
                        fetchPriority={index < 4 ? "high" : undefined}
                        loading={index < 4 ? undefined : "lazy"}
                        width="128"
                        height="48"
                        className="object-contain w-full h-full"
                        src={brand.url || "/placeholder.svg"}
                      />
                    </div>
                  ))}
                  {/* Repeat the first few logos to create a seamless loop */}
                  {[
                    {
                      name: "Adobe",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/220px-Adobe_Corporate_Logo.png",
                    },
                    {
                      name: "Microsoft",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/220px-Microsoft_logo_%282012%29.svg.png",
                    },
                    {
                      name: "Google",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/220px-Google_2015_logo.svg.png",
                    },
                    {
                      name: "Amazon",
                      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/220px-Amazon_logo.svg.png",
                    },
                  ].map((brand, index) => (
                    <div
                      key={`repeat-${index}`}
                      className="flex-shrink-0 w-32 h-12 relative hover:scale-110 transition-transform duration-300 rounded-lg flex items-center justify-center"
                    >
                      <img
                        alt={`${brand.name} logo`}
                        loading="lazy"
                        width="128"
                        height="48"
                        className="object-contain w-full h-full"
                        src={brand.url || "/placeholder.svg"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center px-2 md:px-4">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                10K+
              </span>
              <span className="text-gray-600 text-[10px] md:text-xs mt-0.5 md:mt-1">Active Users</span>
            </div>
            <div className="flex flex-col items-center px-2 md:px-4">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                1M+
              </span>
              <span className="text-gray-600 text-[10px] md:text-xs mt-0.5 md:mt-1">Files Processed</span>
            </div>
            <div className="flex flex-col items-center px-2 md:px-4">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                99%
              </span>
              <span className="text-gray-600 text-[10px] md:text-xs mt-0.5 md:mt-1">Success Rate</span>
            </div>
            <div className="flex flex-col items-center px-2 md:px-4">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                24/7
              </span>
              <span className="text-gray-600 text-[10px] md:text-xs mt-0.5 md:mt-1">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
