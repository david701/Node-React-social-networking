module.exports = {
	res: function(res, data){
		var resp = {status: 'ok'};
		if(data) resp.data = data;
		res.status(200)
		res.json(resp);
	},
	err: function(res, message){
		var resp = {status: 'error'};
		if(message) resp.message = message;
		res.status(200)
		res.json(resp);
	}
}
