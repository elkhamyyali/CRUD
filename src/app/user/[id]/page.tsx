"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserById, deleteUser } from "@/lib/api";
import { User } from "@/lib/types";

export default function UserPage({ params }: { params: { id: string } }) {
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

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(params.id);
        router.push("/users");
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
      <div className="space-x-4">
        <Link
          href={`/user/${user.id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit User
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete User
        </button>
      </div>
      <Link href="/users" className="block mt-4 text-blue-500 hover:underline">
        Back to User List
      </Link>
    </div>
  );
}
