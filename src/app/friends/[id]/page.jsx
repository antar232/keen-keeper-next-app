import Image from "next/image";
import React from "react";

// fetch friends
const friendsPromise = async () => {
  // Assuming the file structure from previous interaction
  const res = await fetch("http://localhost:3000/friends.json");
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
};

// Function for standardizing status colors
const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case "overdue":
      return "bg-[#fee2e2] text-[#e01414] font-medium"; // Standard light red bg, stronger red text
    case "almost due":
      return "bg-[#fef9c3] text-[#ca8a04] font-medium"; // Standard light yellow bg, dark yellow text
    case "on-track":
      return "bg-[#1e4638] text-white font-medium"; // Brand green bg, white text for contrast
    default:
      return "bg-[#f1f5f9] text-slate-700 font-medium"; // Default gray for others
  }
};

// Function for standardizing tag colors
const getTagClasses = (tag) => {
  switch (tag.toLowerCase()) {
    case "work":
    case "hobby":
    case "family":
    case "travel":
      return "bg-[#ecfdf5] text-[#1e4638] font-medium"; // Emerald light bg, emerald dark text
    default:
      return "bg-[#f1f5f9] text-slate-600 font-medium"; // Gray light bg, gray text
  }
};

const FriendsPage = async () => {
  const friends = await friendsPromise();

  return (
    <main className="min-h-screen bg-gray-100"> {/* Pure white bg as per reference image */}
      <section className="max-w-7xl mx-auto px-4 py-20"> {/* Increased padding for spacing */}

        {/* Header - Left Aligned as per picture */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Your Friends
          </h1>
        </div>

        {/* Friends Grid - Adjusted columns for better fit */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center justify-between text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >
              {/* Profile Image Section */}
              <div className="flex-grow flex flex-col items-center">
                <div className="relative h-28 w-28 mb-6 mt-2"> {/* Specific dimensions and top margin */}
                  <Image
                    src={friend.picture}
                    alt={friend.name}
                    fill
                    className="object-cover rounded-full" // Circle avatar as per image
                  />
                </div>

                {/* Name & Title */}
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  {friend.name}
                </h2>
                
                {/* Last Contact */}
                <p className="text-sm text-slate-400 mb-4 font-medium tracking-tight">
                    {friend.days_since_contact}d ago
                </p>

                {/* Specific Tags Section - Center-aligned as per image */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {friend.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-[10px] md:text-xs uppercase px-3 py-1 rounded-full ${getTagClasses(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Section - Separate for vertical centering */}
              <div className="w-full mt-auto">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-xs md:text-sm capitalize ${getStatusClasses(friend.status)}`}
                >
                  {friend.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
};

export default FriendsPage;