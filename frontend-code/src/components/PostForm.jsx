
import { useState } from 'react';
import axios from 'axios';
import { Modal, notification } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PostForm({ triggerRerender }) {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
    });

    const [imageSelected, setImageSelected] = useState(false);
    const [isDiscardModalVisible, setIsDiscardModalVisible] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
        setImageSelected(true);
    };


    const handleDiscard = () => {
        showDiscardModal();
    };


    const showDiscardModal = () => {
        setIsDiscardModalVisible(true);
    };


    const hideDiscardModal = () => {
        setIsDiscardModalVisible(false);
    };


    const handleConfirmDiscard = () => {
        hideDiscardModal();
        setFormData({
            title: '',
            content: '',
            image: null,
        });
        setImageSelected(false);
    };


    const handleCancelDiscard = () => {
        hideDiscardModal();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            title: '',
            content: '',
            image: '',
        };

        if (formData.title.trim() === '') {
            newErrors.title = 'Title is required';
            notification.error({
                message: 'Title is required',
            });
        }

        if (formData.content.trim() === '') {
            newErrors.title = 'Content is required';
            notification.error({
                message: 'Content is required',
            });
        }

        if (!formData.image) {
            newErrors.image = 'Image is required';
            notification.error({
                message: 'Image is required',
            });
        }

        if (newErrors.title === '' && newErrors.image === '') {
            try {

                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('content', formData.content);
                formDataToSend.append('image', formData.image);

                await axios.post('/api/v1/blog-post', formDataToSend);

                setFormData({
                    title: '',
                    content: '',
                    image: null,
                });

                setImageSelected(false);

                toast.success('Post submitted successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                triggerRerender();

            }
            catch (error) {
                if (error.response) {
                    console.error('Server responded with status:', error.response.status);
                    console.error('Server response data:', error.response.data);

                    toast.error(`Server responded with an error: ${error.response.data.message}`, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                }
                else if (error.request) {
                    console.error('No response received');

                    toast.error('No response received from the server', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                }
                else {
                    console.error('Error setting up the request:', error.message);

                    toast.error('An error occurred while submitting the post', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            }
        }
    };

    return (
        <div className="bg-primary px-4 py-6 rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-3">

                    <span className="text-xl text-dblue font-semibold">New Post</span>

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="p-2 rounded border border-gray-400 focus:outline-none"
                    />

                    <textarea
                        name="content"
                        placeholder="Write Something..."
                        value={formData.content}
                        onChange={handleInputChange}
                        className="p-2 rounded border border-gray-400 focus:outline-none"
                    />

                    {formData.image && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Selected Image"
                            style={{ maxWidth: '100%', maxHeight: '300px' }}
                            className="mt-2"
                        />
                    )}

                    {imageSelected ? (
                        <div className="flex justify-between gap-1 mt-1">

                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={handleDiscard}
                                    className="bg-red rounded-lg p-3 py-1 text-white ml-2 font-semibold text-center hover-bg-dyellow transition duration-300"
                                >
                                    Discard Post
                                </button>
                            </div>

                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    className="bg-dblue text-white font-semibold rounded-lg p-4 py-1 mr-2 text-center hover-bg-cblue transition duration-300"
                                >
                                    Post
                                </button>
                            </div>

                        </div>

                    ) : (

                        <div className="flex justify-between items-center gap-1">
                            <div className="flex items-center justify-center gap-3">

                                <label className="text-dblue font-medium mt-2">Select Image</label>

                                <label
                                    htmlFor="image"
                                    className="cursor-pointer px-3 font-medium py-1 mt-2 text-white bg-dblue rounded-lg hover-bg-cblue transition duration-300"
                                >
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                        id="image"
                                    />
                                    Choose File
                                </label>

                            </div>

                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    className="bg-dblue text-white mt-2 font-semibold rounded-lg p-4 py-1 mr-2 text-center hover-bg-blue-600 hover-bg-cblue transition duration-300"
                                >
                                    Post
                                </button>
                            </div>

                        </div>
                    )}

                </div>
            </form>

            <Modal
                title="Confirm Discard"
                visible={isDiscardModalVisible}
                onOk={handleConfirmDiscard}
                onCancel={handleCancelDiscard}
                centered
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                    children: <span className="text-white">Yes</span>,
                    className: "yesBtn",
                }}
                cancelButtonProps={{
                    children: <span className="text-white">No</span>,
                    className: "noBtn",
                }}
            >
                Are you sure you want to discard this post?
            </Modal>

        </div>
    );
}