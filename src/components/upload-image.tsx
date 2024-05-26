import React, { ChangeEvent, useState, useRef, useEffect, useActionState } from 'react';
import { CropperRef, Cropper } from 'react-mobile-cropper';
import { getMimeType } from 'advanced-cropper/extensions/mimes';
import 'react-mobile-cropper/dist/style.css'
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { CheckIcon, Loader, XCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface Image {
    type?: string;
    src: string;
}


type Props = {
    name: string; // name of the file
    action: any; // action to upload the file and save to db
    id: string; // id of the model  to save the file to
    defaultValue?: string; // default value of the image
    dir?: string; // directory to save the file
    alt?: string; // alt text of the image
}
export default function UploadImage({ name, action, defaultValue, id, dir, alt = "" }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const cropperRef = useRef<CropperRef>(null);
    const [image, setImage] = useState<Image | null>(null);
    const [preview, setPreview] = useState<string | null>(defaultValue || null);
    const [open, setOpen] = useState(false);

    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const onUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
        // Reference to the DOM input element
        const { files } = event.target;
        setOpen(true);
        // Ensure that you have a file before attempting to read it
        if (files && files[0]) {
            // Create the blob link to the file to optimize performance:
            const blob = URL.createObjectURL(files[0]);

            // Remember the fallback type:
            const typeFallback = files[0].type;

            // Create a new FileReader to read this image binary data
            const reader = new FileReader();

            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.image" refers to the image of Vue component
                setImage({
                    // Read image as base64 and set it as src:
                    src: blob,
                    // Determine the image type to preserve it during the extracting the image from canvas:
                    type: getMimeType(e.target?.result, typeFallback),
                });
            };
            // Start the reader job - read file as a data url (base64 format) and get the real file type
            reader.readAsArrayBuffer(files[0]);

        }
        // Clear the event target value to give the possibility to upload the same image:
        event.target.value = '';
    };

    const onConfirm = () => {
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            setOpen(false);
            const form = new FormData();
            canvas.toBlob(async (blob) => {
                if (blob) {
                    setError(null);
                    setPending(true);
                    setPreview(URL.createObjectURL(blob));
                    // const fileUrl = await uploadFile(form);
                    // to db
                    form.append(name, blob);
                    form.append('dir', dir || "");
                    form.append('id', id);
                    const res = await action(form);

                    if (res.success) {
                        console.log("File uploaded successfully")
                    } else {
                        console.log("Error uploading file", res)
                        setError(res.errors);
                    }
                    setPending(false);
                    onClose();

                }
            }, 'image/jpeg');
        }
    }

    const onClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        return () => {
            if (image && image.src) {
                URL.revokeObjectURL(image.src);
            }
        };
    }, [image]);


    // const uploadFile = async (formData: FormData) => {
    //     const res = await fetch('/api/files', {
    //         method: 'POST',
    //         body: formData,
    //     });
    //     if (!res.ok) {
    //         const message = `An error has occured: ${res.status}`;
    //         throw new Error(message);
    //     }
    //     const data = await res.text();
    //     console.log("file url: ====", data)
    //     return data;
    // }



    return (
        <div className='max-w-fit rounded-lg'>
            <input ref={inputRef} type="file" accept="image/*" onChange={onLoadImage} className='hidden' />
            <Dialog open={open}>
                <DialogContent className='max-h-[60vh] max-w-fit px-5 '>
                    <div className='flex items-center justify-between py-0'>
                        <button type='button' onClick={onClose} className=" flex items-center justify-center rounded-full h-7 w-7 hover:opacity-80 cursor-pointer">
                            <XCircle className='w-6 h-6 ' />
                        </button>
                        <button type='button' onClick={onConfirm} className='flex items-center justify-center bg-green-600 rounded-full h-7 w-7 hover:opacity-80 cursor-pointer'>
                            <CheckIcon className='w-6 h-6 ' />
                        </button>
                    </div>
                    <div className=" max-w-lg max-h-[70vh]">
                        <Cropper ref={cropperRef} className=" max-w-lg" src={image && image.src} />
                    </div>
                </DialogContent>
            </Dialog>
            <div className=" grid gap-2 border p-1 items-center justify-center relative rounded-lg ">
                {pending && <div className="flex items-center justify-center absolute w-full bg-black bg-opacity-40 h-full"><Loader className="h-10 w-10 animate-spin" /></div>}
                {error && <ErrorDisplay errors={error} />}
                {!preview && <Image src={"/placeholder.svg"} alt={alt} width={200} height={200} onClick={onUpload} className=' rounded-lg' />}
                {preview && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image src={preview} alt={alt} width={200} height={200} onClick={onUpload} className=' rounded-lg' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={onUpload}>Change</DropdownMenuItem>
                            {/* TODO: show button */}
                            <DropdownMenuItem>Show</DropdownMenuItem>
                            <DropdownMenuItem>Libarary</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {/* TODO: remove button */}
                            <DropdownMenuItem>Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
};

const ErrorDisplay = ({ errors }: { errors: any }) => {

    const renderErrors = (errors: any) => {
        if (typeof errors === 'string') {
            return <li>{errors}</li>;
        }
        if (Array.isArray(errors)) {
            return (
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            );
        }
        if (typeof errors === 'object') {
            return (
                <ul>
                    {Object.keys(errors).map((key, index) => (
                        <li key={index} className=' text-sm'>
                            {renderErrors(errors[key])}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    }

    return (
        <div className="text-red-500">
            {renderErrors(errors)}
        </div>
    );
}
