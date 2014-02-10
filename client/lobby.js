Template.lobby.events({
	'click #logout' : function () {
		Meteor.logout();
	},
	'click #btn-user-data': function(e) {
		Meteor.call('getFriendCount', function(errOne, data) {
			var friends = data.data.data[0].friend_count;
			for (var j = 0; j< friends; j+=50){
				Meteor.call('getVideos', j, j+50, function(errTwo, data) {
					console.log(JSON.stringify(data, undefined, 4));
					var actual = data.data.data;
					for(var i = 0; i < actual.length; i++ ) {
						var newObj = $('"' + actual[i].embed_html + '"');
						newObj.appendTo($('#result'));
					}
				});
			}
		});
	},
		
});
