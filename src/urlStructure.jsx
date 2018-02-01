import React from 'react';
import { Route } from 'react-router';

export default (
	<Route>
		<Route path='/en/' />
		<Route path='/zh/' />
        <Route path='/en/faq/' />
		<Route path='/zh/faq/' />
        <Route path='/en/contact/' />
		<Route path='/zh/contact/' />

		<Route path='/en/arrangements/category/wrappedBouquets/region/' />
		<Route path='/zh/arrangements/category/wrappedBouquets/region/' />

		<Route path='/en/arrangements/category/arrangements/region/' />
		<Route path='/zh/arrangements/category/arrangements/region/' />

		<Route path='/en/arrangements/category/hampers/region/' />
		<Route path='/zh/arrangements/category/hampers/region/' />

		<Route path='/en/arrangements/category/driedPreserved/region/' />
		<Route path='/zh/arrangements/category/driedPreserved/region/' />

		{/* <Route path='/en/florist'>
			<Route path=':floristCode'>
			</Route>
		</Route>
		<Route path='/zh/florist'>
			<Route path=':floristCode'>
			</Route>
		</Route>

		<Route path='/en/florist'>
			<Route path=':floristCode'>
				<Route path=':arrangementCode'>
				</Route>
			</Route>
		</Route>
		<Route path='/zh/florist'>
			<Route path=':floristCode'>
				<Route path=':arrangementCode'>
				</Route>
			</Route>
		</Route> */}

	</Route>
);