import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import {
	updateUserStart,
	updateUserFailure,
	updateUserSuccess,
	deleteUserFailure,
	deleteUserStart,
	deleteUserSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
	const { currentUser, loading, error } = useSelector((state) => state.user);
	const fileRef = useRef(null);
	const [file, setFile] = useState(undefined);
	const [filePerc, setFilePerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(null);
	const [formData, setFormData] = useState({});
	const [updateSucess, setUpdateSucess] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			dispatch(updateUserStart());
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			if (data.success === false) {
				dispatch(updateUserFailure(data.message));
				return;
			}

			dispatch(updateUserSuccess(data));
			setUpdateSucess(true);
		} catch (error) {
			dispatch(updateUserFailure(error.message));
		}
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.id]: event.target.value });
	};

	const handleDeleteUser = async () => {
		try {
			dispatch(deleteUserStart());
			const res = await fetch(`/api/user/delete/${currentUser._id}`, {
				method: 'DELETE',
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(deleteUserFailure(data.message));
				return;
			}

			dispatch(deleteUserSuccess());
		} catch (error) {
			console.log(error);
			dispatch(deleteUserFailure(error.message));
		}
	};

	const handleFileUpload = (file) => {
		setFileUploadError(null);
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_change',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setFilePerc(Math.round(progress));
			},
			(error) => {
				setFileUploadError(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFormData({ ...formData, avatar: downloadURL });
				});
			}
		);
	};

	useEffect(() => {
		if (file) {
			handleFileUpload(file);
		}
	}, [file]);

	return (
		<div className='p-3 max-w-lg mx-auto'>
			<h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4'
			>
				<input
					type='file'
					ref={fileRef}
					hidden
					accept='image/*'
					onChange={(event) => setFile(event.target.files[0])}
				/>
				<img
					src={formData.avatar || currentUser.avatar}
					alt='profile icon image'
					className='rounded-full h-24 w-24 obj-cover cursor-pointer place-self-center mt-2'
					onClick={() => fileRef.current.click()}
				/>
				<p className='mx-auto text-sm'>
					{fileUploadError ? (
						<span className='text-red-700'>Error uploading image, must be less than 2MB</span>
					) : filePerc > 0 && filePerc < 100 ? (
						<span className='text-black-700'>{`Uploading ${filePerc}%`}</span>
					) : filePerc === 100 ? (
						<span className='text-green-700'>Successfully uploaded!</span>
					) : (
						''
					)}
				</p>
				<input
					type='text'
					placeholder='username'
					className='border p-3 rounded-lg'
					defaultValue={currentUser.username}
					onChange={handleChange}
					id='username'
				/>
				<input
					type='text'
					placeholder='email'
					className='border p-3 rounded-lg'
					defaultValue={currentUser.email}
					onChange={handleChange}
					id='email'
				/>
				<input
					type='text'
					placeholder='password'
					className='border p-3 rounded-lg'
					onChange={handleChange}
					id='password'
				/>
				<button
					className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Update'}
				</button>
			</form>
			<div className='flex justify-between mt-5'>
				<span
					onClick={handleDeleteUser}
					className='text-red-700 cursor-pointer'
				>
					Delete Account
				</span>
				<span className='text-red-700 cursor-pointer'>Sign Out</span>
			</div>
			<p className='text-red-700 mt-5'>{error ? error : ''}</p>
			<p className='text-green-700 mt-5'>{updateSucess ? 'Sucess' : ''}</p>
		</div>
	);
}
