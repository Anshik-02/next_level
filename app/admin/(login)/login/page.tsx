"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Login successful!");
        router.push("/admin/dashboard");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white h-screen bg-[#0F0417] flex justify-center items-center flex-col px-6">
      <div className="w-17 h-17 border border-[#95e6e6] rounded-lg flex justify-center items-center">
        <Lock className="w-8 h-8 text-[#3FFDFE]" />
      </div>
      <h2 className="font-bold text-4xl mt-5 bg-gradient-to-r from-[#3FFDFE] via-[#C58BFF] to-[#FD5DA8] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(197,139,255,0.3)]">
        Admin Login
      </h2>
      <p className="text-zinc-400 text-sm mt-2 mb-6 leading-relaxed max-w-3xl">
        Sign in to manage your gaming zone
      </p>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <div>
          <label className="text-sm text-zinc-400">Email Address</label>
          <Input
            placeholder="admin@gmail.com"
            className="border-zinc-700 h-12 text-base mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-zinc-400">Password</label>
          <Input
            placeholder="password"
            type="password"
            className="border-zinc-700 h-12 text-base mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="h-12 mt-3  text-black bg-gradient-to-r from-[#3FFDFE] to-[#C58BFF] hover:opacity-90"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="absolute w-72 h-72 bg-[#3FFDFE]/20 blur-[120px] top-10 left-20 pointer-events-none"></div>
      <div className="absolute w-72 h-72 bg-[#FD5DA8]/20 blur-[120px] bottom-10 right-20 pointer-events-none"></div>
    </div>
  );
};

export default Page;
