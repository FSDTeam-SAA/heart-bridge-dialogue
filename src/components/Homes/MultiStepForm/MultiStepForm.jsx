import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicInfo from "./BasicInfo";
import Perspectives from "./Perspectives";
import Personalities from "./Personalities";
import ProgressStepper from "./progress-stepper";
import AllInformation from "./AllInformation";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { trigger, watch, setValue, reset } = methods;
  const [currentStep, setCurrentStep] = useState(1);

   // Load form data from localStorage on mount
   useEffect(() => {
    const savedData = localStorage.getItem("multiStepFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

  const formData = watch();

   // Save form data to localStorage
   useEffect(() => {
    localStorage.setItem("multiStepFormData", JSON.stringify(formData));
  }, [formData]);

  // Handle next step change
  const handleNextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  // Handle previous step change
  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    toast.success("Form submitted successfully!");
    localStorage.removeItem("multiStepFormData"); // Clear storage on submit
    reset();

    // Navigate to the dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="container bg-white">
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000}/>
      {/* navbar end  */}
      <FormProvider {...methods}>
        <div className="mt-8">
          <ProgressStepper
            currentStep={currentStep}
            steps={[
                { id: 1, label: "Basic Info" },
                { id: 2, label: "Perspectives" },
                { id: 3, label: "Personalities" },
                { id: 4, label: "Review & Submit" },
            ]}
          />
        </div>

        <div className="container ">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-6 rounded-[12px] md:rounded-l-[12px]"
          >
            {currentStep === 1 && (
              <BasicInfo
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            )}
            {currentStep === 2 && (
              <Perspectives
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            )}
            {currentStep === 3 && (
              <Personalities
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            )}
            {currentStep === 4 && (
              <AllInformation
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
                data={formData}
                // handleSubmitForm={onSubmit}
              />
            )}
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;
