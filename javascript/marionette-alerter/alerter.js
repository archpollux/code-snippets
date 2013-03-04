$(function() {
  var Marionette = Backbone.Marionette;

  var Alert = Backbone.Model.extend({});
  var AlertCollection = Backbone.Collection.extend({
      model : Alert
  });


  var Creator = Marionette.View.extend({
      events : {
          "click #createbutton" : "onCreate"
      },
      initialize : function() {
          this.listenTo(this, 'render', this.onRender);
      },
      onCreate : function(event) {
          var model = new Alert({
              title : $("#newtitle").val(),
              content : $("#newcontent").val()
          });
          this.collection.add(model);
      },
  });
  
  var iView = Marionette.ItemView.extend({
      tagName : "div",
      className : "alert",
      template : _.template($("#item-view-template").html()),
      model : Alert,
      events : {
          "click .close-alert" : "onCloseAlert"
      },
      
      onCloseAlert : function() {
          this.collection.remove(this.model);
      }
  });

  var cView = Marionette.CollectionView.extend({
      el : '#collection',
      itemView : iView,
      itemViewOptions : function() {
          return { collection : this.collection };
      }
  });

  var App = new Marionette.Application();
  App.addInitializer(function() {
      window.collection = new AlertCollection();

      var creatorView = new Creator({
          el : $("#creator"),
          collection : window.collection
      });
      
      var creatorRegion = Marionette.Region.extend({
          el : "#creator",
          currentView : creatorView
      });
      App.addRegions({
          creator : creatorRegion,
          collection : "#collection"
      });

      var colView = new cView({ collection : window.collection });
      App.collection.show(colView);

      collection.add(new Alert({ title: "Title 1", content: "Lorem ipsum 1" }));
      collection.add(new Alert({ title: "Title 2", content: "Lorem ipsum 2" }));
      collection.add(new Alert({ title: "Title 3", content: "Lorem ipsum 3" }));
  });

  App.start();
} );
