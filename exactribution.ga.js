(function(document, window) {

  var ga = window[window['GoogleAnalyticsObject'] || 'ga'];

  if(ga) {

    ga('provide', 'toolbarShare', toolbarShare);

  }

  function toolbarShare(tracker, config) {

    function init() {

      if(config.forceDirect) {

        if(document.referrer === '' && document.location.search.indexOf('utm_source=') === -1) {

          tracker.set('campaignSource', '(direct)');
          tracker.set('campaignMedium', '(none)');

        }
    
      }
  
      var cid = tracker.get('clientId');
      var encodedCid = clientIdEncoding.encode(cid);
      var currentHash = document.location.hash.replace('#', '');

      if(cid.search(/\d+\.\d+$/) === -1) {

        return false;

      }

      if(encodedCid && encodedCid !== currentHash) {

        document.location.hash = encodedCid;

      }

      if(currentHash.length === 0) {

        return false;

      }

      var isClientId = clientIdEncoding.decode(currentHash);
      var differentClientIds = checkIfDifferentIds(isClientId, cid);

      if(isClientId && differentClientIds) {

        tracker.set('campaignSource', 'shared');
        tracker.set('campaignMedium', 'toolbar');
        
        if(config.customDimension) {

          tracker.set('dimension' + config.customDimension, isClientId);

        }

      }

    }

    var base71 = {

     encode: function(decoded) {

        if(isNaN(decoded)) {

          return false;

        }

        var encoded = '';
        var alphabet = {
          0: "A",
          1: "B",
          2: "C",
          3: "D",
          4: "E",
          5: "F",
          6: "G",
          7: "H",
          8: "I",
          9: "J",
          10: "K",
          11: "L",
          12: "M",
          13: "N",
          14: "O",
          15: "P",
          16: "Q",
          17: "R",
          18: "S",
          19: "T",
          20: "U",
          21: "V",
          22: "W",
          23: "X",
          24: "Y",
          25: "Z",
          26: "a",
          27: "b",
          28: "c",
          29: "d",
          30: "e",
          31: "f",
          32: "g",
          33: "h",
          34: "i",
          35: "j",
          36: "k",
          37: "l",
          38: "m",
          39: "n",
          40: "o",
          41: "p",
          42: "q",
          43: "r",
          44: "s",
          45: "t",
          46: "u",
          47: "v",
          48: "w",
          49: "x",
          50: "y",
          51: "z",
          52: "0",
          53: "1",
          54: "2",
          55: "3",
          56: "4",
          57: "5",
          58: "6",
          59: "7",
          60: "8",
          61: "9",
          62: "-",
          63: "_",
          64: "$",
          65: "+",
          66: "!",
          67: "*",
          68: "'",
          69: "(",
          70: ")"
        };  

        while(decoded !== 0) {

          var n = alphabet[decoded % 71];
          decoded = Math.floor(decoded / 71);
          encoded = n + encoded;

        }

        return encoded;

      },

      decode: function(encoded) {

        var i;
        var decoded = '';

        var alphabet = {
          A: 0,
          B: 1,
          C: 2,
          D: 3,
          E: 4,
          F: 5,
          G: 6,
          H: 7,
          I: 8,
          J: 9,
          K: 10,
          L: 11,
          M: 12,
          N: 13,
          O: 14,
          P: 15,
          Q: 16,
          R: 17,
          S: 18,
          T: 19,
          U: 20,
          V: 21,
          W: 22,
          X: 23,
          Y: 24,
          Z: 25,
          a: 26,
          b: 27,
          c: 28,
          d: 29,
          e: 30,
          f: 31,
          g: 32,
          h: 33,
          i: 34,
          j: 35,
          k: 36,
          l: 37,
          m: 38,
          n: 39,
          o: 40,
          p: 41,
          q: 42,
          r: 43,
          s: 44,
          t: 45,
          u: 46,
          v: 47,
          w: 48,
          x: 49,
          y: 50,
          z: 51,
          0: 52,
          1: 53,
          2: 54,
          3: 55,
          4: 56,
          5: 57,
          6: 58,
          7: 59,
          8: 60,
          9: 61,
          "-": 62,
          "_": 63,
          "$": 64,
          "+": 65,
          "!": 66,
          "*": 67,
          "'": 68,
          "(": 69,
          ")": 70
        };

        for (i = 0; i < encoded.length; i++) {

          var n = encoded.charAt(i);
          decoded = decoded * 71 + (alphabet[n] + 0);

        }

        return decoded;

      }

    };

    var clientIdEncoding = {

      encode: function(id) {

        var idParts = id.split('.');

        if(idParts.length === 2) {

          return base71.encode(idParts[0]) + "." + base71.encode(idParts[1]);

        }

        return false;

      },

      decode: function(id) {

        var idParts = id.split('.');

        if(idParts.length === 2) {

          return base71.decode(idParts[0]) + "." + base71.decode(idParts[1]);

        }

        return false;

      }

    };

    function checkIfDifferentIds(value, cid) {

      var isStoredId    = false;
      var isDifferentId = true;

      if(value.search(/\d{1,10}\.\d{10}$/) > -1 ) {

        isStoredId = true;

      }

      if(value === cid) {

        isDifferentId = false;

      }

      return (isStoredId && isDifferentId);

    }

  init();

  }

})(document, window);
