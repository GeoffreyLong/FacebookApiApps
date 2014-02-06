if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to neknomnews.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  Meteor.loginWithFacebook({ requestPermissions: ['email']},
		  function (error) {
		      if (error) {
		          return console.log(error);
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
