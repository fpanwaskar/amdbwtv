import {Model} from 'backbone';
import MovieModel from 'movies/models/movie';

describe('MovieModel', function() {
	let model;

	beforeEach(function() {
		model = new MovieModel();
	});

	describe('.parse', function() {
		let configuration, response;

		beforeEach(function() {
			configuration = {
				base_url: 'http://somedomain/',
			};

			response = {
				backdrop_path: 'backdrop',
				poster_path: 'poster',
			}

			spyOn(model, 'generateImageUrl').and.callFake((path) => {
				return path;
			});

			let config = new Model({images: {poster_sizes: [{}]}});
			spyOn(model, 'getConfiguration').and.returnValue(config);
		});

		it('should set backdrop image url', function() {
			let resp = model.parse(response);

			expect(resp.backdrop).toEqual(response.backdrop_path);
		});

		it('should set poster image url', function() {
			let resp = model.parse(response);

			expect(resp.poster).toEqual(response.poster_path);
		});
	});
});
