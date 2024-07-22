"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../../../components/UserForm";
import { createUser } from "@/lib/api";
import { NewUser } from "@/lib/types";

export default function CreateUserPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (user: NewUser) => {
    try {
      await createUser(user);
      router.push("/users");
    } catch (err) {
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New User</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
