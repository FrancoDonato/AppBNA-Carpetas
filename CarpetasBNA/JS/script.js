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

    var serieViejo = document.getElementById("serieViejo").value;
    var modeloViejo = document.getElementById("modeloViejo").value;

    var codigoSuc = document.getElementById("codigoSuc").value;
    var nombreSuc = document.getElementById("NombreSuc").value;
    var provinciaSuc = document.getElementById("ProvinciaSuc").value;
    var localidadSuc = document.getElementById("LocalidadSuc").value;
    var direccionSuc = document.getElementById("DireccionSuc").value;

    var direcIP = document.getElementById("direcIp").value;
    var gateIp = document.getElementById("gateIp").value;
    var mask = document.getElementById("mask").value;
    var nombreSO = document.getElementById("nombreSO").value;
    var procesador = document.getElementById("procesador").value;
    var versionApp = document.getElementById("versionApp").value;

    var recintoATM = document.getElementById("recintoATM").value;
    var recintoObservaciones = document.getElementById("recintoObservaciones").value;
    var capOperadores = document.getElementById("capOperadores").value;
    var horasCapacitacion = document.getElementById("horasCapacitacion").value;
    var observCapacitacion = document.getElementById("observCapacitacion").value;
    var manualOperador = document.getElementById("manualOperador").value;
    var juegoGavetas = document.getElementById("juegoGavetas").value;
    var transaccionPrueba = document.getElementById("transaccionPrueba").value;
    var limpiezaObras = document.getElementById("limpiezaObras").value;
    var observacionesLimp = document.getElementById("observacionesLimp").value;
    var camCCTV = document.getElementById("camCCTV").value;
    var rollosCliente = document.getElementById("rollosCliente").value;
    var rollosAuditoria = document.getElementById("rollosAuditoria").value;
    var cantCartuchos = document.getElementById("cantCartuchos").value;
    var auditoriaCentralizada = document.getElementById("auditoriaCentralizada").value;
    var equipoNoVidente = document.getElementById("equipoNoVidente").value;
    var idNoVidente = document.getElementById("idNoVidentes").value;
    var puntoEfectivo = document.getElementById("puntoEfectivo").value;
    var biomAnses = document.getElementById("biomAnses").value;
    var observGenerales = document.getElementById("observGenerales").value;

    // Fetch el PDF

    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

    // Cargar el PDF usando pdf-lib

    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

    var pages = pdfDoc.getPages();

    datosTecnico(NombreTecnico, ApellidoTecnico, legajoTecnico, fechaInstalacion, pages);
    datoSucursal(codigoSuc, nombreSuc, provinciaSuc, localidadSuc, direccionSuc, pages);
    datosCajeroNuevo(idCajero, serieNuevo, modeloNuevo, posicionCajero, pages);
    datosCajeroViejo(serieViejo, modeloViejo, pages);
    datosRedes_Pc(direcIP, gateIp, mask, nombreSO, procesador, versionApp, pages);
    datosInstalacion(recintoATM, recintoObservaciones, capOperadores, horasCapacitacion,observCapacitacion,manualOperador,juegoGavetas,transaccionPrueba,limpiezaObras, observacionesLimp, camCCTV,rollosCliente,rollosAuditoria,cantCartuchos,auditoriaCentralizada,equipoNoVidente,idNoVidente,puntoEfectivo,biomAnses,observGenerales, pages);
   
    // Guardar el PDF modificado
    
    pdfBytes = await pdfDoc.save();
    
    // Crear un enlace de descarga

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'CarpetaBNA_id_' + idCajero + '.pdf';
    link.click();
});

//Mostrar y ocultar div cajero viejo

    document.getElementById("posicionCajero").addEventListener('change', function() {
    var div = document.getElementById('divCajeroViejo');
    if (this.value === '1') {
        div.classList.add('show')
    }
    else {
        div.classList.remove('show');
    }
  });


  //Datos del tecnico actuante

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

     i++;
     }while(i < pages.length -1);

     PaginaActual = pages[3];
     PaginaActual.drawText("" + fechaInstalacion, 
        {
         x: 500,
         y: 395,
         size: 10,
        });

        PaginaActual = pages[4];
        PaginaActual.drawText("" + fechaInstalacion,
            {
                x: 410,
                y: 460,
                size: 18,
            }
    
        );
        

    PaginaActual = pages[9];
    PaginaActual.drawText("" + fechaInstalacion,
            {
                x: 450,
                y: 770,
                size: 10,
            }
    
        );

}

//Funcion para ingresar los datos de la sucursal

function datoSucursal(codigoSuc, nombreSuc, provinciaSuc, localidadSuc, direccionSuc, pages){

    var PaginaActual = pages[0];
    PaginaActual.drawText("" + codigoSuc,
        {
            x:150,
            y:538,
            size:16,
        }
    );
    PaginaActual.drawText("" + nombreSuc.toUpperCase(),
        {
            x:370,
            y:538,
            size:16,
        }
    );
    PaginaActual.drawText("" + direccionSuc.toUpperCase(),
        {
            x:150,
            y:477,
            size:16,
        }
    );
    PaginaActual.drawText("" + localidadSuc.toUpperCase(),
        {
            x:150,
            y:457,
            size:16,
        }
    );
    PaginaActual.drawText("" + provinciaSuc.toUpperCase(),
        {
            x:150,
            y:437,
            size:16,
        }
    );

    //Carga en pagina 4 

    PaginaActual = pages[3];
    PaginaActual.drawText("" + codigoSuc,
        {
            x: 90,
            y: 395,
            size: 10,
        }

    );
    PaginaActual.drawText("" + nombreSuc.toUpperCase(),
        {
            x:200,
            y:395,
            size:10,
        }
    );

    //Pagina 5

    PaginaActual = pages[4];
    PaginaActual.drawText("" + codigoSuc,
        {
            x: 80,
            y: 550,
            size: 18,
        }

    );
    PaginaActual.drawText("" + nombreSuc.toUpperCase(),
        {
            x:150,
            y:550,
            size:18,
        }
    );

    PaginaActual = pages[9];
    PaginaActual.drawText("" + codigoSuc,
            {
                x: 80,
                y: 770,
                size: 10,
            }
    
        );

    PaginaActual.drawText("" + nombreSuc.toUpperCase(),
                {
                    x: 180,
                    y: 770,
                    size: 10,
                }
        
            );

    PaginaActual = pages[10];
    PaginaActual.drawText("" + codigoSuc,
            {
                x: 110,
                y: 685,
                size: 10,
            }
    
        );
    PaginaActual = pages[11];
    PaginaActual.drawText("" + codigoSuc,
            {
                x: 110,
                y: 705,
                size: 10,
            }
    
        );
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

            PaginaActual=pages[10]
            PaginaActual.drawText("CT 100D RL",
                {
                    x: 300,
                    y: 685,
                    size: 10,
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
            PaginaActual=pages[10]
            PaginaActual.drawText("CD 100D FL",
                {
                    x: 300,
                    y: 685,
                    size: 10,
                }
            
                );
            break;
        case '3':
            PaginaActual.drawText("X",
                {
                    x:410,
                    y:317,
                    size:10,
                }
            );
            PaginaActual=pages[10]
            PaginaActual.drawText("FET 200V RL",
                {
                    x: 300,
                    y: 685,
                    size: 10,
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
            PaginaActual=pages[10]
            PaginaActual.drawText("FECT 200V RL",
                {
                    x: 300,
                    y: 685,
                    size: 10,
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

        PaginaActual = pages[4];
        PaginaActual.drawText("" + idCajero,
            {
                x: 100,
                y: 460,
                size: 18,
            }
    
        );
       
        PaginaActual = pages[10];
        PaginaActual.drawText("" + idCajero,
                {
                    x: 450,
                    y: 685,
                    size: 8,
                }
        
            );

            PaginaActual.drawText("" + serieNuevo,
                {
                    x: 200,
                    y: 685,
                    size: 8,
                }
        
            );
            PaginaActual = pages[11];
            PaginaActual.drawText("" + idCajero,
                    {
                        x: 450,
                        y: 705,
                        size: 8,
                    }
            
                );

}

function datosCajeroViejo(serieViejo, modeloViejo, pages){

    PaginaActual = pages[11];
    PaginaActual.drawText("" + serieViejo,
            {
                x: 200,
                y: 705,
                size: 8,
            }
    
        );
    PaginaActual.drawText("" + modeloViejo,
        {
            x: 300,
            y: 705,
            size: 8,
        }
    
        );

}
function datosRedes_Pc (direcIP, gateIp, mask, nombreSO, procesador, versionApp, pages){

    var PaginaActual = pages[1];
    PaginaActual.drawText(direcIP,
        {
            x: 250,
            y: 650,
            size: 20,
        }
    )
    PaginaActual.drawText(gateIp,
        {
            x: 250,
            y: 610,
            size: 20,
        }
    )
    PaginaActual.drawText(mask,
        {
            x: 250,
            y: 560,
            size: 20,
        }
    )
    PaginaActual.drawText(nombreSO.toUpperCase(),
        {
            x: 250,
            y: 470,
            size: 20,
        }
    )
    PaginaActual.drawText(procesador.toUpperCase(),
        {
            x: 250,
            y: 420,
            size: 20,
        }
    )
    PaginaActual.drawText(versionApp.toUpperCase(),
        {
            x: 250,
            y: 380,
            size: 20,
        }
    )

}

function datosInstalacion(recintoATM, recintoObservaciones, capOperadores, horasCapacitacion, observCapacitacion, manualOperador, juegoGavetas, transaccionPrueba, limpiezaObras, observacionesLimp, camCCTV, rollosCliente, rollosAuditoria, cantCartuchos, auditoriaCentralizada, equipoNoVidente, idNoVidente, puntoEfectivo, biomAnses, observGenerales, pages)
{
    var PaginaActual = pages[5];

    if(recintoATM == '1'){

        PaginaActual.drawText("X", 
            {
                x: 125,
                y: 635,
                size: 20,
            }
        )
    }
    else if(recintoATM =="2"){
        PaginaActual.drawText("X", 
            {
                x: 230,
                y: 635,
                size: 20,
            }
        )
    }
    else{
        PaginaActual.drawText("X", 
            {
                x: 335,
                y: 635,
                size: 20,
            }
        )
    }

    PaginaActual.drawText(recintoObservaciones,
        {
            x: 130,
            y: 605,
            size: 16,
        }
    )

    if(capOperadores == "Si"){
        PaginaActual.drawText("X", 
            {
                x: 178,
                y: 245,
                size: 20,
            }
        )
    }
    else{
        PaginaActual.drawText("X", 
            {
                x: 280,
                y: 245,
                size: 20,
            }
        )
    }

    PaginaActual.drawText(horasCapacitacion,
        {
            x: 370,
            y: 225,
            size: 12,
        }
    )
    PaginaActual.drawText(observCapacitacion,
        {
            x: 130,
            y: 190,
            size: 12,
        }
    )

    PaginaActual=pages[6];

    if(manualOperador == "Si"){

        PaginaActual.drawText("X",
            {
                x: 178,
                y: 720,
                size: 20,
            }
        )
 
    }
    else if(manualOperador == "No"){

        PaginaActual.drawText("X",
            {
                x: 280,
                y: 720,
                size: 20,
            }
        )
    }

    if(juegoGavetas == "Si"){
        PaginaActual.drawText("X",
            {
                x: 178,
                y: 620,
                size: 20,
            }
        )
    }

    else if(juegoGavetas == "No"){

        PaginaActual.drawText("X",
            {
                x: 280,
                y: 620,
                size: 20,
            }
        )
    }

    if(transaccionPrueba == "Si"){
        PaginaActual.drawText("X",
            {
                x: 178,
                y: 505,
                size: 20,
            }
        )
    }

    else if(transaccionPrueba == "No"){

        PaginaActual.drawText("X",
            {
                x: 280,
                y: 505,
                size: 20,
            }
        )
    }

    if(limpiezaObras == "Satisfactoria")
    {
        PaginaActual.drawText("X", 
            {
                x: 125,
                y: 400,
                size: 20,
            }
        )
    }
    else if(limpiezaObras == "Regular")
    {
        PaginaActual.drawText("X", 
            {
                x: 230,
                y: 400,
                size: 20,
            }
        )
    }
    else{
        PaginaActual.drawText("X", 
            {
                x: 335,
                y: 400,
                size: 20,
            }
        )
    }

    PaginaActual.drawText(observacionesLimp,
        {
            x: 130,
            y: 375,
            size: 12,
        }
    )

    if(camCCTV == "Fuera del ATM"){
        PaginaActual.drawText("X",
            {
                x: 80,
                y: 185,
                size: 20,
            }
        )
    }
    else{
        PaginaActual.drawText("X",
            {
                x: 270,
                y: 185,
                size: 20,
            }
        )
    }

    PaginaActual = pages[7];
    PaginaActual.drawText(rollosCliente,
        {
            x: 333,
            y: 712,
            size: 12,
        }
    )
    PaginaActual.drawText(rollosAuditoria,
        {
            x: 332,
            y: 698,
            size: 12,
        }
    )
    PaginaActual.drawText(cantCartuchos,
        {
            x: 333,
            y: 657,
            size: 12,
        }
    )

    if(auditoriaCentralizada == "Si")
    {
        PaginaActual.drawText("X",
            {
                x: 178,
                y: 485,
                size: 20,
            }
        )
    }

    else if(auditoriaCentralizada == "No"){

        PaginaActual.drawText("X",
            {
                x: 280,
                y: 485,
                size: 20,
            }
        )
    }
    if(equipoNoVidente == "Si")
        {
            PaginaActual.drawText("X",
                {
                    x: 178,
                    y: 275,
                    size: 20,
                }
            )
        }
    
        else if(equipoNoVidente == "No"){
    
            PaginaActual.drawText("X",
                {
                    x: 280,
                    y: 275,
                    size: 20,
                }
            )
        }
    PaginaActual.drawText(idNoVidente,
        {
            x: 405,
            y: 205,
            size: 14,
        }
    )

    PaginaActual = pages[8];

    if(puntoEfectivo == "Si")
    {
        PaginaActual.drawText("X",
            {
                x: 178,
                y: 695,
                size: 20,
            }
        )
    }
    else if(puntoEfectivo == "No"){
        PaginaActual.drawText("X",
            {
                x: 280,
                y: 695,
                size: 20,
            }
        )
    }

    if(biomAnses == "Si")
        {
            PaginaActual.drawText("X",
                {
                    x: 178,
                    y: 563,
                    size: 20,
                }
            )
        }
        else if(biomAnses == "No"){
            PaginaActual.drawText("X",
                {
                    x: 280,
                    y: 563,
                    size: 20,
                }
            )
        }

        PaginaActual.drawText(observGenerales,
            {
                x: 70,
                y: 480,
                size: 14,
            }
        )
}
