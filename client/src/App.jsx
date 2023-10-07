import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';

export default function App() {
	const router = createBrowserRouter([
		{
			path: '',
			element: (
				<>
					<Header />
					<Outlet />
				</>
			),
			//loader: rootLoader,
			children: [
				{
					path: '/',
					element: <Home />,
					//loader: teamLoader,
				},
				{
					path: '/sign-in',
					element: <SignIn />,
					//loader: teamLoader,
				},
				{
					path: '/sign-up',
					element: <SignUp />,
					//loader: teamLoader,
				},
				{
					path: '/about',
					element: <About />,
					//loader: teamLoader,
				},
				{
					path: '/profile',
					element: <Profile />,
					//loader: teamLoader,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}
