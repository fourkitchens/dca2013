(function ($) {
  var App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    rootElement: '#ember-container'
  });
  window.App = App;

  //-------------------------
  // Models
  //-------------------------
  App.SessionModel = Ember.Object.extend({
    title: '',
    room: '',
    presenters: '',
    track: '',
    start: '',
    difficulty: '',
    day: '',
    content: '',
    showContent: false
  });

  App.ScheduleModel = Ember.Object.extend({
    allSessions: [],

    // For filters.
    trackFilters: [],
    difficultyFilters: [],

    // Table options.
    columnOptions: ['room', 'track'],
    columnSelected: 'room',

    selectedSessions: function() {
      var self = this;
      return this.get('allSessions').filter(function(item) {
        var trackSelected = self.get('trackFilters').some(function(filter) {
          return item.get('track') == filter.get('name') && filter.get('selected');
        });
        var difficultySelected = self.get('difficultyFilters').some(function(filter) {
          return item.get('difficulty') == filter.get('name') && filter.get('selected');
        });
        return trackSelected && difficultySelected;
      });
    }.property('allSessions', 'trackFilters.@each.selected', 'difficultyFilters.@each.selected'),

    tableParams: function() {
      var params = {
        day: [],
        room: [],
        start: [],
        track: []
      };
      this.get('selectedSessions').forEach(function(item) {
        params.day.push(item.day);
        params.room.push(item.room);
        params.start.push(item.start);
        params.track.push(item.track);
      });
      for (var key in params) {
        params[key] = params[key].uniq().toArray();
      }
      return params;
    }.property('selectedSessions'),

    sessionsTable: function() {
      var selected = this.get('selectedSessions');
      var params = this.get('tableParams');
      var table = {
        header: [''],
        rows: []
      };

      var columnSelected = this.get('columnSelected');
      var rowChoice = 'start';

      params[columnSelected].forEach(function(colHead) {
        table.header.push(colHead);
      });

      params.day.forEach(function(day) {
        params[rowChoice].forEach(function(rowDef) {
          var row = [{rowTitle: day + ', ' + rowDef}];
          params[columnSelected].forEach(function(col) {
            var foundItem = selected.find(function(item) {
              return (item.day == day && item[columnSelected] == col && item[rowChoice] == rowDef);
            });

            if (foundItem) {
              row.push(foundItem);
            }
            else {
              row.push(false);
            }
          });
          table.rows.push(row);
        });
      });

      return table;
    }.property('selectedSessions', 'columnSelected'),

    resetScheduleInfo: function() {
      var self = this;
      var request = $.ajax('/sessions.json');

      request.done(function(data, textStatus, jqXHR) {
        if (jqXHR.status === 200) {
          // We have to add 'false' to the end of our Jekyll-produced JSON otherwise
          // we have a dangling comma. So strip out the false.
          data = data.slice(0, data.length-1);
          var allTracks = [];
          var allDifficulties = [];
          self.set('allSessions', data.map(function(session) {
            allTracks.push(session.track);
            allDifficulties.push(session.difficulty);
            return App.SessionModel.create(session);
          }));
          self.set('trackFilters', allTracks.uniq().map(function(item) {
            return Ember.Object.create({
              name: item,
              selected: true
            });
          }));
          self.set('difficultyFilters', allDifficulties.uniq().map(function(item) {
            return Ember.Object.create({
              name: item,
              selected: true
            });
          }));
        }
      });

      request.fail(function(jqXHR, textStatus, errorThrown) {
        throw new Error('Unable to load session information: ' + textStatus);
      });
    }
  });

  //-------------------------
  // Views
  //-------------------------
  App.SessionView = Ember.View.extend({
    templateName: 'session',
    expand: function(session) {
      session.set('showContent', true);
    }
  });

  App.ScheduleView = Ember.View.extend({
    templateName: 'schedule'
  });

  //-------------------------
  // Controllers
  //-------------------------
  App.ScheduleController = Ember.ObjectController.extend({
    toggleFilter: function(item) {
      item.set('selected', !item.get('selected'));
    }
  });

  App.SessionController = Ember.ObjectController.extend({
  });

  //-------------------------
  // Router
  //-------------------------
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
