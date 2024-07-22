import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Our User Management System
      </h1>
      <Link href="/users" className="text-blue-500 hover:underline">
        View All Users
      </Link>
    </main>
  );
}
