String.prototype.replaceAt = function(str, repl, idx)  {
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

getSisterColors = () => {
  var hue = 360 * Math.random();
  var sat = 25 + 70 * Math.random();
  var col1 = "hsl(" + hue + ',' + sat + '%,' + 
             (85 + 10 * Math.random()) + '%)';
  var col2 = "hsl(" + hue + ',' + sat + '%,' + 
             (55 + 10 * Math.random()) + '%)';
  return [col1, col2]
}

// search for a string in normal or regex mode
// returns an object
//   str: the found string
//   index: the position of the found string
//   lastIndex: the position of the end of the found string
String.prototype.findFirstAt = function(search, pos = 0, regex = false) {
  var result = {"str": null, index: 0, lastIndex: 0 };
  pos = (pos < 0 ? 0 : pos);
  if (regex && search != ''){
    try {
      const startRE = new RegExp(search, 'g');
      foundArr = startRE.exec(this.substring(pos));
      if (foundArr) {
        result.str = foundArr[0];
        result.index = pos + foundArr.index;
        result.lastIndex = pos + startRE.lastIndex;
      }
    } catch(e) {
    }
  }
  else if (search != '') {
    var idx = this.substring(pos).indexOf(search);
    if (idx > -1) {
      result.str = search;
      result.index = pos + idx;
      result.lastIndex  = pos + idx + search.length;
    }
  }
  return result;
}

/*
  features

    - save/load field definition to/from CSV file
    - add list predefined field definition (CV Canadien publications)


  possible options
  
    for resulting CSV

    - row separator (, or ; or \t)
    - quote strings (always, when necessary)
    - wordwrap

    for each field:

    - match value: match the value instead of it's delimiters. In that case it must be a regex.
    - trim extra spaces (space, \r, \n, \t)
    - change case (uppercase, lowercase, sentence)
    - randomize color

    for each search expression:

    - regex: search the expression as a regex or not
    - ignore case

    for each preceding search expression:

    - same as preceding following

    for source

    - highlight data (instead of delimiters)
    - wordwrap
    - search in source with find next and find previous buttons
    - highlight matching locations in the scrolling bar

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

      // find the starting delimiter
      var startObj = source.findFirstAt(starts[i], currentPos, true);
      if (startObj.str) {
        currentPos = startObj.lastIndex;
        somethingFound = true;
        
        // highlight the find
        var startStr = startObj.str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        var repl = '<span style="background-color: ' + startsColors[i] + '">' + startStr + '</span>';
        selectedSource = selectedSource.replaceAt(startStr, repl, selPos);
        selPos = selectedSource.indexOf(repl, selPos) + repl.length;
      } else {
        somethingFound = somethingFound || false;
      }

      // find the ending delimiter
      var endObj = source.findFirstAt(ends[i], currentPos, true);
      if (endObj.str) {
        currentPos = endObj.lastIndex;
        somethingFound = true;

        // highlight the find
        var endStr = endObj.str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        if (startObj.str)
        {
          var repl = '<span style="background-color: ' + endsColors[i] + '">' + endStr + '</span>';
          selectedSource = selectedSource.replaceAt(endStr, repl, selPos);
          selPos = selectedSource.indexOf(repl, selPos) + repl.length;
        }
      } else {
        somethingFound = somethingFound || false;
      }

      if (startObj.str && endObj.str) {
        var dataStr = source.substring(startObj.lastIndex, endObj.index)
        //dataStr = dataStr.replaceAll(new RegExp('[\\s\\n\\r\\t]+', 'g'), ' ');
        row.push(dataStr);
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

var getFieldDef = () => {
  var fieldDef = {};
  fieldDef.fieldNames = [];
  var fieldnameInputs = document.getElementsByName("fieldname");

  Array.from(fieldnameInputs).forEach(function(element) {
    fieldDef.fieldNames.push(element.value);
  });

  fieldDef.starts = [];
  fieldDef.startColors = [];
  var startsInputs = document.getElementsByName("start");
  Array.from(startsInputs).forEach(function(element) {
    fieldDef.startColors.push(window.getComputedStyle(element).getPropertyValue('background-color')); 
    fieldDef.starts.push(element.value);
  });

  fieldDef.ends = [];
  fieldDef.endsColors = [];
  var endsInputs = document.getElementsByName("end");
  Array.from(endsInputs).forEach(function(element) {
    fieldDef.endsColors.push(window.getComputedStyle(element).getPropertyValue('background-color')); 
    fieldDef.ends.push(element.value);
  });

  return fieldDef;
}

var prepareExtract = () => {
  var fieldDef = getFieldDef();

  var source = document.getElementById("sourceinput").value;

  document.getElementById("sourceinputselectable").innerHTML = source.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  // extract
  var result = extractValues(source, fieldDef.fieldNames, fieldDef.starts, fieldDef.startColors, fieldDef.ends, fieldDef.endsColors);
  document.getElementById("csvinput").value = result;
};

var addRow = () => {
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

var saveFieldDef = () => {
  var fieldDef = getFieldDef();
  var fieldDefCSV = '';

  for (const prop in fieldDef) {
    if (Object.hasOwn(fieldDef, prop)) {
      fieldDefCSV += prop + ";"
    }
  }
  fieldDefCSV += "\n";

  for (let i = 0; i < fieldDef['fieldNames'].length; i++) {
    for (const prop in fieldDef) {
      if (Object.hasOwn(fieldDef, prop)) {
        fieldDefCSV += fieldDef[prop][i] + ";"
      }
    }
    fieldDefCSV += "\n";
  }
  
  var csvblob = new Blob([fieldDefCSV], { type: 'text/csv' });
  var a = document.createElement('a');
  a.download = 'fieldDefinition.csv';
  a.href = window.URL.createObjectURL(csvblob);
  a.click();
}

// borrowed from https://stackoverflow.com/questions/1293147/how-to-parse-csv-data
function parseCSV(str, sep = ',') {
  var arr = [];
  var quote = false;  // 'true' means we're inside a quoted field

  // Iterate over each character, keep track of current row and column (of the returned array)
  for (var row = 0, col = 0, c = 0; str && c < str.length; c++) {
      var cc = str[c], nc = str[c+1];        // Current character, next character

      // If the current character is a not a newline (LF or CR) and we are not in a quoted field create a new column
      if (cc != '\r' && cc != '\n' && !quote) {
        arr[row] = arr[row] || [];             // Create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary
      }

      // If the current character is a quotation mark, and we're inside a
      // quoted field, and the next character is also a quotation mark,
      // add a quotation mark to the current column and skip the next character
      if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

      // If it's just one quotation mark, begin/end quoted field
      if (cc == '"') { quote = !quote; continue; }

      // If it's a comma and we're not in a quoted field, move on to the next column
      if (cc == sep && !quote) { ++col; continue; }

      // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
      // and move on to the next row and move to column 0 of that new row
      if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

      // If it's a newline (LF or CR) and we're not in a quoted field,
      // move on to the next row and move to column 0 of that new row
      if (cc == '\n' && !quote) { ++row; col = 0; continue; }
      if (cc == '\r' && !quote) { ++row; col = 0; continue; }

      // Otherwise, append the current character to the current column
      arr[row][col] += cc;
  }
  return arr;
}
/* 
var x = parseCSV('a\nb');
x = parseCSV('a\nb\n');
x = parseCSV('a\nb\n\n');
x = parseCSV('a,\nb,');
x = parseCSV('a,\nb,\n');
x = parseCSV('a,\nb,\n\n');
x = parseCSV();
*/

var setFieldsFromCSV = (csv) => {
  // validate the csv
  //if (csv[0] != ["fieldNames", "starts", "startColors", "ends", "endsColors"]) {
  if (JSON.stringify(csv[0]) !== JSON.stringify(["fieldNames", "starts", "startColors", "ends", "endsColors"])) {
    alert('Invalid CSV');
    return;
  }
  // make sure the number of field in the interface is ok
  var allDeleteButtons = document.getElementsByClassName('deleteRowButton');
  while (allDeleteButtons.length != csv.length - 1) {
    if (allDeleteButtons.length < csv.length - 1) {
      // add a row
      addRow();
    }
    else {
      // delete a row
      allDeleteButtons[0].click();
    }
    allDeleteButtons = document.getElementsByClassName('deleteRowButton');
  }

  // distribute the values
  var arrIdx = 1;
  Array.from(allDeleteButtons).forEach(function(deleteButton) {
    var parent = deleteButton.closest(".fieldDefsRow");
    parent.querySelector("input[name='fieldname']").value = csv[arrIdx][0];
    parent.querySelector("input[name='start']").value = csv[arrIdx][1];
    parent.querySelector("input[name='start']").style.cssText = 'background-color:' + csv[arrIdx][2];
    parent.querySelector("input[name='end']").value = csv[arrIdx][3];
    parent.querySelector("input[name='end']").style.cssText = 'background-color:' + csv[arrIdx][4];
    arrIdx++;
  });
}

var loadFieldDef = (e) => {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(input) {
    setFieldsFromCSV(parseCSV(input.target.result, ';'));
    e.target.value = '';
  };
  reader.readAsText(file);
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

document.getElementById('saveFieldDefButton').addEventListener("click", saveFieldDef);
document.getElementById('loadFieldDefInput').addEventListener("change", loadFieldDef);

// assign background color to expression inputs
var cols = getSisterColors();
document.getElementsByName("start")[0].style.cssText = 'background-color:' + cols[1];
document.getElementsByName("end")[0].style.cssText = 'background-color:' + cols[0];

document.getElementById("sourceinput").value = "<row><p1>data1</p><p2>data2</p></row><row><p1>data3</p><p2>data4</p></row>";

prepareExtract();
