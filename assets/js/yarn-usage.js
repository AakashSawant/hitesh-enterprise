$(document).ready(function () {
    const container = $('#gallery-container');
    const basePath = './assets/img/yarn-usage/';

    // Load JSON and populate gallery
    $.getJSON('./assets/files/yarn-usage.json', function (images) {
      images.forEach(image => {
        const item = `
          <div class="col-md-4 gallery-item ${image.category}">
            <a href="${basePath + image.file}" class="popup-link" data-category="${image.category}">
              <img src="${basePath + image.file}" class="img-fluid rounded shadow mb-3 gallery-img" alt="">
            </a>
          </div>`;
        container.append(item);
      });

      // Trigger default filter (show all)
      $('.filter-btn[data-filter="all"]').click();
    });

    // Filter functionality
    $('.filter-btn').click(function () {
      const filter = $(this).data('filter');
      $('.filter-btn').removeClass('active');
      $(this).addClass('active');

      if (filter === 'all') {
        $('.gallery-item').show();
      } else {
        $('.gallery-item').hide();
        $('.gallery-item.' + filter).show();
      }

      // Reinitialize magnificPopup for visible items only
      $('.popup-gallery').magnificPopup('destroy'); // Destroy old instance

      $('.popup-gallery').magnificPopup({
        delegate: `.gallery-item${filter === 'all' ? '' : '.' + filter} a`,
        type: 'image',
        gallery: { enabled: true }
      });
    });
  });