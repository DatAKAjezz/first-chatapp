import AuthImagePattern from "@/components/AuthImagePattern";
import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/useAuthStore";
import { Button, Input, Stack } from "@chakra-ui/react";
import * as React from "react";
import * as passwordInput from "@/components/ui/password-input";
import { Field } from "@/components/ui/field";
import { Link } from "react-router-dom";
import { LuMessageSquare } from "react-icons/lu";

const LoginPage = () => {
  const [formData, setFormData] = React.useState<any>({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}

      <div
        className="flex flex-col justify-center items-center p-6 sm:p-12"
        style={{ backgroundColor: "rgb(30, 21, 30)" }}
      >
        <div className="w-full max-w-md space-y-8 flex flex-col items-center">
          <div
            className="rounded-sm"
            style={{
              marginBottom: "20px",
              padding: "8px",
              backgroundColor: "rgb(56, 38, 36)",
            }}
          >
            <LuMessageSquare size={30} color="rgb(200, 115, 60)" />
          </div>
          <h1 className="font-bold bold text-orange-300">Welcome Back!</h1>
          <p className="light text-orange-200" style={{ fontSize: "12px" }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Field
            className="w-full"
            style={{ marginBottom: "20px" }}
            label="Email"
            required
          >
            <Input
              className="w-full"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Field>

          <Field label="Password" required>
            <Stack className="w-full">
              <passwordInput.PasswordInput
                className="w-full"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e: any) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />

            </Stack>
          </Field>
          {!isLoggingIn ? (
            <Button
            disabled = {isLoggingIn}
              className="w-full"
              style={{
                marginTop: "20px",
                backgroundColor: "rgb(169, 114, 60)",
              }}
              onClick={handleSubmit}
            >
              Log in
            </Button>
          ) : (
            <Button
              className="w-full"
              style={{
                marginTop: "20px",
                backgroundColor: "rgb(169, 114, 60)",
              }}
              loading
              loadingText="Loading..."
            >
              Click me
            </Button>
          )}
        </form>
        <div style={{ fontSize: "12px" }}>
          <p>
            Dont have an account?{" "}
            <Link
              to="/signup"
              className="bold"
              style={{ color: "rgb(0,206,209)", textDecoration: "underline" }}
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* right side */}

      <div
        className="w-full flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "rgb(30, 21, 25)" }}
      >
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with loved ones."
        />
      </div>
    </div>
  );
};

export default LoginPage;
