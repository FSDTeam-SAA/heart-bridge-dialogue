import React from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";

const Perspectives = ({ handleNextStep, handlePreviousStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="bg-white w-4/5 mx-auto">
      <h2 className="text-3xl font-bold leading-[36px] text-[#c02351] text-center">
        Share your perspectives
      </h2>
      <p className="text-base font-normal leading-[24px] text-[#71717a] text-center pt-1">
        Help us understand both sides of your relationship
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white mt-5">
        {/* first form  */}
        <div className="md:col-span-1 ">
          <div className=" border border-gray shadow-lg rounded-lg p-6 mt-5">
            <div className="flex items-center gap-3 pb-6">
              <span className="bg-rose-50 p-2 rounded-full flex items-center justify-center">
                <FiUser className="w-4 h-4 text-primary" />
              </span>
              <h3 className="text-xl font-semibold leading-[28px] text-black">
                Your Perspective
              </h3>
            </div>
            {/* first part  */}
            <div>
              <label
                className="text-base font-medium leading-normal text-black"
                htmlFor="personName1"
              >
                Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("personName1", { required: true })}
                placeholder="E.g., Relationshop whit partner"
                className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
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
                className="text-base font-medium leading-normal text-black"
                htmlFor="yourFellings1"
              >
                Your Thoughts & Feelings <span className="text-red-500">*</span>
              </label>
              <p className="text-xs font-normal leading-normal text-gray-400">
                Share your thoughts, feelings, and experiences in the
                relationship. What matters to you? What challenges do you face?
              </p>
              <textarea
                type="text"
                {...register("yourFellings1", { required: true })}
                placeholder="E.g., Relationshop whit partner"
                className="w-full border border-gray pt-2 pb-14 px-2 rounded-lg mt-2"
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
          <div className=" border border-gray shadow-lg rounded-lg p-6 mt-5">
            <div className="flex items-center gap-3 pb-6">
              <span className="bg-rose-50 p-2 rounded-full flex items-center justify-center">
                <FiUser className="w-4 h-4 text-primary" />
              </span>
              <h3 className="text-xl font-semibold leading-[28px] text-black">
                Their Perspective
              </h3>
            </div>
            {/* first part  */}
            <div>
              <label
                className="text-base font-medium leading-normal text-black"
                htmlFor="personName2"
              >
                Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("personName2", { required: true })}
                placeholder="E.g., Relationshop whit partner"
                className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
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
                className="text-base font-medium leading-normal text-black"
                htmlFor="yourFellings2"
              >
                Your Thoughts & Feelings <span className="text-red-500">*</span>
              </label>
              <p className="text-xs font-normal leading-normal text-gray-400">
                Share your thoughts, feelings, and experiences in the
                relationship. What matters to you? What challenges do you face?
              </p>
              <textarea
                type="text"
                {...register("yourFellings2", { required: true })}
                placeholder="E.g., Relationshop whit partner"
                className="w-full border border-gray pt-2 pb-14 px-2 rounded-lg mt-2"
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
      <div className="mt-10 w-full flex items-center justify-between">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="bg-white text-black border border-gray rounded-lg py-2 px-5 text-base font-semibold leading-normal "
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="bg-rose-500 flex items-center gap-2 text-white py-2 px-5 rounded-lg text-base font-semibold leading-normal"
        >
          Next Step <FaArrowRight className="mt-1" />
        </button>
      </div>
    </div>
  );
};

export default Perspectives;
