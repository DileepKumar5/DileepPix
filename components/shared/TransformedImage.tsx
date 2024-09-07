import Image from 'next/image'
import downloadimg from "@/public/assets/icons/download.svg"
import { CldImage } from 'next-cloudinary'
import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

const TransformedImage = ({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = false }: TransformedImageProps) => {
    const downloadHanlder = () => { }
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex-between'>
                <h3 className='h3-bold text-dark-600'>
                    Transformed
                </h3>

                {hasDownload && (
                    <button
                        className='download-btn'
                        onClick={downloadHanlder}
                    >
                        <Image
                            src={downloadimg}
                            alt='Download'
                            width={24}
                            height={24}
                            className='pb-[6px]'
                        />

                    </button>
                )}

            </div>
            {image?.publicID && transformationConfig ? (
                <div className='relative'>
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicID}
                        alt={image.title}
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="transformed-image"
                        onLoad={() => {
                            setIsTransforming && setIsTransforming(false);
                        }}
                        onError={() => {
                            debounce(() => {
                                setIsTransforming && setIsTransforming(false);
                            }, 8000)()
                        }}
                        {...transformationConfig}
                    />
                    {isTransforming && (
                        <div className="transforming-loader">
                            <Image
                                src="/assets/icons/spinner.svg"
                                width={50}
                                height={50}
                                alt="spinner"
                            />
                            <p className="text-white/80">Please wait...</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className='transformed-placeholder'>Transformed Image</div>
            )}



        </div>
    )
}

export default TransformedImage