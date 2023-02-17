//debugger;
var extractValues = function(source, fields, starts, ends) {
  var data = [];
  var found = source !== "" && starts[0] !== "" && ends[0] !== "";
  var currentPos = 0;
  while (found) {
    var row = [];
    for (let i = 0; i < fields.length && found; i++) {
      var startIdx = source.indexOf(starts[i], currentPos);
      if (startIdx == -1) {
        found = false;
      } else {
        currentPos = startIdx + starts[i].length;
        var endIdx = source.indexOf(ends[i], currentPos);
        if (endIdx == -1) {
          found = false;
        } else {
          row.push(source.substring(startIdx + starts[i].length, endIdx));
          currentPos = endIdx + ends[i].length;
        }
      }
    }
    if (found) {
      data.push(row);
    }
  }
  //debugger;
  var resultCSV = fields.join(";") + ";\n";
  Array.from(data).forEach(function(datarow) {
    resultCSV = resultCSV + datarow.join(";") + ";\n";
  });

  return resultCSV;
}

var prepareExtract = function() {
  var result = '';
  var fieldNames = [];
  var fieldnameInputs = document.getElementsByName("fieldname");

  Array.from(fieldnameInputs).forEach(function(element) {
    fieldNames.push(element.value);
  });

  var starts = [];
  var startsInputs = document.getElementsByName("start");

  Array.from(startsInputs).forEach(function(element) {
    starts.push(element.value);
  });

  var ends = [];
  var endsInputs = document.getElementsByName("end");

  Array.from(endsInputs).forEach(function(element) {
    ends.push(element.value);
  });

  var source = document.getElementById("sourceinput").value;

  // extract
  result = extractValues(source, fieldNames, starts, ends);
  document.getElementById("csvinput").value = result;
};

var changingfields = document.getElementsByClassName("changingfield");

Array.from(changingfields).forEach(function(element) {
  element.addEventListener('input', prepareExtract)
});
