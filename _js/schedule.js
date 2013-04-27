(function ($) {
  var App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    rootElement: '#ember-container'
  });
  window.App = App;

  App.SessionModel = Ember.Object.extend({
    title: '',
    room: '',
    presenters: '',
    track: '',
    start: '',
    difficulty: '',
    day: '',
    content: ''
  });

  App.ScheduleModel = Ember.Object.extend({
    allSessions: [],
    allTracks: [],
    allDifficulties: [],
    track: null,
    difficulty: null,

    visibleSessions: function() {
      var track = this.get('track');
      var difficulty = this.get('difficulty');

      return this.get('allSessions').filter(function(item, index, enumerable) {
        if (track && item.get('track') !== track) {
          return false;
        }
        if (difficulty && item.get('difficulty') !== difficulty) {
          return false;
        }
        return true;
      });
    }.property('allSessions', 'track', 'difficulty'),

    resetScheduleInfo: function() {
      var self = this;
      var request = $.ajax('/sessions.json');

      request.done(function(data, textStatus, jqXHR) {
        if (jqXHR.status === 200) {
          // We have to add 'false' to the end of our Jekyll-produced JSON otherwise
          // we have a dangling comma. So strip out the false.
          data = data.slice(0, data.length-1);
          var allTracks = [null];
          var allDifficulties = [null];
          self.set('allSessions', data.map(function(session) {
            allTracks.push(session.track);
            allDifficulties.push(session.difficulty);
            return App.SessionModel.create(session);
          }));
          self.set('allTracks', allTracks.uniq().toArray());
          self.set('allDifficulties', allDifficulties.uniq().toArray());
        }
      });

      request.fail(function(jqXHR, textStatus, errorThrown) {
        throw new Error('Unable to load session information: ' + textStatus);
      });
    }
  });

  App.SessionView = Ember.View.extend({
    templateName: 'session'
  });

  App.ScheduleView = Ember.View.extend({
    templateName: 'schedule'
  });

  App.ScheduleController = Ember.ObjectController.extend({
  });

  App.ScheduleRoute = Ember.Route.extend({
    model: function() {
      App.scheduleModel = App.ScheduleModel.create();
      App.scheduleModel.resetScheduleInfo();
      return App.scheduleModel;
    }
  });

  App.Router.map(function() {
    this.route('schedule', { path: '/' });
  });

})(jQuery);
