$(document).ready(function() {
  $('#dark-mode-toggle-small, #dark-mode-toggle-large').click(function() {
    $('body').toggleClass('dark-mode');
    let darkModeEnabled = $('body').hasClass('dark-mode');
    if (darkModeEnabled) {
      $('#dark-mode-toggle-small, #dark-mode-toggle-large').html('<i class="fas fa-sun"></i>');
    } else {
      $('#dark-mode-toggle-small, #dark-mode-toggle-large').html('<i class="fas fa-moon"></i>');
    }
  });

  // Store all image sources in an array
  let images = $('.image-container img').map(function() {
    return $(this).attr('src');
  }).get();
  let currentIndex = 0;

  $('.image-container img').click(function() {
    let src = $(this).attr('src');
    currentIndex = images.indexOf(src);
    $('#modal-image').attr('src', src);
    $('#exampleModal').modal('show');
  });

  function showImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentIndex = index;
    $('#modal-image').attr('src', images[currentIndex]);
  }

  $('.modal-nav.prev').click(function(e) {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  $('.modal-nav.next').click(function(e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Keyboard navigation
  $(document).on('keydown', function(e) {
    if ($('#exampleModal').hasClass('show')) {
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      if (e.key === 'Escape') $('#exampleModal').modal('hide');
    }
  });

  $('.close-modal').click(function() {
  });

  $('.filter-btn').click(function() {
    let filter = $(this).data('filter');
    if (filter === 'all') {
      $('.image-container').show();
    } else {
      $('.image-container').each(function() {
        let img = $(this).find('img');
        if ($(this).data('category') === filter) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
  });
});