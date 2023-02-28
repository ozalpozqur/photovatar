import { createClient } from "altogic";

const ENV_URL = process.env.NEXT_PUBLIC_ALTOGIC_API_BASE_URL;
const CLIENT_KEY = process.env.NEXT_PUBLIC_ALTOGIC_CLIENT_KEY;
const SERVER_SIDE_CLIENT_KEY = process.env.SERVER_SIDE_ALTOGIC_CLIENT_KEY;

if (!ENV_URL || !CLIENT_KEY) {
  throw new Error("Missing Altogic API base URL or client key, check .env");
}

const client = createClient(ENV_URL, CLIENT_KEY);

export const serverSideAltogic = () => {
  if (!SERVER_SIDE_CLIENT_KEY)
    throw new Error("Missing server side Altogic client key, check .env");
  return createClient(ENV_URL, SERVER_SIDE_CLIENT_KEY);
};

export default client;
