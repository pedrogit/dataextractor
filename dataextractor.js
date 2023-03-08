var predefinedFieldSets = {
  "CVCanadienPeerReviewedArticles": `fieldNames;starts;startColors;ends;endsColors;
title;label="Articles de revue" recordId="[a-z0-9]*?">s*<field id="[a-z0-9]*?" label="Titre de l'article">s*<value type="String">;rgb(189, 200, 124);</value>;rgb(244, 246, 233);
journal;label="Revue">s*<value type="String">;rgb(63, 245, 171);</value>;rgb(220, 253, 240);
volume;label="Volume">s*<value type="String">;rgb(219, 88, 142);</value>;rgb(246, 212, 226);
numero;label="Numéro">s*<value type="String">;rgb(98, 134, 214);</value>;rgb(208, 219, 243);
pages;label="Plage de page">s*<value type="String">;rgb(84, 237, 242);</value>;rgb(226, 252, 253);
year;label="Année">s*<value format="yyyy" type="Year">;rgb(193, 120, 179);</value>;rgb(234, 209, 229);
publisher;label="Éditeur">s*<value type="String">;rgb(82, 188, 247);</value>;rgb(197, 233, 252);
url;label="URL">s*<value type="String">;rgb(109, 189, 116);</value>;rgb(224, 241, 225);
author;label="Auteurs">s*<value type="String">;rgb(81, 205, 111);</value>;rgb(229, 247, 233);
editor;label="Éditeurs">s*<value type="String">;rgb(92, 220, 110);</value>;rgb(211, 246, 216);
doi;label="DOI">s*<value type="String">;rgb(91, 112, 227);</value>;rgb(192, 200, 244);`,

  "CVCanadienFinancement": `fieldNames;starts;startColors;ends;endsColors;
type_financement;label="Historique du financement de la recherche" recordId="[a-z0-9]*"><field id="[a-z0-9]*" label="Type de financement"><lov id="[a-z0-9]*">;rgb(235, 211, 144);</lov></field>;rgb(244, 230, 192);
debut_annee_mois;label="Début de financement"><value format="yyyy/MM" type="YearMonth">;rgb(209, 156, 181);</value>;rgb(246, 236, 241);
fin_annee_mois;label="Fin de financement"><value format="yyyy/MM" type="YearMonth">;rgb(209, 222, 129);</value>;rgb(240, 244, 213);
titre;label="Titre du financement"><value type="String">;rgb(134, 239, 226);</value>;rgb(212, 249, 245);
type_subvention;label="Type de subvention"/?>(<lov id="[a-z0-9]*">)?;rgb(153, 229, 140);(</lov>)?</?field;rgb(220, 246, 215);
description_fr;<french>;rgb(154, 221, 174);</french>;rgb(204, 238, 214);
description_en;<english>;rgb(135, 138, 210);</english>;rgb(224, 224, 243);
prog_rech_clinique;clinique\\?"/?>(<lov id="[a-z0-9]*">)?;rgb(240, 226, 98);(</lov>)?</?field;rgb(252, 249, 225);
statut_financement;label="Statut du financement"/?>(<lov id="[a-z0-9]*">)?;rgb(246, 194, 88);(</lov>)?</?field;rgb(252, 238, 208);
role;label="Rôle"/?>(<lov id="[a-z0-9]*">)?;rgb(240, 234, 113);(</lov>)?</?field;rgb(249, 247, 201);
application_fr;label="Mise en application de la recherche"><value type="Bilingual"></value><bilingual><french>;rgb(158, 110, 231);</french>;rgb(232, 220, 249);
application_en;<english>;rgb(181, 202, 165);</english>;rgb(216, 227, 208);
organisme;label="Organisme de financement"/?>(<lov id="[a-z0-9]*">)?;rgb(229, 179, 107);(</lov>)?</?field;rgb(245, 226, 199);
autre_organisme;label="Autre organisme de financement"><value type="String">;rgb(129, 195, 205);</value></field>;rgb(214, 235, 239);
programme;label="Nom du programme"><value type="String">;rgb(154, 168, 196);</value></field>;rgb(216, 222, 232);
numero_ref_financement;label="Numéro de référence du financement"><value type="String">;rgb(242, 227, 132);</value></field>;rgb(248, 240, 188);
montant_total;label="Montant total"><value type="Number">;rgb(230, 141, 220);</value></field>;rgb(249, 228, 247);
devise_montant_total;label="Devise du montant total"/?>(<lov id="[a-z0-9]*">)?;rgb(114, 238, 219);(</lov>)?</?field;rgb(212, 250, 244);
montant_recu;label="Portion de financement reçu"><value type="Number">;rgb(128, 172, 237);</value></field>;rgb(204, 222, 248);
devise_montant_recu;label="Devise de la portion de financement reçu"/?>(<lov id="[a-z0-9]*">)?;rgb(250, 119, 247);(</lov>)?</?field;rgb(254, 217, 253);
renouvelable;renouvelable\\?"/?>(<lov id="[a-z0-9]*">)?;rgb(231, 138, 153);(</lov>)?</?field;rgb(245, 206, 212);
competitif;compétitif\\?"/?>(<lov id="[a-z0-9]*">)?;rgb(166, 122, 236);(</lov>)?</?field;rgb(215, 195, 246);
debut_financement_annee_mois;label="Date de début du financement"><value format="yyyy/MM" type="YearMonth">;rgb(121, 247, 193);</value></field>;rgb(222, 253, 240);
fin_financement_annee_mois;label="Date de fin du financement"><value format="yyyy/MM" type="YearMonth">;rgb(220, 186, 140);</value></field>;rgb(242, 230, 214);`
}


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
             (65 + 10 * Math.random()) + '%)';
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
    - move up and down buttons
    - make first delimiter necessary to create a record (or not)
    - make first value necessary to create a record (or not)

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
  var delimiterFound = false;
  var currentPos = 0;
  var selectedSource = source.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br>');
  var selPos = 0;

  do {
    delimiterFound = false;
    valueFound = false;
    firstDelimiterFound = false;
    var row = [];
    for (let i = 0; i < fields.length; i++) {

      // find the starting delimiter
      var startObj = source.findFirstAt(starts[i], currentPos, true);
      if (startObj.str) {
        currentPos = startObj.lastIndex;
        delimiterFound = true;
        if (i == 0) {
          firstDelimiterFound = true;
        }
        
        // highlight the find
        var startStr = startObj.str.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br>');
        var repl = '<span style="background-color: ' + startsColors[i] + '">' + startStr + '</span>';
        selectedSource = selectedSource.replaceAt(startStr, repl, selPos);
        selPos = selectedSource.indexOf(repl, selPos) + repl.length;

        // find the ending delimiter
        var endObj = source.findFirstAt(ends[i], currentPos, true);
        if (endObj.str) {
          currentPos = endObj.lastIndex;

          // highlight the find
          var endStr = endObj.str.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br>');
          var repl = '<span style="background-color: ' + endsColors[i] + '">' + endStr + '</span>';
          selectedSource = selectedSource.replaceAt(endStr, repl, selPos);
          selPos = selectedSource.indexOf(repl, selPos) + repl.length;
        }
      }

      var dataStr = '';
      if (startObj.str && endObj.str) {
        var dataStr = source.substring(startObj.lastIndex, endObj.index < startObj.lastIndex ? startObj.lastIndex : endObj.index)
        //dataStr = dataStr.replaceAll(new RegExp('[\\s\\n\\r\\t]+', 'g'), ' ');
        if (dataStr.indexOf(';') > -1 || dataStr.indexOf('\n') > -1) {
          dataStr = '"' + dataStr.replaceAll('"', '""') + '"';
        }
        valueFound = true;
      }
      row.push(dataStr);
    }
    if (firstDelimiterFound && valueFound) {
      data.push(row);
    }
  } while (delimiterFound)

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
  document.getElementById("resultingCSVinput").value = result;
};

// borrowed from https://stackoverflow.com/questions/1293147/how-to-parse-csv-data
function parseCSV(str, sep = ',') {
  var arr = [];
  var quote = false;  // 'true' means we're inside a quoted field
  var newcol = false;
  // Iterate over each character, keep track of current row and column (of the returned array)
  for (var row = 0, col = 0, c = 0; str && c < str.length; c++) {
      var cc = str[c], nc = str[c+1];        // Current character, next character

      // If the current character is a not a newline (LF or CR) and we are not in a quoted field create a new column
      if ((cc != '\r' && cc != '\n' && !quote) || newcol) {
        arr[row] = arr[row] || [];             // Create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary
        newcol = false;
      }

      // If the current character is a quotation mark, and we're inside a
      // quoted field, and the next character is also a quotation mark,
      // add a quotation mark to the current column and skip the next character
      if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

      // If it's just one quotation mark, begin/end quoted field
      //if (cc == '"') { quote = !quote; continue; }
      //if (cc == sep && nc == '"' && !quote) { quote = true; ++col; ++c; continue; }
      if (cc == sep && nc == '"' && !quote) { quote = true; newcol = true; ++col; ++c; continue; }
    
      if (cc == '"' && (nc == '\n' || nc == '\r') && quote) {quote = false; ++row; col = 0; ++c; continue;}
      if (cc == '"' && (nc == sep || nc == undefined) && quote) { quote = false; ++col; ++c; continue; }

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
// basic tests
var x = parseCSV('a,bx,c,\n1,2,3,');
x = parseCSV('a\nb');
x = parseCSV('a\nb\n');
x = parseCSV('a\nb\n\n');

x = parseCSV('a,\nb,');
x = parseCSV('a,\nb,\n');
x = parseCSV('a,\nb,\n\n');

// nothing
x = parseCSV();
x = parseCSV('');

// quote alone (no quoted string)
x = parseCSV('a,b,c,\n1,2",3,');

// quote alone before end of line (\n)
x = parseCSV('a,b"\n1,2');

// quote alone before end of line (\r)
x = parseCSV('a,b"\r1,2');

// quote alone at the end of file
x = parseCSV('a,b,\n1,2"');

// quoted string
x = parseCSV('a,b,c,\n1,"2",3,');

// true quoted string before \n
x = parseCSV('a,"b"\n1,2');

// true quoted string having a \n
x = parseCSV('a,"b\nc"\n1,2');

// true quoted string having an escaped quote
x = parseCSV('a,"b""c"\n1,2');

// true quoted string having an escaped quote
x = parseCSV('a,"b"""\n1,2');

// true quoted string having an escaped quote
x = parseCSV('a,"b"","\n1,2');

// true quoted string having an escaped quote
x = parseCSV('a,"b"","\n1,2');

// true quoted string having an escaped quote
x = parseCSV('a,""","\n1,2');
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

  prepareExtract();
}

//////////////////////////////////////////////////////////////////////////////
// Add Row
// add a field row before the target if it is provided, otherwise at the end
var addRow = (target) => {
  var newRow = document.getElementsByClassName("fieldDefsRow")[0].cloneNode(true);

  // reset the inputs and add the onchange event listener
  var changingfields = newRow.getElementsByClassName("changingfield");
  Array.from(changingfields).forEach(function(element) {
    element.addEventListener('input', prepareExtract);
    element.value = '';
  });

  // add the addRow event listener
  var addRowBeforeButtons = newRow.getElementsByClassName('addBeforeRowButton');
  Array.from(addRowBeforeButtons).forEach(function(element) {
    element.addEventListener('click', addRow);
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

  var parent = document.getElementById('fieldDefsRows');
  if (!target || target.currentTarget.id == "addRowButton") {
    parent.appendChild(newRow);
  } else {
    parent.insertBefore(newRow, target.currentTarget.closest(".fieldDefsRow"));
  }

  // increment the field name
  newRow.querySelector("input[name='fieldname']").value = "field" + parent.childElementCount;

  // enable the delete row button
  var allDeletebuttons = document.getElementsByClassName('deleteRowButton');
  Array.from(allDeletebuttons).forEach(function(element) {
    element.removeAttribute('disabled');
  });

  prepareExtract();
}

//////////////////////////////////////////////////////////////////////////////
// Delete Row
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

//////////////////////////////////////////////////////////////////////////////
// Save Field Def
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

//////////////////////////////////////////////////////////////////////////////
// Load Field Def
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

//////////////////////////////////////////////////////////////////////////////
// Load Predefned Set
var loadPredefinedFieldSet = () => {
  var selected = document.getElementById('predefinedFieldSetsSelect').value;
  if (predefinedFieldSets[selected])  {
    setFieldsFromCSV(parseCSV(predefinedFieldSets[selected], ';'));
  }
}

//////////////////////////////////////////////////////////////////////////////
// Save CSV Result
var saveCSVResults = () => {
  var source = document.getElementById("resultingCSVinput").value;
  
  var csvblob = new Blob([source], { type: 'text/csv' });
  var a = document.createElement('a');
  a.download = 'resultingCSV.csv';
  a.href = window.URL.createObjectURL(csvblob);
  a.click();
}

//////////////////////////////////////////////////////////////////////////////
// Add listeners
//////////////////////////////////////////////////////////////////////////////

// add onchange listener to all fields
var changingfields = document.getElementsByClassName("changingfield");
Array.from(changingfields).forEach(function(element) {
  element.addEventListener('input', prepareExtract);
});

// add click listener to add before buttons
var addBeforeButtons = document.getElementsByClassName('addBeforeRowButton');
Array.from(addBeforeButtons).forEach(function(element) {
  element.addEventListener('click', addRow);
});

// add click listener to delete buttons
var deleteButtons = document.getElementsByClassName('deleteRowButton');
Array.from(deleteButtons).forEach(function(element) {
  element.addEventListener('click', deleteRow);
});

// add click listener to add buttons
document.getElementById('addRowButton').addEventListener("click", addRow);

// save and load field set
document.getElementById('saveFieldDefButton').addEventListener("click", saveFieldDef);
document.getElementById('loadFieldDefInput').addEventListener("change", loadFieldDef);

// load predefined fields set button
document.getElementById('loadPredefFieldDefButton').addEventListener("click", loadPredefinedFieldSet);

// save results button
document.getElementById('saveResCSVButton').addEventListener("click", saveCSVResults);

// assign background color to expression inputs
var cols = getSisterColors();
document.getElementsByName("start")[0].style.cssText = 'background-color:' + cols[1];
document.getElementsByName("end")[0].style.cssText = 'background-color:' + cols[0];

// assign default test value to source
//document.getElementById("sourceinput").value = "<row><p1>data1</p><p2>data2</p></row><row><p1>data3</p><p2>data4</p></row>";

prepareExtract();
