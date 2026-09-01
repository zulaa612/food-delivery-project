"use client";

import { ChevronLeft } from "lucide-react";
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

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center">
      {/*Left Form Section Start */}
      <div className="w-104  ml-25">
        <div className="space-y-6">
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
              <form className=" w-full space-y-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div className="gap-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <a href="#" className=" text-sm underline cursor-pointer ">
                    Forgot password?
                  </a>
                </div>
              </form>
            </CardContent>
            <CardFooter className="p-0 mt-6 flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-gray-300 hover:bg-gray-400 text-white font-medium rounded-md py-2 transition-colors cursor-pointer"
              >
                Let&apos;s Go
              </Button>
              <div className="text-center text-gray-500">
                {" "}
                Don&apos;t have an account?
                <a
                  href="#"
                  className="text-blue-500 underline font-semibold ml-3"
                >
                  Sign up
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/*Left Form Section End */}

      {/*Right Picture Section */}
      <div className="hidden lg:block w-1/2 p-3">
        <div
          className="w-full h-full rounded-2xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('file:///C:/Users/Hp/Downloads/Frame%201321316047.png')`,
          }}
        ></div>
      </div>
    </div>
  );
}
