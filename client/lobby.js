Template.lobby.events({
	'click #logout' : function () {
		Meteor.logout();
	},
	'click #btn-user-data': function(e) {
		Meteor.call('getFriendCount', function(errOne, data) {
			for (var j = 0; j< data.data.data[0].friend_count; j+=50){
				var next = parseInt(j) +50;
				Meteor.call('getVideos(' + parseInt(j) + ', ' + next + ')', function(errTwo, videos) {
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
