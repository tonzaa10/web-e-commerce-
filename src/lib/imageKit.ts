import ImageKit from "imagekit";
import sharp from "sharp";
import { flattenError } from "zod";
import { ur } from "zod/v4/locales";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!
})

export const uploadToImageKit = (file: File, label: string) => {

    try {

        if (!file) {
            return {
                message: "No file provided"
            }
        }

        //Check file type
        if (file.size > 5 * 1024 * 1024) {
            return {
                message: "File size exceeds 5MB"
            }
        }

        //Read File Buffer
        const buffer = await file.arrayBuffer()

        const processedImageBuffer = await sharp(Buffer.from(buffer))
            .webp({
                quality: 80,
                lossless: false,
                effort: 4,
            })
            .resize({
                width: 1200,
                height: 1200,
                fit: "inside",
                withoutEnlargement: true,
            })
            .toBuffer()

        const result = await imagekit.upload({
            file: processedImageBuffer,
            fileName: `${label}_${Date.now()}_${file.name}`,
            folder: `${label}`,
        })

        return {
            url: result.url,
            fileId: result.fileId,
        }
    } catch (error) {
        console.log("Error uploading image to imagekit: ", error)
        return {
            message: "Failed to upload image",
        }
    }
}