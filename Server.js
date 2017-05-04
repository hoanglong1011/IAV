//SocketIO NodeJS Group Chat Implementation Test
//Coded/Developed By Aravind.V.S
//www.aravindvs.com

// Modules
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const moment = require('moment');
const async = require('async');

// Models
const Coso = require('./model/coso');
const Phong = require('./model/phong');
const Dates = require('./model/date');
const Log = require('./model/log');

server.listen(process.env.PORT || 9093, err => {
	console.log('Server is listening at port 9093');
});

// website localhost:9093 or 127.0.0.1:9093
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/coso', function (req, res) {
	const coso = new Coso();
	coso.getData()
		.then(rows => {
			const arr = [];
			for (const i = 0; i < rows.length; i++) {
				arr.push({ id: rows[i].id, name: rows[i].name });
			}

			const json = JSON.stringify({ coso: arr });
			res.end(json);
		})
		.catch(err => {
			io.emit('query error', { code: 100, message: err });
		});
});

io.on('connection', function (socket) {
	socket.on('server connect', function () {
		console.log("-------------------------------------------");
		console.log("Server is connecting!");

		const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		console.log("Time: ", current);

		socket.emit('connected');
	});

	socket.on('server disconnect', function () {
		console.log("-------------------------------------------");
		console.log("Server is disconnect!");

		const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		console.log("Time: ", current);
	});

	socket.on('server checking', function (data) {
		try {
			const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

			const phong = new Phong();
			phong.getData()
				.then(result => {
					async.each(result, function (item, callback) {
						console.log("-------------------------------------------");
						console.log("Server is checking!");
						console.log("Co so: ", item["coso"]);
						console.log("Phong: ", item["phong"]);
						console.log("Time: ", current);

						io.emit('server checking', { coso: item["coso"], phong: item["code"] });
					});
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('client response checking', function (coso, phong, version) {
		try {
			const log = new Log(coso, phong, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), "Message: Client is online!");
			log.add()
				.then(result => {
					const phong = new Phong(0, code, null, coso, 1);
					phong.update().then(result => {
						console.log("-------------------------------------------");
						console.log("Co so ", coso);
						console.log("Phong ", phong);

						const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
						console.log("Time: ", current);
						console.log("Message: Client is online!")
					});

					io.emit('client connect', { coso: coso, phong: phong, version: version });
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('client connect', function (coso, phong, version) {
		try {
			socket.coso = coso;
			socket.phong = phong;

			const log = new Log(coso, phong, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), "Message: Client is online!");
			log.add()
				.then(result => {
					const date = new Dates(0, moment(Date.now()).format('YYYY-MM-DD'));
					date.getData()
						.then(rows => {
							const phong = new Phong(0, phong, null, coso, 1);

							if (rows.length == 0) {
								date.add().then(result => phong.default());
							}

							phong.update()
								.then(result => {
									console.log("-------------------------------------------");
									console.log("Co so ", coso);
									console.log("Phong ", phong);

									const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
									console.log("Time: ", current);
									console.log("Message: Client is connected!")

									io.emit('client connect', { coso: coso, phong: phong, version: version });
								})
						});
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('disconnect', function () {
		try {
			const coso = socket.coso;
			const phong = socket.phong;

			const log = new Log(coso, phong, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), "Message: Client is offline!");
			log.add()
				.then(result => {
					const phong = new Phong(code, null, coso, 0);
					phong.update()
						.then(result => {
							console.log("-------------------------------------------");
							console.log("Co so ", coso);
							console.log("Phong ", phong);

							const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
							console.log("Time: ", current);
							console.log("Message: Client is offline!");

							io.emit('client disconnect', { coso: coso, phong: phong });
						});
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('download', function (data) {
		try {
			const json = JSON.parse(data);

			const log = new Log(json["coso"], json["phong"], moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				`Message: Client is downloading the media file (Source: ${json["source"]}!`);
			log.add()
				.then(result => {
					console.log("-------------------------------------------");
					console.log("Co so ", json["coso"]);
					console.log("Phong ", json["phong"]);

					const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					console.log("Time: ", current);
					console.log("Filename: ", json["source"]);

					io.emit('download', {
						source: json["source"],
						target: json["target"], coso: json["coso"], phong: json["phong"],
						host: json["host"], path: json["path"], username: json["username"],
						password: json["password"], size: json["size"]
					});
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('client processing', function (coso, phong, percent) {
		try {
			const log = new Log(coso, phong, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				`Message: Client is processing - ${percent}%`);
			log.add()
				.then(result => {
					console.log("-------------------------------------------");
					console.log("Co so ", coso);
					console.log("Phong ", phong);

					const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					console.log("Time: ", current);
					console.log(`Message: Client is processing - ${percent}%`);

					io.emit('client processing', { coso: coso, phong: phong, percent: percent });
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('apk', function (data) {
		try {
			const json = JSON.parse(data);

			const log = new Log(coso, phong, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				`Message: Installing the new version ${json["url"]}`);
			log.add()
				.then(result => {
					console.log("-------------------------------------------");
					console.log("Co so ", json["coso"]);
					console.log("Phong ", json["phong"]);

					const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					console.log("Time: ", current);
					console.log(`Message: Installing the new version ${json["url"]}`);

					io.emit('apk', {
						coso: json["coso"], phong: json["phong"],
						apk: json["apk"]
					});
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('server request videos', function (data) {
		try {
			const json = JSON.parse(data);

			const log = new Log(json["coso"], json["phong"], moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				"Message: Server is requesting videos!");
			log.add()
				.then(result => {
					console.log("-------------------------------------------");
					console.log("Server request videos:");
					console.log("Coso: ", json["coso"]);
					console.log("Phong: ", json["phong"]);

					const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					console.log("Time: ", current);
					console.log("Message: Server is requesting videos!");

					io.emit('server request videos', { coso: json["coso"], phong: json["phong"] });
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('server response videos', function (data) {
		try {
			const json = JSON.parse(data);

			const log = new Log(json["coso"], json["phong"], moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				"Server is responsing videos!");
			log.add()
				.then(result => {
					console.log("-------------------------------------------");
					console.log("Coso: ", json["coso"]);
					console.log("Phong: ", json["phong"]);

					const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					console.log("Time: ", current);
					console.log("Message: Server is responsing videos:");

					io.emit('server response videos', json);
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('client response videos', function (data) {
		try {
			const json = JSON.parse(data);

			const log = new Log(json["coso"], json["phong"], moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
				"Client is responsing videos!");
			log.add()
				.then(result => {
					console.log("-------------------------------------------");
					console.log("Coso: ", json["coso"]);
					console.log("Phong: ", json["phong"]);

					const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					console.log("Time: ", current);
					console.log("Message: Client is responsing videos:");

					io.emit('client response videos', data);
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('client success', function (coso, phong, message) {
		try {
			const log = new Log(coso, phong, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), message);
			log.add()
				.then(result => {
					console.log("-------------------------------------------");
					console.log("Co so: ", coso);
					console.log("Phong: ", phong);

					const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					console.log("Time: ", current);
					console.log("Message: ", message);

					io.emit('client success', { coso: coso, phong: phong });
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('client failed', function (coso, phong, message) {
		try {
			const log = new Log(coso, phong, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), message);
			log.add()
				.then(result => {
					console.log("-------------------------------------------");
					console.log("Co so: ", coso);
					console.log("Phong: ", phong);

					const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
					console.log("Time: ", current);
					console.log("Error: ", message);

					io.emit('client failed', { coso: coso, phong: phong, error: message });
				})
				.catch(err => {
					socket.emit('connect error', { code: 100, message: err });
				});
		}
		catch (e) {
			console.log('Error: ', e.message);
			socket.emit('connect error', { code: 100, message: e.message });
		}
	});

	socket.on('error', function (err) {
		console.log("-------------------------------------------");

		const current = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
		console.log("Time: ", current);
		console.log("Error: ", err);
	});
});
