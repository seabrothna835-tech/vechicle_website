
export const getData = async (url) => {
    try {
        const response = await fetch(`http://localhost:3001/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(`GET ${url} error:`, error);
        throw error;
    }
};