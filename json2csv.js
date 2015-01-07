
// Module for parsing JSON into CSV
var csvConverter = {
  convert: function (objArray) {
    var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    //Assume that the headers of the document are equal to the keys in the JSON object. 
    var headers = Object.keys(array[0]);
    return this.parseHeaders(headers, array);
  },
  
  parseHeaders: function(headers, array) {
    //Push the headers into the CSV string. 
    var str = '';
    headers.forEach(function(item) {
      str += item + ',';
    });
    str += '\r\n';
    return this.parseBody(array, str);
  },
 
  parseBody: function(array, str) {
    var regex, value, line;

    array.forEach(function (item, index) {
      line = '';
      for ( index in item ) {
        if ( line !== '' ) { 
          line += ','; 
        }
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
  }
}
