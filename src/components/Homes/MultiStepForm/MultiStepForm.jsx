import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BasicInfo from './BasicInfo'
import Perspectives from './Perspectives'
import Personalities from './Personalities'
import ProgressStepper from './progress-stepper'
import AllInformation from './AllInformation'
import { db } from '../../../config/firebaseConfig'
import { ref, set, push } from 'firebase/database'
import Aiheadline from '../Aiheadline'

import { analytics } from '../../../config/firebaseConfig'
import { logEvent } from 'firebase/analytics'


const MultiStepForm = () => {
  const navigate = useNavigate()
  const methods = useForm()
  const { trigger, watch, setValue, reset } = methods
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const savedData = localStorage.getItem('multiStepFormData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key])
      })
    }
  }, [setValue])

  const formData = watch()

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem('multiStepFormData', JSON.stringify(formData))
  }, [formData])

  // Handle next step change
  const handleNextStep = async () => {
    const isValid = await trigger()
    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }
  // Handle previous step change
  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  // const onSubmit = async (data) => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem('user'))

  //     if (!user || !user.uid) {
  //       toast.error('Please signup or login to submit the form')
  //       // Redirect to login page after 2 seconds
  //       setTimeout(() => {
  //         navigate('/signup', { state: { from: '/form' } }) // You can pass the current path to redirect back after login
  //       }, 2000)
  //       return
  //     }

  //     // Create a reference with push() to get a unique key
  //     const formSubmissionsRef = ref(db, `users/${user.uid}/formSubmissions`)
  //     const newFormRef = push(formSubmissionsRef)

  //     // Get the auto-generated ID
  //     const submissionId = newFormRef.key

  //     await set(newFormRef, {
  //       ...data,
  //       submittedAt: new Date().toISOString(),
  //       status: 'pending',
  //     })

  //     toast.success('Form submitted successfully!')
  //     localStorage.removeItem('multiStepFormData')
  //     reset()

  //     setTimeout(() => {
  //       navigate(`/messages/${submissionId}`)
  //     }, 1500)
  //   } catch (error) {
  //     console.error('Submission error:', error)
  //     toast.error('Failed to submit form. Please try again.')
  //   }
  // }

  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))

      if (!user || !user.uid) {
        toast.error('Please signup or login to submit the form')

        // Track unauthorized form submission attempt
        if (analytics) {
          logEvent(analytics, 'relationship_submission_attempt_unauthorized')
        }

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/signup', { state: { from: '/form' } })
        }, 2000)
        return
      }

      // Track form submission start
      if (analytics) {
        logEvent(analytics, 'create_relationship_submission_start', {
          user_id: user.uid,
          form_name: 'multi_step_form', 
        })
      }

      // Create a reference with push() to get a unique key
      const formSubmissionsRef = ref(db, `users/${user.uid}/formSubmissions`)
      const newFormRef = push(formSubmissionsRef)

      // Get the auto-generated ID
      const submissionId = newFormRef.key

      const submissionData = {
        ...data,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      }

      await set(newFormRef, submissionData)

      // Track successful form submission
      if (analytics) {
        logEvent(analytics, 'form_submission_success', {
          user_id: user.uid,
          submission_id: submissionId,
          form_name: 'multi_step_form',
          fields_count: Object.keys(data).length,
          submission_time: new Date().toISOString(),
        })
      }

      toast.success('Form submitted successfully!')
      localStorage.removeItem('multiStepFormData')
      reset()

      setTimeout(() => {
        navigate(`/messages/${submissionId}`)
      }, 1500)
    } catch (error) {
      console.error('Submission error:', error)

      // Track form submission failure
      if (analytics) {
        const user = JSON.parse(localStorage.getItem('user'))
        logEvent(analytics, 'form_submission_error', {
          user_id: user?.uid || 'unknown',
          error_code: error.code || 'unknown',
          error_message: error.message || 'Unknown error',
          form_name: 'multi_step_form',
          timestamp: new Date().toISOString(),
        })
      }

      toast.error('Failed to submit form. Please try again.')
    }
  }



  return (
    <div className="container bg-white">
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} />

      {/* navbar end  */}
      <FormProvider {...methods}>
        <div className="mt-8">
          <Aiheadline />
          <ProgressStepper
            currentStep={currentStep}
            steps={[
              { id: 1, label: 'Basic Info' },
              { id: 2, label: 'Perspectives' },
              { id: 3, label: 'Personalities' },
              { id: 4, label: 'Review & Submit' },
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
              />
            )}
          </form>
        </div>
      </FormProvider>
    </div>
  )
}

export default MultiStepForm