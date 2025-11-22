import Cards from "@/components/snacks/cards";
import SearchBar from "@/components/snacks/searchBar";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col text-slate-900">
      

      <div className="w-full sticky top-0 z-20 h-24 border-b border-slate-200 shadow-sm 
                      flex justify-center flex-col px-8 bg-white/70 backdrop-blur-md">
        <h1 className="md:text-3xl text-2xl text-center md:text-start mt-3 font-bold tracking-tight">
          Snacks Management
        </h1>
        <p className="max-w-2xl md:text-start md:text-md text-slate-500 text-center leading-relaxed">
          Track inventory, manage stock, and add new items easily.
        </p>
      </div>


      <div className="mx-auto w-full max-w-6xl mt-10 px-6">
        <SearchBar />
        
        <Separator className="my-8" />

        <Cards />
      </div>

    </div>
  );
};

export default Page;
