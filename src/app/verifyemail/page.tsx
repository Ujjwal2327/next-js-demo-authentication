"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      console.log(response.data)
    }
    catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0)
      verifyUserEmail();
  }, [token]);

  return (

    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl">Verify Your Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? token : "no token"}
      </h2>
      {verified &&
        <div>
          <h2 className="text-green-500">Email Verified!</h2>
          <Link href="/login">
            Login
          </Link>
        </div>
      }
      {error &&
        <div>
          <h2 className="text-red-500">Error in Verifying Email</h2>
        </div>
      }
    </div>

  )

}