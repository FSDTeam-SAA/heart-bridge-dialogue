import { CheckIcon } from "../shared/CheckIcon";
import React from "react";

const Upgrade = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Upgrade Your Plan</h1>
        <p className="text-gray-600 mb-2">
          Choose the plan that works best for you
        </p>
        <p>
          Current plan: <span className="text-pink-500 font-medium">Free</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Free Plan */}
        <div className="border border-pink-500 rounded-lg p-6 relative">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-pink-600">Free</h2>
            <div className="flex items-baseline mt-2">
              <span className="text-4xl font-bold text-pink-600">$0</span>
            </div>
            <p className="text-gray-600 mt-2">
              Basic access to relationship insights
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>10 messages per month</span>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>Basic relationship analysis</span>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>Text-based insights</span>
            </div>
          </div>

          <button className="w-full py-3 bg-gray-100 text-gray-600 rounded-md font-medium">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="border border-gray-200 rounded-lg p-6 relative">
          <div className="absolute -top-3 right-6 bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
            Recommended
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-pink-600">Pro</h2>
            <div className="flex items-baseline mt-2">
              <span className="text-4xl font-bold text-pink-600">$20</span>
              <span className="text-gray-600 ml-1">/month</span>
            </div>
            <p className="text-gray-600 mt-2">
              Enhanced insights for deeper understanding
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>250 messages per month</span>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>Advanced relationship analysis</span>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>Personalized recommendations</span>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>Priority support</span>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>Exclusive relationship resources</span>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>Early access to new features</span>
            </div>
          </div>

          <button className="w-full py-3 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition-colors">
            Upgrade
          </button>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        All subscriptions are billed monthly and can be canceled anytime. By
        upgrading, you agree to our terms of service and privacy policy.
      </p>
    </div>
  );
};

export default Upgrade;
