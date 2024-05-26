import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CropperRef, Cropper } from 'react-mobile-cropper';
import { getOutput, defaultTransforms, defaultCoordinates } from "./utils";
import 'react-mobile-cropper/dist/style.css'

import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Check, XIcon } from "lucide-react";
// import "./index.scss";

type ImageEditorProps = {
    onSubmit: (state: any) => void;
    onCancel: () => void;
    open: boolean;
    settings: any;
    src?: string;
};
export const ImageEditor = ({ onSubmit, onCancel, open, settings, src }: ImageEditorProps) => {
    const [destroyed, setDestroyed] = useState(true);
    const cropperRef = useRef(null);


    const onSubmitInternal = () => {
        const cropper = cropperRef.current;
        console.log("cropper", cropper);
        if (cropper) {
            onSubmit?.(cropper.getState(), cropper.getSettings());
        }
    };
    useLayoutEffect(() => {
        if (open) {
            setDestroyed(false);
        }
    }, [open]);

    const onTransitionEnd = () => {
        if (!open) {
            setDestroyed(true);
        }
    };

    const onChange = (cropper: CropperRef) => {
        console.log(cropper.getCoordinates(), cropper.getCanvas());
    };

    return destroyed ? null : (
        <Dialog open={open}  >
            <DialogContent className="p-0" onTransitionEnd={onTransitionEnd}>
                <div className=" flex justify-between items-center absolute top-3 w-full px-5 ">
                    <button type="button" onClick={onCancel} className=" z-20 rounded-full bg-black bg-opacity-30 p-1">
                        <XIcon className=" h-6 w-6" />
                    </button>
                    <button type="button" onClick={onSubmitInternal} className=" bg-green-700 z-20 rounded-full p-1">
                        <Check size={24} className=" w-6 h-6" />
                    </button>
                </div>
                <Cropper
                    ref={cropperRef}
                    src={src}
                    onChange={onChange}
                    defaultTransforms={defaultTransforms(settings)}
                    defaultCoordinates={defaultCoordinates(settings)}
                />
            </DialogContent >
        </Dialog>
    );
};

export const useEditor = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [src, setSrc] = useState<string>();
    const [settings, setSettings] = useState({});

    const link = useRef({
        open(file, settings) {
            setSrc(URL.createObjectURL(file));
            setSettings(settings);
            setOpen(true);
        }
    });

    const submit = (state: any) => {
        const output = getOutput(state);
        console.log("output", output);
        console.log("state ", state);
        link.current.onconfirm?.(output);
        link.current.onclose?.();
        setOpen(false);
    };

    const cancel = () => {
        link.current.oncancel?.();
        link.current.onclose?.();
        setOpen(false);
    };

    useEffect(() => {
        return () => {
            if (src) {
                URL.revokeObjectURL(src);
            }
        };
    }, [src]);

    return {
        open,
        setOpen,
        cancel,
        submit,
        settings,
        src,
        link: link.current
    };
};


