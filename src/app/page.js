import Banner from "@/components/homepage/Banner";
import Hero from "@/components/homepage/Hero";
import Cards from "@/components/friends/Cards";

// Fetching friends data
async function getFriends() {
  const res = await fetch("http://localhost:3000/friends.json", { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = {
  title: "Home Page - KeenKeeper",
  description: "Manage your connections effectively.",
};

export default async function Home() {
  const friends = await getFriends();

  return (
    <main className="bg-white min-h-screen">
      <Banner />
      <Hero friends={friends} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Friends</h2>
        
        {/* Responsive Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {friends.map((friend) => (
            <div key={friend.id} className="flex justify-center">
              <Cards friend={friend} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}