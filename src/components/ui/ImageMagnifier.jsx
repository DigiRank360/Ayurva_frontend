import React, { useState } from 'react';

const ImageMagnifier = ({
    src,
    alt,
    width = "100%",
    height = "100%",
    magnifierHeight = 150,
    magnifierWidth = 150,
    zoomLevel = 2
}) => {
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [xy, setXY] = useState({ x: 0, y: 0 });
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
    const [showLens, setShowLens] = useState(false);

    const handleMouseEnter = (e) => {
        const elem = e.currentTarget;
        const { width, height } = elem.getBoundingClientRect();
        setImgSize({ width, height });
        setShowMagnifier(true);
    };

    const handleMouseLeave = () => {
        setShowMagnifier(false);
        setShowLens(false);
    };

    const handleMouseMove = (e) => {
        const elem = e.currentTarget;
        const { top, left, width, height } = elem.getBoundingClientRect();

        // Calculate cursor position relative to the image
        const x = e.pageX - left - window.scrollX;
        const y = e.pageY - top - window.scrollY;

        setXY({ x, y });
    };

    return (
        <div
            className="relative inline-block w-full h-full cursor-crosshair overflow-hidden rounded-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover bg-white"
                style={{ width, height }}
            />

            {showMagnifier && (
                <div
                    style={{
                        display: "block",
                        position: "absolute",
                        pointerEvents: "none",
                        height: `${magnifierHeight}px`,
                        width: `${magnifierWidth}px`,
                        // Center the magnifier on cursor
                        top: `${xy.y - magnifierHeight / 2}px`,
                        left: `${xy.x - magnifierWidth / 2}px`,
                        opacity: "1",
                        border: "1px solid lightgray",
                        backgroundColor: "white",
                        backgroundImage: `url('${src}')`,
                        backgroundRepeat: "no-repeat",
                        // Calculate background size based on zoom level
                        backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
                        // Calculate background position to match cursor
                        backgroundPositionX: `${-xy.x * zoomLevel + magnifierWidth / 2}px`,
                        backgroundPositionY: `${-xy.y * zoomLevel + magnifierHeight / 2}px`,
                        borderRadius: "50%", // Circular lens
                        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                        zIndex: 50
                    }}
                />
            )}
        </div>
    );
};

export default ImageMagnifier;
