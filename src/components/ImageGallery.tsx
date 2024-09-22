import { useEffect, useRef, useState } from "react";
import { imageList } from '../dummy'
import { calculateGridDimensions, calculateMinWidth, getGridStyle } from "../lib";

export default function ImageGallery() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>(imageList.slice(0, 30));

    // useEffect(() => {
    //   const accessKey = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;

    //   fetch('https://api.unsplash.com/photos/random?count=100', {
    //     headers: {
    //       Authorization: `Client-ID ${accessKey}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const urls = data.map((img: any) => img.urls.regular);
    //       setImageUrls(urls);
    //     })
    //     .catch((error) => console.error('Error fetching image:', error));
    // }, []);

    // console.log(imageList);    

    useEffect(() => {
        const gallery = galleryRef.current;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault(); // Mencegah scroll default
            if (gallery) {
                gallery.scrollBy({ left: event.deltaY, behavior: 'instant' }); // Scroll horizontal
            }
        };

        if (gallery) {
            gallery.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (gallery) {
                gallery.removeEventListener('wheel', handleWheel);
            }
        };
    }, [imageUrls]);

    const { totalColumns } = calculateGridDimensions(imageUrls);

    useEffect(() => {
        let scrollInterval: NodeJS.Timeout;

        const startScroll = () => {
            scrollInterval = setInterval(() => {
                const gallery = galleryRef.current;
                if (gallery) {
                    if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
                        gallery.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        gallery.scrollBy({ left: 1, behavior: 'smooth' });
                    }
                }
            }, 20)
        };
        if (!isHovered) {
            startScroll();
        }

        return () => clearInterval(scrollInterval);
    }, [isHovered]);

    useEffect(() => {
        const gallery = galleryRef.current;

        const handleScroll = () => {
            if (gallery) {
                const scrollPercentage = (gallery.scrollLeft / (gallery.scrollWidth - gallery.clientWidth));

                if (scrollPercentage > 0.8) {
                    setImageUrls(prev => [...prev, ...imageList])
                    //     const accessKey = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;
                    //     fetch('https://api.unsplash.com/photos/random?count=100', {
                    //         headers: {
                    //             Authorization: `Client-ID ${accessKey}`,
                    //         },
                    //     })
                    //         .then((response) => response.json())
                    //         .then((data) => {
                    //             const urls = data.map((img: any) => img.urls.regular);
                    //             setImageUrls(prev => [...prev, ...urls])
                    //         })
                }
            }
        };

        gallery?.addEventListener('scroll', handleScroll);
        return () => {
            gallery?.removeEventListener('scroll', handleScroll);
        };
    }, [imageUrls]);

    return (
        <div
            className='gallery-container scrollbar-hide'
            ref={galleryRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            <section className='gallery'
                style={{
                    minWidth: calculateMinWidth(imageUrls),
                    gridTemplateColumns: `repeat(${totalColumns}, max(3rem))`,
                    gridTemplateRows: `repeat(5, 6.8vh)`,
                }}>
                {imageUrls.map((imgLink: string, index: number) => (
                    <img key={index} src={imgLink} alt={`img-${index + 1}`} style={getGridStyle(index)} />
                ))}
            </section>
        </div>
    )
}

