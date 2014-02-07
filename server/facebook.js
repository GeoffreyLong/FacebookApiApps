function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
	var self = this;
	var method = (typeof method === 'undefined') ? 'get' : method;
	var data = Meteor.sync(function(done) {
		self.fb[method](query, function(err, res) {
			done(null, res);
			});
		});
	return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('/fql?q=SELECT%20src_big%2C%20caption%2C%20created%2C%20like_info%20FROM%20photo%20WHERE%20object_id%20IN%20(SELECT%20object_id%20FROM%20photo_tag%20WHERE%20subject%3Dme())%20LIMIT%2010&access_token=CAACZBSuuVIY4BAFNxPiyBsSim5O8tZCpK8HE9sgN0DAZBWK0qR6NhI7YDD0Ntr7B5xJUDeW7fpyHoqbdtIfqswQDrS8PQDSaRRwwpCx8VgBBtfE9pI4l9zzrck5AWKrlSCUpKdxhqNe3tFeDnGUHZCr0ZAHLBoyDEv1B5YD8a0s8RzroaUhyc');
}

Meteor.methods({
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        
        var query = "SELECT src_big, caption, created, like_info FROM photo WHERE object_id IN (SELECT object_id FROM photo_tag WHERE subject=me()) LIMIT 10";
    	var dataset = Meteor.require('fbgraph').fql(query, function (e, res){
    		return res;
    	});
    	console.log(dataset);
    	
        return data;
    }
});