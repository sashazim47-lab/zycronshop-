import { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // আপনার প্রজেক্টের এক্সিস্টিং কনটেক্সট
import { Modal } from './Modal';
import { Gamepad2 } from 'lucide-react';
import { auth, googleProvider } from '../firebase'; // আমরা যে firebase.js ফাইলটি বানাবো তার পাথ
import { signInWithPopup } from 'firebase/auth';

export function AuthModal() {
  const { authOpen, closeAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // ১. গুগলের আসল পপআপ ওপেন হবে
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const fullName = user.displayName || "User";
      const email = user.email || "";
      
      // ২. আপনার ইচ্ছা অনুযায়ী ইউনিক ইউজার আইডি তৈরি (যেমন: shadowknight_4829)
      const emailPrefix = email.split('@')[0];
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const generatedUserId = `${emailPrefix}_${randomId}`;

      // ৩. ব্রাউজারের লোকাল স্টোরেজে ডাটা সেভ করা যাতে ওয়েবসাইটে নাম ও আইডি শো করে
      localStorage.setItem("user_name", fullName);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_id", generatedUserId);
      localStorage.setItem("user_logged_in", "true");

      alert(`সফলভাবে লগইন হয়েছে!\nস্বাগতম: ${fullName}\nইউজার আইডি: ${generatedUserId}`);
      
      closeAuth();
      window.location.reload(); // পেজ রিফ্রেশ করে লগইন স্ট্যাটাস লাইভ করা
      
    } catch (error: any) {
      console.error("লগইন করতে সমস্যা হয়েছে:", error.message);
      alert("লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={authOpen} onClose={closeAuth} maxWidth="max-w-md">
      <div className="relative px-6 py-8 sm:px-8">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="relative text-center animate-slideUp">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-blood-600 shadow-glow">
            <Gamepad2 size={26} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Welcome to Zycron</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Sign in with your email to start topping up instantly.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-2.5">
          {/* গুগলের আসল বাটন */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group flex items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-white px-4 py-3 text-black font-semibold shadow-md transition-all duration-200 hover:bg-zinc-100 disabled:opacity-50"
          >
            <img src="https://google.com" alt="Google" className="w-5 h-5" />
            {loading ? "Connecting..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
