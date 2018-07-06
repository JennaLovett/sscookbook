var row_index;
var col_index;
var statuschange;
$(function() {
    $('#load_data').click(function() {
        document.getElementById('submit').innerHTML = '<button type="submit" name="submit_changes" id="submit_changes" class="btn btn-info">Submit Changes</button>';
        $('#write_to_csv').html(
            '<button class="btn btn-info">Export HTML Table To CSV File</button>'
        ).click(function(){
            exportTableToCSV($('.mon option:selected').val() + $('.year option:selected').val() + '.csv');
        });
     //    document.getElementById('write_to_csv').innerHTML = '';
        reloadDOM();
         $.ajax({
             url: $('.mon option:selected').val() + $('.year option:selected').val() + '.csv',
             dataType: "text",
             success: function(data) {
                 var asr_data = data.split(/\r?\n|\r/);
                 var table_data = '<table class="table table-hover" id="table">';
                 for(var count = 0; count < asr_data.length; count++) {
                     var cell_data = asr_data[count].split(",");
                     table_data += '<tr>';
                     for(var cell_count = 0; cell_count < cell_data.length; cell_count++) {
                         if(count === 0) {
                             if(cell_data[cell_count] === 'Previous Status' || cell_data[cell_count] === 'Changed On' || cell_data[cell_count] === 'Status Change?') {
                                 //do nothing
                             } else {
                                table_data += '<th>' + cell_data[cell_count] + '</th>';
                             }
                         } else {
                             if(cell_data[cell_count] === '---') {
                                 //do nothing
                             } else {
                                table_data += '<td>' + cell_data[cell_count] + '</td>';
                             }
                            
                         }
                     }
                     if(count === 0) {
                         table_data += '<th>Previous Status</th><th>Changed On</th><th>Status Change?</th></tr>';
                     } else {
                         table_data += '<td class="previous_status">   ---   </td><td class="status_changed">   ---   </td><td><textarea name="status_change" class="status_change_input" maxlength="50" style="resize:none"/></td></tr>';
                     }
                 }
                 table_data += '</table>';
                 $('#asr_table').html(table_data);       //send data to table data to html
                 $('button#submit_changes').click(function(){
                     var textAreas = $('textarea.status_change_input');
                     textAreas.each(function(i, textArea){
                         var $textArea = $(textArea);
                         var $tdStatus = $textArea.closest('td').prev().prev().prev();
                         var $tdStatusChanged = $textArea.closest('tr').find('.status_changed');
                         var prevStatus = $tdStatus.text();
                         statuschange = $textArea.val();
                         if(statuschange !== '') {
                             $tdStatus.html(statuschange);      //grabbing <td> of textarea and then moving to previous text area
                             $textArea.closest('tr').find('.previous_status').text(prevStatus);
                             $tdStatusChanged.text(new Date().toLocaleDateString());
                             $textArea.val('');
                         }
                     }); 
                 });
             }
         });
    });
});
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
        csv.push(row.join(","));
    }
    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function reloadDOM() {
    document.getElementById('title').innerHTML = 'ASR Report for ' + $('.mon option:selected').val() + ' ' + $('.year option:selected').val();
}