import { postRequest } from "@/app/services/http";
import {
    ApiResponse,
    MessageItemDTO,
    PaginatedResponse,
} from "../types/coupleGreetings";
import endpoint from "@/app/services/endpoint";
import { getData } from "@/app/utils/storage/storageHelper";
import type { LoginData } from "@/app/features/auth/types/login";


export const getMessages = async (search = "", filterType?: "Image" | "Video") => {
    const authData = getData<LoginData>("authData", "local");

    const res = await postRequest<
        ApiResponse<PaginatedResponse<MessageItemDTO>>
    >(endpoint.greetings.coupleGreetings, {
        coupleUserId: authData?.userId ?? 0,
        search,
        ...(filterType ? { filterType } : {}),
        isIncludeGuests: true,
        isIncludeCouples: true,
        isIncludePricing: true,
    });

    return res.data;
};