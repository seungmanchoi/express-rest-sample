const mysql = require('mysql');
const router = require("express").Router();
const dbConnection = require('../db/db');

router.get('/board', function (req, res) {
	var sql = "select title, content, created_at, view_count, user_idx from board";
	var connection = dbConnection();
	var formattedSql = mysql.format(sql);
	
	console.log(formattedSql);
	
	connection.connect(function(err) {
		if (err) {
			return res.status(500).json({msg: 'Internal Server Error.', success: false});
		}
		
		connection.query(formattedSql, function (error, results, fields) {
			if (error) {
				return res.status(500).json({msg: 'Internal Server Error.', success: false});
			}
			
			res.status(200).json({success: true, data: results});
			connection.end();
		});
	});
})

router.get('/board/:id', function (req, res) {
	var idx = req.params.id;
	var sql = "select title, content, created_at, view_count, user_idx from board where idx=?";
	var params = [idx];
	
	var connection = dbConnection();
	var formattedSql = mysql.format(sql, params);
	
	connection.connect(function(err) {
		if (err) {
			return res.status(500).json({msg: 'Internal Server Error.', success: false});
		}
		
		connection.query(formattedSql, function (error, results, fields) {
			if (error) {
				return res.status(500).json({msg: 'Internal Server Error.', success: false});
			}
			
			res.status(200).json({success: true, data: results[0]});
			connection.end();
		});
	});
});

router.post('/board', function(req, res) {
	var title = req.body.title;
	var content = req.body.content;
	var userIdx = req.body.userIdx;
	var sql = "insert into board(title, content, user_idx, created_at) value(?, ?, ?, now())";
	var params = [title, content, userIdx];
	
	if(!title || !content || !userIdx) {
		return res.status(400).json({msg: 'Bad request.', success: false});
	}
	
	var connection = dbConnection();
	var formattedSql = mysql.format(sql, params);
	
	connection.connect(function(err) {
		if (err) {
			return res.status(500).json({msg: 'Internal Server Error.', success: false});
		}
		
		connection.query(formattedSql, function (error, results, fields) {
			if (error) {
				return res.status(500).json({msg: 'Internal Server Error.', success: false});
			}
			
			res.status(200).json({success: true});
			connection.end();
		});
	});
});

router.put('/board/:id', function(req, res) {
	var title = req.body.title;
	var content = req.body.content;
	var idx = req.params.id;
	var sql = "update board set title=?, content=? where idx=?";
	var formattedSql = '';
	var params = [title, content, idx];
	
	var connection = dbConnection();
	formattedSql = mysql.format(sql, params);
	
	connection.connect(function(err) {
		if (err) {
			return res.status(500).json({msg: 'Internal Server Error.', success: false});
		}
		
		connection.query(formattedSql, function (error, results, fields) {
			if (error) {
				return res.status(500).json({msg: 'Internal Server Error.', success: false});
			}
			
			res.status(200).json({
				success: true,
				data: {
					idx: idx,
					title: title,
					content: content,
				}
			});
			
			connection.end();
		});
	});
});

router.delete('/board/:id', function(req, res) {
	var idx = req.params.id;
	var sql = "delete from board where idx=?";
	var params = [idx];
	
	if(!idx) {
		return res.status(400).json({msg: '아이디 값이 없습니다.', success: false});
	}
	
	var connection = dbConnection();
	var formattedSql = mysql.format(sql, params);
	
	connection.connect(function(err) {
		if (err) {
			return res.status(500).json({msg: 'Internal Server Error.', success: false});
		}
		
		connection.query(formattedSql, function (error, results, fields) {
			if (error) {
				return res.status(500).json({msg: 'Internal Server Error.', success: false});
			}
			
			res.status(200).json({success: true});
			connection.end();
		});
	});
});

module.exports = router;