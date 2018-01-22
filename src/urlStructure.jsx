import React from 'react';
import { Route } from 'react-router';

export default (
	<Route>
		<Route path='/' />
		<Route path='*' />

		<Route path='/about' />
        <Route path='/faq' />
        <Route path='/contact' />
        <Route path='/terms' />
        <Route path='/privacy-policy' />

		<Route path='/florist'>
			<Route path=':floristCode'>
			</Route>
		</Route>

		<Route path='/florist'>
			<Route path=':floristCode'>
				<Route path=':arrangementCode'>
				</Route>
			</Route>
		</Route>

	</Route>
);