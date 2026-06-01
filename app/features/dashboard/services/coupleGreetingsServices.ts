// import { getMessages } from "../api/coupleGreetingsApi";
import { getMessages } from "../api/coupleGreetingsServices";
import { PaginatedResponse, MessageItemDTO } from "../types/coupleGreetings";

export const coupleGreetingsService = {
  getMessages: async (
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<MessageItemDTO>> => {
    return await getMessages(page, pageSize);
  },
};