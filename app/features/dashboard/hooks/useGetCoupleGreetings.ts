import { useEffect, useState } from "react";
import { MessageItemDTO } from "../types/coupleGreetings";
import { coupleGreetingsService } from "../services/coupleGreetingsServices";

const TAB_TO_FILTER_TYPE: Record<string, "Image" | "Video" | undefined> = {
  all: undefined,
  greeting: "Image",
  video: "Video",
};

export const useCoupleGreetings = () => {
  const [items, setItems] = useState<MessageItemDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ API CALL — refetches whenever the search term or tab changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const filterType = TAB_TO_FILTER_TYPE[activeTab];
        const res = await coupleGreetingsService?.getMessages(search.trim(), filterType);

        setItems(res.items);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [search, activeTab]);

  return {
    items,
    loading,

    activeTab,
    setActiveTab,

    search,
    setSearch,
  };
};
