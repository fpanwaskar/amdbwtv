import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import AppRouter from 'router';
import Configuration from 'common/models/configuration';
import AppLayout from 'common/layout/views/default';
import Overlay from 'common/layout/views/overlay';
import Settings from 'settings';

let appStateChannel = Radio.channel('appState');
let contentChannel = Radio.channel('appContent');

let app = new Marionette.Application();

app.configuration = new Configuration();
app.settings = new Settings();
appStateChannel.reply('settings', function() {
	return app.settings;
});

app.on('start', function() {
	'use strict';

	appStateChannel.reply('configuration', function() {
    	return app.configuration;
	});

	app.rootLayout = new AppLayout({el: '.main-content'});
	app.rootLayout.render();

	app.router = new AppRouter();

	app.overlay = new Overlay({el: '.overlay'});
	app.overlay.render();

	if (Backbone.history){
		Backbone.history.start();
	}
});

app.configuration.fetch().then(() => app.start());
export default app;
