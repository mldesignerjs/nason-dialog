import { TextEngraved } from '../TextEngraved'
import { textEngraveInImg } from '@/types'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export interface IWrapperImgEngraveProps {
    texts: textEngraveInImg[] | null
    src: string
    indexFont: number
    id: string
}

export function WrapperImgEngrave({
    id,
    src,
    texts,
    indexFont,
}: IWrapperImgEngraveProps) {
    const [scale, setScale] = useState<number>(100)
    const imageRef1 = useRef<HTMLImageElement>(null)
    const ratioScreen: number = screen.width / screen.height

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const elementImg1: any = imageRef1?.current
            setScale(elementImg1?.width / 1344)
        }, 100)

        return () => clearTimeout(timeoutId)
    }, [imageRef1])

    return (
        <>
            <div className="relative" id={id}>
                <img
                    src={src}
                    alt={''}
                    className={`${
                        ratioScreen > 0.6
                            ? 'h-[85vh] w-auto max-w-full'
                            : 'w-[85vw] h-auto max-h-full'
                    }`}
                    ref={imageRef1}
                />

                {texts?.map((engravedText, index) => (
                    <div
                        key={index}
                        className="engraved"
                        style={{
                            top: `${engravedText.x}%`,
                            left: `${engravedText.y}%`,
                            transform: `translate(-50%,-50%) rotateX(${
                                engravedText.rotateX
                            }deg) rotateY(${engravedText.rotateY}deg) rotateZ(${
                                engravedText.rotateZ
                            }deg) scale(${scale * engravedText.scale})`,
                        }}
                    >
                        <TextEngraved
                            indexFont={indexFont}
                            handle={engravedText.handle}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}
