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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StepOne({ defaultEmail = "", onNext }) {
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState("");

  function handleChange(e) {
    setEmail(e.target.value);
    if (error) setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }

    if (!EMAIL_PATTERN.test(FileExclamationPoint.trim())) {
      setError("Invalid email. Use a format like example@email.com");
      return;
    }

    onNext(email.trim());
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/*Left Form Section Start */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <button className="h-9 w-9 flex justify-center items-center border rounded-lg border-gray-400 transition-colors hover:bg-gray-100 cursor-pointer">
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
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleChange}
                      aria-invalid={Boolean(error)}
                      className={
                        error ? "border-red-500 focus-visible:ring-red-500" : ""
                      }
                      required
                    />
                    {error && ( <p className="mt-1 text-sm text-red-500"> </p>)}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="p-0 mt-3 flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-gray-300 hover:bg-gray-400 text-white font-medium rounded-md py-2 transition-colors cursor-pointer"
              >
                Let&apos;s Go
              </Button>
              <div className="text-center text-gray-500">
                {" "}
                Already have an account?
                <a
                  href="#"
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
