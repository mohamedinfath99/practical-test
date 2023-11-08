
import { useState } from 'react';
import Contact from '../components/Contact';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import PostImages from '../components/PostImages';



export default function Post() {

    const [dataSaved, setDataSaved] = useState(false);

    const triggerRerender = () => {
        setDataSaved(!dataSaved);
    };

    return (
        <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <NavBar />

            <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>

                <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
                    <Contact />
                </div>

                <div className='flex-1 h-full  px-4 flex flex-col gap-6 rounded-lg overflow-y-auto'>
                    <PostForm triggerRerender={triggerRerender} />

                    <PostCard dataSaved={dataSaved} />
                </div>

                <div className='hidden w-1/4 h-full lg:flex flex-col gap-6 rounded-lg overflow-y-auto'>
                    <PostImages />
                </div>

            </div>
        </div>
    );
}
