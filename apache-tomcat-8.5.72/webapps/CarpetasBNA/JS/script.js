
$('#download').on('click', function() {
    // Usar AJAX para cargar el PDF
    $.ajax({
        url: "CarpetasBNA\PDF\Carpeta_ATM.PDF", // Reemplaza con la ruta a tu PDF
        method: 'GET',
        xhrFields: {
            responseType: 'arraybuffer' // Importante para obtener el PDF como ArrayBuffer
        },
        success: async function(data) {
            const pdfDoc = await PDFLib.PDFDocument.load(data);
            const pages = pdfDoc.getPages();
            pages.forEach((page, index) => {
                page.drawText(`Dato en página ${index + 1}`, {
                    x: 50,
                    y: 500,
                    size: 30,
                    color: PDFLib.rgb(0, 0, 0),
                });
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'modified.pdf';
            link.click();
        },
        error: function() {
            console.error('Error al cargar el PDF');
        }
    });
});


