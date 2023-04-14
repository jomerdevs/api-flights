
export const config = {
    API_PORT: process.env.APP_PORT,
    SWAGGER_ROUTE: 'api/docs',
    SWAGGER_FULL_ROUTE: `http://localhost:${process.env.APP_PORT}/api/docs`,    
}