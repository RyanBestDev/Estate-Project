import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import CreateListing from './pages/CreateListing';
import PrivateRoute from './components/PrivateRoute';
import UpdateListings from './pages/UpdateListings';

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
					element: <PrivateRoute />,
					children: [{ path: '', element: <Profile /> }],
					//loader: teamLoader,
				},
				{
					path: '/create-listing',
					element: <PrivateRoute />,
					children: [{ path: '', element: <CreateListing /> }],
					//loader: teamLoader,
				},
				{
					path: '/update-listing/:listingId',
					element: <PrivateRoute />,
					children: [{ path: '', element: <UpdateListings /> }],
					//loader: teamLoader,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}
//const router = createBrowserRouter(
// 	createRoutesFromElements(
// 		<>
// 			<Route
// 				path='/'
// 				element={
// 					<>
// 						<Header />
// 						<Outlet />
// 					</>
// 				}
// 			>
// 				<Route
// 					path='/'
// 					element={<Home />}
// 				/>
// 				<Route
// 					path='/sign-in'
// 					element={<SignIn />}
// 				/>
// 				<Route
// 					path='/sign-up'
// 					element={<SignUp />}
// 				/>
// 				<Route
// 					path='/about'
// 					element={<About />}
// 				/>
// 				<Route element={<PrivateRoute />}>
// 					<Route
// 						path='/profile'
// 						element={<Profile />}
// 					/>
// 				</Route>
// 			</Route>
// 		</>
// 	)
// );
