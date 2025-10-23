import { Client } from "minio";

export const getMinioClient = () => {
  const client = new Client({
    endPoint: process.env.S3_ENDPOINT!,
    port: 443,
    useSSL: true,
    accessKey: process.env.S3_ACCESS_KEY!,
    secretKey: process.env.S3_SECRET_KEY!,
  });

  return client;
};
