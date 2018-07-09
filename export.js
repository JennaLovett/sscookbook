var row_index;
var col_index;
var statuschange;
var bank_links = [];
var contract_links = [];
var sa_links = [];
$(function() {
    $('#load_data').click(function() {
        document.getElementById('submit').innerHTML = '<button type="submit" name="submit_changes" id="submit_changes" class="btn btn-info">Submit Changes</button>';
        $('#write_to_csv').html(
            '<button class="btn btn-info">Export HTML Table To CSV File</button>'
        ).click(function(){
            exportTableToCSV($('.mon option:selected').val() + $('.year option:selected').val() + '.csv');
        });
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
                         if(count === 0 && cell_count < 9) {
                            table_data += '<th>' + cell_data[cell_count] + '</th>';
                        } else {    
                            if (cell_data[cell_count] === '' && cell_count === 8) {
                                //do nothing, for textarea space in td
                            } else if (cell_count === 9) {
                                //store links for bank name (link to first column)
                                bank_links.push(cell_data[cell_count]);
                            } else if (cell_count === 10) {
                                //store links for contract (link to second column)
                                contract_links.push(cell_data[cell_count]);
                            } else if(cell_count === 11) {
                                //store links for strategic advisor (link to fourth column)
                                sa_links.push(cell_data[cell_count]);
                            } else if(cell_count === 6) {
                                table_data += '<td class="previous_status">' + cell_data[cell_count] + '</td>';
                            } else if(cell_count === 7) {
                                table_data += '<td class="status_changed">' + cell_data[cell_count] + '</td>';
                            } 
                            else {
                                table_data += '<td>' + cell_data[cell_count] + '</td>';
                            }     
                         }
                     }
                     if(count === 0) {
                         // do nothing
                     } else {
                         table_data += '<td><textarea name="status_change" class="status_change_input" maxlength="50" style="resize:none"/></td></tr>';
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