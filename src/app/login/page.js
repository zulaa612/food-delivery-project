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

import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FieldError from "./_components/field-error";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email. Use a format like example@email.com."),
  password: z.string().min(6, "Incorrect password. Please try again."),
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("data:", data);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/*Left Form Section Start */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-9 w-9 flex justify-center items-center border rounded-lg border-gray-400 transition-colors hover:bg-gray-100 cursor-pointer"
          >
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
              <form
                className=" w-full space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register("email")}
                      className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                      required
                    />
                    <FieldError message={errors.email?.message} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className={errors.password ? "border-red-500" : ""}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <FieldError message={errors.password?.message} />
                  </div>
                  <a href="#" className=" text-sm underline cursor-pointer ">
                    Forgot password?
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gray-300 hover:bg-gray-400 text-white font-medium rounded-md py-2 transition-colors cursor-pointer"
                >
                  Let&apos;s Go
                </Button>
              </form>
            </CardContent>
            <CardFooter className="p-0 mt-6 flex flex-col gap-4 relative">
              <div className="text-center text-gray-500">
                {" "}
                Don&apos;t have an account?
                <a
                href="/signup"
                className="text-blue-500 hover:underline font-semibold ml-1"
                >Sign up</a>
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
