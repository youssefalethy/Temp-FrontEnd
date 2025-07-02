import WelcomePage from "@/components/home/Home";


export const dynamic = "force-dynamic";

export default async function Home() {

  return (
    <section className=" h-full absolute top-0 z-10">
      <WelcomePage />
    </section>
  );
}
