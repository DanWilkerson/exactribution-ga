(function(document, window) {

  var ga = window[window.GoogleAnalyticsObject];

  if (ga) ga('provide', 'exactribution', exactribution);

  function exactribution(tracker, config) {

    var cid = tracker.get('clientId');

    // This code won't work with non-standard Client IDs
    if (!isClientId_(cid)) return false;

    var encodedCid = encodeClientId(cid);
    var initialHash = document.location.hash.replace('#', '');
    var storedClientId = initialHash.length ? decodeClientId(initialHash) : false;

    // If we have an encoded Client ID & it's not our current hash, set our hash to the ID
    if (encodedCid !== storedClientId) document.location.hash = encodedCid;

    if (storedClientId) {

      tracker.set('campaignSource', 'shared');
      tracker.set('campaignMedium', 'toolbar');

      // If a custom dimension slot is specified, we'll store the referring CID, too 
      if (config.customDimension) tracker.set('dimension' + config.customDimension, storedClientId);

    }

  }

  function encodeClientId(id) {

    var idParts = id.split('.');

    if (idParts.length === 2) {

      return base71.encode(idParts[0]) + "." + base71.encode(idParts[1]);

    }

  }

  function decodeClientId(id) {

    var idParts = id.split('.');

    if (idParts.length === 2) {

      return base71.decode(idParts[0]) + "." + base71.decode(idParts[1]);

    }

  }

  function isClientId_(id) {

    id = id.toString();
    return !!id.match(/\d{1,10}\.\d{10}$/);

  }

  var base71 = (function() {

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_$+!*'()".split('');

    function encode(baseTen) {

      var encoded = '';

      baseTen = typeof baseTen !== 'number' ? Number(baseTen) : baseTen;

      // No floating points or non-numeric strings
      if (Math.round(baseTen) !== baseTen) return;
      if (isNaN(baseTen)) return;

      while (baseTen !== 0) {

        var n = alphabet[baseTen % 71];
        baseTen = Math.floor(baseTen / 71);
        encoded = n + encoded;

      }

      return encoded;

    }

    function decode(str) {

      var decoded = '';
      var i;

      for (i = 0; i < str.length; i++) {

        var n = str.charAt(i);
        decoded = decoded * 71 + (alphabet[n] + 0);

      }

      return decoded;

    }

    return {
      encode: encode,
      decode: decode
    };

  })();

})(document, window);