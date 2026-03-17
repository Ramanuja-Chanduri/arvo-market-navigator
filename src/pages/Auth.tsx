import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap } from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up state
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const handleGoogle = () => {
    navigate("/");
  };

  const getPasswordStrength = (pw: string): { label: string; color: string; width: string } => {
    if (pw.length === 0) return { label: "", color: "", width: "0%" };
    if (pw.length < 6) return { label: "Weak", color: "bg-destructive", width: "33%" };
    if (pw.length < 10) return { label: "Medium", color: "bg-amber-500", width: "66%" };
    return { label: "Strong", color: "bg-positive", width: "100%" };
  };

  const strength = getPasswordStrength(signUpPassword);

  const inputClass =
    "w-full rounded-[10px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-3px_hsl(221,83%,53%,0.4)]";

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background relative overflow-hidden">
      <AuroraBackground />

      {/* Auth Card */}
      <div
        className="relative z-10 w-full max-w-[420px] mx-4 p-10 rounded-[20px]"
        style={{
          background: "rgba(10, 12, 20, 0.60)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.09)",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-lg gradient-cta flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Arvo</h1>
          <p className="text-xs text-muted-foreground mt-1">Market intelligence, distilled.</p>
        </div>

        {/* Tabs */}
        <div className="flex relative mb-8">
          {(["signin", "signup"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-2.5 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {tab === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
          <div
            className="absolute bottom-0 h-0.5 w-1/2 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              background: "linear-gradient(90deg, hsl(221,83%,53%), hsl(187,86%,53%))",
              transform: activeTab === "signup" ? "translateX(100%)" : "translateX(0)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" />
        </div>

        {/* Forms */}
        <div className="relative overflow-hidden">
          {/* Sign In */}
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeTab === "signin" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
            }`}
          >
            <form onSubmit={handleSignIn} className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className={inputClass}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-xs text-accent hover:underline transition-colors duration-200">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full text-sm font-medium text-primary-foreground gradient-cta hover:shadow-[0_0_30px_-5px_hsl(221,83%,53%,0.5)] transition-all duration-200"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Sign Up */}
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeTab === "signup" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
            }`}
          >
            <form onSubmit={handleSignUp} className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Email address"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className={inputClass}
              />
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {signUpPassword.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${strength.color} transition-all duration-300`}
                        style={{ width: strength.width }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{strength.label}</span>
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full text-sm font-medium text-primary-foreground gradient-cta hover:shadow-[0_0_30px_-5px_hsl(221,83%,53%,0.5)] transition-all duration-200"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-[rgba(255,255,255,0.12)] bg-transparent text-sm text-foreground hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
