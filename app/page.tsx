import Image from "next/image";
import CheckoutButton from "./components/CheckoutButton";

export default function Home() {
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CheckoutButton />
      </main>
    );
}
