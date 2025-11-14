import {delay, http, HttpResponse} from "msw";
import {URL} from "@/api";

export const handlers = [
    http.get(`${URL}/:ip`, async () => {
        await delay(50);

        return HttpResponse.json({
            success: true,
            country: "Brazil",
            flag: {img: "https://ipwho.is/flags/br.svg"},
            timezone: {
                current_time: "2025-11-13T23:00:07+02:00"
            }
        })
    }),

    http.get(`${URL}/invalid-ip`, () => {
        return HttpResponse.json(
            {success: false, message: "Invalid IP address"},
            {status: 200}
        )
    })
]