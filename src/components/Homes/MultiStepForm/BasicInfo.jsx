import React from "react";
import { useFormContext } from "react-hook-form";

const BasicInfo = ({ handleNextStep }) => {
  const LengthOfRelationshipData = [
    {
      id: 1,
      name: "Less than 6 months",
      value: "Less than 6 months",
    },
    {
      id: 2,
      name: "6 months - 1 year",
      value: "6 months - 1 year",
    },
    {
      id: 3,
      name: "1-2 years",
      value: "1-2 years",
    },
    {
      id: 4,
      name: "2-5 years",
      value: "2-5 years",
    },
    {
      id: 5,
      name: "5-10 years",
      value: "5-10 years",
    },
    {
      id: 6,
      name: "10+ years",
      value: "10+ years",
    },
  ];

  const livingStatusData = [
    {
        id : 1,
        name : "Living together",
        value : "Living together"
    },
    {
        id : 2,
        name : "Living apart",
        value : "Living apart"
    },
    {
        id : 3,
        name : "Long distance",
        value : "Long distance"
    },

  ]

  const relationshipStageData = [
    {
        id : 1,
        name : "Dating",
        value : "Dating"
    },
    {
        id : 2,
        name : "Engaged",
        value : "Engaged"
    },
    {
        id : 3,
        name : "Married",
        value : "Married"
    },
  ]
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="bg-white border border-gray rounded-lg p-6">
      {/* first part  */}
      <div>
        <label
          className="text-lg font-bold leading-normal text-black"
          htmlFor="relationshipTitle"
        >
          Relationship Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("relationshipTitle", { required: true })}
          placeholder="E.g., Relationshop whit partner"
          className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
        />
        {errors?.relationshipTitle && (
          <p className="text-sm text-red-500 mt-2">This field is required</p>
        )}
      </div>

      {/* second part  */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <div className="col-span-1">
          <label
            className="text-lg font-bold leading-normal text-black"
            htmlFor="relationshipLength"
          >
            Length of relationship <span className="text-red-500">*</span>
          </label>
          <select
            {...register("relationshipLength", { required: true })}
            className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
          >
            <option value="" disabled selected>
              Select relationship length
            </option>
            {LengthOfRelationshipData?.map((data) => (
              <option key={data?.id} value={data?.value}>
                {data?.name}
              </option>
            ))}
          </select>

          {errors?.relationshipLength && (
            <p className="text-sm text-red-500 mt-2">This field is required</p>
          )}
        </div>
        <div className="col-span-1">
          <label
            className="text-lg font-bold leading-normal text-black"
            htmlFor="livingStatus"
          >
            Living status <span className="text-red-500">*</span>
          </label>
          <select
            {...register("livingStatus", { required: true })}
            className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
          >
            <option value="" disabled selected>
              Select living status
            </option>
            {livingStatusData?.map((data) => (
              <option key={data?.id} value={data?.value}>
                {data?.name}
              </option>
            ))}
          </select>

          {errors?.livingStatus && (
            <p className="text-sm text-red-500 mt-2">This field is required</p>
          )}
        </div>
      </div>

      {/* third part  */}
      <div>
        <label
          className="text-lg font-bold leading-normal text-black"
          htmlFor="relationshipState"
        >
          Relationship stage <span className="text-red-500">*</span>
        </label>
        <select
          {...register("relationshipState", { required: true })}
          className="w-full border border-gray py-2 px-4 rounded-lg mt-4"
        >
          <option value="" disabled selected>
            Select relationship stage
          </option>
          {relationshipStageData?.map((data) => (
            <option key={data?.id} value={data?.value}>
              {data?.name}
            </option>
          ))}
        </select>

        {errors?.relationshipState && (
          <p className="text-sm text-red-500 mt-2">This field is required</p>
        )}
      </div>

      {/* buttton  */}
      <div className="mt-7 w-full flex items-center justify-end">
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

export default BasicInfo;
