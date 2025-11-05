"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * Settings Page
 * - Resend verification email
 * - Change password
 * - Forgot password
 * - Show/hide password
 * - Upload business logo (with validation)
 */

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Load user and profile
  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;
      setUserEmail(user?.email ?? null);

      if (user?.id) {
        // local cache first
        const cached = localStorage.getItem("profile");
        if (cached) setProfile(JSON.parse(cached));

        // fresh fetch
        const { data: fetched } = await supabase
          .from("profiles")
          .select("business_name, email, logo_url, plan")
          .eq("id", user.id)
          .single();

        if (fetched) {
          setProfile(fetched);
          localStorage.setItem("profile", JSON.stringify(fetched));
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Resend verification email
  const resendVerification = async () => {
    setEmailMessage(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setEmailMessage("No user email found.");
        return;
      }

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
      });

      if (error) setEmailMessage(error.message);
      else setEmailMessage("Verification email sent! Check your inbox.");
    } catch (err: any) {
      setEmailMessage(err?.message ?? "Failed to send email.");
    }
  };

  // ✅ Change password
  const changePassword = async () => {
    setPasswordMessage(null);
    if (password.length < 6) {
      setPasswordMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) setPasswordMessage(error.message);
      else {
        setPasswordMessage("Password updated successfully!");
        setPassword("");
        setShowPassword(false);
      }
    } catch (err: any) {
      setPasswordMessage(err?.message ?? "Could not update password.");
    }
  };

  // ✅ Forgot password (send reset link)
  const resetPassword = async () => {
    if (!userEmail) {
      setResetMessage("No email found for your account.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) setResetMessage(error.message);
      else setResetMessage("Password reset link sent to your email.");
    } catch (err: any) {
      setResetMessage(err?.message ?? "Failed to send reset link.");
    }
  };

  // ✅ Upload logo file
  const uploadLogo = async () => {
    setUploadMessage(null);

    if (!logoFile) {
      setUploadMessage("Please select a logo file first.");
      return;
    }

    if (logoFile.size > 1024 * 1024) {
      setUploadMessage("File too large (max 1MB).");
      return;
    }

    if (!["image/png", "image/jpeg", "image/svg+xml"].includes(logoFile.type)) {
      setUploadMessage("Only PNG, JPG, or SVG allowed.");
      return;
    }

    try {
      setUploading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.id) {
        setUploadMessage("User not found. Please re-login.");
        setUploading(false);
        return;
      }

      const fileName = `${Date.now()}-${logoFile.name.replace(/\s+/g, "_")}`;
      const path = `user-${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(path, logoFile, { upsert: true });

      if (uploadError) {
        setUploadMessage("Upload failed: " + uploadError.message);
        setUploading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("logos").getPublicUrl(path);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ logo_url: publicUrl })
        .eq("id", user.id);

      if (updateError) {
        setUploadMessage("Failed to save logo URL: " + updateError.message);
        setUploading(false);
        return;
      }

      const updatedProfile = { ...(profile || {}), logo_url: publicUrl };
      setProfile(updatedProfile);
      localStorage.setItem("profile", JSON.stringify(updatedProfile));
      setUploadMessage("✅ Logo uploaded and saved successfully!");
    } catch (err: any) {
      setUploadMessage(err?.message ?? "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <h1 className="text-2xl font-bold">Account Settings</h1>

      {/* Email verification */}
      <section className="p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">Email Verification</h2>
        <p className="text-sm text-gray-600 mb-3">
          Signed-in email:{" "}
          <span className="font-medium">{userEmail || "—"}</span>
        </p>
        <button
          onClick={resendVerification}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Resend verification email
        </button>
        {emailMessage && (
          <p className="mt-2 text-sm text-gray-700">{emailMessage}</p>
        )}
      </section>

      {/* Change password */}
      <section className="p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">Change Password</h2>
        <div className="flex gap-2 items-center">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={() => setShowPassword((s) => !s)}
            className="text-sm text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="mt-3 flex gap-3 items-center">
          <button
            onClick={changePassword}
            disabled={!password || password.length < 6}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-60"
          >
            Update password
          </button>
          {passwordMessage && (
            <div className="text-sm text-gray-700">{passwordMessage}</div>
          )}
        </div>
      </section>

      {/* Forgot password */}
      <section className="p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">Forgot Password</h2>
        <button
          onClick={resetPassword}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send reset link
        </button>
        {resetMessage && (
          <p className="mt-2 text-sm text-gray-700">{resetMessage}</p>
        )}
      </section>

      {/* Upload logo */}
      <section className="p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">Business Logo</h2>
        <p className="text-sm text-gray-600 mb-3">
          Upload a logo (max 1MB, PNG/JPG/SVG). Appears in sidebar; Pro users
          can include it on invoices.
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
          className="mb-3"
        />
        <div className="flex gap-3 items-center">
          <button
            onClick={uploadLogo}
            disabled={!logoFile || uploading}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload Logo"}
          </button>
          {uploadMessage && (
            <div className="text-sm text-gray-700">{uploadMessage}</div>
          )}
        </div>
        {profile?.logo_url && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Current logo preview:</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.logo_url}
              alt="Business logo"
              className="h-20 w-20 object-cover rounded"
            />
          </div>
        )}
      </section>
    </div>
  );
}
