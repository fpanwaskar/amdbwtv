import Radio from 'backbone.radio';
import $ from 'jquery';

import Header from 'common/layout/views/header';

describe('common.layout.views.header', function() {
	let overlayChannel, view;

	beforeEach(function() {
		spyOn(Header.prototype, 'listenTo');
		overlayChannel = Radio.channel('appOverlay');
		view = new Header();

		view.ui.menuButton = jasmine.createSpyObj('menuButton', ['addClass', 'hasClass', 'removeClass']);
	});

	describe('.initialize', function() {
		it('should listen for the overlay being closed', function() {
			expect(view.listenTo).toHaveBeenCalledWith(overlayChannel, 'closed', view.onOverlayClosed);
		});

		it('should listen for overlay being opened', function() {
			expect(view.listenTo).toHaveBeenCalledWith(overlayChannel, 'opened', view.onOverlayOpened);
		});
	});

	describe('.onMenuButtonClick', function() {
		let menuButton;

		beforeEach(function() {
			spyOn(overlayChannel, 'request');
		});

		// it('should close overlay if has open class', function() {
		// 	view.ui.menuButton.hasClass.and.returnValue(true);

		// 	view.onMenuButtonClick();

		// 	expect(overlayChannel.request).toHaveBeenCalledWith('close');
		// });

		it('should open overlay if does not have open class', function() {
			view.onMenuButtonClick();

			expect(overlayChannel.request).toHaveBeenCalledWith('open', jasmine.any(Object));
		});
	});

	describe('.onOverlayOpened', function() {
		beforeEach(function() {
			spyOn(view, 'hideComponent');
		});

		it('should apply open class to menuButton', function() {
			view.onOverlayOpened();

			expect(view.ui.menuButton.addClass).toHaveBeenCalledWith('header__menu-btn--close');
		});

		it('should hide search', function() {
			view.onOverlayOpened();

			expect(view.hideComponent).toHaveBeenCalledWith(view.ui.searchButton.selector);
		});

		it('should hide title', function() {
			view.onOverlayOpened();

			expect(view.hideComponent).toHaveBeenCalledWith(view.ui.title.selector);
		});
	});

	describe('.onOverlayClosed', function() {
		beforeEach(function() {
			spyOn(view, 'showComponent');
		});

		it('should apply close class to menuButton', function() {
			view.onOverlayClosed();

			expect(view.ui.menuButton.removeClass).toHaveBeenCalledWith('header__menu-btn--close');
		});

		it('should show search', function() {
			view.onOverlayClosed();

			expect(view.showComponent).toHaveBeenCalledWith(view.ui.searchButton.selector);
		});
	});
});
