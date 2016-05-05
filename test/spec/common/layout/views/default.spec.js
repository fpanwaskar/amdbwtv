import Radio from 'backbone.radio';

import DefaultLayout from 'common/layout/views/default';
import Header from 'common/layout/views/header';

describe('common.layout.views.default', function() {
	let contentChannel, view;

	beforeEach(function() {
		contentChannel = Radio.channel('appContent');
		spyOn(contentChannel, 'on');

		view = new DefaultLayout();
	});

	describe('.initialize', function() {
		it('should listen to update to the content', function() {
			spyOn(view, 'showHeader');
			spyOn(view, 'showChildView');

			expect(contentChannel.on).toHaveBeenCalledWith('updateContent', jasmine.any(Function));
			let callback = contentChannel.on.calls.first().args[1],
				content = 'some random content';
			callback(content);

			expect(view.showHeader).toHaveBeenCalled();
			expect(view.showChildView).toHaveBeenCalledWith('content', content);
		});
	});

	describe('.showHeader', function() {

		it('should show header child view if not set', function() {
			spyOn(view, 'showChildView');
			view.headerView = undefined;

			view.showHeader();

			expect(view.showChildView).toHaveBeenCalledWith('header', jasmine.any(Header));
			expect(view.headerView instanceof Header).toBeTruthy();
		});

	});
});
