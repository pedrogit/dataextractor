var extractValues = (source, fields, starts, ends) => {
  var data = [];
  //var found = source !== "" && starts[0] !== "" && ends[0] !== "";
  var foundStart = true;
  var foundEnd = true;
  var currentPos = 0;
  var selectedSource = source.replaceAll('<', '&lt;').replaceAll('>', '&gt;');;

  while (foundStart && foundEnd) {
    var row = [];
    for (let i = 0; i < fields.length && (foundStart || foundEnd); i++) {
      var startIdx = source.indexOf(starts[i], currentPos);
      if (starts[i] != "" && startIdx > -1) {
        currentPos = startIdx + starts[i].length;
        var startStr = source.substring(startIdx, currentPos).replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        
        // highlight the find
        if (startStr != "")
        {
          selectedSource = selectedSource.replaceAll(startStr, '<span style="background-color:red">' + startStr + '</span>');
          document.getElementById("sourceinputselectable").innerHTML = selectedSource;
        }
      } else {
        foundStart = false;
      }

      var endIdx = source.indexOf(ends[i], currentPos);
      if (ends[i] != "" && endIdx > -1) {
        currentPos = endIdx;
        var endStr = source.substring(endIdx, currentPos + ends[i].length).replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        
        // highlight the find
        if (endStr != "")
        {
          selectedSource = selectedSource.replaceAll(endStr, '<span style="background-color:blue">' + endStr + '</span>');
          document.getElementById("sourceinputselectable").innerHTML = selectedSource;
        }

      } else {
        foundEnd = false;
      }

      if (foundStart && foundEnd) {
        row.push(source.substring(startIdx + starts[i].length, endIdx));
      }
    }
    if (row.length > 0) {
      data.push(row);
    }
  }

  var resultCSV = fields.join(";") + ";\n";
  Array.from(data).forEach(function(datarow) {
    resultCSV = resultCSV + datarow.join(";") + ";\n";
  });

  return resultCSV;
}

var prepareExtract = () => {
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

  document.getElementById("sourceinputselectable").innerHTML = source.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  // extract
  result = extractValues(source, fieldNames, starts, ends);
  document.getElementById("csvinput").value = result;
};

var addRow = (el) => {
  var newRow = document.getElementById('firstFieldDefsRow').cloneNode(true);
  newRow.removeAttribute('id');
  // reset the inputs
  var changingfields = newRow.getElementsByClassName("changingfield");
  Array.from(changingfields).forEach(function(element) {
    element.addEventListener('input', prepareExtract);
    element.value = "";
  });

  var target = document.getElementById('fieldDefsRows');
  target.appendChild(newRow);
  // increment the field name
  newRow.querySelector("input[name='fieldname']").value = "field" + target.childElementCount;

  prepareExtract();
}

var changingfields = document.getElementsByClassName("changingfield");

Array.from(changingfields).forEach(function(element) {
  element.addEventListener('input', prepareExtract);
});

document.getElementById('addRowButton').addEventListener("click", addRow);

document.getElementById("sourceinput").value = "<row><p>data1</p><p>data2</p></row><row><p>data3</p><p>data4</p></row>";

prepareExtract();
