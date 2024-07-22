import Link from "next/link";
import UserList from "../../components/UserList";

export default function UsersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <Link
        href="/users/create"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
      >
        Create New User
      </Link>
      <UserList />
    </div>
  );
}
