const dev = {
    API_ENDPOINT_URL: "http://localhost:8000/api",
    ADMIN_EMAIL : 'disha@gmail.com',
    ADMIN_PASSWORD : 'Disha@1234'
};

const prod = {
    API_ENDPOINT_URL: "https://primaryway-api-production.up.railway.app/api",
    ADMIN_EMAIL : 'admin@gmail.com',
    ADMIN_PASSWORD : 'admin@1234'
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
