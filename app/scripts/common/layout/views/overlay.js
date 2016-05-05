import Marionette from 'backbone.marionette';
import _ from 'lodash';
import Radio from 'backbone.radio';
import move from 'move-js'
import template from 'common/layout/templates/overlay.hbs';

let overlayChannel = Radio.channel('appOverlay');

export default Marionette.LayoutView.extend({
	backgroundSelectorLeft: '.overlay-bg--left',
	backgroundSelectorRight: '.overlay-bg--right',
	defaultBackgroundColor: '#ffffff',
	template: template,

	regions: {
		header: '.overlay__header-content',
		content: '.overlay__content'
	},

	initialize() {
		this.animationCount = 0;
		_.bindAll(this, 'onOpen', 'clearOverlay', 'isReady', 'onClose', 'animateBackgroundIn');

		overlayChannel.reply('open', this.onOpen);
		overlayChannel.reply('close', this.onClose);
		this.listenTo(Radio.channel('appRouter'), 'change:route', this.onClose);
	},

	onOpen(options) {
		this.bgReadyCount = 0;
		if (options.header) {
			this.showChildView('header', options.header);
		}

		this.currentColour = options.colour;
		this.currentContent = options.content;

		this.setBackground(this.backgroundSelectorRight);
		this.setBackground(this.backgroundSelectorLeft);
		this.animateBackgroundIn(this.backgroundSelectorLeft, 'left').end(() => { this.isReady() });
		this.animateBackgroundIn(this.backgroundSelectorRight, 'right').end(() => { this.isReady() });
		overlayChannel.trigger('opened');
	},

	isReady() {
		this.bgReadyCount++;
		if (this.bgReadyCount === 2) {
			this.animateContentIn()
				.end(() => {
					this.showChildView('content', this.currentContent);
				});
		}
	},

	getColour() {
		return this.currentColour || this.defaultBackgroundColor;
	},

	animateContentIn(reverse = false) {
		if (!reverse) {
			this.setBackground(this.el, reverse);
		}

		let opacity = reverse ? '0' : '1';
		return move(this.el).set('opacity', opacity);
	},

	setBackground(selector, reverse = false) {
		let display = reverse ? 'none' : 'block';
		let animation = move(selector)
				.set('display', display)
				.set('background-color', this.getColour())
				.end();
	},

	animateBackgroundIn(selector, side, reverse) {
		let leftRight = reverse ? '-50%' : '0';
		let opacity = reverse ? '0' : '1';
		return move(selector)
			.set(side, leftRight)
			.set('opacity', opacity);
	},

	onClose() {
		this.bgReadyCount = 0;
		delete this.currentColour;
		delete this.currentContent;

		this.animateContentIn(true).end(() => {
			overlayChannel.trigger('closed');
			this.animateBackgroundIn(this.backgroundSelectorLeft, 'left', true).end(this.clearOverlay);
			this.animateBackgroundIn(this.backgroundSelectorRight, 'right', true).end(this.clearOverlay);
		});
	},

	clearOverlay() {
		this.animationCount++;
		if (this.animationCount === 2) {
			this.setBackground(this.el, true);
			this.setBackground(this.backgroundSelectorRight, true);
			this.setBackground(this.backgroundSelectorLeft, true);

			this.getRegion('content').empty();
			this.getRegion('header').empty();

			this.animationCount = 0;
		}
	}
});
