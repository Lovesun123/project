export default function Pricing() {
  return (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div 
                className="h-1 flex-1 max-w-32"
                style={{ backgroundColor: '#7b3b3b' }}
              ></div>
              <h2 
                className="text-3xl font-bold mx-8"
                style={{ color: '#7b3b3b' }}
              >
                Pricing
              </h2>
              <div 
                className="h-1 flex-1 max-w-32"
                style={{ backgroundColor: '#7b3b3b' }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Free Plan */}
            <div 
              className="p-8 rounded-lg text-center space-y-6"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div>
                <h3 
                  className="text-2xl font-bold border-b-2 pb-2 inline-block"
                  style={{ 
                    color: '#7b3b3b',
                    borderColor: '#7b3b3b'
                  }}
                >
                  Free
                </h3>
              </div>
              <div>
                <span 
                  className="text-4xl font-bold"
                  style={{ color: '#7b3b3b' }}
                >
                  $0
                </span>
                <div 
                  className="h-1 mt-2"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
              </div>
              <p 
                className="text-base"
                style={{ color: '#7b3b3b' }}
              >
                Bulleted list of features they now have access to
              </p>
            </div>

            {/* Standard Plan */}
            <div 
              className="p-8 rounded-lg text-center space-y-6"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div>
                <h3 
                  className="text-2xl font-bold border-b-2 pb-2 inline-block"
                  style={{ 
                    color: '#7b3b3b',
                    borderColor: '#7b3b3b'
                  }}
                >
                  Standard
                </h3>
              </div>
              <div>
                <span 
                  className="text-4xl font-bold"
                  style={{ color: '#7b3b3b' }}
                >
                  $50
                </span>
                <div 
                  className="h-1 mt-2"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
              </div>
              <p 
                className="text-base"
                style={{ color: '#7b3b3b' }}
              >
                Bulleted list of features they now have access to
              </p>
            </div>

            {/* Premium Plan */}
            <div 
              className="p-8 rounded-lg text-center space-y-6"
              style={{ backgroundColor: '#b9d7d9' }}
            >
              <div>
                <h3 
                  className="text-2xl font-bold border-b-2 pb-2 inline-block"
                  style={{ 
                    color: '#7b3b3b',
                    borderColor: '#7b3b3b'
                  }}
                >
                  Premium
                </h3>
              </div>
              <div>
                <span 
                  className="text-4xl font-bold"
                  style={{ color: '#7b3b3b' }}
                >
                  $100
                </span>
                <div 
                  className="h-1 mt-2"
                  style={{ backgroundColor: '#7b3b3b' }}
                ></div>
              </div>
              <p 
                className="text-base"
                style={{ color: '#7b3b3b' }}
              >
                Bulleted list of features they now have access to
              </p>
            </div>
          </div>
        </div>
  );
}