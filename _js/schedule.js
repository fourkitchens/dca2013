(function ($) {
  var App = Ember.Application.create({LOG_TRANSITIONS: true});
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
    filteredSessions: [],

    resetScheduleInfo: function() {
      var self = this;
      var request = $.ajax('/sessions.json');

      request.done(function(data, textStatus, jqXHR) {
        if (jqXHR.status === 200) {
          // We have to add 'false' to the end of our Jekyll-produced JSON otherwise
          // we have a dangling comma. So strip out the false.
          data = data.slice(0, data.length-1);
          self.set('allSessions', data.map(function(session) {
            return App.SessionModel.create(session);
          }));
        }
      });

      request.fail(function(jqXHR, textStatus, errorThrown) {
        throw new Error('Unable to load session information: ' + textStatus);
      });
    }
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
