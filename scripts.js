var metaTags = document.getElementsByTagName('meta');

for (var i = 0, len = metaTags.length; i < len; i++) {
  if (metaTags[i].getAttribute('property') === 'article:published_time') {
    var articleDate = new Date(metaTags[i].getAttribute('content'));

    var dateDiff = Date.now() - articleDate.getTime();

    if (dateDiff < 0) {
      // Date is in the future, wtf?
      break;
    }

    if (dateDiff > (7 * 24 * 60 * 60 * 1000)) { // 7 days

      var warningDiv = document.createElement('div');
      warningDiv.classList.add('is-it-relevant-week-old');
      warningDiv.innerHTML = 'Is It Relevant? This article is over a week old';
      document.body.prepend(warningDiv);
    }
  }
}
