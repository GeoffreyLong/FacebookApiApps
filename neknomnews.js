if (Meteor.isClient) {
  Template.login.events({
	  "click #sign-in-facebook": function(e, tmpl){
		  console.log("helo");
		  Meteor.loginWithFacebook({ requestPermissions: ['email']},
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
