import Model from 'common/models/base';

export default class PersonModel extends Model {
	parse(response) {
		if (response.profile_path) {
			response.image = this.generateImageUrl(response.profile_path);
		}
		return response;
	}

	generateImageUrl(imagePath) {
		let imageConfig = this.getConfiguration().get('images');
		return imageConfig.base_url + imageConfig.profile_sizes[0] + imagePath;
	}
}
