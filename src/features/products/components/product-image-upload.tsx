"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ProductImage } from "@prisma/client";
import { ImagePlus, Plus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProductImageUploadProps {
    onImageChange: (images: File[], mainIndex: number, deletedIds?: string[]) => void;
    existingImages?: ProductImage[]
}

const ProductImageUpload = ({ onImageChange, existingImages = [], }: ProductImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])
    const [initialmainImageSet, setInitialMainImageSet] = useState(false)

    const [existingImagesState, setExistingImagesState] = useState(existingImages)

    console.log(existingImagesState)

    const notifyToParent = useCallback(() => {
        onImageChange(selectedFile, mainImageIndex, deletedImageIds)
    }, [selectedFile, mainImageIndex, deletedImageIds, onImageChange])

    useEffect(() => {
        if (existingImagesState.length > 0 && !initialmainImageSet) {
            //Find image index 
            const mainIndex = existingImagesState.findIndex((image) => image.isMain)
            if (mainIndex >= 0) {
                setMainImageIndex(mainIndex)
                setInitialMainImageSet(true)
            }
        }

        notifyToParent()

    }, [existingImagesState, notifyToParent, initialmainImageSet])



    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) return;

        //Filter only image fliles
        const imageFiles = files.filter((file) => file.type.startsWith("image/"));
        if (imageFiles.length === 0) return;

        //Create preview URLs
        const newPrewiewUrls = imageFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prev) => [...prev, ...newPrewiewUrls]);
        setSelectedFile((prev) => [...prev, ...imageFiles]);

        if (existingImages.length === 0 && selectedFile.length === 0 && imageFiles.length > 0) {
            setMainImageIndex(0);
        }

        //Reset Inut
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSetMain = (index: number, isExisting = false) => {
        if (isExisting) {
            setMainImageIndex(index)
        } else {
            setMainImageIndex(existingImagesState.length + index)
        }
    };

    const handleRemoveImage = (index: number, isExisting = false) => {
        if (isExisting) {
            const imageToRemove = existingImagesState[index]
            setDeletedImageIds((prev) => [...prev, imageToRemove.id])
            setExistingImagesState(existingImagesState.filter((_, i) => i !== index))
        }

        if (mainImageIndex === index) {
            if (existingImagesState.length > 0) {
                setMainImageIndex(0)
            } else if (selectedFile.length > 0) {
                setMainImageIndex(0)
            } else {
                setMainImageIndex(-1)
            }
        } else if (mainImageIndex > index) {
            setMainImageIndex((prve) => prve - 1)
        } else {
            URL.revokeObjectURL(previewUrls[index])
            setPreviewUrls(previewUrls.filter((_, i) => i !== index))
            setSelectedFile(selectedFile.filter((_, i) => i !== index))


            const actualRemovedIndex = existingImagesState.length + index
            if (mainImageIndex === index) {
                if (existingImagesState.length > 0) {
                    setMainImageIndex(0)
                } else if (selectedFile.length > 0) {
                    setMainImageIndex(0)
                } else {
                    setMainImageIndex(-1)
                }
            } else if (mainImageIndex > actualRemovedIndex) {
                setMainImageIndex((prve) => prve - 1)
            }
        }
    };

    const isMainImage = (index: number, isExisting: boolean) => {
        const actualIndex = isExisting ? index : existingImagesState.length + index
        return mainImageIndex === actualIndex
    }

    return (
        <div className="space-y-2">
            <Label>
                Product Image <span className="text-red-500">*</span>
            </Label>

            {/* Preview Image Area */}
            {(existingImagesState.length > 0 || previewUrls.length > 0) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">

                    {/* Existing Images */}
                    {existingImagesState.map((image, index) => (
                        <div
                            key={`existing-${index}`}
                            className={cn(
                                "relative aspect-square group border rounded-md overflow-hidden",
                                {
                                    "ring-2 ring-primary": isMainImage(index, true)
                                }
                            )}
                        >

                            <Image
                                alt={`Product Preview ${index + 1}`}
                                src={image.url}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                            />

                            {/* Main Image Badge */}
                            {isMainImage(index, true) && (
                                <Badge className="absolute left-1 top-1 z-20">Main</Badge>
                            )}

                            {/* Image Control Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <div className="absolute right-1 top-1 flex items-center gap-1 z-20">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="size-6 sm:size-8 rounded-full"
                                    onClick={() => handleSetMain(index, true)}
                                >
                                    <Star
                                        size={16}
                                        className={cn({
                                            "fill-orange-500 text-orange-500":
                                                isMainImage(index, true),
                                        })}
                                    />
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="size-6 sm:size-8 rounded-full"
                                    onClick={() => handleRemoveImage(index, true)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Image Preview */}
                    {previewUrls.map((url, index) => (
                        <div
                            key={`new-${index}`}
                            className={cn(
                                "relative aspect-square group border rounded-md overflow-hidden",
                                {
                                    "ring-2 ring-primary": isMainImage(index, false),
                                }
                            )}
                        >

                            <Image
                                alt={`Product Preview ${index + 1}`}
                                src={url}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                            />

                            {/* Main Image Badge */}
                            {isMainImage(index, false) && (
                                <Badge className="absolute left-1 top-1 z-20">Main</Badge>
                            )}

                            {/* Image Control Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <div className="absolute right-1 top-1 flex items-center gap-1 z-20">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="size-6 sm:size-8 rounded-full"
                                    onClick={() => handleSetMain(index)}
                                >
                                    <Star
                                        size={16}
                                        className={cn({
                                            "fill-orange-500 text-orange-500":
                                                isMainImage(index, false),
                                        })}
                                    />
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="size-6 sm:size-8 rounded-full"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Add More Button */}
                    <div
                        className="aspect-square border rounded-md flex items-center justify-center cursor-pointer hover:bg-muted transition-colors"
                        onClick={triggerFileInput}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Plus size={24} />
                            <span className="text-xs">Add Image</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Uploade Image button */}
            {existingImagesState.length === 0 && previewUrls.length === 0 && (
                <div
                    className="border rounded-md p-8 flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-muted transition-colors"
                    onClick={triggerFileInput}
                >
                    <ImagePlus size={40} />
                    <Button type="button" variant="secondary" size="sm">
                        Browse Files
                    </Button>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(event) => handleFileChange(event)}
            />
        </div>
    );
};

export default ProductImageUpload;
