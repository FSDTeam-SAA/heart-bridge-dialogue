import { useFormContext } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa6'
import React from 'react'

const Personalities = ({ handlePreviousStep, handleNextStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  // Add this CSS rule to ensure dropdowns work on mobile
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style')
      style.innerHTML = `
      @media (max-width: 768px) {
        select {
          -webkit-appearance: menulist !important;
          appearance: menulist !important;
          height: 40px !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1 !important;
          background-color: white !important;
          width: 100% !important;
        }
        .select-wrapper {
          position: relative;
          width: 100%;
        }
      }
    `
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])

  const loveLanguageData = [
    { id: 1, name: 'Words of Affirmation', value: 'Words of Affirmation' },
    { id: 2, name: 'Acts of Service', value: 'Acts of Service' },
    { id: 3, name: 'Gifts', value: 'Gifts' },
    { id: 4, name: 'Quality Time', value: 'Quality Time' },
    { id: 5, name: 'Physical Touch', value: 'Physical Touch' },
    { id: 6, name: 'Not Sure', value: 'Not Sure' },
  ]
  const communicationStyleData = [
    { id: 1, name: 'Direct', value: 'Direct' },
    { id: 2, name: 'Diplomatic', value: 'Diplomatic' },
    { id: 3, name: 'Reserved', value: 'Reserved' },
    { id: 4, name: 'Emotional', value: 'Emotional' },
    { id: 5, name: 'Not Sure', value: 'Not Sure' },
  ]
  const conflictStyleData = [
    { id: 1, name: 'Confrontational', value: 'Confrontational' },
    { id: 2, name: 'Avoidant', value: 'Avoidant' },
    { id: 3, name: 'Compromising', value: 'Compromising' },
    { id: 4, name: 'Collaborative', value: 'Collaborative' },
    { id: 5, name: 'Not Sure', value: 'Not Sure' },
  ]
  const attachmentStyleData = [
    { id: 1, name: 'Secure', value: 'Secure' },
    { id: 2, name: 'Anxious', value: 'Anxious' },
    { id: 3, name: 'Avoidant', value: 'Avoidant' },
    { id: 4, name: 'Fearful-Avoidant', value: 'Fearful-Avoidant' },
    { id: 5, name: 'Not Sure', value: 'Not Sure' },
  ]

  return (
    <div className="w-full md:w-4/5 mx-auto pb-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold leading-[36px] text-[#c02351] text-center">
        Personality details
      </h2>
      <p className="text-sm md:text-base font-normal leading-[24px] text-[#71717a] text-center pt-1">
        Understanding your relationship dynamics
      </p>

      <div className="border border-gray shadow-lg rounded-lg p-4 md:p-8 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Person 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-600 mb-2 md:hidden">
              Person 1
            </h3>
            <div>
              <label
                className="text-sm md:text-base font-medium leading-normal text-black block mb-2"
                htmlFor="loveLanguage1"
              >
                Love Language <span className="text-red-500">*</span>
              </label>
              <select
                id="loveLanguage1"
                {...register('loveLanguage1', {
                  required: 'This field is required',
                })}
                className="w-full h-10 border border-gray-300 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Love Language
                </option>
                {loveLanguageData?.map((data) => (
                  <option key={data?.id} value={data?.value}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {errors?.loveLanguage1 && (
                <p className="text-xs md:text-sm text-red-500 mt-1">
                  {errors.loveLanguage1.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm md:text-base font-medium leading-normal text-black block mb-2"
                htmlFor="communicationStyle1"
              >
                Communication Style <span className="text-red-500">*</span>
              </label>
              <select
                id="communicationStyle1"
                {...register('communicationStyle1', {
                  required: 'This field is required',
                })}
                className="w-full h-10 border border-gray-300 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select communication style
                </option>
                {communicationStyleData?.map((data) => (
                  <option key={data?.id} value={data?.value}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {errors?.communicationStyle1 && (
                <p className="text-xs md:text-sm text-red-500 mt-1">
                  {errors.communicationStyle1.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm md:text-base font-medium leading-normal text-black block mb-2"
                htmlFor="conflictStyle1"
              >
                Conflict Style <span className="text-red-500">*</span>
              </label>
              <select
                id="conflictStyle1"
                {...register('conflictStyle1', {
                  required: 'This field is required',
                })}
                className="w-full h-10 border border-gray-300 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select conflict style
                </option>
                {conflictStyleData?.map((data) => (
                  <option key={data?.id} value={data?.value}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {errors?.conflictStyle1 && (
                <p className="text-xs md:text-sm text-red-500 mt-1">
                  {errors.conflictStyle1.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm md:text-base font-medium leading-normal text-black block mb-2"
                htmlFor="attachmentStyle1"
              >
                Attachment Style <span className="text-red-500">*</span>
              </label>
              <select
                id="attachmentStyle1"
                {...register('attachmentStyle1', {
                  required: 'This field is required',
                })}
                className="w-full h-10 border border-gray-300 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select attachment style
                </option>
                {attachmentStyleData?.map((data) => (
                  <option key={data?.id} value={data?.value}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {errors?.attachmentStyle1 && (
                <p className="text-xs md:text-sm text-red-500 mt-1">
                  {errors.attachmentStyle1.message}
                </p>
              )}
            </div>
          </div>

          {/* Person 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-600 mb-2 md:hidden">
              Person 2
            </h3>
            <div>
              <label
                className="text-sm md:text-base font-medium leading-normal text-black block mb-2"
                htmlFor="loveLanguage2"
              >
                Love Language <span className="text-red-500">*</span>
              </label>
              <select
                id="loveLanguage2"
                {...register('loveLanguage2', {
                  required: 'This field is required',
                })}
                className="w-full h-10 border border-gray-300 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Love Language
                </option>
                {loveLanguageData?.map((data) => (
                  <option key={data?.id} value={data?.value}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {errors?.loveLanguage2 && (
                <p className="text-xs md:text-sm text-red-500 mt-1">
                  {errors.loveLanguage2.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm md:text-base font-medium leading-normal text-black block mb-2"
                htmlFor="communicationStyle2"
              >
                Communication Style <span className="text-red-500">*</span>
              </label>
              <select
                id="communicationStyle2"
                {...register('communicationStyle2', {
                  required: 'This field is required',
                })}
                className="w-full h-10 border border-gray-300 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select communication style
                </option>
                {communicationStyleData?.map((data) => (
                  <option key={data?.id} value={data?.value}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {errors?.communicationStyle2 && (
                <p className="text-xs md:text-sm text-red-500 mt-1">
                  {errors.communicationStyle2.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm md:text-base font-medium leading-normal text-black block mb-2"
                htmlFor="conflictStyle2"
              >
                Conflict Style <span className="text-red-500">*</span>
              </label>
              <select
                id="conflictStyle2"
                {...register('conflictStyle2', {
                  required: 'This field is required',
                })}
                className="w-full h-10 border border-gray-300 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select conflict style
                </option>
                {conflictStyleData?.map((data) => (
                  <option key={data?.id} value={data?.value}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {errors?.conflictStyle2 && (
                <p className="text-xs md:text-sm text-red-500 mt-1">
                  {errors.conflictStyle2.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm md:text-base font-medium leading-normal text-black block mb-2"
                htmlFor="attachmentStyle2"
              >
                Attachment Style <span className="text-red-500">*</span>
              </label>
              <select
                id="attachmentStyle2"
                {...register('attachmentStyle2', {
                  required: 'This field is required',
                })}
                className="w-full h-10 border border-gray-300 py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select attachment style
                </option>
                {attachmentStyleData?.map((data) => (
                  <option key={data?.id} value={data?.value}>
                    {data?.name}
                  </option>
                ))}
              </select>
              {errors?.attachmentStyle2 && (
                <p className="text-xs md:text-sm text-red-500 mt-1">
                  {errors.attachmentStyle2.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full flex items-center justify-between px-0 md:px-4">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="bg-white text-black border border-gray rounded-lg py-2 px-4 md:px-5 text-sm md:text-base font-semibold leading-normal hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="bg-rose-500 flex items-center gap-2 text-white py-2 px-4 md:px-5 rounded-lg text-sm md:text-base font-semibold leading-normal hover:bg-rose-600 transition-colors"
        >
          Get Started <FaArrowRight className="mt-0.5" />
        </button>
      </div>
    </div>
  )
}

export default Personalities