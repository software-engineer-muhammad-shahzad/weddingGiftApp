import { postRequest } from "@/app/services/http";
import {
    ApiResponse,
    MessageItemDTO,
    PaginatedResponse,
} from "../types/coupleGreetings";
import endpoint from "@/app/services/endpoint";


export const getMessages = async () => {
    const res = await postRequest<
        ApiResponse<PaginatedResponse<MessageItemDTO>>
    >(endpoint.greetings.coupleGreetings, {});

    return res.data;
};