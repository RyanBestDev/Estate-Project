import { useState } from 'react';
import { getStorage, uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { app } from '../firebase';

export default function CreateListing() {
	const [files, setFiles] = useState([]);
	const [formData, setFormData] = useState({
		imageUrls: [],
	});
	const [imageUploadError, setImageUploadError] = useState(null);
	const [uploading, setUploading] = useState(false);

	const handleImageSubmit = (event) => {
		if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
			setUploading(true);
			setImageUploadError(null);
			const promises = [];

			for (let i = 0; i < files.length; i++) {
				promises.push(storeImage(files[i], event));
			}

			Promise.all(promises)
				.then((urls) => {
					setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
					setImageUploadError(null);
					setUploading(false);
				})
				.catch(() => {
					setImageUploadError('Image upload failed, 2MB max for each image');
					setUploading(false);
				});
		} else {
			setImageUploadError('You can only upload 6 images');
			setUploading(false);
		}
	};

	const storeImage = (file) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app);
			const fileName = new Date().getTime() + file.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				'state_changed',
				(snapshot) => snapshot,
				(error) => reject(error),
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL));
				}
			);
		});
	};

	const handleRemoveImage = (index) => {
		setFormData({
			...formData,
			imageUrls: formData.imageUrls.filter((_, i) => i !== index),
		});
	};

	return (
		<main className='p-3 max-w-4xl mx-auto'>
			<h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
			<form className='flex flex-col sm:flex-row gap-4'>
				<div className='flex flex-col flex-1 gap-4'>
					<input
						type='text'
						id='name'
						placeholder='Name'
						className='border p-3 rounded-lg'
						maxLength='62'
						minLength='10'
						required
					/>
					<textarea
						type='text'
						id='description'
						placeholder='Description'
						className='border p-3 rounded-lg'
						required
					/>
					<input
						type='text'
						id='address'
						placeholder='Address'
						className='border p-3 rounded-lg'
						required
					/>
					<div className='flex gap-6 flex-wrap'>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='sell'
								className='w-5'
							/>
							<span>Sell</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='rent'
								className='w-5'
							/>
							<span>Rent</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='parking'
								className='w-5'
							/>
							<span>Parking</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='furnished'
								className='w-5'
							/>
							<span>Furnished</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								id='offer'
								className='w-5'
							/>
							<span>Offer</span>
						</div>
						<div className='flex flex-wrap gap-6'>
							<div className='flex items-center gap-2'>
								<input
									type='number'
									id='bedrooms'
									min='1'
									max='10'
									required
									className='p-2 border border-gray-300 rounded-lg'
								/>
								<p>Beds</p>
							</div>
							<div className='flex items-center gap-2'>
								<input
									type='number'
									id='baths'
									min='1'
									max='10'
									required
									className='p-2 border border-gray-300 rounded-lg'
								/>
								<p>Bathrooms</p>
							</div>
							<div className='flex items-center gap-2'>
								<input
									type='number'
									id='regularPrice'
									min='1'
									required
									className='p-2 border border-gray-300 rounded-lg'
								/>
								<div className='flex flex-col items-center'>
									<p>Regular price</p>
									<span className='text-xs'>($ / month)</span>
								</div>
							</div>
							<div className='flex items-center gap-2'>
								<input
									type='number'
									id='discountPrice'
									min='1'
									required
									className='p-2 border border-gray-300 rounded-lg'
								/>
								<div className='flex flex-col items-center'>
									<p>Discount price</p>
									<span className='text-xs'>($ / month)</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col flex-1 gap-4'>
					<p className='font-semibold'>
						Images:
						<span className='font-normal text-gray-600 ml-2'>
							The first image will be the cover (max 6)
						</span>
					</p>
					<div className='flex gap-4'>
						<input
							type='file'
							id='images'
							className='p-3 border-gray-300 border rounded w-full'
							accept='image/*'
							multiple
							onChange={(event) => setFiles(event.target.files)}
						/>
						<button
							type='button'
							onClick={handleImageSubmit}
							disabled={uploading}
							className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
						>
							{uploading ? 'Uploading...' : 'Upload'}
						</button>
					</div>
					<p className='text-red-700 text-sm'>{imageUploadError ? imageUploadError : ''}</p>
					{formData.imageUrls.length > 0 &&
						formData.imageUrls.map((url, index) => {
							console.log(index);
							return (
								<div
									key={url}
									className='flex justify-between p-3 border items-center'
								>
									<img
										src={url}
										alt='listing image'
										className='w-20 h-20 object-contain rounded-lg'
									/>
									<button
										type='button'
										onClick={() => handleRemoveImage(index)}
										className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
									>
										Delete
									</button>
								</div>
							);
						})}
					<button className='p-2 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>
						Create Listing
					</button>
				</div>
			</form>
		</main>
	);
}
