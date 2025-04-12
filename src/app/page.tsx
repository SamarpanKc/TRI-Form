import WorkshopRegistrationForm from "./workshop-registration-form";
import Image from "next/image";
import Logo from "@/app/assets/trilogo.png";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="head flex flex-col justify-center items-center mb-8 gap-4 ">
        <Image src={Logo} alt="" width={70} />
        <h1 className="text-3xl font-bold text-center">
          Workshop Registration
        </h1>
      </div>
      <WorkshopRegistrationForm />
    </main>
  );
}
