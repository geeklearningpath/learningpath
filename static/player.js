let paths = [];

$( '#learningDialog' ).dialog({
  autoOpen: false,
  resizable: true,
  show: {
    effect: "blind",
    duration: 1000
  },
  hide: {
    effect: "explode",
    duration: 1000
  },
  buttons: {
    Next: () => {
      nextPathDisplay($(this), paths, $(this).attr('next') - 1);
    }
  },
  close: () => {
    $('.ui-dialog-buttonpane').removeClass('hide')
  },
  open: async () => {
    if (!paths.length) {
      $('#learningDialog').html('<img src="/static/ajax-loader.gif" />');
      paths = await new Promise((resolve, reject) => {
        $.getJSON( "/static/guide.json", response => {
          resolve(response.steps)
        });
      });
    }
    nextPathDisplay($(this), paths, 0);
  }
});

function nextPathDisplay($dialog, paths, next) {
  const path = paths[next];
  $('#learningDialog').html(path.content);
  if (typeof paths[path.next - 1] !== 'undefined') {
    $dialog.attr('next', path.next);
  } else {
    $('.ui-dialog-buttonpane').addClass('hide')
  }
}

$('.learningSidebar').click(() => {
  $('#learningDialog').dialog('open');
});
