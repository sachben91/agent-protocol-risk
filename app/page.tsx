import { getAllProtocols } from "@/lib/protocols";
import { Nav } from "@/components/Nav";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  const protocols = getAllProtocols();
  return (
    <>
      <Nav />
      <main>
        <Dashboard protocols={protocols} />
      </main>
    </>
  );
}
