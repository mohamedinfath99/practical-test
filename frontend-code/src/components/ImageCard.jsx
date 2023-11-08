
import PropTypes from 'prop-types';


export default function ImageCard({ image }) {
    return (
        <div className="relative text-xl text-ascent-1 pb-3 border-b border-[#66666645] group cursor-pointer">

            <img
                src={image.download_url}
                alt={`Image ${image.id}`}
                width={image.width}
                height={image.height}
                className="transition-transform transform grayscale group-hover:grayscale-0"
            />

            <div className="absolute bottom-0 left-0 p-2 pb-4 bg-black text-white opacity-100">
                <span className="text-sm">Post by {image.author}</span>
            </div>

        </div>
    );
}

ImageCard.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        download_url: PropTypes.string.isRequired,
    }).isRequired,
};
