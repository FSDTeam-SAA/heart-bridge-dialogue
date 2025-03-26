import React from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";

const Personalities = ({ handlePreviousStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const loveLanguageData = [
    {
      id: 1,
      name: "Words of Affirmation",
      value: "Words of Affirmation",
    },
    {
      id: 2,
      name: "Acts of Service",
      value: "Acts of Service",
    },
    {
      id: 3,
      name: "Gifts",
      value: "Gifts",
    },
    {
      id: 4,
      name: "Quality Time",
      value: "Quality Time",
    },
    {
      id: 5,
      name: "Physical Touch",
      value: "Physical Touch",
    },
    {
      id: 6,
      name: "Not Sure",
      value: "Not Sure",
    },
  ];
  const communicationStyleData = [
    {
      id: 1,
      name: "Direct",
      value: "Direct",
    },
    {
      id: 2,
      name: "Diplomatic",
      value: "Diplomatic",
    },
    {
      id: 3,
      name: "Reserved",
      value: "Reserved",
    },
    {
      id: 4,
      name: "Emotional",
      value: "Emotional",
    },
    {
      id: 5,
      name: "Not Sure",
      value: "Not Sure",
    },
  ];
  const conflictStyleData = [
    {
      id: 1,
      name: "Confrontational",
      value: "Confrontational",
    },
    {
      id: 2,
      name: "Avoidant",
      value: "Avoidant",
    },
    {
      id: 3,
      name: "Compromising",
      value: "Compromising",
    },
    {
      id: 4,
      name: "Collaborative",
      value: "Collaborative",
    },
    {
      id: 5,
      name: "Not Sure",
      value: "Not Sure",
    },
  ];
  const attachmentStyleData = [
    {
      id: 1,
      name: "Secure",
      value: "Secure",
    },
    {
      id: 2,
      name: "Anxious",
      value: "Anxious",
    },
    {
      id: 3,
      name: "Avoidant",
      value: "Avoidant",
    },
    {
      id: 4,
      name: "Fearful-Avoidant",
      value: "Fearful-Avoidant",
    },
    {
      id: 5,
      name: "Not Sure",
      value: "Not Sure",
    },
  ];
  return (
    <div className="w-4/5 mx-auto">
      <h2 className="text-3xl font-bold leading-[36px] text-[#c02351] text-center">
        Personality details
      </h2>
      <p className="text-base font-normal leading-[24px] text-[#71717a] text-center pt-1">
        Understanding your relationship dynamics
      </p>
      {/* first part  */}
      <div className="border border-gray shadow-lg rounded-lg p-8 mt-5">
        {/* first part  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5">
          <div className="col-span-1">
            <label
              className="text-lg font-medium leading-normal text-black"
              htmlFor="loveLanguage1"
            >
              Love Language <span className="text-red-500">*</span>
            </label>
            <select
              {...register("loveLanguage1", { required: true })}
              className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
            >
              <option value="" disabled selected>
                Select Love Language
              </option>
              {loveLanguageData?.map((data) => (
                <option key={data?.id} value={data?.value}>
                  {data?.name}
                </option>
              ))}
            </select>

            {errors?.loveLanguage1 && (
              <p className="text-sm text-red-500 mt-2">
                This field is required
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label
              className="text-lg font-medium leading-normal text-black"
              htmlFor="loveLanguage2"
            >
              Love Language <span className="text-red-500">*</span>
            </label>
            <select
              {...register("loveLanguage2", { required: true })}
              className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
            >
              <option value="" disabled selected>
                Select Love Language
              </option>
              {loveLanguageData?.map((data) => (
                <option key={data?.id} value={data?.value}>
                  {data?.name}
                </option>
              ))}
            </select>

            {errors?.loveLanguage2 && (
              <p className="text-sm text-red-500 mt-2">
                This field is required
              </p>
            )}
          </div>
        </div>
        {/* two part  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5">
          <div className="col-span-1">
            <label
              className="text-lg font-medium leading-normal text-black"
              htmlFor="communicationStyle1"
            >
              Communication Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("communicationStyle1", { required: true })}
              className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
            >
              <option value="" disabled selected>
                Select communication style
              </option>
              {communicationStyleData?.map((data) => (
                <option key={data?.id} value={data?.value}>
                  {data?.name}
                </option>
              ))}
            </select>

            {errors?.communicationStyle1 && (
              <p className="text-sm text-red-500 mt-2">
                This field is required
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label
              className="text-lg font-medium leading-normal text-black"
              htmlFor="communicationStyle2"
            >
              Communication Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("communicationStyle2", { required: true })}
              className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
            >
              <option value="" disabled selected>
                Select communication style
              </option>
              {communicationStyleData?.map((data) => (
                <option key={data?.id} value={data?.value}>
                  {data?.name}
                </option>
              ))}
            </select>

            {errors?.communicationStyle2 && (
              <p className="text-sm text-red-500 mt-2">
                This field is required
              </p>
            )}
          </div>
        </div>
        {/* three part  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5">
          <div className="col-span-1">
            <label
              className="text-lg font-medium leading-normal text-black"
              htmlFor="conflictStyle1"
            >
              Conflict Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("conflictStyle1", { required: true })}
              className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
            >
              <option value="" disabled selected>
                Select conflict style
              </option>
              {conflictStyleData?.map((data) => (
                <option key={data?.id} value={data?.value}>
                  {data?.name}
                </option>
              ))}
            </select>

            {errors?.conflictStyle1 && (
              <p className="text-sm text-red-500 mt-2">
                This field is required
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label
              className="text-lg font-medium leading-normal text-black"
              htmlFor="conflictStyle2"
            >
              Conflict Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("conflictStyle2", { required: true })}
              className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
            >
              <option value="" disabled selected>
                Select conflict style
              </option>
              {conflictStyleData?.map((data) => (
                <option key={data?.id} value={data?.value}>
                  {data?.name}
                </option>
              ))}
            </select>

            {errors?.conflictStyle2 && (
              <p className="text-sm text-red-500 mt-2">
                This field is required
              </p>
            )}
          </div>
        </div>
        {/* foure part  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5">
          <div className="col-span-1">
            <label
              className="text-lg font-medium leading-normal text-black"
              htmlFor="attachmentStyle1"
            >
              Attachment Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("attachmentStyle1", { required: true })}
              className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
            >
              <option value="" disabled selected>
                Select relationship length
              </option>
              {attachmentStyleData?.map((data) => (
                <option key={data?.id} value={data?.value}>
                  {data?.name}
                </option>
              ))}
            </select>

            {errors?.attachmentStyle1 && (
              <p className="text-sm text-red-500 mt-2">
                This field is required
              </p>
            )}
          </div>
          <div className="col-span-1">
            <label
              className="text-lg font-medium leading-normal text-black"
              htmlFor="attachmentStyle2"
            >
              Attachment Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("attachmentStyle2", { required: true })}
              className="w-full border border-gray py-2 px-2 rounded-lg mt-2"
            >
              <option value="" disabled selected>
                Select relationship length
              </option>
              {attachmentStyleData?.map((data) => (
                <option key={data?.id} value={data?.value}>
                  {data?.name}
                </option>
              ))}
            </select>

            {errors?.attachmentStyle2 && (
              <p className="text-sm text-red-500 mt-2">
                This field is required
              </p>
            )}
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
          type="submit"
          className="bg-rose-500 flex items-center gap-2 text-white py-2 px-5 rounded-lg text-base font-semibold leading-normal"
        >
          Get Started <FaArrowRight className="mt-1" />
        </button>
      </div>
    </div>
  );
};

export default Personalities;
