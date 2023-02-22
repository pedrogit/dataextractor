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

function getSisterColors() {
  var hue = 360 * Math.random();
  var sat = 25 + 70 * Math.random();
  var col1 = "hsl(" + hue + ',' + sat + '%,' + 
             (85 + 10 * Math.random()) + '%)';
  var col2 = "hsl(" + hue + ',' + sat + '%,' + 
             (55 + 10 * Math.random()) + '%)';
  return [col1, col2]
}

/*
  possible options
  
  for each field:

   - match value: match the value instead of it's delimiters. in that case it must be a regex

  for each search expression:

   - regex: search the expression as a regex or not
   - ignore case

  for each preceding search expression:

  - same as preceding following

  for source

  - highlight data (instead of delimiters)

*/
var extractValues = (source, fields, starts, startsColors, ends, endsColors) => {
  var data = [];
  var somethingFound = false;
  var currentPos = 0;
  var selectedSource = source.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  var selPos = 0;

  do {
    somethingFound = false;
    var row = [];
    for (let i = 0; i < fields.length; i++) {
      var foundStart = true;
      var foundEnd = true;
      var startIdx = source.indexOf(starts[i], currentPos);
      if (starts[i] != "" && startIdx > -1) {
        currentPos = startIdx + starts[i].length;
        somethingFound = true;
        
        // highlight the find
        var startStr = starts[i].replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        var repl = '<span style="background-color: ' + startsColors[i] + '">' + startStr + '</span>';
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
          var repl = '<span style="background-color: ' + endsColors[i] + '">' + endStr + '</span>';
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
  var startColors = [];
  var startsInputs = document.getElementsByName("start");
  Array.from(startsInputs).forEach(function(element) {
    startColors.push(window.getComputedStyle(element).getPropertyValue('background-color')); 
    starts.push(element.value);
  });

  var ends = [];
  var endsColors = [];
  var endsInputs = document.getElementsByName("end");
  Array.from(endsInputs).forEach(function(element) {
    endsColors.push(window.getComputedStyle(element).getPropertyValue('background-color')); 
    ends.push(element.value);
  });

  var source = document.getElementById("sourceinput").value;

  document.getElementById("sourceinputselectable").innerHTML = source.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  // extract
  result = extractValues(source, fieldNames, starts, startColors, ends, endsColors);
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

  // assign background color to expression inputs
  var cols = getSisterColors();
  newRow.querySelector("input[name='start']").style.cssText = 'background-color:' + cols[1];
  newRow.querySelector("input[name='end']").style.cssText = 'background-color:' + cols[0];

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
  prepareExtract();
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

// assign background color to expression inputs
var cols = getSisterColors();
document.getElementsByName("start")[0].style.cssText = 'background-color:' + cols[1];
document.getElementsByName("end")[0].style.cssText = 'background-color:' + cols[0];

document.getElementById("sourceinput").value = "<row><p>data1</p><p>data2</p></row><row><p>data3</p><p>data4</p></row>";

prepareExtract();
