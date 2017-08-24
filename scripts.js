// Try meta property
var metaTags = document.getElementsByTagName('meta');
for (var i = 0, len = metaTags.length; i < len; i++) {
  if (metaTags[i].getAttribute('property') === 'article:published_time') {
    var articleDate = metaTags[i].getAttribute('content');
  } else if (metaTags[i].getAttribute('property') === 'article:published') {
    var articleDate = metaTags[i].getAttribute('content');
  }
}

// Try application/ld+json
var scriptTags = document.getElementsByTagName('script');
for (var i = 0, len = scriptTags.length; i < len; i++) {
  if (scriptTags[i].getAttribute('type') === 'application/ld+json') {
    var linkedData = JSON.parse(scriptTags[i].innerHTML);
    if (linkedData.datePublished) {
      articleDate = linkedData.datePublished;
    }
  }
}

if (! articleDate) {
  throw new Error('Cannot parse date from page');
}

var articleDate = new Date(articleDate);

if (articleDate.typeOf === 'undefined') {
  throw new Error('Cannot parse date');
}

var dateDiff = Date.now() - articleDate.getTime();

if (dateDiff < 0) {
  throw new Error('Date is in the future');
}

if (dateDiff > (7 * 24 * 60 * 60 * 1000)) { // 7 days
  var warningDiv = document.createElement('div');
  warningDiv.classList.add('is-it-relevant-week-old');
  warningDiv.innerHTML = 'Is It Relevant? This article is over a week old';

  if (headline = document.getElementById('headline')) {
    headline.prepend(warningDiv);
  } else {
    document.body.prepend(warningDiv);
  }
}
