import $ from 'jquery';

class Like {
  constructor() {
    this.events();
  }

  events() {
    $(".like-box").on("click", this.ourClickDispatcher.bind(this));
  }

  // methods
  ourClickDispatcher(e) {
    var currentLikeBox = $(e.target).closest(".like-box");

    if (currentLikeBox.attr('data-exists') == 'yes') {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox,this);
    }
  }

  createLike(currentLikeBox,that) {
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      type: 'POST',
      data: {'professorId': currentLikeBox.data('professor'),'Bool':'yes'},
      success: (response) => {
        currentLikeBox.attr('data-exists', 'yes');
        var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
        likeCount++;
        currentLikeBox.find(".like-count").html(likeCount);
        currentLikeBox.attr("data-like", response);
        console.log(response);
        console.log('like is created');
        that.anything();    // ------------------------------------- Delete this ---------------------------------
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  deleteLike(currentLikeBox) {
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/university/v1/manageLike',
      data: {'like': currentLikeBox.attr('data-like')},
      type: 'DELETE',
      success: (response) => {
        currentLikeBox.attr('data-exists', 'no');
        var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
        likeCount--;
        currentLikeBox.find(".like-count").html(likeCount);
        currentLikeBox.attr("data-like", '');
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

   anything(){
   console.log('I\'m from function anything');
  var myList = document.querySelectorAll('li');
  console.log(myList[0].assignedSlot);
  console.log(myList);

  }
}

export default Like;
