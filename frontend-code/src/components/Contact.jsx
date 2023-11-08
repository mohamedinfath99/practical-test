
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import ContactCard from './ContactCard';


export default function Contact() {

    const [userData, setUserData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setUserData(response.data.slice(0, 6));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);


    const handleLoadMore = () => {
        if (showAll) {
            setUserData((prevData) => prevData.slice(0, 6));
        } else {
            axios
                .get('https://jsonplaceholder.typicode.com/users')
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data: ', error);
                });
        }
        setShowAll(!showAll);
    };

    return (
        <div className='w-full bg-primary font-semibold flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>

            <div className='text-2xl text-ascent-1 pb-6 '>
                <h1 className='border-b text-dblue border-[#66666645]'>Contact</h1>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                userData.map((user) => (
                    <ContactCard user={user} key={user.id} />
                ))
            )}

            <button
                onClick={handleLoadMore}
                className={`bg-dblue font-medium mt-4 cursor-pointer text-white rounded p-1 w-40 hover:bg-cblue transition duration-300`}
            >
                {showAll ? 'Load Less' : 'Load More'}
            </button>

        </div>
    );
}
