const isDev = process.env.NODE_ENV === "development"

const ENV = {
  API_URL: isDev
    ? "http://shagundirect.somee.com/api"
    : "http://shagundirect.somee.com/api",
}

export default ENV
