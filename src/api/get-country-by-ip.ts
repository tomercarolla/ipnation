export type IpApiResponse = {
    country: string;
    flag: { img: string };
    timezone: {
        current_time: string;
    };
}

export const URL = 'https://ipwho.is';

export const fetchIpCountry = async (ip: string): Promise<IpApiResponse> => {
    const response = await fetch(`${URL}/${ip}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch country for IP: ${ip}`);
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || `Invalid IP: ${ip}`);
    }

    return {
        country: data.country,
        flag: data.flag,
        timezone: data.timezone
    };
}