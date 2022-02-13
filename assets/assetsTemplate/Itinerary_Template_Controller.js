/*
   function demoFromHTML() {
    var pdf = new jsPDF('p', 'pt', 'a4');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    //source = $('#pdfContent')[0];
    source = document.getElementById('main-pdf');
    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    /*
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        'footer': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 10,
        bottom: 10,
        left: 10,
        width: 700
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.addHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, { // y coord
        'width': margins.width // max width of content on PDF
        //'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }, margins);
}

function descargar() {
    var usersid =  $(this).attr("id");
    //post code
    console.log(usersid);
    //generatePDF();
    demoFromHTML();
}*/

function descargar() {
    var doc = new jsPDF('p', 'pt', 'letter');
    var htmlstring = '';
    var tempVarToCheckPageHeight = 0;
    var pageHeight = 0;
    pageHeight = doc.internal.pageSize.height;
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector  
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"  
            return true
        }
    };
    margins = {
        top: 250,
        bottom: 60,
        left: 40,
        right: 40,
        width: 800
    };
    let headerH = document.getElementById('header-pr').offsetHeight;
    let infoH = document.getElementById('info-itinerante').offsetHeight;

    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    var img = new Image()
    img.src = '../assets/assetsTemplate/images/Logo_Tripnary.jpg'
    doc.addImage(img, 'png', 40, 10, 100, 100)

    doc.fromHTML($("#info-itinerante").get(0), 40, 100, {
        'width': 1000
    },
        margins);

    var y = 20;
    doc.setLineWidth(1.5);
    //doc.text(200, y = headerH + infoH + 70, "TOTAL MARKS OF STUDENTS");
    

    doc.autoTable({
        html: '#simple_table',
        startY: headerH + infoH + 70,
        margin: {left: 40},
        rowPageBreak: 'avoid',
        tableWidth: 'wrap',
        theme: 'plain',
        columnStyles: {
            0: { fontStyle: 'bold' },
          },
        didParseCell: function (data) {
            var rows = data.table.body;
            
            data.cell.styles.fillColor = [220, 220, 220];
            if (data.row.index === rows.length - 1) {
                data.cell.styles.color = [220, 22, 22];
            }
        },
        
        columnStyles: {
            0: {
                cellWidth: 180,
            },
            1: {
                cellWidth: 180,
            },
            2: {
                cellWidth: 180,
            }
        },
        styles: {
            minCellHeight: 40
        }
    });
    doc.addPage();
    doc.autoTable({
        html: '#simple_table2',
        startY: 30,
        margin: {left: 40},
        rowPageBreak: 'avoid',
        tableWidth: 'wrap',
        theme: 'plain',
        columnStyles: {
            0: { fontStyle: 'bold' },
          },
        didParseCell: function (data) {
            var rows = data.table.body;
            
            data.cell.styles.fillColor = [220, 220, 220];
            if (data.row.index === rows.length - 1) {
                data.cell.styles.color = [220, 22, 22];
            }
        },
        
        columnStyles: {
            0: {
                cellWidth: 180,
            },
            1: {
                cellWidth: 180,
            },
            2: {
                cellWidth: 180,
            }
        },
        styles: {
            minCellHeight: 40
        }
    })
    let nombreItinerante = "Itinerario " + document.getElementById("nombre-itinerante").innerText;
    doc.save(nombreItinerante);
}  
