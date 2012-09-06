localStorage/*
TODOs
Language highlighting via search field with autocomplete?
Cache created graphs in localStorage and show cached when paradigm is selected
*/
var graphCache = function() {

};

$(function(){
  var pmenu = $('#paradigms');
  var graphdata = null;
  langs.init('sig');
  $('.showhelp').click(function(e){
    e.preventDefault();
    $('#help').modal();
  });
  pmenu.click(function(e){
    e.preventDefault();
    if ('a' == e.target.nodeName.toLowerCase()) {
      pmenu.find('li').removeClass('active');
      var t = $(e.target);
      var pid = t.attr('href');
      if (graphlangs = JSON.parse(localStorage.getItem(pid))) {
        console.log(graphlangs);
      }
      t.parent('li').addClass('active');
      var graphlangs = [];
      if (pid != '/all') {
        for (i in graphdata.langs) {
          var lang = graphdata.langs[i];
          for (j in lang.paradigms) {
            var p = lang.paradigms[j];
            if (pid == p.id) {
              graphlangs.push(lang);
              break;
            }
          }
        }
      } else {
        graphlangs = graphdata.langs;
      }
      langs.init('sig');
      langs.graph(graphlangs);
      localStorage.setItem(pid, JSON.stringify(graphlangs));
    }
  });
  $.getJSON('data.json', function(data) {
    $.each(data.paradigms, function(idx, item) {
      pmenu.append('<li><a href="' + item.id + '">' + item.name + '</a></li>');
    });
    langs.graph(data.langs);
    graphdata = data;
    localStorage.setItem('/all', JSON.stringify(data));
  });
});
