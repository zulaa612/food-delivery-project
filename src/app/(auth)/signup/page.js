"use client";

import { useState } from "react";
import StepOne from "./_features/StepOne";
import StepTwo from "./_features/StepTwo";
import { server } from "@/app/_api/api";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleStepOneNext = (email) => {
    setEmail(email);
    setStep(2);
  };

  const handleBack = async (data) => {
    setStep(1);
  };
  const handleSubmitSingup = async (data) => {
    try {
      const response = await server.post("/auth/signup", {
        email: email,
        password: data.password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("response:", response.data);
    } catch (err) {
      console.log("error:", err);
    }
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
          onSubmitSignup={handleSubmitSingup}
        />
      )}
    </>
  );
}
