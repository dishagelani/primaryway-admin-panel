const dev = {
    API_ENDPOINT_URL: "http://localhost:8000/api",
    // API_ENDPOINT_URL: "http://104.248.146.26:3000/api",
};

const prod = {
    API_ENDPOINT_URL: "http://104.248.146.26:3000/api",
};

const getEnv = () => {
    switch (process.env.NODE_ENV) {
        case "development":
            return dev;
        case "production":
            return prod;

        default:
            break;
    }
};

export const env = getEnv();
