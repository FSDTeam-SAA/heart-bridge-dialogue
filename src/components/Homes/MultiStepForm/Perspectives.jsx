import React from "react";
import { useFormContext } from "react-hook-form";
import { HiArrowNarrowLeft } from "react-icons/hi";

const Perspectives = ({ handleNextStep, handlePreviousStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white">
        {/* first form  */}
        <div className="md:col-span-1 ">
          <div className=" bg-white border border-gray rounded-lg p-6">
            {/* first part  */}
            <div>
              <label
                className="text-lg font-bold leading-normal text-black"
                htmlFor="personName1"
              >
                Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("personName1", { required: true })}
                placeholder="E.g., Relationshop whit partner"
                className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
              />
              {errors?.personName1 && (
                <p className="text-sm text-red-500 mt-2">
                  This field is required
                </p>
              )}
            </div>
            {/* second part  */}
            <div className="mt-4">
              <label
                className="text-lg font-bold leading-normal text-black"
                htmlFor="yourFellings1"
              >
                Your Thoughts & Feelings <span className="text-red-500">*</span>
              </label>
              <p className="text-xs font-normal leading-normal text-black">
                Share your thoughts, feelings, and experiences in the
                relationship. What matters to you? What challenges do you face?
              </p>
              <textarea
                type="text"
                {...register("yourFellings1", { required: true })}
                placeholder="E.g., Relationshop whit partner"
                className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
              />
              {errors?.yourFellings1 && (
                <p className="text-sm text-red-500 mt-2">
                  This field is required
                </p>
              )}
            </div>
          </div>
        </div>
        {/* second form  */}
        <div className="md:col-span-1">
          <div className=" bg-white border border-gray rounded-lg p-6">
            {/* first part  */}
            <div>
              <label
                className="text-lg font-bold leading-normal text-black"
                htmlFor="personName2"
              >
                Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("personName2", { required: true })}
                placeholder="E.g., Relationshop whit partner"
                className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
              />
              {errors?.personName2 && (
                <p className="text-sm text-red-500 mt-2">
                  This field is required
                </p>
              )}
            </div>
            {/* second part  */}
            <div className="mt-4">
              <label
                className="text-lg font-bold leading-normal text-black"
                htmlFor="yourFellings2"
              >
                Your Thoughts & Feelings <span className="text-red-500">*</span>
              </label>
              <p className="text-xs font-normal leading-normal text-black">
                Share your thoughts, feelings, and experiences in the
                relationship. What matters to you? What challenges do you face?
              </p>
              <textarea
                type="text"
                {...register("yourFellings2", { required: true })}
                placeholder="E.g., Relationshop whit partner"
                className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
              />
              {errors?.yourFellings2 && (
                <p className="text-sm text-red-500 mt-2">
                  This field is required
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* buttton  */}
      <div className="mt-7 w-full flex items-center justify-between">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="bg-rose-500 text-white py-2 px-5 rounded-lg "
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="bg-rose-500 text-white py-2 px-5 rounded-lg "
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Perspectives;
