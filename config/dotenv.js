import env from "dotenv"

env.config()

const dotenv = {
    PORT : process.env.PORT,
    MONGODB_URL : process.env.MONGODB_URL,
    API_URL:process.env.API_URL
}

export default dotenv 