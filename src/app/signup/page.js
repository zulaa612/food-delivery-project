"use client";

import { useState } from "react";
import StepOne from "./_features/StepOne";
import StepTwo from "./_features/StepTwo";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleStepOneNext = (email) => {
    setEmail(email);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      {step === 1 && (
        <StepOne
          onNext={handleStepOneNext}
          onBack={() => console.log("back")}
        />
      )}

      {step === 2 && (
        <StepTwo
        email={email}
        onBack={handleBack}
        />
      )}
    </>
  );
}
