String.prototype.replaceAt = function(str, repl, idx) {
  var firstpart = this.substring(0, idx);
  var remainingpart = this.substring(idx, this.length);
  var pos = remainingpart.indexOf(str);
  var result = firstpart;
  if (pos > -1) {
    result = result + remainingpart.substring(0, pos) + repl;
  }
  result = result + remainingpart.substring(pos + str.length, remainingpart.length);
  return  result;
}

var extractValues = (source, fields, starts, ends) => {
  var data = [];
  var somethingFound = false;
  var currentPos = 0;
  var selectedSource = source.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  var selPos = 0;

  do {
    somethingFound = false;
    var foundStart = true;
    var foundEnd = true;
    var row = [];
    for (let i = 0; i < fields.length; i++) {
      var startIdx = source.indexOf(starts[i], currentPos);
      if (starts[i] != "" && startIdx > -1) {
        currentPos = startIdx + starts[i].length;
        somethingFound = true;
        
        // highlight the find
        var startStr = starts[i].replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        var repl = '<span style="background-color: red">' + startStr + '</span>';
        selectedSource = selectedSource.replaceAt(startStr, repl, selPos);
        selPos = selectedSource.indexOf(repl, selPos) + repl.length;
      } else {
        foundStart = false;
        somethingFound = somethingFound || false;
      }

      var endIdx = source.indexOf(ends[i], currentPos);
      if (ends[i] != "" && endIdx > -1) {
        currentPos = endIdx + ends[i].length;
        somethingFound = true;

        // highlight the find
        var endStr = ends[i].replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        if (foundStart)
        {
          var repl = '<span style="background-color: blue">' + endStr + '</span>';
          selectedSource = selectedSource.replaceAt(endStr, repl, selPos);
          selPos = selectedSource.indexOf(repl, selPos) + repl.length;
        }
      } else {
        foundEnd = false;
        somethingFound = somethingFound || false;
      }

      if (foundStart && foundEnd) {
        row.push(source.substring(startIdx + starts[i].length, endIdx));
      }
    }
    if (row.length > 0) {
      data.push(row);
    }
  } while (somethingFound)

  document.getElementById("sourceinputselectable").innerHTML = selectedSource;

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
  var newRow = document.getElementsByClassName("fieldDefsRow")[0].cloneNode(true);

  // reset the inputs and add the onchange event listener
  var changingfields = newRow.getElementsByClassName("changingfield");
  Array.from(changingfields).forEach(function(element) {
    element.addEventListener('input', prepareExtract);
    element.value = "";
  });

  // add the delete event listener
  var deleteButtons = newRow.getElementsByClassName('deleteRowButton');
  Array.from(deleteButtons).forEach(function(element) {
    element.addEventListener('click', deleteRow);
  });

  var target = document.getElementById('fieldDefsRows');
  target.appendChild(newRow);

  // increment the field name
  newRow.querySelector("input[name='fieldname']").value = "field" + target.childElementCount;

  // enable the delete row button
  var allDeletebuttons = document.getElementsByClassName('deleteRowButton');
  Array.from(allDeletebuttons).forEach(function(element) {
    element.removeAttribute('disabled');
  });

  prepareExtract();
}

var deleteRow = (el) => {
  var allDeletebuttons = document.getElementsByClassName('deleteRowButton');
  if (allDeletebuttons.length == 2) {
    Array.from(allDeletebuttons).forEach(function(element) {
      element.setAttribute('disabled', true);
    });
  }
  if (allDeletebuttons.length > 1) {
    el.currentTarget.closest(".fieldDefsRow").remove();
  }
}

// add onchange listener to all fields
var changingfields = document.getElementsByClassName("changingfield");
Array.from(changingfields).forEach(function(element) {
  element.addEventListener('input', prepareExtract);
});

// add click listener to add buttons
document.getElementById('addRowButton').addEventListener("click", addRow);

// add click listener to delete buttons
var deleteButtons = document.getElementsByClassName('deleteRowButton');
Array.from(deleteButtons).forEach(function(element) {
  element.addEventListener('click', deleteRow);
});

document.getElementById("sourceinput").value = "<row><p>data1</p><p>data2</p></row><row><p>data3</p><p>data4</p></row>";

prepareExtract();
