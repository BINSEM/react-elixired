var React = require('react');
var ReactDOM = require('react-dom');

[
{"author": "Biniam", "text": "This is one comment"},
{"author": "Semere", "text": "This is author comment"}
];

//Comment
var Comment = React.createClass({
	rawMarup: function(){
		var rawMarup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarup};
	},
	render: function() {
		return (
			<div id="column2" className="ui nine wide column segment">
			<h2 className="commentAuthor">
			{this.props.author}
			</h2>
			<span dangerouslySetInnerHTML={this.rawMarup()} />
			</div>
			);
	}
});

//BiniBox
var BiniBox = React.createClass({
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
	},
	getInitialState: function() {
		return {data: []};
	},
	render: function() {
		return (
			<div className="commentBox">
			<BiniList data={this.state.data} />
			<BiniForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
			);
	}
});

//BiniList
var BiniList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author} key={comment.id}>
				{comment.text}
				</Comment>
				);
		});
		return (
			<div id="columns" className="ui two column centered row segment">
			<h1>Comments</h1>
			{commentNodes}
			</div>
			);
	}
});

//BiniForm
var BiniForm = React.createClass({
	getInitialState: function() {
		return {author: '', text: ''};
	},
	handleAuthorChange: function(e) {
		this.setState({author: e.target.value});
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	}, 
	render: function() {
		return (
			<form className="ui form" onSubmit={this.handleSubmit}>
			<input id="input"
			type="text"
			placeholder="Your Name"
			value={this.state.author}
			onChange={this.handleAuthorChange}
			/>
			<input id="input"
			type="text"
			placeholder="Say Something..."
			value={this.state.text}
			onChange={this.handleTextChange}
			/>
			<input id="post" type="submit" value="Post" />
			</form>
			);
	}
});



ReactDOM.render(
	<BiniBox //url="/api/comments.json" 
	/>,
	document.getElementById('main')
	);
