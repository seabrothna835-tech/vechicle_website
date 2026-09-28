
const STATIC_DATA_URL = "/VechicleCard.json";

const normalizeData = (payload, resource) => {
    if (Array.isArray(payload)) return payload;
    if (!payload || typeof payload !== "object") return [];

    const resourceNames = [
        resource,
        `${resource}s`,
        resource?.replace(/s$/, ""),
        `${resource?.replace(/s$/, "")}s`,
    ];

    for (const key of resourceNames) {
        if (!key) continue;
        const value = payload[key];
        if (Array.isArray(value)) return value;
    }

    const firstArrayValue = Object.values(payload).find(Array.isArray);
    return Array.isArray(firstArrayValue) ? firstArrayValue : [];
};

export const getData = async (resource) => {
    const cleanResource = String(resource ?? "").replace(/^\/+|\/+$/g, "");
    const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
    const candidateUrls = [];

    if (apiBase && cleanResource) {
        candidateUrls.push(`${apiBase}/${cleanResource}`);
    }

    if (cleanResource) {
        candidateUrls.push(`/${cleanResource}`);
    }

    candidateUrls.push(STATIC_DATA_URL);

    let lastError = null;

    for (const url of candidateUrls) {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const payload = await response.json();
            const normalized = normalizeData(payload, cleanResource);

            if (normalized.length > 0) {
                return normalized;
            }

            if (payload && typeof payload === "object") {
                return payload;
            }
        } catch (error) {
            lastError = error;
        }
    }

    if (lastError) {
        console.error(`GET ${cleanResource || "data"} error:`, lastError);
        throw lastError;
    }

    return [];
};