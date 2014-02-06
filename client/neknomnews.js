if (Meteor.isClient) {
  Template.login.events({
	  "click #login-buttons-facebook": function(e, tmpl){
		  Meteor.loginWithFacebook({ requestPermissions: ['email', 'user_friends', 'user_location', 'user_events', 
		                                                  'friends_events', 'friends_location', 'friends_about_me',
		                                                  'user_status', 'friends_status', 'read_friendlists', 
		                                                  'user_videos', 'friends_videos']},
				  function (error) {
				      if (error) {
				          return console.log(error);
				      }
				  });
	  }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
	  Accounts.loginServiceConfiguration.remove({
		    service: "facebook"
		});
		Accounts.loginServiceConfiguration.insert({
		    service: "facebook",
		    appId: "209228989276558",
		    secret: "90d8376c283a315a51a3bfeb214b1049"
		});
  });
}
