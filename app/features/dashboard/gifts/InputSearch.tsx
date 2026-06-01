"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const InputSearch = ({ search, setSearch }: Props) => {
  return (
    <div className="border border-[#5FDA78] glass-card rounded-[50px] h-14.5 mt-8 px-5 py-3 flex items-center">
      <Search className="text-white" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="w-full outline-none ps-4 font-light text-sm text-white placeholder:text-white"
      />
    </div>
  );
};

export default InputSearch;