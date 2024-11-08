document.getElementById('cargarPDF').addEventListener('click', async function () {
            
    const pdfUrl = 'PDF/CARPETA_ATM.pdf'; // Ruta al archivo PDF

    var NombreTecnico = document.getElementById("NombreTecnico").value;
    var ApellidoTecnico = document.getElementById("ApellidoTecnico").value;
    var legajoTecnico = document.getElementById("legajoTecnico").value;
    var fechaInstalacion = document.getElementById("fechaInstalacion").value;

    var idCajero = document.getElementById("idCajero").value;
    var serieNuevo = document.getElementById("serieNuevo").value;
    var modeloNuevo = document.getElementById("modeloNuevo").value;
    var posicionCajero = document.getElementById("posicionCajero").value;

    // Fetch el PDF

    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

    // Cargar el PDF usando pdf-lib

    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

    var pages = pdfDoc.getPages();

    datosTecnico(NombreTecnico, ApellidoTecnico, legajoTecnico, fechaInstalacion, pages);
    datosCajeroNuevo(idCajero, serieNuevo, modeloNuevo, posicionCajero, pages);
   
    // Guardar el PDF modificado
    
    pdfBytes = await pdfDoc.save();
    
    // Crear un enlace de descarga

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'CarpetaBNA_id = ' + idCajero + '.pdf';
    link.click();
});

//Mostrar y ocultar div cajero viejo

document.getElementById("posicionCajero").addEventListener('change', function() {
    var div = document.getElementById('divCajeroViejo');
    if (this.value === '1') {
        div.classList.add('show')
    } else {
        div.classList.remove('show');
    }
  });

function datosTecnico(NombreTecnico, ApellidoTecnico, legajoTecnico, fechaInstalacion, pages)
{
     var PaginaActual = pages[0];
     var i = 0;
     do
    {
         PaginaActual = pages[i]

         PaginaActual.drawText("" + NombreTecnico.toUpperCase(), 
        {
         x: 90,
         y: 105,
         size: 10,
        });
         PaginaActual.drawText("" + ApellidoTecnico.toUpperCase(), 
        {
         x: 90,
         y: 85,
         size: 10,
        });
         PaginaActual.drawText("" + legajoTecnico, 
        {
         x: 90,
         y: 65,
         size: 10,
        });
        PaginaActual.drawText("" + fechaInstalacion, 
        {
         x: 250,
         y: 80,
         size: 10,
        });
     // Modificar el nombre
        

     i++;
     }while(i < pages.length -1);

     PaginaActual = pages[3];
     PaginaActual.drawText("" + fechaInstalacion, 
        {
         x: 500,
         y: 395,
         size: 10,
        });

}
//Funcion para pegar los datos del cajero nuevo
function datosCajeroNuevo(idCajero, serieNuevo, modeloNuevo, posicionCajero, pages){

    var PaginaActual = pages[0];

    PaginaActual.drawText("" + idCajero,
        {
            x:370,
            y:395,
            size:16,
        }
    );
    PaginaActual.drawText("" + serieNuevo,
        {
            x:150,
            y:222,
            size:16,
        }
    );
    if(posicionCajero == 1){

        PaginaActual.drawText("X",
            {
                x:57,
                y:300,
                size:10,
            }
        );
    }
    else if(posicionCajero == 2){
        PaginaActual.drawText("X",
            {
                x:57,
                y:317,
                size:10,
            }
        );
    }
//Eleccion de modelo de equipo
    switch(modeloNuevo){
        case '1':
            PaginaActual.drawText("X",
                {
                    x:408,
                    y:348,
                    size:10,
                }
            );
            break;
        case '2':
            PaginaActual.drawText("X",
                {
                    x:408,
                    y:330,
                    size:10,
                }
            );
            break;
        case '3':
            PaginaActual.drawText("X",
                {
                    x:408,
                    y:317,
                    size:10,
                }
            );
            break;
        case '4':
            PaginaActual.drawText("X",
                {
                    x:408,
                    y:298,
                    size:10,
                }
            );
            break;
            
    }

    PaginaActual = pages[3];
     PaginaActual.drawText("" + idCajero, 
        {
         x: 395,
         y: 395,
         size: 10,
        });
}

