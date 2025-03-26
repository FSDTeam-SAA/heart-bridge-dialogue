import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicInfo from "./BasicInfo";
import Perspectives from "./Perspectives";
import Personalities from "./Personalities";
import ProgressStepper from "./progress-stepper";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { trigger } = methods;
  const [currentStep, setCurrentStep] = useState(1);

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
    console.log(data);
  };

  return (
    <div className="container bg-white">
      {/* Toast Notifications */}
      <ToastContainer />
      {/* navbar end  */}
      <FormProvider {...methods}>
        <div className="mt-8">
          <ProgressStepper
            currentStep={currentStep}
            steps={[
                { id: 1, label: "Basic Info" },
                { id: 2, label: "Perspectives" },
                { id: 3, label: "Personalities" },
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
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;
