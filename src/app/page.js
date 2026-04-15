import Banner from "@/components/homepage/Banner";
import Hero from "@/components/homepage/Hero";
import Cards from "@/components/friends/Cards";

// Fetching friends data
async function getFriends() {
  const res = await fetch("http://localhost:3000/friends.json");
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

    <main className="bg-gray-100 min-h-screen">
      <Banner />
      <Hero friends={friends} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black text-slate-800 mb-10 tracking-tight">Your Friends</h2>
        
        
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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