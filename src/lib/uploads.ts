// upload
// delete
// get
// replace

import path from "path"
import fs from "fs"
// loacl storage
// s3

const UPLOADS_DIR = '/public/uploads'
export async function uploadFile({ file, dir, fileName = Date.now().toString() }: { file: Blob, dir: string, fileName?: string }) {

    if (!file) {
        throw new Error('No file provided')
    }

    const extension = file.type.split('/')[1]
    const relativePath = path.join(UPLOADS_DIR, dir)
    const fullPath = path.join(process.cwd(), relativePath)
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath)
    }
    const buffer = await file.arrayBuffer();
    const withFileName = path.join(fullPath, `${fileName}.${extension}`)
    fs.writeFileSync(withFileName, Buffer.from(buffer))
    // return fullpath without the public folder path
    const returnedPath = path.join(relativePath, `${fileName}.${extension}`)
    return returnedPath.replace('/public', '')

}

// upload multiple files
export async function uploadFiles({ files, dir }: { files: Blob[], dir: string }) {
    const filePaths = []
    for (const file of files) {
        const extension = file.type.split('/')[1]
        const fileName = Date.now()
        const fullpath = path.join(dir, `${fileName}.${extension}`)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        const buffer = await file.arrayBuffer();
        fs.writeFileSync(fullpath, Buffer.from(buffer))
        filePaths.push(fullpath)
    }
    return filePaths
}

export async function deleteFile(path: string) {
    fs.unlinkSync(path)
}

export async function getFile(path: string) {
    return fs.readFileSync(path)
}

export async function replaceFile({ file, path }: { file: Blob, path: string }) {
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(path, Buffer.from(buffer))
    return path
}