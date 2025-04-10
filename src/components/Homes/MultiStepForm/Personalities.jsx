// import React, { useState } from 'react'
// import { useFormContext } from 'react-hook-form'
// import { FaArrowRight } from 'react-icons/fa6'

// const Personalities = ({ handlePreviousStep, handleNextStep }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext()

//   const loveLanguageData = [
//     {
//       id: 1,
//       name: 'Words of Affirmation',
//       value: 'Words of Affirmation',
//     },
//     {
//       id: 2,
//       name: 'Acts of Service',
//       value: 'Acts of Service',
//     },
//     {
//       id: 3,
//       name: 'Gifts',
//       value: 'Gifts',
//     },
//     {
//       id: 4,
//       name: 'Quality Time',
//       value: 'Quality Time',
//     },
//     {
//       id: 5,
//       name: 'Physical Touch',
//       value: 'Physical Touch',
//     },
//     {
//       id: 6,
//       name: 'Not Sure',
//       value: 'Not Sure',
//     },
//   ]
//   const communicationStyleData = [
//     {
//       id: 1,
//       name: 'Direct',
//       value: 'Direct',
//     },
//     {
//       id: 2,
//       name: 'Diplomatic',
//       value: 'Diplomatic',
//     },
//     {
//       id: 3,
//       name: 'Reserved',
//       value: 'Reserved',
//     },
//     {
//       id: 4,
//       name: 'Emotional',
//       value: 'Emotional',
//     },
//     {
//       id: 5,
//       name: 'Not Sure',
//       value: 'Not Sure',
//     },
//   ]
//   const conflictStyleData = [
//     {
//       id: 1,
//       name: 'Confrontational',
//       value: 'Confrontational',
//     },
//     {
//       id: 2,
//       name: 'Avoidant',
//       value: 'Avoidant',
//     },
//     {
//       id: 3,
//       name: 'Compromising',
//       value: 'Compromising',
//     },
//     {
//       id: 4,
//       name: 'Collaborative',
//       value: 'Collaborative',
//     },
//     {
//       id: 5,
//       name: 'Not Sure',
//       value: 'Not Sure',
//     },
//   ]
//   const attachmentStyleData = [
//     {
//       id: 1,
//       name: 'Secure',
//       value: 'Secure',
//     },
//     {
//       id: 2,
//       name: 'Anxious',
//       value: 'Anxious',
//     },
//     {
//       id: 3,
//       name: 'Avoidant',
//       value: 'Avoidant',
//     },
//     {
//       id: 4,
//       name: 'Fearful-Avoidant',
//       value: 'Fearful-Avoidant',
//     },
//     {
//       id: 5,
//       name: 'Not Sure',
//       value: 'Not Sure',
//     },
//   ]

//   return (
//     <div className="w-full md:w-4/5 mx-auto pb-10 px-4">
//       <h2 className="text-3xl font-bold leading-[36px] text-[#c02351] text-center">
//         Personality details
//       </h2>
//       <p className="text-base font-normal leading-[24px] text-[#71717a] text-center pt-1">
//         Understanding your relationship dynamics
//       </p>

//       {/* Container with padding for mobile */}
//       <div className="border border-gray shadow-lg rounded-lg p-4 md:p-8 mt-5">
//         {/* First section - Love Language */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-5">
//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="loveLanguage1"
//               >
//                 Love Language <span className="text-red-500">*</span>
//               </label>
//               <span className="text-sm font-medium text-gray-600">
//                 Person 1
//               </span>
//             </div>
//             <select
//               {...register('loveLanguage1', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select Love Language
//               </option>
//               {loveLanguageData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.loveLanguage1 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>

//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="loveLanguage2"
//               >
//                 Love Language <span className="text-red-500">*</span>
//               </label>
//               <span className="text-sm font-medium text-gray-600">
//                 Person 2
//               </span>
//             </div>
//             <select
//               {...register('loveLanguage2', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select Love Language
//               </option>
//               {loveLanguageData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.loveLanguage2 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Second section - Communication Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-5">
//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="communicationStyle1"
//               >
//                 Communication Style <span className="text-red-500">*</span>
//               </label>
//               <span className="text-sm font-medium text-gray-600">
//                 Person 1
//               </span>
//             </div>
//             <select
//               {...register('communicationStyle1', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select communication style
//               </option>
//               {communicationStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.communicationStyle1 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>

//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="communicationStyle2"
//               >
//                 Communication Style <span className="text-red-500">*</span>
//               </label>
//               <span className="text-sm font-medium text-gray-600">
//                 Person 2
//               </span>
//             </div>
//             <select
//               {...register('communicationStyle2', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select communication style
//               </option>
//               {communicationStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.communicationStyle2 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Third section - Conflict Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-5">
//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="conflictStyle1"
//               >
//                 Conflict Style <span className="text-red-500">*</span>
//               </label>
//               <span className="text-sm font-medium text-gray-600">
//                 Person 1
//               </span>
//             </div>
//             <select
//               {...register('conflictStyle1', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select conflict style
//               </option>
//               {conflictStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.conflictStyle1 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>

//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="conflictStyle2"
//               >
//                 Conflict Style <span className="text-red-500">*</span>
//               </label>
//               <span className="text-sm font-medium text-gray-600">
//                 Person 2
//               </span>
//             </div>
//             <select
//               {...register('conflictStyle2', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select conflict style
//               </option>
//               {conflictStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.conflictStyle2 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Fourth section - Attachment Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-5">
//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="attachmentStyle1"
//               >
//                 Attachment Style <span className="text-red-500">*</span>
//               </label>
//               <span className="text-sm font-medium text-gray-600">
//                 Person 1
//               </span>
//             </div>
//             <select
//               {...register('attachmentStyle1', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select relationship length
//               </option>
//               {attachmentStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.attachmentStyle1 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>

//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="attachmentStyle2"
//               >
//                 Attachment Style <span className="text-red-500">*</span>
//               </label>
//               <span className="text-sm font-medium text-gray-600">
//                 Person 2
//               </span>
//             </div>
//             <select
//               {...register('attachmentStyle2', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select relationship length
//               </option>
//               {attachmentStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.attachmentStyle2 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="mt-10 w-full flex items-center justify-between px-4">
//         <button
//           type="button"
//           onClick={handlePreviousStep}
//           className="bg-white text-black border border-gray rounded-lg py-2 px-5 text-base font-semibold leading-normal"
//         >
//           Back
//         </button>
//         <button
//           type="button"
//           onClick={handleNextStep}
//           className="bg-rose-500 flex items-center gap-2 text-white py-2 px-5 rounded-lg text-base font-semibold leading-normal"
//         >
//           Get Started <FaArrowRight className="mt-1" />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Personalities


// import React, { useState } from 'react'
// import { useFormContext } from 'react-hook-form'
// import { FaArrowRight } from 'react-icons/fa6'

// const Personalities = ({ handlePreviousStep, handleNextStep }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext()

//   const loveLanguageData = [
//     {
//       id: 1,
//       name: 'Words of Affirmation',
//       value: 'Words of Affirmation',
//     },
//     {
//       id: 2,
//       name: 'Acts of Service',
//       value: 'Acts of Service',
//     },
//     {
//       id: 3,
//       name: 'Gifts',
//       value: 'Gifts',
//     },
//     {
//       id: 4,
//       name: 'Quality Time',
//       value: 'Quality Time',
//     },
//     {
//       id: 5,
//       name: 'Physical Touch',
//       value: 'Physical Touch',
//     },
//     {
//       id: 6,
//       name: 'Not Sure',
//       value: 'Not Sure',
//     },
//   ]
//   const communicationStyleData = [
//     {
//       id: 1,
//       name: 'Direct',
//       value: 'Direct',
//     },
//     {
//       id: 2,
//       name: 'Diplomatic',
//       value: 'Diplomatic',
//     },
//     {
//       id: 3,
//       name: 'Reserved',
//       value: 'Reserved',
//     },
//     {
//       id: 4,
//       name: 'Emotional',
//       value: 'Emotional',
//     },
//     {
//       id: 5,
//       name: 'Not Sure',
//       value: 'Not Sure',
//     },
//   ]
//   const conflictStyleData = [
//     {
//       id: 1,
//       name: 'Confrontational',
//       value: 'Confrontational',
//     },
//     {
//       id: 2,
//       name: 'Avoidant',
//       value: 'Avoidant',
//     },
//     {
//       id: 3,
//       name: 'Compromising',
//       value: 'Compromising',
//     },
//     {
//       id: 4,
//       name: 'Collaborative',
//       value: 'Collaborative',
//     },
//     {
//       id: 5,
//       name: 'Not Sure',
//       value: 'Not Sure',
//     },
//   ]
//   const attachmentStyleData = [
//     {
//       id: 1,
//       name: 'Secure',
//       value: 'Secure',
//     },
//     {
//       id: 2,
//       name: 'Anxious',
//       value: 'Anxious',
//     },
//     {
//       id: 3,
//       name: 'Avoidant',
//       value: 'Avoidant',
//     },
//     {
//       id: 4,
//       name: 'Fearful-Avoidant',
//       value: 'Fearful-Avoidant',
//     },
//     {
//       id: 5,
//       name: 'Not Sure',
//       value: 'Not Sure',
//     },
//   ]

//   return (
//     <div className="w-full md:w-4/5 mx-auto pb-10 px-4">
//       <h2 className="text-3xl font-bold leading-[36px] text-[#c02351] text-center">
//         Personality details
//       </h2>
//       <p className="text-base font-normal leading-[24px] text-[#71717a] text-center pt-1">
//         Understanding your relationship dynamics
//       </p>

//       {/* Container with padding for mobile */}
//       <div className="border border-gray shadow-lg rounded-lg p-4 md:p-8 mt-5">
//         {/* Desktop section headers */}
//         <div className="hidden md:grid grid-cols-2 gap-8 mb-2">
//           <div className="col-span-1">
//             <span className="text-sm font-medium text-gray-600">Person 1</span>
//           </div>
//           <div className="col-span-1">
//             <span className="text-sm font-medium text-gray-600">Person 2</span>
//           </div>
//         </div>

//         {/* First section - Love Language */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-5">
//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="loveLanguage1"
//               >
//                 Love Language <span className="text-red-500">*</span>
//               </label>
//               <span className="md:hidden text-sm font-medium text-gray-600">
//                 Person 1
//               </span>
//             </div>
//             <select
//               {...register('loveLanguage1', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select Love Language
//               </option>
//               {loveLanguageData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.loveLanguage1 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>

//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="loveLanguage2"
//               >
//                 <span className="md:hidden">Love Language</span>
//                 <span className="hidden md:inline">
//                   Love Language <span className="text-red-500">*</span>
//                 </span>
//               </label>
//               <span className="md:hidden text-sm font-medium text-gray-600">
//                 Person 2
//               </span>
//             </div>
//             <select
//               {...register('loveLanguage2', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select Love Language
//               </option>
//               {loveLanguageData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.loveLanguage2 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Second section - Communication Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-5">
//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="communicationStyle1"
//               >
//                 Communication Style <span className="text-red-500">*</span>
//               </label>
//               <span className="md:hidden text-sm font-medium text-gray-600">
//                 Person 1
//               </span>
//             </div>
//             <select
//               {...register('communicationStyle1', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select communication style
//               </option>
//               {communicationStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.communicationStyle1 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>

//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="communicationStyle2"
//               >
//                 <span className="md:hidden">Communication Style</span>
//                 <span className="hidden md:inline">
//                   Communication Style <span className="text-red-500">*</span>
//                 </span>
//               </label>
//               <span className="md:hidden text-sm font-medium text-gray-600">
//                 Person 2
//               </span>
//             </div>
//             <select
//               {...register('communicationStyle2', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select communication style
//               </option>
//               {communicationStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.communicationStyle2 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Third section - Conflict Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-5">
//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="conflictStyle1"
//               >
//                 Conflict Style <span className="text-red-500">*</span>
//               </label>
//               <span className="md:hidden text-sm font-medium text-gray-600">
//                 Person 1
//               </span>
//             </div>
//             <select
//               {...register('conflictStyle1', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select conflict style
//               </option>
//               {conflictStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.conflictStyle1 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>

//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="conflictStyle2"
//               >
//                 <span className="md:hidden">Conflict Style</span>
//                 <span className="hidden md:inline">
//                   Conflict Style <span className="text-red-500">*</span>
//                 </span>
//               </label>
//               <span className="md:hidden text-sm font-medium text-gray-600">
//                 Person 2
//               </span>
//             </div>
//             <select
//               {...register('conflictStyle2', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select conflict style
//               </option>
//               {conflictStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.conflictStyle2 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Fourth section - Attachment Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-5">
//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="attachmentStyle1"
//               >
//                 Attachment Style <span className="text-red-500">*</span>
//               </label>
//               <span className="md:hidden text-sm font-medium text-gray-600">
//                 Person 1
//               </span>
//             </div>
//             <select
//               {...register('attachmentStyle1', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select relationship length
//               </option>
//               {attachmentStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.attachmentStyle1 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>

//           <div className="col-span-1">
//             <div className="flex justify-between items-center mb-2">
//               <label
//                 className="text-base font-medium leading-normal text-black"
//                 htmlFor="attachmentStyle2"
//               >
//                 <span className="md:hidden">Attachment Style</span>
//                 <span className="hidden md:inline">
//                   Attachment Style <span className="text-red-500">*</span>
//                 </span>
//               </label>
//               <span className="md:hidden text-sm font-medium text-gray-600">
//                 Person 2
//               </span>
//             </div>
//             <select
//               {...register('attachmentStyle2', { required: true })}
//               className="w-full border border-gray py-2 px-2 rounded-lg"
//             >
//               <option value="" disabled selected>
//                 Select relationship length
//               </option>
//               {attachmentStyleData?.map((data) => (
//                 <option key={data?.id} value={data?.value}>
//                   {data?.name}
//                 </option>
//               ))}
//             </select>
//             {errors?.attachmentStyle2 && (
//               <p className="text-sm text-red-500 mt-2">
//                 This field is required
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="mt-10 w-full flex items-center justify-between px-4">
//         <button
//           type="button"
//           onClick={handlePreviousStep}
//           className="bg-white text-black border border-gray rounded-lg py-2 px-5 text-base font-semibold leading-normal"
//         >
//           Back
//         </button>
//         <button
//           type="button"
//           onClick={handleNextStep}
//           className="bg-rose-500 flex items-center gap-2 text-white py-2 px-5 rounded-lg text-base font-semibold leading-normal"
//         >
//           Get Started <FaArrowRight className="mt-1" />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Personalities

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa6'

const Personalities = ({ handlePreviousStep, handleNextStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

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

  const renderSelect = (name, label, data, errorKey) => (
    <div className="col-span-1">
      <label className="text-base font-medium leading-normal text-black mb-2 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        {...register(name, { required: true })}
        className="w-full border border-gray py-2 px-2 rounded-lg"
        defaultValue=""
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {data.map((item) => (
          <option key={item.id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {errors?.[errorKey] && (
        <p className="text-sm text-red-500 mt-2">This field is required</p>
      )}
    </div>
  )

  return (
    <div className="w-full md:w-4/5 mx-auto pb-10 px-4">
      <h2 className="text-3xl font-bold leading-[36px] text-[#c02351] text-center">
        Personality details
      </h2>
      <p className="text-base font-normal leading-[24px] text-[#71717a] text-center pt-1">
        Understanding your relationship dynamics
      </p>

      <div className="border border-gray shadow-lg rounded-lg p-4 md:p-8 mt-5">
        {/* Desktop view */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          <div className="space-y-5">
            <span className="text-sm font-medium text-gray-600 block">
              Person 1
            </span>
            {renderSelect(
              'loveLanguage1',
              'Love Language',
              loveLanguageData,
              'loveLanguage1'
            )}
            {renderSelect(
              'communicationStyle1',
              'Communication Style',
              communicationStyleData,
              'communicationStyle1'
            )}
            {renderSelect(
              'conflictStyle1',
              'Conflict Style',
              conflictStyleData,
              'conflictStyle1'
            )}
            {renderSelect(
              'attachmentStyle1',
              'Attachment Style',
              attachmentStyleData,
              'attachmentStyle1'
            )}
          </div>
          <div className="space-y-5">
            <span className="text-sm font-medium text-gray-600 block">
              Person 2
            </span>
            {renderSelect(
              'loveLanguage2',
              'Love Language',
              loveLanguageData,
              'loveLanguage2'
            )}
            {renderSelect(
              'communicationStyle2',
              'Communication Style',
              communicationStyleData,
              'communicationStyle2'
            )}
            {renderSelect(
              'conflictStyle2',
              'Conflict Style',
              conflictStyleData,
              'conflictStyle2'
            )}
            {renderSelect(
              'attachmentStyle2',
              'Attachment Style',
              attachmentStyleData,
              'attachmentStyle2'
            )}
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-6">
          <div>
            <span className="text-sm font-medium text-gray-600 block mb-3">
              Person 1
            </span>
            <div className="space-y-4">
              {renderSelect(
                'loveLanguage1',
                'Love Language',
                loveLanguageData,
                'loveLanguage1'
              )}
              {renderSelect(
                'communicationStyle1',
                'Communication Style',
                communicationStyleData,
                'communicationStyle1'
              )}
              {renderSelect(
                'conflictStyle1',
                'Conflict Style',
                conflictStyleData,
                'conflictStyle1'
              )}
              {renderSelect(
                'attachmentStyle1',
                'Attachment Style',
                attachmentStyleData,
                'attachmentStyle1'
              )}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 block mb-3">
              Person 2
            </span>
            <div className="space-y-4">
              {renderSelect(
                'loveLanguage2',
                'Love Language',
                loveLanguageData,
                'loveLanguage2'
              )}
              {renderSelect(
                'communicationStyle2',
                'Communication Style',
                communicationStyleData,
                'communicationStyle2'
              )}
              {renderSelect(
                'conflictStyle2',
                'Conflict Style',
                conflictStyleData,
                'conflictStyle2'
              )}
              {renderSelect(
                'attachmentStyle2',
                'Attachment Style',
                attachmentStyleData,
                'attachmentStyle2'
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full flex items-center justify-between px-4">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="bg-white text-black border border-gray rounded-lg py-2 px-5 text-base font-semibold leading-normal"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="bg-rose-500 flex items-center gap-2 text-white py-2 px-5 rounded-lg text-base font-semibold leading-normal"
        >
          Get Started <FaArrowRight className="mt-1" />
        </button>
      </div>
    </div>
  )
}

export default Personalities
