"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as z from "zod";
import FieldError from "@/app/login/_components/field-error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const stepOneSchema = z.object({
  email: z.string().email("Invalid email. Use a format like example@email.com"),
});

export default function StepOne({ defaultEmail = "", onBack, onNext }) {
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(stepOneSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("data:", data);

    onNext(data.email);
  };

  function handleChange(e) {
    setEmail(e.target.value);
    if (error) setError("");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/*Left Form Section Start */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <button
            onClick={onBack}
            className="h-9 w-9 flex justify-center items-center border rounded-lg border-gray-400 transition-colors hover:bg-gray-100 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Create your account
              </CardTitle>
              <CardDescription className="text-base text-gray-400">
                Sign up to explore your favorite dishes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form
                className=" w-full space-y-4 onSubmit={handleSubmit"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register("email")}
                      className={
                        errors.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                      required
                    />
                    <FieldError message={errors.email?.message} />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-white font-medium rounded-md py-2 transition-colors cursor-pointer"
                >
                  Let&apos;s Go
                </Button>
              </form>
            </CardContent>
            <CardFooter className="p-0 mt-3 flex flex-col gap-4">
              <div className="text-center text-gray-500">
                {" "}
                Already have an account?
                <a
                  href="/login"
                  className="text-blue-500 hover:underline font-semibold ml-3"
                >
                  Log in
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/*Left Form Section End */}

      {/*Right Picture Section */}
      <div className="hidden lg:block w-1/2 h-screen p-3">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/pic/login.png"
            alt="Login image"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
