
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';
import Loading from './Loading';


export default function PostImages() {

    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get('https://picsum.photos/v2/list?page=1&limit=10')
            .then((response) => {
                setImages(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div className='w-full bg-primary shadow-sm rounded-lg  px-6 py-5 font-semibold flex flex-col items-center'>

            <div className='text-ascent-1 pb-8'>
                <h1 className='border-b text-center text-2xl font-semibold text-[#022A60] border-[#66666645]'>Images</h1>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                images.map((image) => (
                    <ImageCard image={image} key={image.id} />
                ))
            )}

        </div>
    );
}
