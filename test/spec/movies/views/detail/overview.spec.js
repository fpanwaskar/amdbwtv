import {Model, Collection} from 'backbone';

import MovieDetail from 'movies/views/detail/overview';
import MovieModel from 'movies/models/movie';

describe('movies.views.detail.overview', function() {
	let view, model;

	beforeEach(function() {
		model = new MovieModel();
		view = new MovieDetail({model: model});
	});

	describe('.serializeData', function() {
		let result, getTrailerUrlStub;

		beforeEach(function() {
			getTrailerUrlStub = sinon.stub(view, 'getTrailerUrl', (video) => {
				let key = video && video.key ? video.key : '';
				return 'someurl' + key;
			});
		});

		afterEach(function() {
			view.getTrailerUrl.restore();
		});

		it('should return json from the model', function() {
			let expectedValue = 'expected';
			view.model.set('value', expectedValue);

			result = view.serializeData();

			expect(result.value).toEqual(expectedValue);
		});

		it('should not set the video if there are none', function() {
			expect(view.serializeData().video).toBeUndefined();
		});

		it('should set the video to the first one in the data', function() {
			let videoKey = 1,
				videoUrl = 'someurl' + videoKey,
				expected = new Model({key: videoKey});
			view.model.videos = new Collection([expected, new Model()]);

			result = view.serializeData();

			expect(result.video.key).toEqual(videoKey);
			expect(view.getTrailerUrl).toHaveBeenCalled();
			expect(result.video.url).toEqual('someurl1');
		});
	});

	describe('.getTrailerUrl', function() {
		it('should handle undefined video', function() {
			expect(view.getTrailerUrl()).toBeUndefined();
		});

		it('should return youtube embed url with our video key', function() {
			let videoKey = '1233434';
			expect(view.getTrailerUrl({key: videoKey})).toEqual('http://www.youtube.com/embed/' + videoKey + '?autoplay=0&origin=http://localhost:9000&modestbranding=1&showinfo=0&iv_load_policy=3&color=white');
		});
	});
});
