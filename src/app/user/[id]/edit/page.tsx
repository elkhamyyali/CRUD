// src/app/user/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../../../../components/UserForm";
import { getUserById, updateUser } from "@/lib/api";
import { User, NewUser } from "@/lib/types";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const fetchedUser = await getUserById(params.id);
        setUser(fetchedUser);
      } catch (err) {
        setError("Failed to fetch user");
      }
    }
    fetchUser();
  }, [params.id]);

  const handleSubmit = async (updatedUser: NewUser) => {
    try {
      await updateUser(params.id, updatedUser);
      router.push(`/user/${params.id}`);
    } catch (err) {
      setError("Failed to update user. Please try again.");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <UserForm user={user} onSubmit={handleSubmit} />
    </div>
  );
}
