(function ($) {
  var App = Ember.Application.create({LOG_TRANSITIONS: true});
  window.App = App;

  App.SessionModel = Ember.Object.extend({
    title: '',
    presenters: '',
    tag: ''
  });

  App.ScheduleModel = Ember.Object.extend({
    allSessions: [],
    filteredSessions: [],

    resetScheduleInfo: function() {
      var self = this;
      var dummyData = [];

      self.set('allSessions', dummyData.map(function(session) {
        return App.SessionModel.create(session);
      }));
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
