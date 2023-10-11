import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const res = await fetch('api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
		const data = await res.json();

		if (data.success === false) {
			setError(data.message);
			setLoading(false);
			return;
		}
		setLoading(false);
		setError(null);
	};

	return (
		<div className='p-3 max-w-lg mx-auto'>
			<h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4'
			>
				<input
					type='text'
					placeholder='username'
					className='border p-3'
					id='username'
					onChange={handleChange}
				/>
				<input
					type='email'
					placeholder='email'
					className='border p-3'
					id='email'
					onChange={handleChange}
				/>
				<input
					type='password'
					placeholder='password'
					className='border p-3'
					id='password'
					onChange={handleChange}
				/>
				<button
					disabled={loading}
					className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'
				>
					{loading ? 'Loading...' : 'Sign Up'}
				</button>
			</form>
			<div className='flex gap-2 mt-5'>
				<p>Have an account?</p>
				<Link to='/sign-in'>
					<span className='text-blue-500'>Sign in</span>
				</Link>
			</div>
			{error && <p className='text-red-500 mt-5'>{error}</p>}
		</div>
	);
}
