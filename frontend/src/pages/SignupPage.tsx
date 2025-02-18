import { useAuthStore } from "@/store/useAuthStore";
import { Button, Input, Stack } from "@chakra-ui/react";
import * as React from "react";
import { LuMessageSquare } from "react-icons/lu";
import { Field } from "@/components/ui/field";
import * as passwordInput from "@/components/ui/password-input";
import { Link } from "react-router-dom";
import AuthImagePattern from "@/components/AuthImagePattern";
import { Toaster, toaster } from "@/components/ui/toaster";

export const getPasswordStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
};

const SignupPage = () => {
  const [formData, setFormData] = React.useState<any>({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm: any = () => {
    if (!formData.fullName.trim())
      return toaster.error({ title: "Full name is required" });
    if (!formData.email.trim())
      return toaster.error({ title: "Email is required" });
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toaster.error({ title: "Invalid email format" });
    if (!formData.password)
      return toaster.error({ title: "Password is required" });
    if (formData.password.length < 6)
      return toaster.error({ title: "Password must be at least 6 characters" });
    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  React.useEffect(() => {
    console.log("Form Data: ", formData);
  }, [formData]);

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
          <h1 className="font-bold bold text-orange-300">Create Account</h1>
          <p className="light text-orange-200" style={{ fontSize: "12px" }}>
            Get started with your free account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Field
            className="w-full"
            style={{ marginBottom: "20px" }}
            label="Full Name"
            required
          >
            <Input
              className="w-full"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </Field>
          <Field
            className="w-full"
            style={{ marginBottom: "20px" }}
            label="Email"
            required
            helperText="We'll never share your email."
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
              {formData.password.length > 0 && (
                <passwordInput.PasswordStrengthMeter
                  value={getPasswordStrength(formData.password)}
                />
              )}
            </Stack>
          </Field>
          {!isSigningUp ? (
            <Button
              className="w-full"
              style={{
                marginTop: "20px",
                backgroundColor: "rgb(169, 114, 60)",
              }}
              onClick={handleSubmit}
            >
              Create an account
            </Button>
          ) : (
            <Button
              disabled={isSigningUp}
              className="w-full"
              style={{
                marginTop: "20px",
                backgroundColor: "rgb(169, 114, 60)",
              }}
              loading
              loadingText="Saving..."
            >
              Click me
            </Button>
          )}
        </form>
        <div style={{ fontSize: "12px" }}>
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="bold"
              style={{ color: "rgb(0,206,209)", textDecoration: "underline" }}
            >
              Sign in
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

export default SignupPage;
