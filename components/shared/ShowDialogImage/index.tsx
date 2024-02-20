'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog'

const download = require('downloadjs')
import { toPng } from 'html-to-image'

import { umbrellas } from '@/constants'
import { WrapperImgEngrave } from '../WrapperImgEngrave'
import { detailPage } from '@/types'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { useSearchParams } from 'next/navigation'

interface ShowDialogImageProps {
    children: React.ReactNode
    indexFont: number
    typeUmbrella: string
}

export function ShowDialogImage({
    children,
    indexFont,
    typeUmbrella,
}: ShowDialogImageProps) {
    const [umbrellaImgs, setUmbrellaImgs] = useState<detailPage>(null)

    const searchParam = useSearchParams()

    const name: string = searchParam.get('name') || 'Tên Của Bạn'
    const size: string = searchParam.get('size') || '22'
    const spacing: string = searchParam.get('spacing') || '0'

    const name2: string = searchParam.get('name2') || '0888.888.888'
    const size2: string = searchParam.get('size2') || '22'
    const spacing2: string = searchParam.get('spacing2') || '0'

    const dis: string = searchParam.get('dis') || '0'
    const line: string = searchParam.get('line') || '1'

    function handleDownLoadImg(
        typeUmbrella: string,
        line: string,
        name: string,
        indexFont: number,
        size: string,
        spacing: string,
        name2: string,
        size2: string,
        spacing2: string,
        dis: string,
        id: number,
    ) {
        const element: any = document.getElementById(
            `image-${typeUmbrella}-${line}-${name}-${indexFont}-${size}-${spacing}-${name2}-${size2}-${spacing2}-${dis}-${id}`,
        )
        toPng(element)
            .then(function (dataUrl) {
                download(dataUrl, 'my-nason-umbrella.png')
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error)
            })
    }

    useEffect(() => {
        umbrellas.find((umbrella) => {
            setUmbrellaImgs(umbrella.detailPage)
            return umbrella.sku === typeUmbrella
        })
    }, [typeUmbrella])

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-screen h-screen">
                <div className="overflow-hidden h-full">
                    {!umbrellaImgs ? (
                        'Đang cập nhật'
                    ) : (
                        <Carousel className="h-full flex items-center">
                            <CarouselContent className="h-full">
                                {umbrellaImgs?.map((umbrellaImg, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="flex flex-col items-center h-full"
                                    >
                                        <WrapperImgEngrave
                                            id={`image-${typeUmbrella}-${line}-${name}-${indexFont}-${size}-${spacing}-${name2}-${size2}-${spacing2}-${dis}-${index}`}
                                            src={umbrellaImg.imgSrc}
                                            texts={umbrellaImg.texts}
                                            indexFont={indexFont}
                                        />
                                        <DialogFooter className="mt-4 justify-center sm:justify-center mb-2">
                                            <Button
                                                className="bg-main hover:text-main hover:bg-white hover:outline"
                                                onClick={() =>
                                                    handleDownLoadImg(
                                                        typeUmbrella,
                                                        line,
                                                        name,
                                                        indexFont,
                                                        size,
                                                        spacing,
                                                        name2,
                                                        size2,
                                                        spacing2,
                                                        dis,
                                                        index,
                                                    )
                                                }
                                            >
                                                Tải ảnh về
                                            </Button>
                                        </DialogFooter>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-0" />
                            <CarouselNext className="right-0" />
                        </Carousel>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
