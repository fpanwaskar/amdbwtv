import BaseSettings from 'basesettings';

export default class Settings extends BaseSettings {
	constructor() {
		super();
		this.debug = true;
		this.env = 'local';
    }
}
