if (Meteor.isClient) {
  Template.login.events({
	  "click #login-buttons-facebook": function(e, tmpl){
		  Meteor.loginWithFacebook({ requestPermissions: ['read_stream']},
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
		    appId: "208126062729596",
		    secret: "4c2cfc2bc6f2ffc55aad827b10d0d3b2"
		});
  });
}
