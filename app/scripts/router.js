import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import MovieCollection from 'movies/collections/movies';
import MovieModel from 'movies/models/movie';
import MovieListView from 'movies/views/list';
import MovieItemView from 'movies/views/movieItem';
import MovieDetailView from 'movies/views/detail';

export default Marionette.AppRouter.extend({
	movieClass: MovieModel,

    routes: {
        '': 'index',
        'upcoming': 'upcomingMovies',
        'top_rated': 'topMovies',
        'movie/:id': 'movieDetail'
    },

    initialize() {
        this.contentChannel = Radio.channel('appContent');
        this.routerChannel = Radio.channel('appRouter');
        this.routerChannel.on('navigate', this.navigate, this);
        this.routerChannel.reply('getRoute', () => this.previousRoute);
    },

    onRoute(name, route) {
    	if (this.previousRoute && this.previousRoute !== name) {
    		this.routerChannel.trigger('change:route', name, this.previousRoute);
    	}
    	this.previousRoute = name;
    },

    // todo: these methods should sit within a controller
    // see http://marionettejs.com/docs/v2.4.5/marionette.approuter.html#specify-a-controller
    index() {
        this.renderMovieList().getNowPlaying();
    },

    upcomingMovies() {
        this.renderMovieList().getUpcoming();
    },

    topMovies() {
        this.renderMovieList().getTopRated();
    },

    movieDetail(id) {
        let movie = new MovieModel({id: id}, {fetchVideos: true});
        let detailView = new MovieDetailView({model: movie});

        movie.fetch().done(function() {
            Radio.channel('appContent').trigger('updateContent', detailView);
        });
    },

    renderMovieList() {
        let movies = new MovieCollection();
        let moviesList = new MovieListView({collection: movies, childView: MovieItemView});

        this.contentChannel.trigger('updateContent', moviesList);
        return movies;
    }
});
