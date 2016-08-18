(function(document, window) {

  var gaObj = window.GoogleAnalyticsObject;
  
  if (!gaObj || !window[gaObj]) {

    var err = new TypeError();
    err.message = err.message + ' Have you placed the exactribution.js file after the Google Analytics tracking snippet?';
    throw err;
  
  }

  window[gaObj]('provide', 'exactribution', exactribution);

  function exactribution(tracker, config) {

    var cid = tracker.get('clientId');

    // This code won't work with non-standard Client IDs
    if (!isClientId_(cid)) return false;

    var encodedCid = encodeClientId(cid);
    var initialHash = document.location.hash.replace('#', '');
    var storedClientId = initialHash.length ? decodeClientId(initialHash) : false;
    var refConf = config.trackReferrer;

    // If we have an encoded Client ID & it's not our current hash, set our hash to the ID
    if (encodedCid !== storedClientId) document.location.hash = encodedCid;

    if (storedClientId) {

      tracker.set('campaignSource', 'shared');
      tracker.set('campaignMedium', 'toolbar');

      // If a custom dimension slot is specified, we'll store the referring CID, too 
      if (config.customDimension) tracker.set('dimension' + config.customDimension, storedClientId);
      if (refConf) {
      
        window[gaObj](function() {

          window[gaObj]('create', tracker.get('trackingId'), {
            name: 'sendRef',
            storage: 'none',
            clientId: storedClientId
          });

          var fieldsObj = {
            'hitType': 'event',
            'eventCategory': 'Exactribution Plugin',
            'eventAction': 'Client ID Piggyback',
            'eventLabel': 'Referring User: ' + storedClientId + ' | Referred User: ' + cid,
            'nonInteraction': 1
          };

          if (refConf.customMetric) fieldsObj['cm' + refConf.customMetric] = 1;
          if (refConf.customDimension) fieldsObj['cd' + refConf.customDimension] = cid;

          ga('sendRef.send', 'event', fieldsObj);

        });

      }

    }

  }

  function encodeClientId(id) {

    var idParts = id.split('.');

    if (idParts.length === 2) {

      return base64.encode(idParts[0]) + "." + base64.encode(idParts[1]);

    }

  }

  function decodeClientId(id) {

    var idParts = id.split('.');

    if (idParts.length === 2) {

      return base64.decode(idParts[0]) + "." + base64.decode(idParts[1]);

    }

  }

  function isClientId_(id) {

    id = id.toString();
    return !!id.match(/\d{1,10}\.\d{10}$/);

  }

  var base64 = (function() {

    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var len = alphabet.length;

    function encode(baseTen) {

      var encoded = '';

      baseTen = typeof baseTen !== 'number' ? Number(baseTen) : baseTen;

      // No floating points or non-numeric strings
      if (Math.round(baseTen) !== baseTen) return;
      if (isNaN(baseTen)) return;

      while (baseTen !== 0) {

        var n = alphabet[baseTen % len];
        baseTen = Math.floor(baseTen / len);
        encoded = n + encoded;

      }

      return encoded;

    }

    function decode(str) {

      var decoded = '';
      var i;

      for (i = 0; i < str.length; i++) {

        var n = str.charAt(i);
        decoded = decoded * len + (alphabet.indexOf(n) + 0);

      }

      return decoded;

    }

    return {
      encode: encode,
      decode: decode
    };

  })();

})(document, window);
