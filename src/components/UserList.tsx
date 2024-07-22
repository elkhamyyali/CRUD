// src/app/components/UserList.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUsers, deleteUser } from "@/lib/api";
import { User } from "@/lib/types";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id.toString());
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <ul className="space-y-4">
      {users.map((user) => (
        <li
          key={user.id}
          className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
        >
          <Link
            href={`/user/${user.id}`}
            className="text-blue-500 hover:underline"
          >
            {user.name}
          </Link>
          <div className="space-x-2">
            <Link
              href={`/user/${user.id}/edit`}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
