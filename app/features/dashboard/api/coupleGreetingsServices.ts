import { getRequest } from "@/app/services/http";
import {
    ApiResponse,
    MessageItemDTO,
    PaginatedResponse,
} from "../types/coupleGreetings";
import endpoint from "@/app/services/endpoint";


export const getMessages = async (page: number, pageSize: number) => {
    const res = await getRequest<
        ApiResponse<PaginatedResponse<MessageItemDTO>>
    >(endpoint.greetings.coupleGreetings, {
        params: { page, pageSize },
    });

    return res.data.data;
};