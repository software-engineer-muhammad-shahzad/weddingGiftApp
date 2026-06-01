import { useEffect, useState, useMemo } from "react";
import { MessageItemDTO } from "../types/coupleGreetings";
import { coupleGreetingsService } from "../services/coupleGreetingsServices";

export const useCoupleGreetings = () => {
  const [allItems, setAllItems] = useState<MessageItemDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ ONLY ONE API CALL
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await coupleGreetingsService.getMessages(1, 1000);

        setAllItems(res.data.items); // store full dataset
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FILTER LOCALLY (NO API CALL)
  const items = useMemo(() => {
    let filtered = allItems;

    // TAB FILTER
    if (activeTab === "video") {
      filtered = filtered.filter((x) => x.hasVideo);
    }

    if (activeTab === "greeting") {
      filtered = filtered.filter((x) => x.mediaType === "greeting");
    }

    // SEARCH FILTER
    if (search.trim()) {
      filtered = filtered.filter((x) =>
        x.guestName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [allItems, activeTab, search]);

  return {
    items,
    loading,

    activeTab,
    setActiveTab,

    search,
    setSearch,
  };
};