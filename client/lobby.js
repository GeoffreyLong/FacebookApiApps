Template.lobby.events({
	'click #logout' : function () {
		Meteor.logout();
	},
	'click #btn-user-data': function(e) {
		Meteor.call('getUserData', function(err, data) {
			var actual = data.data.data;
			for(var i = 0; i < actual.length; i++ ) {
				var newObj = $('"' + actual[i].embed_html + '"');
				newObj.appendTo($('#result'));
			}
		});
		
	}
		
});
