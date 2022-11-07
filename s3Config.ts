export const s3Config = {
    bucketName:  process.env.NEXT_PUBLIC_BUCKETNAME,
    dirName: process.env.NEXT_PUBLIC_DIRNAME,
    region: process.env.NEXT_PUBLIC_REGION,
    accessKeyId:process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
}