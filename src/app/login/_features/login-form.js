"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldError } from "@base-ui/react";

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!email.includes("@")) {
    errors.email = "Invalid email. Use a format like example@email.com.";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Incorrect password. Please try again.";
  }
  return errors;
};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate({
      email,
      password,
    });

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    console.log({ email, password });
  };

  const isDisabled = !email || !password;

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
              <CardTitle className="text-2xl font-semibold">Log in</CardTitle>
              <CardDescription className="text-base text-gray-400">
                Log in to enjoy your favorite dishes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form className=" w-full space-y-4" onClick={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          email: "",
                        }));
                      }}
                      className={errors.email ? "border-red-500" : ""}
                      required
                    />
                  </div>
                  <div className="relative gap-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          password: "",
                        }));
                      }}
                      className={errors.password ? "border-red-500" : "pr-10"}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FieldError message={errors.password} />
                  <a href="#" className=" text-sm underline cursor-pointer ">
                    Forgot password?
                  </a>
                </div>
                <Button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-white font-medium rounded-md py-2 transition-colors cursor-pointer"
                >
                  Let&apos;s Go
                </Button>
              </form>
            </CardContent>
            <CardFooter className="p-0 mt-6 flex flex-col gap-4">
              <div className="text-center text-gray-500">
                {" "}
                Don&apos;t have an account?
                <button
                  type="button"
                  onClick={() => router.push("/food/src/app/signup")}
                  className="text-blue-500 underline font-semibold ml-3"
                >
                  Sign up
                </button>
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
