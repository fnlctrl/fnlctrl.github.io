var fs = require('fs');
var markdown = require('markdown').markdown;
console.log(markdown);

fs.readFile('./resume.md', {encoding: 'utf-8'}, function(err,data){
	var parsed = markdown.toHTMLTree(data);
	console.log(parsed);
});

