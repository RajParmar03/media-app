//  upload files to server
// import { PutObjectCommand } from "@aws-sdk/client-s3";
import { type NextRequest } from 'next/server'
// import { S3 } from "@util/aws";
import fs from 'fs';
import path from 'path';


const PUBLIC_DIR = '/public'
const UPLOADS_DIR = '/uploads'

const buildDir = (file: Blob) => {

}
// upload
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    console.log('formData', formData)
    const files = formData.getAll('files')
    console.log("What is files:", files)


    // if (files && files.length > 0) {
    // const file = files[0];
    const file = formData.get('file')
    if (file instanceof Blob) {
        try {
            const subFolder = formData.get('type') || 'app'
            const filepath = path.join(UPLOADS_DIR, subFolder.toString())
            const localPath = path.join(process.cwd(), PUBLIC_DIR, filepath)
            if (!fs.existsSync(localPath)) {
                fs.mkdirSync(localPath, { recursive: true })
            }

            const buffer = await file.arrayBuffer();
            const extension = file.type.split('/')[1]
            const fileName = `${Date.now()}.${extension}`
            const fullFilePath = path.join(localPath, fileName)

            fs.writeFileSync(path.join(localPath, fileName), Buffer.from(buffer))

            return new Response(filepath + '/' + fileName, {
                status: 200,
            })

        } catch (err) {
            console.log("Error uploading file", err)
            return new Response('Error!', {
                status: 400,
            })
        }
        // }
    }

    return new Response("File not found", {
        status: 400,
    })

}

// load, restore, fetch
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const src = searchParams.get('src')
    // get file from public/uploads
    if (src) {
        // const filePath = path.join(UPLOADS_DIR, file.toString())
        if (fs.existsSync(src)) {
            const buffer = fs.readFileSync(src)
            return new Response(buffer, {
                status: 200,
            })
        }
    }

    return new Response('File not found', {
        status: 404,
    })
}

// revert
export async function DELETE(req: NextRequest) {
    console.log('------------------ delete file', req.body)

    return new Response('Hello World', {
        status: 200,
    })
}

// upload chunk
export async function PATCH(req: NextRequest) {
    return new Response('Hello World', {
        status: 200,
    })
}