export function logZomatoConfig() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_ZOMATO_API_KEY,
    apiUrl: process.env.NEXT_PUBLIC_ZOMATO_API_URL,
  };

  console.log("Zomato API config:", config);
  return config;
}