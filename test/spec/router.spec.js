import Radio from 'backbone.radio';
import AppRouter from 'router';
import MovieCollection from 'movies/collections/movies';
import MovieModel from 'movies/models/movie';
import MovieListView from 'movies/views/list';
import MovieDetailView from 'movies/views/detail';

describe('router', function() {
	let channel, movieCollection, router;

	beforeEach(function() {
		channel = Radio.channel('appRouter');
		spyOn(channel, 'on');

		router = new AppRouter();

		movieCollection = new MovieCollection();
		spyOn(router, 'renderMovieList').and.returnValue(movieCollection);
	});

	describe('.initialize', function() {
		it('should listen to naviagtion events on channel', function() {
			expect(channel.on).toHaveBeenCalledWith('navigate', router.navigate, router);
		});
	});

	describe('.onRoute', function() {
		let routerChannel;

		beforeEach(function() {
			routerChannel = Radio.channel('appRouter');
			spyOn(routerChannel, 'trigger');
		});

		it('should trigger change route event on route change', function() {
			let route = 'anotherRoute',
				previous = 'someroute';
			router.previousRoute = previous;

			router.onRoute(route);

			expect(routerChannel.trigger).toHaveBeenCalledWith('change:route', route, previous);
		});
	});

	describe('.index', function() {
		it('should render movie list and get now playing movies', function() {
			spyOn(movieCollection, 'getNowPlaying');

			router.index();

			expect(router.renderMovieList).toHaveBeenCalled();
			expect(movieCollection.getNowPlaying).toHaveBeenCalled();
		});
	});

	describe('.upcomingMovies', function() {
		it('should render movie list and get upcoming movies', function() {
			spyOn(movieCollection, 'getUpcoming');

			router.upcomingMovies();

			expect(router.renderMovieList).toHaveBeenCalled();
			expect(movieCollection.getUpcoming).toHaveBeenCalled();
		});
	});

	describe('.topMovies', function() {
		it('should render movie list and get top rated movies', function() {
			spyOn(movieCollection, 'getTopRated');

			router.topMovies();

			expect(router.renderMovieList).toHaveBeenCalled();
			expect(movieCollection.getTopRated).toHaveBeenCalled();
		});
	});

	describe('.renderMovieList', function() {
		it('should update content with movie list', function() {
			router.renderMovieList.and.callThrough();
			spyOn(router.contentChannel, 'trigger');

			let movies = router.renderMovieList();

			expect(router.contentChannel.trigger).toHaveBeenCalledWith('updateContent', jasmine.any(MovieListView));
			expect(movies).toEqual(jasmine.any(MovieCollection));
		});
	});

	describe('.movieDetail', function() {
		let deferred;

		beforeEach(function() {
			deferred = {
				done: function(cb) {
					if (cb) {
						cb();
					}
 				}
 			};
 			sinon.stub(MovieModel.prototype, 'fetch', () => deferred);
			spyOn(router.contentChannel, 'trigger');
		});

		it('should update content with movie detail page after fetch completed', function() {
			router.movieDetail('10');

			expect(MovieModel.prototype.fetch.called).toBeTruthy();

			deferred.done();

			expect(router.contentChannel.trigger).toHaveBeenCalledWith('updateContent', jasmine.any(MovieDetailView));
		});
	});
});
