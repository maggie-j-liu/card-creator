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
    <div className="flex justify-center">
      <main className="flex flex-col items-center justify-center w-9/12 h-[90vh] space-y-5">
        <h1>To continue, please sign in.</h1>
        <p className="text-xl lg:text-2xl">Signing in is required to keep track of the cards you&#39;ve created and interacted with.</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            signInWithProvider("google");
          }}
          className="px-4 py-2 font-semibold text-gray-700 bg-white rounded-lg shadow-md hover:bg-gray-50"
        >
          Sign In With Google
        </button>
      </main>
    </div>
  );
}
