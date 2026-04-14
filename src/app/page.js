import Banner from "@/components/homepage/Banner";
import Hero from "@/components/homepage/Hero";
import Image from "next/image";
import FriendsPage from "./friends/[id]/page";

export default function Home() {
  return (
    <div>
      <Banner/>
      <Hero/>
      <FriendsPage/>
    </div>
  );
}
