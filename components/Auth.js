import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";

export default function Auth() {
  const signInWithProvider = async (provider) => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        provider,
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <div className="w-80 mx-auto">
      <button
        onClick={(e) => {
          e.preventDefault();
          signInWithProvider("google");
        }}
        className="bg-white hover:bg-gray-50 px-4 py-2 text-gray-700 font-semibold rounded-lg shadow-md"
      >
        Sign In With Google
      </button>
    </div>
  );
}
