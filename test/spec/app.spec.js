import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import $ from 'jquery';

import app from 'app';
import AppRouter from 'router';
import Configuration from 'common/models/configuration';
import AppLayout from 'common/layout/views/default';
import Overlay from 'common/layout/views/overlay';

describe('app', function() {
	describe('initialise', function() {
		// todo: Figure out how to dynamically reload app or
		// lazy so we can setup stub before app init (maybe System.import)
		xit('should start after configuration is fetched', function() {
			let deferred = $.Deferred(),
				promise = deferred.promise();

			sinon.stub(Configuration.prototype, 'fetch', () => promise);

			let anotherApp = require('app');
			spyOn(anotherApp, 'start');

			deferred.resolve();

			expect(app.start).toHaveBeenCalled();
		});
	});

	describe('.onStart', function() {
		let appStateChannel, configuration;

		beforeEach(function() {
			appStateChannel = Radio.channel('appState');

			spyOn(Configuration.prototype, 'fetch');

			spyOn(AppLayout.prototype, 'initialize');
			spyOn(AppLayout.prototype, 'render');

			spyOn(AppRouter.prototype, 'initialize');
			spyOn(Overlay.prototype, 'initialize');
			spyOn(Backbone.history, 'start');

			configuration = {'some random config': 123798};
			app.configuration = configuration;
			app.start();
		});

		it('should listen to requests for the app configuration', function() {
			expect(appStateChannel.request('configuration')).toEqual(configuration);
		});

		it('should render the main layout', function() {
			expect(AppLayout.prototype.render).toHaveBeenCalled();
		});

		it('should initialize app router', function() {
			expect(AppRouter.prototype.initialize).toHaveBeenCalled();
		});

		it('should initialize app overlay', function() {
			expect(Overlay.prototype.initialize).toHaveBeenCalled();
		});

		it('should start backbone history', function() {
			expect(Backbone.history.start).toHaveBeenCalled();
		});
	})
});
