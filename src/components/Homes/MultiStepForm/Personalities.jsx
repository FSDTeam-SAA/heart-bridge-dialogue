import React from "react";
import { useFormContext } from "react-hook-form";

const Personalities = ({ handleNextStep, handlePreviousStep }) => {
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
    <div className="bg-white">
      {/* first part  */}
      <div className="bg-white border border-gray rounded-lg p-6">
        {/* first part  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <div className="col-span-1">
            <label
              className="text-lg font-bold leading-normal text-black"
              htmlFor="loveLanguage1"
            >
              Love Language <span className="text-red-500">*</span>
            </label>
            <select
              {...register("loveLanguage1", { required: true })}
              className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
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
              className="text-lg font-bold leading-normal text-black"
              htmlFor="loveLanguage2"
            >
              Love Language <span className="text-red-500">*</span>
            </label>
            <select
              {...register("loveLanguage2", { required: true })}
              className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <div className="col-span-1">
            <label
              className="text-lg font-bold leading-normal text-black"
              htmlFor="communicationStyle1"
            >
              Communication Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("communicationStyle1", { required: true })}
              className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
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
              className="text-lg font-bold leading-normal text-black"
              htmlFor="communicationStyle2"
            >
              Communication Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("communicationStyle2", { required: true })}
              className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <div className="col-span-1">
            <label
              className="text-lg font-bold leading-normal text-black"
              htmlFor="conflictStyle1"
            >
              Conflict Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("conflictStyle1", { required: true })}
              className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
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
              className="text-lg font-bold leading-normal text-black"
              htmlFor="conflictStyle2"
            >
              Conflict Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("conflictStyle2", { required: true })}
              className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <div className="col-span-1">
            <label
              className="text-lg font-bold leading-normal text-black"
              htmlFor="attachmentStyle1"
            >
              Attachment Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("attachmentStyle1", { required: true })}
              className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
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
              className="text-lg font-bold leading-normal text-black"
              htmlFor="attachmentStyle2"
            >
              Attachment Style <span className="text-red-500">*</span>
            </label>
            <select
              {...register("attachmentStyle2", { required: true })}
              className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
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
      <div className="mt-7 w-full flex items-center justify-between">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="bg-rose-500 text-white py-2 px-5 rounded-lg "
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-rose-500 text-white py-2 px-5 rounded-lg "
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Personalities;
