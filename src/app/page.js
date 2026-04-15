import Banner from "@/components/homepage/Banner";
import Hero from "@/components/homepage/Hero";
import Cards from "@/components/friends/Cards";
import { promises as fs } from 'fs';
import path from 'path';

async function getFriends() {
  try {
   
    const filePath = path.join(process.cwd(), 'public', 'friends.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("File read error, trying fetch...");
    
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    try {
      const res = await fetch(`${baseUrl}/friends.json`, { cache: 'no-store' });
      if (!res.ok) return [];
      return res.json();
    } catch (fetchErr) {
      return []; 
    }
  }
}

export default async function Home() {
  const friends = await getFriends();

  return (
    <main className="bg-gray-100 min-h-screen">
      <Banner />
      <Hero friends={friends} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black text-slate-800 mb-10 tracking-tight">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div key={friend.id} className="flex justify-center">
                <Cards friend={friend} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-slate-400">No data found.</p>
          )}
        </div>
      </div>
    </main>
  );
}