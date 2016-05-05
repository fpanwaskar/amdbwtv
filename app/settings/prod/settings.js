import BaseSettings from 'basesettings';

/**
 * Settings picked up when building dist.
 */
export default class Settings extends BaseSettings {
	constructor() {
		super();
		this.domain = 'amdbw.tv';
		this.env = 'production';
    }
}
