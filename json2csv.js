//set up namespacing. 
var csvConverter;
csvConverter = csvConverter || {};

(function() {
  "use strict";
  return csvConverter = {
    convert: function (objArray) {
      var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      //Assume that the headers of the document are equal to the keys in the JSON object. 
      var headers = Object.keys(array[0]);
      var stringWithHeaders = this.parseHeaders(headers, array);
      var parsedString = this.parseBody(array, stringWithHeaders);
      return this.open(parsedString);
    },

    parseHeaders: function(headers) {
      //Push the headers into the CSV string. 
      var str = '';
      headers.forEach(function(item) {
        str += item + ',';
      });
      str += '\r\n';
      return str;
    },

    parseBody: function(array, str) {
      var regex, value, line;

      array.forEach(function (item, index) {
        line = '';
        for ( index in item ) {
          if (  line !== '' ) line += ','; 
          regex = /\,/;
          value = item[index];

          if (typeof value  === "string") {
            // If the value contained in the JSON object is a string:
            // Perform a regex test to check and see if the value has a comma already in place and escape the value. 
            // e.g. "Smith, Jones" as a value should not be separated two different columns. 
            value = regex.test(value) ? '"' + value + '"' : value;
          }
          line += value;
        }
        str += line + '\r\n';
      });
      return str;
    },

    open: function(csvString) {
      if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) 
      {  // Determine if client is IE11
        var blob = new Blob([csvString], {
          type: "text/csv;charset=utf-8;"
        });
        return window.navigator.msSaveBlob(blob, "tcm-01.csv");
      } 
      else {
        var csvContent = "data:text/csv;charset=utf-8," + escape(csvString);
        var link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", "download.csv");
        document.body.appendChild(link);
        link.click();
        return window.open(csvContent);
      }
    }
  }
}.call(this));
