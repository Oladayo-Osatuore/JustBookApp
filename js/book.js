var googleapi = {
	base: "https://www.googleapis.com/books/v1/volumes?",
	params: {
			q:"government",
		},




/****************************************
FUNCTION FOR LOADING BOOKS
****************************************/
initial: function() {
	googleapi.getResponse();
},

loadbooks: function(response) {
		//console.log(response);
		 $.each(response.items, googleapi.getResponse);
		},
	

/******************************************************
On click of the button
******************************************************/


start: function() {
		$("#submit").click(googleapi.getValue);	
		$("#input_text").keydown(googleapi.Enter);
		$("post_div").remove(googleapi.Enter);
	},


/*******************************************************
To enhance user interactivity, the use of the enter key
*******************************************************/

Enter: function(event){
		if(event.which == 13){
			googleapi.getValue();
			$("#input_text").val();
			$("#post_div").remove(".post");
		}
	},


getValue: function() {
  			googleapi.params.q = $("#input_text").val();
  			console.log(googleapi.params.q);
  			googleapi.getCategories();
  			

		},
/****************************************
Function to get user's choice category
****************************************/

getCategories: function() {
		$.getJSON(googleapi.base, googleapi.params, function(response) {
	        		googleapi.loadbooks(response);
	        		//console.log(response);
	        	});
		$("#input_text").val('');
		$('.div_post').empty();
		$('#loader').removeClass('hidden');

	},





/*********************************************
FUNCTION FOR GETTING RESPONSE BASED ON REQUEST
*********************************************/

getResponse: function(i, books) {
		console.log(books);
		 var bookTitle = this.volumeInfo.title;
		 var bookImage = this.volumeInfo.imageLinks.thumbnail;
		 var bookAuthors = this.volumeInfo.authors;
		 var pageCount = this.volumeInfo.pageCount;
		 var previewLink = this.volumeInfo.previewLink;
		 //console.log(previewLink);
			var post_div = '<div class="post">' + 
			'<div id="image"><a href="' + previewLink + '" target="_blank"><img src="' + bookImage + '"/></a></div>' +'<div class="box">' +
			'<div class="title">' + "Title: "+ bookTitle +'</div>'+ '<i class="author">' + "Author: "+ bookAuthors + '</i>' + '<div class="pageCount">' + "Page Count: "+ pageCount + '</div>'
			 + '<div class="previewLink">' + "Preview Book: "+ '<a href="' + previewLink + '">Click here to Preview</a>' + '</div>' +
			'</div>';
			$('.div_post').append(post_div);
			$('#loader').addClass('hidden');

		}



}
	$(document).ready(googleapi.getCategories);
	$(document).ready(googleapi.start);