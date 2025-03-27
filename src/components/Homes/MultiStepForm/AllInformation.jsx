import React from "react";
// import { toast } from "react-toastify";

const AllInformation = ({ data, handlePreviousStep }) => {
  // const handleSubmitForm = () => {
  //   if (!data || Object.keys(data).length === 0) {
  //     toast.error("No data available to submit.");
  //     return;
  //   }

  //   // Reset form and remove data from local storage
  //   resetForm();
  //   localStorage.removeItem("multiStepFormData");
  // };
  return (
    <div className=" p-1 md:p-6  mx-auto pb-10">
      <h2 className="text-3xl font-bold leading-[36px] text-[#c02351] text-center pb-6">
        Review Your Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-1 bg-white p-4 border rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Relationship Details
          </h3>
          <p>
            <strong>Title:</strong> {data.relationshipTitle}
          </p>
          <p>
            <strong>State:</strong> {data.relationshipState}
          </p>
          <p>
            <strong>Length:</strong> {data.relationshipLength}
          </p>
          <p>
            <strong>Living Status:</strong> {data.livingStatus}
          </p>

          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
            People
          </h3>
          <p>
            <strong>Person 1:</strong> {data.personName1}
          </p>
          <p>
            <strong>Person 2:</strong> {data.personName2}
          </p>
          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
            Your Feelings
          </h3>
          <p>
            <strong>Person 1:</strong> {data.yourFellings1}
          </p>
          <p>
            <strong>Person 2:</strong> {data.yourFellings2}
          </p>
        </div>

        <div className="md:col-span-1 bg-white p-4 border rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
            Communication Styles
          </h3>
          <p>
            <strong>Person 1:</strong> {data.communicationStyle1}
          </p>
          <p>
            <strong>Person 2:</strong> {data.communicationStyle2}
          </p>

          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
            Conflict Styles
          </h3>
          <p>
            <strong>Person 1:</strong> {data.conflictStyle1}
          </p>
          <p>
            <strong>Person 2:</strong> {data.conflictStyle2}
          </p>

          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
            Attachment Styles
          </h3>
          <p>
            <strong>Person 1:</strong> {data.attachmentStyle1}
          </p>
          <p>
            <strong>Person 2:</strong> {data.attachmentStyle2}
          </p>
          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">
            Love Languages
          </h3>
          <p>
            <strong>Person 1:</strong> {data.loveLanguage1}
          </p>
          <p>
            <strong>Person 2:</strong> {data.loveLanguage2}
          </p>
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
          //   onClick={() =>
          //     alert("Form Submitted! " + JSON.stringify(data, null, 2))
          //   }
          // onClick={handleSubmitForm}
          type="submit"
          className="bg-rose-500 text-white py-2 px-5 rounded-lg text-base font-semibold leading-normal"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AllInformation;
