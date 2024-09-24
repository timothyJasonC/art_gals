import { useEffect, useRef, useState } from "react";
import { calculateGridDimensions, calculateMinWidth, getGridStyle, getGridStyleVer2, getRandomImages } from "../lib";
import { imageList } from "../dummy";

type GalleryProps = {
    type: string
}

export default function ImageGallery({ type }: GalleryProps) {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageUrls2, setImageUrls2] = useState<string[]>([]);

    const randomImg = async () => {
        const images = getRandomImages()
        setImageUrls(images)
    }

    useEffect(() => {
        randomImg()
        const accessKey = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;

        fetch('https://api.unsplash.com/photos/random?count=30', {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const urls = data.map((img: any) => img.urls.regular);
                setImageUrls(urls);
            })
            .catch(() => {
                const images = getRandomImages()
                setImageUrls(images)
            });

        if (type === '2') {
            fetch('https://api.unsplash.com/photos/random?count=30', {
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    const urls = data.map((img: any) => img.urls.regular);
                    setImageUrls2(urls);
                })
                .catch(() => {
                    const images = getRandomImages()
                    setImageUrls2(images)
                });
        }
    }, []);

    useEffect(() => {
        const gallery = galleryRef.current;
    
        let touchStartX = 0; 
        let scrollStartX = 0; 
        const sensitivity = 30;
    
        const handleWheel = (event: WheelEvent) => {
            // if (window.innerWidth >= 768) {
                event.preventDefault();
                if (gallery) {
                    gallery.scrollBy({ left: event.deltaY, behavior: 'instant' });
                }
            // }
        };
    
        const handleTouchStart = (event: TouchEvent) => {
            if (window.innerWidth < 768 && gallery) {
                touchStartX = event.touches[0].clientX;
                scrollStartX = gallery.scrollLeft;
            }
        };
    
        const handleTouchMove = (event: TouchEvent) => {
            if (window.innerWidth < 768 && gallery) {
                const touchMoveX = event.touches[0].clientX;
                const deltaX = (touchStartX - touchMoveX) * sensitivity;
                gallery.scrollLeft = scrollStartX + deltaX; 
            }
        };
    
        if (gallery) {
            // if (window.innerWidth >= 768) {
            // } else {
                gallery.addEventListener('wheel', handleWheel);
                gallery.addEventListener('touchstart', handleTouchStart);
                gallery.addEventListener('touchmove', handleTouchMove);
            // }
        }
    
        return () => {
            if (gallery) {
                if (window.innerWidth >= 768) {
                    gallery.removeEventListener('wheel', handleWheel);
                } else {
                    gallery.removeEventListener('touchstart', handleTouchStart);
                    gallery.removeEventListener('touchmove', handleTouchMove);
                }
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
                        gallery.scrollBy({ left: 2, behavior: 'smooth' });
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
                const isAtEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1;
                const accessKey = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;

                if (isAtEnd) {
                    fetch('https://api.unsplash.com/photos/random?count=30', {
                        headers: {
                            Authorization: `Client-ID ${accessKey}`,
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            const urls = data.map((img: any) => img.urls.regular);
                            setImageUrls(prev => [...prev, ...urls])
                        })
                        .catch(() => {
                            const images = getRandomImages()
                            setImageUrls(prev => [...prev, ...images])
                        });

                    if (type === '2') {
                        setImageUrls2(prev => [...prev, ...imageList])

                        fetch('https://api.unsplash.com/photos/random?count=30', {
                            headers: {
                                Authorization: `Client-ID ${accessKey}`,
                            },
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                const urls = data.map((img: any) => img.urls.regular);
                                setImageUrls2(prev => [...prev, ...urls])
                            })
                            .catch(() => {
                                const images = getRandomImages()
                                setImageUrls(prev => [...prev, ...images])
                            });
                    }
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
                    gridTemplateRows: `repeat(5, 6vh)`,
                    position: `${type === '2' ? 'relative' : 'static'}`,
                }}>
                {imageUrls.map((imgLink: string, index: number) => (
                    <img key={index} src={imgLink} alt={`img-${index + 1}`} style={getGridStyle(index)} />
                ))}
            </section>
            {type === '2' && (
                <section className='gallery'
                    style={{
                        marginTop: '12px',
                        minWidth: calculateMinWidth(imageUrls),
                        gridTemplateColumns: `repeat(${totalColumns}, max(3rem))`,
                        gridTemplateRows: `repeat(5, 6vh)`,
                        position: `${type === '2' ? 'relative' : 'static'}`,
                    }}>
                    {imageUrls2.map((imgLink: string, index: number) => (
                        <img key={index} src={imgLink} alt={`img-${index + 1}`} style={getGridStyleVer2(index)} />
                    ))}
                </section>
            )

            }
        </div>
    )
}

