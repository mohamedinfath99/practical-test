
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillDelete, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { Modal, Spin } from 'antd';


export default function PostCard({ dataSaved }) {

    const [posts, setPosts] = useState([]);
    const [deletePostId, setDeletePostId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchData();
    }, [dataSaved]);


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/v1/blog-post');
            setPosts(response.data.data.posts.reverse());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };


    const handleLike = async (postId) => {
        try {
            await axios.put(`/api/v1/blog-post/like/${postId}`);

            const updatedPosts = posts.map((post) => {
                if (post._id === postId) {
                    return { ...post, likes: post.likes + 1 };
                }
                return post;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };


    const handleDislike = async (postId) => {
        try {
            await axios.put(`/api/v1/blog-post/dislike/${postId}`);

            const updatedPosts = posts.map((post) => {
                if (post._id === postId) {
                    return { ...post, dislikes: post.dislikes + 1 };
                }
                return post;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error disliking post:', error);
        }
    };


    const handleDelete = async () => {
        try {
            await axios.delete(`/api/v1/blog-post/${deletePostId}`);
            const updatedPosts = posts.filter((post) => post._id !== deletePostId);
            setPosts(updatedPosts);
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    const handleCancelDelete = () => {
        setDeletePostId(null);
        setIsDeleteModalVisible(false);
    };


    return (
        <>
            {isLoading ? (
                <Spin size="large" />
            ) : (

                posts.map((post) => (
                    <div className='bg-primary px-2 py-2 rounded-lg' key={post._id}>
                        <div>
                            <div className='w-full flex flex-col gap-2'>

                                <img
                                    src={`/api/v1/blog-post/post-image/${post._id}`}
                                    alt='Selected Image'
                                    className='mt-1'
                                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                                />

                                <span className='mt-2 ml-3 text-dblue text-lg font-semibold'>{post.title}</span>
                                <span className='ml-3 text-dblue text-sm mb-2 mr-2 text-justify'>{post.content} </span>

                                <div className='flex flex-row justify-between'>

                                    <button
                                        type='button'
                                        className='bg-red rounded-lg p-3 py-1 mt-1 flex flex-row items-center gap-2 mb-2 text-white ml-2 font-semibold text-center hover:bg-dyellow transition duration-300'
                                        onClick={() => {
                                            setDeletePostId(post._id);
                                            setIsDeleteModalVisible(true);
                                        }}
                                    >
                                        <AiFillDelete className='text-xl' /> Remove
                                    </button>

                                    <div className='flex flex-row gap-4 mr-2'>

                                        <div className='flex flex-row items-center gap-2'>
                                            <button className='text-2xl'>
                                                <AiFillLike className='icon' onClick={() => handleLike(post._id)} />
                                            </button>
                                            <span className='font-semibold'>{post.likes} Likes</span>
                                        </div>

                                        <div className='flex flex-row items-center gap-2'>
                                            <button className='text-2xl'>
                                                <AiFillDislike className='icon' onClick={() => handleDislike(post._id)} />
                                            </button>
                                            <span className='font-semibold text-md'>{post.dislikes} Dislikes</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))

            )}


            <Modal
                title="Confirm Delete"
                visible={isDeleteModalVisible}
                centered
                okText="Yes"
                cancelText="No"
                onOk={handleDelete}
                onCancel={handleCancelDelete}
                okButtonProps={{
                    children: <span className="text-white">Yes</span>,
                    className: "yesBtn",
                }}
                cancelButtonProps={{
                    children: <span className="text-white">No</span>,
                    className: "noBtn",
                }}
            >

                Are you sure you want to delete this post?
            </Modal>

        </>
    );
}