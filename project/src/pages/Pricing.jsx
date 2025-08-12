export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e1f3f4" }}>
      <div className="px-12 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with decorative lines */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-1 mr-8" style={{ backgroundColor: "#7b3b3b" }}></div>
              <h1 className="text-5xl font-bold px-8" style={{ color: "#7b3b3b" }}>
                Pricing
              </h1>
              <div className="flex-1 h-1 ml-8" style={{ backgroundColor: "#7b3b3b" }}></div>
            </div>
            <p className="text-xl" style={{ color: "#7b3b3b" }}>
              View our plans, ranging from free to premium
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Plan */}
            <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: "#b9d7d9" }}>
              <h2 className="text-2xl font-bold text-center mb-4 underline" style={{ color: "#7b3b3b" }}>
                Free
              </h2>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold" style={{ color: "#7b3b3b" }}>
                  $0
                </span>
              </div>
              <div className="border-b-2 mb-4" style={{ borderColor: "#7b3b3b" }}></div>
              <p className="text-center" style={{ color: "#7b3b3b" }}>
                Bulleted list of features they now have access to
              </p>
            </div>

            {/* Standard Plan */}
            <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: "#b9d7d9" }}>
              <h2 className="text-2xl font-bold text-center mb-4 underline" style={{ color: "#7b3b3b" }}>
                Standard
              </h2>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold" style={{ color: "#7b3b3b" }}>
                  $50
                </span>
              </div>
              <div className="border-b-2 mb-4" style={{ borderColor: "#7b3b3b" }}></div>
              <p className="text-center" style={{ color: "#7b3b3b" }}>
                Bulleted list of features they now have access to
              </p>
            </div>

            {/* Premium Plan */}
            <div className="rounded-2xl p-8 shadow-lg relative" style={{ backgroundColor: "#b9d7d9" }}>
              {/* Star decoration */}
              <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center text-3xl">⭐</div>
              <h2 className="text-2xl font-bold text-center mb-4 underline" style={{ color: "#7b3b3b" }}>
                Premium
              </h2>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold" style={{ color: "#7b3b3b" }}>
                  $100
                </span>
              </div>
              <div className="border-b-2 mb-4" style={{ borderColor: "#7b3b3b" }}></div>
              <p className="text-center" style={{ color: "#7b3b3b" }}>
                Bulleted list of features they now have access to
              </p>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="w-full h-1" style={{ backgroundColor: "#7b3b3b" }}></div>
        </div>
      </div>
    </div>
  )
}
