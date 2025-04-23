// Definición de variables globales
let clientes = [];
let productos = [];
let categorias = [];
let carrito = [];
let clienteSeleccionado = null;
let presupuesto = 0;
let paginaActual = 1;
let productosPorPagina = 20;
let totalGastado = 0;
let terminoBusqueda = ''; // Almacena el término de búsqueda actual
let seleccionesUsuario = [];

// Definición de los packs y sus opciones disponibles
const packConfiguraciones = {
    "PACK001": { 
        nombre: "Pack comercial agricultura",
        componentes: [
            {
                nombre: "Maletín muestras AG",
                cantidad: 1,
                opciones: ["91000241"]  // Códigos de productos (diferentes tallas)
            },
            {
                nombre: "Catálogo AG",
                cantidad: 25,
                opciones: ["91000901"]  // Códigos de roll-ups disponibles
            },
            {
                nombre: "Tarifa AG",
                cantidad: 1,
                opciones: ["91000905"] // Códigos de bolígrafos disponibles
            },
            {
                nombre: "Gorra serigrafiada",
                cantidad: 1,
                opciones: ["91X00037"]  // Códigos de lonas disponibles
            },
            {
                nombre: "Polo de vestir manga corta",
                cantidad: 1,
                opciones: ["91X00011", "91X00012", "91X00013", "91X00014", "91X00015", "91X00016"]  // Códigos de lonas disponibles
            },
            {
                nombre: "Bolígrafo AZUD",
                cantidad: 50,
                opciones: ["91000053"]  // Códigos de lonas disponibles
            },
            {
                nombre: "Libreta de bolsillo",
                cantidad: 50,
                opciones: ["91000032"]  // Códigos de lonas disponibles
            }
        ]
    },
    "PACK002": {  
        nombre: "Pack comercial agricultura EXPERT/MASTER",
        componentes: [
            {
                nombre: "Maletín muestras AG",
                cantidad: 1,
                opciones: ["91000241"]  // Códigos de productos (diferentes tallas)
            },
            {
                nombre: "Catálogo AG",
                cantidad: 25,
                opciones: ["91000901"]  // Códigos de roll-ups disponibles
            },
            {
                nombre: "Tarifa AG",
                cantidad: 1,
                opciones: ["91000905"] // Códigos de bolígrafos disponibles
            },
            {
                nombre: "Gorra serigrafiada",
                cantidad: 1,
                opciones: ["91X00037"]  // Códigos de lonas disponibles
            },
            {
                nombre: "Polo de vestir manga corta personalizado",
                cantidad: 1,
                opciones: ["91XJ0011", "91XJ0012", "91XJ0013", "91XJ0014", "91XJ0015", "91XJ0016"]  // Códigos de lonas disponibles
            },
            {
                nombre: "Chaleco softshell personalizado",
                cantidad: 1,
                opciones: ["91XJ0022", "91XJ0023", "91XJ0024", "91XJ0025", "91XJ0026", "91XJ0027"]  // Códigos de lonas disponibles
            },
            {
                nombre: "Bolígrafo AZUD",
                cantidad: 50,
                opciones: ["91000053"]  // Códigos de lonas disponibles
            },
            {
                nombre: "Libreta de bolsillo",
                cantidad: 50,
                opciones: ["91000032"]  // Códigos de lonas disponibles
            }
        ]
    },
    "PACK003": {  
        nombre: "Pack oficina agricultura",
        componentes: [
            {
                nombre: "Calendario de mesa AZUD",
                cantidad: 1,
                opciones: ["91000436"] 
            },
            {
                nombre: "Catálogo AG",
                cantidad: 5,
                opciones: ["91000901"] 
            },
            {
                nombre: "Tarifa AG",
                cantidad: 1,
                opciones: ["91000905"]
            },
            {
                nombre: "Gorra serigrafiada",
                cantidad: 1,
                opciones: ["91X00037"]  
            },
            {
                nombre: "Camisetas",
                cantidad: 5,
                opciones: ["91X00001", "91X00002", "91X00003", "91X00004", "91X00005"]  
            },
            {
                nombre: "Taza",
                cantidad: 1,
                opciones: ["91000835"] 
            },
            {
                nombre: "Botella",
                cantidad: 1,
                opciones: ["91000878"] 
            },
            {
                nombre: "Bolsa de tela",
                cantidad: 1,
                opciones: ["91000300"] 
            },
            {
                nombre: "Libreta A5",
                cantidad: 1,
                opciones: ["91000812"]  
            }
        ]
    },
    "PACK004": {  
        nombre: "Pack mostrador agricultura",
        componentes: [
            {
                nombre: "Catálogo AG",
                cantidad: 25,
                opciones: ["91000901"]  
            },
            {
                nombre: "GOTERO AZUD PREMIER IMPRESIÓN 3D",
                cantidad: 1,
                opciones: ["91A00122"]
            },
            {
                nombre: "GOTERO AZUD GENIUN IMPRESIÓN 3D",
                cantidad: 1,
                opciones: ["91A00123"]  
            },
            {
                nombre: "AZUD HELIX AUTOMATIC FT 2SV MG 130 M + SOPORTE",
                cantidad: 1,
                opciones: ["91A00117"]  
            },
            {
                nombre: "ACCESORIOS AZUD FIT PLUS + SOPORTE",
                cantidad: 1,
                opciones: ["91A00116"]  
            },
            {
                nombre: "DISCOS MG 100-400 MICRON + SOPORTE",
                cantidad: 1,
                opciones: ["91A00118"]  
            },
            {
                nombre: "Rollup normal",
                cantidad: 1,
                opciones: ["91B71637", "91B71638", "91B71639", "91B71640", "91B71641", "91B71642", "91B71643", "91B71644", "91B71645"]  
            },
            {
                nombre: "USB VIDEOS",
                cantidad: 1,
                opciones: ["91000736"]  
            }
        ]
    },
    "PACK005": { 
        nombre: "Pack comercial jardineria",
        componentes: [
            {
                nombre: "Maletín muestras JD",
                cantidad: 1,
                opciones: ["91000948"]  
            },
            {
                nombre: "Catálogo JD",
                cantidad: 25,
                opciones: ["91000908"]  
            },
            {
                nombre: "Tarifa JD",
                cantidad: 1,
                opciones: ["91000911"] 
            },
            {
                nombre: "Gorra serigrafiada",
                cantidad: 1,
                opciones: ["91X00037"] 
            },
            {
                nombre: "Polo de vestir manga corta",
                cantidad: 1,
                opciones: ["91X00011", "91X00012", "91X00013", "91X00014", "91X00015", "91X00016"]  
            },
            {
                nombre: "Bolígrafo AZUD",
                cantidad: 50,
                opciones: ["91000053"]  
            },
            {
                nombre: "Libreta de bolsillo",
                cantidad: 50,
                opciones: ["91000032"]  
            }
        ]
    },
    "PACK006": {  
        nombre: "Pack comercial jardineria EXPERT/MASTER",
        componentes: [
            {
                nombre: "Maletín muestras JD",
                cantidad: 1,
                opciones: ["91000241"] 
            },
            {
                nombre: "Catálogo JD",
                cantidad: 25,
                opciones: ["91000908"]
            },
            {
                nombre: "Tarifa JD",
                cantidad: 1,
                opciones: ["91000911"] 
            },
            {
                nombre: "Gorra serigrafiada",
                cantidad: 1,
                opciones: ["91X00037"] 
            },
            {
                nombre: "Polo de vestir manga corta personalizado",
                cantidad: 1,
                opciones: ["91XJ0011", "91XJ0012", "91XJ0013", "91XJ0014", "91XJ0015", "91XJ0016"] 
            },
            {
                nombre: "Chaleco softshell personalizado",
                cantidad: 1,
                opciones: ["91XJ0022", "91XJ0023", "91XJ0024", "91XJ0025", "91XJ0026", "91XJ0027"] 
            },
            {
                nombre: "Bolígrafo AZUD",
                cantidad: 50,
                opciones: ["91000053"]  
            },
            {
                nombre: "Libreta de bolsillo",
                cantidad: 50,
                opciones: ["91000032"] 
            }
        ]
    },
    "PACK007": {  
        nombre: "Pack oficina jardinería",
        componentes: [
            {
                nombre: "Calendario de mesa AZUD",
                cantidad: 1,
                opciones: ["91000436"] 
            },
            {
                nombre: "Catálogo JD",
                cantidad: 5,
                opciones: ["91000908"] 
            },
            {
                nombre: "Tarifa JD",
                cantidad: 1,
                opciones: ["91000911"]
            },
            {
                nombre: "Gorra serigrafiada",
                cantidad: 1,
                opciones: ["91X00037"]  
            },
            {
                nombre: "Camisetas",
                cantidad: 5,
                opciones: ["91X00001", "91X00002", "91X00003", "91X00004", "91X00005"]  
            },
            {
                nombre: "Taza",
                cantidad: 1,
                opciones: ["91000835"] 
            },
            {
                nombre: "Botella",
                cantidad: 1,
                opciones: ["91000878"] 
            },
            {
                nombre: "Bolsa de tela",
                cantidad: 1,
                opciones: ["91000300"] 
            },
            {
                nombre: "Libreta A5",
                cantidad: 1,
                opciones: ["91000812"]  
            }
        ]
    },
    "PACK008": {  
        nombre: "Pack mostrador jardinería",
        componentes: [
            {
                nombre: "Catálogo JD",
                cantidad: 25,
                opciones: ["91000908"]  
            },
            {
                nombre: "GOTERO AZUD PREMIER IMPRESIÓN 3D",
                cantidad: 1,
                opciones: ["91A00122"]
            },
            {
                nombre: "AZUD HELIX AUTOMATIC FT 2SV MG 130 M + SOPORTE",
                cantidad: 1,
                opciones: ["91A00117"]  
            },
            {
                nombre: "ACCESORIOS AZUD FIT PLUS + SOPORTE",
                cantidad: 1,
                opciones: ["91A00116"]  
            },
            {
                nombre: "DISCOS MG 100-400 MICRON + SOPORTE",
                cantidad: 1,
                opciones: ["91A00118"]  
            },
            {
                nombre: "Rollup normal",
                cantidad: 1,
                opciones: ["91B71637", "91B71638", "91B71639", "91B71640", "91B71641", "91B71642", "91B71643", "91B71644", "91B71645"]  
            },
            {
                nombre: "USB VIDEOS",
                cantidad: 1,
                opciones: ["91000736"]  
            }
        ]
    },
    "PACK009": {  
        nombre: "Pack cliente de cliente",
        componentes: [
            {
                nombre: "Bolsa de tela",
                cantidad: 5,
                opciones: ["91000300"]  
            },
            {
                nombre: "Sacabocados",
                cantidad: 5,
                opciones: ["14S13000"]
            },
            {
                nombre: "Gorra serigrafiada",
                cantidad: 5,
                opciones: ["91X00037"]  
            },
            {
                nombre: "Camisetas",
                cantidad: 5,
                opciones: ["91X00001", "91X00002", "91X00003", "91X00004", "91X00005"]  
            },
            {
                nombre: "Bolígrafo",
                cantidad: 50,
                opciones: ["91000053"]  
            },
            {
                nombre: "Libreta de bolsillo",
                cantidad: 50,
                opciones: ["91000032"]  
            }
        ]
    },
};

// Función para cargar y parsear archivos CSV usando PapaParse
async function cargarCSV(archivo) {
    try {
        let texto;
        
        // Intentar usar window.fs si está disponible (carga desde adjuntos)
        try {
            texto = await window.fs.readFile(archivo, { encoding: 'utf8' });
            console.log(`Archivo ${archivo} cargado usando window.fs`);
        } catch (fsError) {
            // Si falla, intenta el método tradicional con fetch
            try {
                const respuesta = await fetch(`data/${archivo}`);
                texto = await respuesta.text();
                console.log(`Archivo ${archivo} cargado usando fetch`);
            } catch (fetchError) {
                console.error(`Error al cargar ${archivo} usando fetch:`, fetchError);
                return [];
            }
        }
        
        // Usar PapaParse para procesar el CSV
        return new Promise((resolve, reject) => {
            Papa.parse(texto, {
                header: true,           // Primera fila son cabeceras
                skipEmptyLines: true,   // Ignorar líneas vacías
                dynamicTyping: true,    // Convertir tipos de datos automáticamente
                trimHeaders: true,      // Eliminar espacios en blanco de cabeceras
                delimitersToGuess: [';', ',', '\t'], // Detectar automáticamente el delimitador
                complete: function(results) {
                    console.log(`CSV ${archivo} procesado con PapaParse:`, results.meta);
                    resolve(results.data);
                },
                error: function(error) {
                    console.error(`Error al procesar ${archivo} con PapaParse:`, error);
                    reject(error);
                }
            });
        });
        
    } catch (error) {
        console.error(`Error general al procesar ${archivo}:`, error);
        return [];
    }
}

// Función para inicializar la aplicación
async function inicializarApp() {
    try {
        console.log("Inicializando aplicación...");
        
        // Mostrar mensaje de carga
        const mensajeCarga = document.createElement('div');
        mensajeCarga.id = 'mensaje-carga';
        mensajeCarga.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Cargando datos, por favor espere...</p>
            </div>
        `;
        mensajeCarga.style.position = 'fixed';
        mensajeCarga.style.top = '0';
        mensajeCarga.style.left = '0';
        mensajeCarga.style.width = '100%';
        mensajeCarga.style.height = '100%';
        mensajeCarga.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        mensajeCarga.style.display = 'flex';
        mensajeCarga.style.justifyContent = 'center';
        mensajeCarga.style.alignItems = 'center';
        mensajeCarga.style.zIndex = '1000';
        document.body.appendChild(mensajeCarga);
        
        // Cargar datos de los archivos CSV
        console.log("Intentando cargar clientes.csv...");
        clientes = await cargarCSV('clientes.csv');
        console.log(`Clientes cargados: ${clientes.length}`);
        
        console.log("Intentando cargar productos.csv...");
        productos = await cargarCSV('productos.csv');
        console.log(`Productos cargados: ${productos.length}`);
        
        // Si no se cargaron datos, mostrar un mensaje de error
        if (clientes.length === 0 || productos.length === 0) {
            mostrarMensaje(
                'error',
                'Error al cargar los datos',
                'No se pudieron cargar correctamente los archivos CSV. Esto puede deberse a que los archivos no existen, tienen un formato incorrecto o el delimitador utilizado no es reconocido.',
                [
                    {
                        texto: 'Ejecutar diagnóstico',
                        accion: ejecutarDiagnosticoCompleto
                    }
                ]
            );
            console.error("Error: No se pudieron cargar los archivos CSV correctamente.");
        }
        
        // Extraer categorías únicas de los productos
        categorias = [...new Set(productos.map(producto => producto.categoria).filter(cat => cat))];
        console.log(`Categorías detectadas: ${categorias.join(', ')}`);
        
        // Llenar el selector de clientes
        llenarSelectorClientes();
        
        // Mostrar las categorías en el panel lateral
        mostrarCategorias();
        
        // Mostrar todos los productos inicialmente
        mostrarProductos();
        
        // Configurar event listeners
        configurarEventListeners();
        
        // Inicializar el configurador de packs
        inicializarConfiguradorPacks();
        
        // Eliminar mensaje de carga
        document.body.removeChild(mensajeCarga);
        
        console.log("Aplicación inicializada correctamente.");
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
        alert("Ha ocurrido un error al inicializar la aplicación. Por favor, recarga la página o contacta con soporte técnico.");
    }
}

// Función para buscar productos por nombre o código
function buscarProductos(termino) {
    if (!termino || termino.trim() === '') {
        return productos; // Si no hay término, devolver todos los productos
    }
    
    termino = termino.toLowerCase().trim();
    
    // Filtrar productos que coincidan con el término en nombre o código
    return productos.filter(producto => 
        (producto.articulo && String(producto.articulo).toLowerCase().includes(termino)) || 
        (producto.codigo && String(producto.codigo).toLowerCase().includes(termino))
    );
}

// Función para llenar el selector de clientes
function llenarSelectorClientes() {
    const dropdown = document.getElementById('dropdown-clientes');
    const input = document.getElementById('cliente');
    
    // Llenar opciones
    clientes.forEach(cliente => {
        const opcion = document.createElement('div');
        opcion.className = 'dropdown-item';
        opcion.textContent = cliente.nombre_cliente;
        opcion.addEventListener('click', function() {
            input.value = cliente.nombre_cliente;
            seleccionarCliente(cliente.nombre_cliente);
            dropdown.style.display = 'none';
        });
        dropdown.appendChild(opcion);
    });
    
    // Mostrar/ocultar dropdown
    input.addEventListener('focus', function() {
        dropdown.style.display = 'block';
    });
    
    // Filtrar en tiempo real
    input.addEventListener('input', function() {
        const texto = this.value.toLowerCase();
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(texto)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Mostrar el dropdown si hay texto
        dropdown.style.display = texto ? 'block' : 'none';
    });
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // Comprobar selección
    input.addEventListener('change', function() {
        const nombreCliente = this.value;
        const clienteExiste = clientes.some(c => c.nombre_cliente === nombreCliente);
        
        if (clienteExiste) {
            seleccionarCliente(nombreCliente);
        } else if (nombreCliente.trim() !== '') {
            mostrarNotificacion('Cliente no encontrado en la lista', 'error');
            this.value = '';
        }
    });
}

// Función para mostrar las categorías en el panel lateral
function mostrarCategorias() {
    const listaCategorias = document.getElementById('category-list');
    
    // Añadir opción para mostrar todos los productos
    const todosItem = document.createElement('li');
    todosItem.textContent = 'Todos';
    todosItem.classList.add('active');
    todosItem.addEventListener('click', () => filtrarProductosPorCategoria('Todos'));
    listaCategorias.appendChild(todosItem);
    
    // Añadir cada categoría
    categorias.forEach(categoria => {
        const categoriaItem = document.createElement('li');
        categoriaItem.textContent = categoria;
        categoriaItem.addEventListener('click', () => filtrarProductosPorCategoria(categoria));
        listaCategorias.appendChild(categoriaItem);
    });
    
    // Inicializar el banner para "Todos" al cargar la página
    filtrarProductosPorCategoria('Todos');
}

// Función para mostrar los productos con paginación, cantidad y configurador pack
function mostrarProductos(categoria = null, termino = null) {
    const gridProductos = document.getElementById('products-grid');
    if (!gridProductos) return;
  
    // Opcional: animación de desvanecido
    gridProductos.style.opacity = '0';
    gridProductos.style.transform = 'translateY(10px)';
  
    // Actualizar término si viene por parámetro
    if (termino !== null) terminoBusqueda = termino;
  
    setTimeout(() => {
        gridProductos.innerHTML = '';  // limpiar
  
        // Aplicar filtros
        let filtrados = categoria && categoria !== 'Todos'
            ? productos.filter(p => p.categoria === categoria)
            : productos.slice();
        
        if (terminoBusqueda) {
            const busqueda = terminoBusqueda.toLowerCase();
            filtrados = filtrados.filter(p =>
                (p.articulo && String(p.articulo).toLowerCase().includes(busqueda)) ||
                (p.codigo && String(p.codigo).toLowerCase().includes(busqueda))
            );
        }
  
        // Agrupar por artículo (para tallas)
        const agrupados = agruparProductosPorArticulo(filtrados);
        const allGroups = Object.values(agrupados);
  
        // Paginación
        const total = allGroups.length;
        const paginas = Math.ceil(total / productosPorPagina);
        if (paginaActual > paginas && paginas > 0) paginaActual = 1;
        const start = (paginaActual - 1) * productosPorPagina;
        const end = start + productosPorPagina;
        const páginaActualItems = allGroups.slice(start, end);
  
        // Si no hay productos que mostrar
        if (páginaActualItems.length === 0) {
            const noResultados = document.createElement('div');
            noResultados.className = 'no-search-results';
            noResultados.innerHTML = `
                <span class="material-icons">search_off</span>
                <p>No se encontraron productos con los criterios de búsqueda.</p>
                <button class="azud-btn" id="reset-search">Mostrar todos</button>
            `;
            gridProductos.appendChild(noResultados);
            
            // Configurar botón para resetear búsqueda
            setTimeout(() => {
                document.getElementById('reset-search')?.addEventListener('click', () => {
                    document.getElementById('producto-search').value = '';
                    terminoBusqueda = '';
                    filtrarProductosPorCategoria('Todos');
                });
            }, 0);
        }
  
        // Crear tarjeta por grupo
        páginaActualItems.forEach(grupo => {
            const primer = grupo[0];
            const tieneTallas = grupo.length > 1
                || (primer.talla && primer.talla !== 'N/A' && primer.talla !== '');
            const esPack = esProductoPack(primer);
            const rutaImagen = primer.imagen ? `media/${primer.imagen}` : 'media/placeholder.png';
      
            const card = document.createElement('div');
            card.className = 'product-card';
      
            card.innerHTML = `
                <div class="product-image">
                    <img src="${rutaImagen}" alt="${primer.articulo}" onerror="this.src='media/placeholder.png'">
                </div>
                <div class="product-info">
                    <h3>${primer.articulo}</h3>
                    <span class="product-reference">Ref.: ${primer.codigo||'N/A'}</span>
                    <div class="product-price">${parseFloat(primer.precio||0).toFixed(2)}€</div>
                    <div class="product-quantity-container">
                        ${(esPack || !tieneTallas) ? `
                        <div class="quantity-selector-product">
                            <button class="quantity-btn decrease-product">-</button>
                            <input type="number" class="product-quantity" value="1" min="1" max="99">
                            <button class="quantity-btn increase-product">+</button>
                        </div>` : ''}
                        <button class="azud-btn ${esPack?'configure-pack':'add-to-cart'}"
                                data-product-code="${primer.codigo}"
                                data-product-name="${primer.articulo}">
                            ${esPack?'Configurar':'Añadir'}
                        </button>
                    </div>
                </div>
            `;
      
            // Eventos cantidad
            const btnDec = card.querySelector('.decrease-product');
            const btnInc = card.querySelector('.increase-product');
            const inputQ = card.querySelector('.product-quantity');
            if (btnDec && btnInc && inputQ) {
                btnDec.addEventListener('click', () => {
                    if (+inputQ.value > 1) inputQ.value = +inputQ.value - 1;
                });
                btnInc.addEventListener('click', () => {
                    inputQ.value = +inputQ.value + 1;
                });
            }
      
            // Imagen click
            const imgDiv = card.querySelector('.product-image');
            if (esPack) {
                imgDiv.addEventListener('click', () => {
                    // multiplicador 1 por defecto
                    mostrarConfiguradorPack(primer.codigo, primer.articulo, 1);
                });
            } else {
                imgDiv.addEventListener('click', () => mostrarImagenAmpliada(primer));
            }
      
            // Botón principal
            if (esPack) {
                const btnCfg = card.querySelector('.configure-pack');
                btnCfg.addEventListener('click', () => {
                    // usar la cantidad seleccionada
                    const qty = parseInt(inputQ.value, 10) || 1;
                    mostrarConfiguradorPack(primer.codigo, primer.articulo, qty);
                });
            } else if (tieneTallas) {
                card.querySelector('.add-to-cart')
                    .addEventListener('click', () => mostrarModalTallas(grupo));
            } else {
                card.querySelector('.add-to-cart')
                    .addEventListener('click', () => {
                        const qty = parseInt(inputQ.value, 10) || 1;
                        agregarAlCarritoConCantidad(primer.codigo, qty);
                    });
            }
      
            gridProductos.appendChild(card);
        });
  
        // Generar la paginación
        crearPaginacion(total, paginas);
  
        // Mostrar animación suave
        gridProductos.style.opacity = '1';
        gridProductos.style.transform = 'translateY(0)';
    }, 300);
}

function crearPaginacion(totalItems, totalPaginas) {
    // Buscar o crear el contenedor de paginación
    let paginacionElement = document.querySelector('.pagination');
    
    // Si no existe el contenedor, créalo
    if (!paginacionElement) {
        paginacionElement = document.createElement('div');
        paginacionElement.className = 'pagination';
        const productsSection = document.querySelector('.products');
        if (productsSection) {
            productsSection.appendChild(paginacionElement);
        }
    } else {
        // Limpiar la paginación actual
        paginacionElement.innerHTML = '';
    }

    // Si no hay suficientes elementos para paginar, ocultar paginación
    if (totalPaginas <= 1) {
        paginacionElement.style.display = 'none';
        return;
    }

    // Mostrar la paginación
    paginacionElement.style.display = 'flex';

    // Botón anterior
    const btnAnterior = document.createElement('button');
    btnAnterior.textContent = '«';
    btnAnterior.addEventListener('click', () => cambiarPagina(paginaActual - 1));
    if (paginaActual === 1) {
        btnAnterior.disabled = true;
    }
    paginacionElement.appendChild(btnAnterior);

    // Mostrar páginas
    for (let i = 1; i <= totalPaginas; i++) {
        const btnPagina = document.createElement('button');
        btnPagina.textContent = i.toString();
        btnPagina.addEventListener('click', () => cambiarPagina(i));
        
        if (i === paginaActual) {
            btnPagina.classList.add('active');
        }
        
        paginacionElement.appendChild(btnPagina);
    }

    // Botón siguiente
    const btnSiguiente = document.createElement('button');
    btnSiguiente.textContent = '»';
    btnSiguiente.addEventListener('click', () => cambiarPagina(paginaActual + 1));
    if (paginaActual === totalPaginas) {
        btnSiguiente.disabled = true;
    }
    paginacionElement.appendChild(btnSiguiente);
}


// Función agregarAlCarritoConCantidad actualizada
function agregarAlCarritoConCantidad(codigoProducto, cantidad) {
    console.log(`Intentando agregar al carrito: código=${codigoProducto}, cantidad=${cantidad}`);
    
    // Convertir a string para evitar problemas de tipo
    codigoProducto = String(codigoProducto);
    
    // Buscar el producto en la lista
    const producto = productos.find(p => String(p.codigo) === codigoProducto);
    
    if (!producto) {
        console.error(`Producto no encontrado: ${codigoProducto}`);
        mostrarNotificacion(`Error: Producto con código ${codigoProducto} no encontrado`, 'error');
        return;
    }
    
    console.log("Producto encontrado:", producto);
    
    // Comprobar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => String(item.codigo) === codigoProducto);
    
    if (itemExistente) {
        // Incrementar cantidad si ya existe
        itemExistente.cantidad += cantidad;
        console.log(`Producto existente actualizado, nueva cantidad: ${itemExistente.cantidad}`);
    } else {
        // Añadir nuevo item si no existe
        const nuevoItem = {
            codigo: producto.codigo,
            articulo: producto.articulo,
            precio: parseFloat(producto.precio),
            cantidad: cantidad,
            talla: producto.talla || ''
        };
        
        carrito.push(nuevoItem);
        console.log("Nuevo producto añadido al carrito:", nuevoItem);
    }
    
    // Actualizar contador del carrito y alerta de presupuesto
    actualizarContadorCarrito();
    comprobarPresupuesto();
    actualizarTotalGastado();
    
    // Mostrar notificación
    mostrarNotificacion(`Se ${cantidad > 1 ? 'han' : 'ha'} añadido ${cantidad} unidad${cantidad > 1 ? 'es' : ''} al carrito`, 'success');
}

// Función de normalización de códigos
function normalizarCodigos() {
    console.log("Normalizando códigos de productos y packs...");
    
    // 1. Normalizar códigos en productos
    productos.forEach(producto => {
        if (producto.codigo !== undefined) {
            producto.codigo = String(producto.codigo);
        }
    });
    
    // 2. Normalizar códigos en packs
    for (const packCodigo in packConfiguraciones) {
        // Convertir el código del pack
        const packStringCodigo = String(packCodigo);
        
        // Si el código ha cambiado, reemplazar la entrada
        if (packCodigo !== packStringCodigo) {
            packConfiguraciones[packStringCodigo] = packConfiguraciones[packCodigo];
            delete packConfiguraciones[packCodigo];
        }
        
        // Normalizar todos los códigos de opciones
        const pack = packConfiguraciones[packStringCodigo];
        pack.componentes.forEach(componente => {
            componente.opciones = componente.opciones.map(opcion => String(opcion));
        });
    }
    
    console.log("Normalización de códigos completada");
}

// Función para cambiar de página
function cambiarPagina(pagina) {
    paginaActual = pagina;
    const categoriaActual = document.querySelector('#category-list li.active').textContent;
    mostrarProductos(categoriaActual === 'Todos' ? null : categoriaActual);
    
    // Desplazarse hacia arriba para ver los nuevos productos
    window.scrollTo({
        top: document.querySelector('.products').offsetTop - 20,
        behavior: 'smooth'
    });
}

// Función para agrupar productos por artículo (para manejar tallas)
function agruparProductosPorArticulo(productos) {
    const productosAgrupados = {};
    
    productos.forEach(producto => {
        if (!productosAgrupados[producto.articulo]) {
            productosAgrupados[producto.articulo] = [];
        }
        productosAgrupados[producto.articulo].push(producto);
    });
    
    return productosAgrupados;
}

function filtrarProductosPorCategoria(categoria) {
    // Reiniciar la paginación al filtrar por categoría
    paginaActual = 1;
    // Limpiar la búsqueda cuando se cambia de categoría si no está explícitamente filtrado
    if (!document.getElementById('producto-search').value) {
        terminoBusqueda = '';
    }
    
    // Actualizar la categoría actual en la UI con el nuevo banner
    const categoryTitleElement = document.getElementById('current-category');
    
    // Determinar la ruta de la imagen según la categoría
    let imagenCategoria = 'media/banner-default.jpg'; // Imagen por defecto
    
    // Aquí puedes definir imágenes específicas para cada categoría
    if (categoria !== 'Todos') {
        // Normaliza el nombre eliminando acentos y caracteres especiales
        let nombreArchivo = categoria.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Elimina acentos
            .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales excepto espacios y guiones
            .replace(/\s+/g, '-'); // Reemplaza espacios con guiones
        
        imagenCategoria = `media/banner-${nombreArchivo}.jpg`;
    }
    
    // Crear la estructura del banner
    categoryTitleElement.innerHTML = `
        <div class="category-banner">
            <div class="category-title">
                <h2>${categoria === 'Todos' ? 'Todos los productos' : categoria}</h2>
            </div>
            <div class="category-image">
                <img src="${imagenCategoria}" alt="${categoria}" 
                     onerror="this.src='media/banner-default.jpg'">
            </div>
        </div>
    `;
    
    // Actualizar la lista de categorías (destacar la seleccionada)
    const items = document.querySelectorAll('#category-list li');
    items.forEach(item => {
        item.classList.remove('active');
        if (item.textContent === categoria) {
            item.classList.add('active');
        }
    });
    
    // Mostrar los productos filtrados
    mostrarProductos(categoria === 'Todos' ? null : categoria);
}
// Reemplazar la función mostrarModalTallas con esta versión
function mostrarModalTallas(productosGrupo) {
    const modal = document.getElementById('size-modal');
    const productName = document.getElementById('size-product-name');
    const sizeSelector = document.getElementById('size-selector');
    
    // Limpiar el selector de tallas
    sizeSelector.innerHTML = '';
    
    // Establecer el nombre del producto
    productName.textContent = productosGrupo[0].articulo;
    
    // Obtener la imagen del producto
    let rutaImagen = productosGrupo[0].imagen ? `media/${productosGrupo[0].imagen}` : 'media/placeholder.png';
    
    // Modificar el contenido del modal para incluir imagen y selector de cantidad
    document.querySelector('.size-content .modal-body').innerHTML = `
    <div class="product-image-container" style="text-align: center; margin-bottom: 20px;">
        <img src="${rutaImagen}" alt="${productosGrupo[0].articulo}" 
            onerror="this.src='media/placeholder.png'" style="max-width: 90%; height: 250px; object-fit: contain;">
    </div>
    <div class="product-code-container" style="text-align: center; margin-bottom: 15px;">
        <span class="product-code-label">Ref.: ${productosGrupo[0].codigo || 'N/A'}</span>
    </div>
    <p>Seleccione la talla para este producto:</p>
    <select id="size-selector" style="margin-bottom: 15px;">
        <!-- Se cargará dinámicamente -->
    </select>
    <div class="quantity-selector">
        <p>Cantidad:</p>
        <div class="quantity-input-container">
            <button class="quantity-btn decrease-modal">-</button>
            <input type="number" id="cantidad-modal" value="1" min="1" max="99">
            <button class="quantity-btn increase-modal">+</button>
        </div>
    </div>
    `;
    
    // Actualizar la referencia al selector después de reemplazar el contenido
    const newSizeSelector = document.getElementById('size-selector');
    
    // Llenar el selector con las tallas disponibles
    productosGrupo.forEach(producto => {
        if (producto.talla && producto.talla !== 'N/A' && producto.talla !== '') {
            const option = document.createElement('option');
            option.value = producto.codigo;
            option.textContent = producto.talla;
            newSizeSelector.appendChild(option);
        }
    });
    
    // Si no hay opciones de talla (raro pero posible), añadir la única disponible
    if (newSizeSelector.children.length === 0) {
        const option = document.createElement('option');
        option.value = productosGrupo[0].codigo;
        option.textContent = productosGrupo[0].talla || 'Única';
        newSizeSelector.appendChild(option);
    }
    
    // Configurar botones de cantidad
    document.querySelector('.decrease-modal').addEventListener('click', () => {
        const input = document.getElementById('cantidad-modal');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });
    
    document.querySelector('.increase-modal').addEventListener('click', () => {
        const input = document.getElementById('cantidad-modal');
        input.value = parseInt(input.value) + 1;
    });
    
    // Añadir evento al botón de añadir con talla y cantidad
    const btnAddWithSize = document.getElementById('add-with-size');
    btnAddWithSize.onclick = function() {
        const codigoSeleccionado = newSizeSelector.value;
        const cantidad = parseInt(document.getElementById('cantidad-modal').value);
        
        // Usar la nueva función para agregar con cantidad
        agregarAlCarritoConCantidad(codigoSeleccionado, cantidad);
        
        modal.style.display = 'none';
    };
    
    // Mostrar el modal
    modal.style.display = 'block';
}

// Función para agregar un producto al carrito
function agregarAlCarrito(codigoProducto) {
    // Buscar el producto en la lista
    const producto = productos.find(p => String(p.codigo) === String(codigo));
    
    if (!producto) {
        console.error('Producto no encontrado');
        return;
    }
    
    // Comprobar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.codigo === codigoProducto);
    
    if (itemExistente) {
        // Incrementar cantidad si ya existe
        itemExistente.cantidad += 1;
    } else {
        // Añadir nuevo item si no existe
        carrito.push({
            codigo: producto.codigo,
            articulo: producto.articulo,
            precio: parseFloat(producto.precio),
            cantidad: 1,
            talla: producto.talla || ''
        });
    }
    
    // Actualizar contador del carrito y alerta de presupuesto
    actualizarContadorCarrito();
    comprobarPresupuesto();
    actualizarTotalGastado();
}

// Función para actualizar el total gastado
function actualizarTotalGastado() {
    totalGastado = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    
    // Actualizar el presupuesto mostrado
    const presupuestoElement = document.getElementById('presupuesto');
    presupuestoElement.textContent = `${totalGastado.toFixed(2)} / ${presupuesto.toFixed(2)}`;
    
    // Actualizar la barra de progreso si existe
    const barraProgreso = document.querySelector('.budget-bar');
    if (barraProgreso) {
        const porcentaje = Math.min((totalGastado / presupuesto) * 100, 100);
        barraProgreso.style.width = `${porcentaje}%`;
        
        // Cambiar color según el porcentaje
        if (porcentaje > 90) {
            barraProgreso.style.backgroundColor = '#ff5252'; // Rojo si > 90%
        } else if (porcentaje > 70) {
            barraProgreso.style.backgroundColor = '#ffb300'; // Amarillo si > 70%
        } else {
            barraProgreso.style.backgroundColor = '#85e0d2'; // Color normal
        }
    }
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidadCarrito(codigoProducto, incremento) {
    const itemIndex = carrito.findIndex(item => item.codigo === codigoProducto);
    
    if (itemIndex === -1) return;
    
    carrito[itemIndex].cantidad += incremento;
    
    // Eliminar el producto si la cantidad llega a 0
    if (carrito[itemIndex].cantidad <= 0) {
        carrito.splice(itemIndex, 1);
    }
    
    // Actualizar el carrito en la UI
    actualizarContadorCarrito();
    actualizarContenidoCarrito();
    comprobarPresupuesto();
    actualizarTotalGastado();
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById('cart-counter');
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    contador.textContent = totalItems;
}

// Función para actualizar el contenido del carrito
function actualizarContenidoCarrito() {
    const contenidoCarrito = document.getElementById('cart-items');
    const totalCarrito = document.getElementById('cart-total');
    
    // Limpiar el contenido actual
    contenidoCarrito.innerHTML = `
    <div class="cart-header">
        <div class="cart-column code-column">Código</div>
        <div class="cart-column product-column">Producto</div>
        <div class="cart-column price-column">Precio</div>
        <div class="cart-column quantity-column">Ud/s</div>
        <div class="cart-column total-column">Total</div>
        <div class="cart-column remove-column"></div>
    </div>
`;
    // Calcular el total
    let total = 0;
    
    // Añadir cada item del carrito
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        itemElement.innerHTML = `
    <div class="cart-column code-column">${item.codigo}</div>
    <div class="cart-column product-column">
        <div class="item-name">${item.articulo}</div>
        ${item.talla ? `<div class="item-size">
            <select class="talla-selector" data-product-code="${item.codigo}">
                <!-- Se llenará dinámicamente -->
            </select>
        </div>` : ''}
    </div>
    <div class="cart-column price-column">${item.precio.toFixed(2)}€</div>
    <div class="cart-column quantity-column">
        <button class="quantity-btn decrease" data-product-code="${item.codigo}">-</button>
        <span>${item.cantidad}</span>
        <button class="quantity-btn increase" data-product-code="${item.codigo}">+</button>
    </div>
    <div class="cart-column total-column">${subtotal.toFixed(2)}€</div>
    <div class="cart-column remove-column">
        <div class="remove-item" data-product-code="${item.codigo}">✕</div>
    </div>
`;
        
        contenidoCarrito.appendChild(itemElement);
    });
    
    // Actualizar el total
    totalCarrito.textContent = total.toFixed(2);
    
    // Llenar y configurar selectores de talla
    const tallaSelectors = document.querySelectorAll('.talla-selector');
    tallaSelectors.forEach(selector => {
        const codigoProducto = selector.getAttribute('data-product-code');
        const itemCarrito = carrito.find(item => item.codigo === codigoProducto);
        
        if (itemCarrito) {
            // Buscar el producto original para obtener el artículo
            const productoOriginal = productos.find(p => p.codigo === codigoProducto);
            if (productoOriginal) {
                // Buscar todas las variantes por talla de este artículo
                const variantesTalla = productos.filter(p => p.articulo === productoOriginal.articulo && p.talla);
                
                // Llenar el selector
                variantesTalla.forEach(variante => {
                    const option = document.createElement('option');
                    option.value = variante.codigo;
                    option.textContent = variante.talla;
                    option.selected = variante.codigo === codigoProducto;
                    selector.appendChild(option);
                });
                
                // Configurar evento de cambio
                selector.addEventListener('change', (e) => {
                    cambiarTallaProducto(codigoProducto, e.target.value);
                });
            }
        }
    });


    // Configurar eventos de cantidad y eliminar
    const btnsDecrease = document.querySelectorAll('.quantity-btn.decrease');
    const btnsIncrease = document.querySelectorAll('.quantity-btn.increase');
    const btnsRemove = document.querySelectorAll('.remove-item');
    
    btnsDecrease.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const codigo = e.target.getAttribute('data-product-code');
            actualizarCantidadCarrito(codigo, -1);
        });
    });
    
    btnsIncrease.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const codigo = e.target.getAttribute('data-product-code');
            actualizarCantidadCarrito(codigo, 1);
        });
    });
    
    btnsRemove.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const codigo = e.target.getAttribute('data-product-code');
            eliminarDelCarrito(codigo);
        });
    });
}

        // Añadir esta nueva función
        function cambiarTallaProducto(codigoActual, codigoNuevo) {
            // Buscar el ítem en el carrito
            const itemIndex = carrito.findIndex(item => item.codigo === codigoActual);
            if (itemIndex === -1) return;
            
            // Buscar el producto con la nueva talla
            const nuevoProducto = productos.find(p => p.codigo === codigoNuevo);
            if (!nuevoProducto) return;
            
            // Guardar la cantidad actual
            const cantidadActual = carrito[itemIndex].cantidad;
            
            // Eliminar el producto actual del carrito
            carrito.splice(itemIndex, 1);
            
            // Añadir el nuevo producto con la misma cantidad
            carrito.push({
                codigo: nuevoProducto.codigo,
                articulo: nuevoProducto.articulo,
                precio: parseFloat(nuevoProducto.precio),
                cantidad: cantidadActual,
                talla: nuevoProducto.talla || ''
            });
            
            // Actualizar la UI
            actualizarContenidoCarrito();
            actualizarTotalGastado();
            
            // Mostrar notificación
            mostrarNotificacion(`Se ha cambiado la talla a ${nuevoProducto.talla}`, 'success');
        }
        
// Función para eliminar un producto del carrito
function eliminarDelCarrito(codigoProducto) {
    carrito = carrito.filter(item => item.codigo !== codigoProducto);
    
    // Actualizar la UI
    actualizarContadorCarrito();
    actualizarContenidoCarrito();
    comprobarPresupuesto();
    actualizarTotalGastado();
}

// Función para comprobar si el pedido excede el presupuesto
function comprobarPresupuesto() {
    if (!presupuesto) return;
    
    const total = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    
    const warningElement = document.getElementById('budget-warning');
    
    if (total > presupuesto) {
        warningElement.classList.remove('hidden');
    } else {
        warningElement.classList.add('hidden');
    }
    
    return total > presupuesto;
}

// Función para manejar la selección de un cliente
function seleccionarCliente(nombreCliente) {
    // Buscar el cliente en la lista
    clienteSeleccionado = clientes.find(c => c.nombre_cliente === nombreCliente);
    
    if (!clienteSeleccionado) {
        console.error('Cliente no encontrado');
        return;
    }
    
    // Actualizar el presupuesto mostrado
    presupuesto = parseFloat(clienteSeleccionado.presupuesto_2025) || 0;
    
    // Crear o actualizar la barra de progreso
    const presupuestoElement = document.querySelector('.budget-display');
    
    // Eliminar contenido anterior
    presupuestoElement.innerHTML = '';
    
    // Crear nueva estructura con barra de progreso
    presupuestoElement.innerHTML = `
        <span>Presupuesto 2025: </span>
        <span id="presupuesto">0.00 / ${presupuesto.toFixed(2)}</span>€
        <div class="budget-progress">
            <div class="budget-bar" style="width: 0%"></div>
        </div>
    `;
    
    // Limpiar el carrito actual
    carrito = [];
    actualizarContadorCarrito();
    
    // Cargar productos base según el paquete del cliente
    cargarProductosBase();
}

// Función para cargar los productos base según el paquete del cliente
// Modificar en main.js - función cargarProductosBase()
// Reemplazar por esta versión actualizada

// Modificar en main.js - función cargarProductosBase()
// Reemplazar por esta versión actualizada

function cargarProductosBase() {
    if (!clienteSeleccionado || !clienteSeleccionado.paquete) {
        return; // Si no hay cliente seleccionado o no tiene paquete asignado
    }
    
    const paquete = clienteSeleccionado.paquete;
    const productosBase = productosPorPaquete[paquete] || [];
    
    // Agregar cada producto base al carrito con su cantidad específica
    for (const productoInfo of productosBase) {
        const producto = productos.find(p => String(p.codigo) === String(codigo));
        
        if (producto) {
            // Si es un producto con tallas, agregar la primera talla disponible
            if (producto.talla && producto.talla !== 'N/A' && producto.talla !== '') {
                // Buscar todos los productos con el mismo artículo
                const variantesTalla = productos.filter(p => p.articulo === producto.articulo);
                if (variantesTalla.length > 0) {
                    // Agregamos la cantidad específica definida en el paquete
                    for (let i = 0; i < productoInfo.cantidad; i++) {
                        agregarAlCarrito(variantesTalla[0].codigo);
                    }
                }
            } else {
                // Agregamos la cantidad específica definida en el paquete
                for (let i = 0; i < productoInfo.cantidad; i++) {
                    agregarAlCarrito(productoInfo.codigo);
                }
            }
        }
    }
    
    // Mostrar animación y notificación
    if (carrito.length > 0) {
        // Mostrar animación de carrito actualizado
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('cart-updated');
        
        // Mostrar notificación emergente
        mostrarNotificacion(`Se han añadido los productos del paquete ${paquete} al carrito`, 'success');
        
        // Quitar la clase después de la animación
        setTimeout(() => {
            cartIcon.classList.remove('cart-updated');
        }, 1500);
    }
}


function exportarPDF() {
    console.log("Iniciando exportación a PDF");
    
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agregue productos antes de exportar.');
        return;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // ——— CABECERA REDUCIDA ———
        doc.setFillColor(0, 56, 101);
        doc.rect(0, 0, 210, 35, 'F');

        // Logo
        try {
            doc.addImage('media/azud_logo.png', 'PNG', 10, 3, 30, 30);
        } catch (e) {
            console.warn('No se pudo cargar el logo:', e);
        }

        // Título
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text('Pedido de Merchandising', 105, 18, { align: 'center' });
        doc.setFontSize(16);
        doc.text('AZUD', 105, 27, { align: 'center' });

        // ——— DATOS DEL CLIENTE ———
        const clienteTexto = `Cliente: ${clienteSeleccionado ? clienteSeleccionado.nombre_cliente : 'No seleccionado'}`;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);                  // fuente más grande
        doc.setTextColor(0, 0, 0);

        // Calculamos el ancho exacto del texto y lo ajustamos
        const paddingX = 8;
        const paddingY = 6;
        const textWidth = doc.getTextWidth(clienteTexto);
        const rectWidth = textWidth + paddingX * 2;
        const rectHeight = 14 + paddingY * 2; // fontSize 14 + padding
        const rectX = 15;
        const rectY = 38;

        // Dibujamos el rectángulo
        doc.setDrawColor(133, 224, 210);
        doc.setLineWidth(0.5);
        doc.rect(rectX, rectY, rectWidth, rectHeight, 'D');

        // Escribimos el texto del cliente centrado verticalmente en el rectángulo
        const textY = rectY + paddingY + 10; // ajuste para que quede centrado
        doc.text(clienteTexto, rectX + paddingX, textY);

        // ——— COMENTARIO DEL PEDIDO ———
        const comentario = document.getElementById('cart-comment-input')?.value.trim();
        let y;

        if (comentario) {
            // Más espacio encima del comentario
            y = rectY + rectHeight + 20;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);

            // Título del comentario
            doc.text('Comentario del pedido:', 15, y);
            y += 8;

            // Texto envuelto
            const líneas = doc.splitTextToSize(comentario, 180);
            doc.text(líneas, 15, y);
            y += líneas.length * 7;

            // Espacio extra antes de la tabla
            y += 12;
        } else {
            // Si no hay comentario, empezamos la tabla más abajo de forma fija
            y = rectY + rectHeight + 30;
        }

        // ——— TABLA DE PRODUCTOS ———
        // Encabezados
        doc.setFillColor(0, 56, 101);
        doc.rect(15, y - 5, 180, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text('Código', 20, y);
        doc.text('Artículo', 50, y);
        doc.text('Talla', 100, y);
        doc.text('Precio', 130, y);
        doc.text('Cant.', 150, y);
        doc.text('Subtotal', 170, y);

        // Filas
        y += 10;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        let total = 0;
        let filaPar = false;

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            if (y > 250) {
                doc.addPage();
                y = 30;
                // repetir encabezados...
                doc.setFillColor(0, 56, 101);
                doc.rect(15, y - 5, 180, 10, 'F');
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(255, 255, 255);
                doc.text('Código', 20, y);
                doc.text('Artículo', 50, y);
                doc.text('Talla', 100, y);
                doc.text('Precio', 130, y);
                doc.text('Cant.', 150, y);
                doc.text('Subtotal', 170, y);
                y += 10;
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
            }

            if (filaPar) {
                doc.setFillColor(240, 240, 240);
                doc.rect(15, y - 5, 180, 10, 'F');
            }
            filaPar = !filaPar;

            const codigo = String(item.codigo);
            const articulo = item.articulo.length > 25
              ? item.articulo.substring(0, 22) + '...'
              : item.articulo;
            const talla = item.talla || 'N/A';
            const precioTxt = `${item.precio.toFixed(2)} €`;
            const cantTxt = String(item.cantidad);
            const subTxt = `${subtotal.toFixed(2)} €`;

            doc.text(codigo, 20, y);
            doc.text(articulo, 50, y);
            doc.text(talla, 100, y);
            doc.text(precioTxt, 130, y);
            doc.text(cantTxt, 150, y);
            doc.text(subTxt, 170, y);

            y += 10;
        });

        // Línea y total
        doc.setDrawColor(0, 56, 101);
        doc.setLineWidth(0.5);
        doc.line(15, y, 195, y);
        y += 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(0, 56, 101);
        doc.text('TOTAL:', 130, y);
        doc.text(`${total.toFixed(2)} €`, 170, y);

        // Advertencia de presupuesto
        if (comprobarPresupuesto()) {
            y += 15;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.setTextColor(255, 0, 0);
            doc.setFillColor(255, 240, 240);
            doc.rect(15, y - 5, 180, 10, 'F');
            doc.text(
              '¡ATENCIÓN! El pedido excede el presupuesto del cliente.',
              105,
              y,
              { align: 'center' }
            );
        }

        // ——— PIE DE PÁGINA ———
        const fechaActual = new Date().toLocaleDateString();
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.setFillColor(247, 249, 252);
        doc.rect(0, 270, 210, 25, 'F');
        doc.setDrawColor(133, 224, 210);
        doc.setLineWidth(0.5);
        doc.line(15, 275, 195, 275);
        doc.text(
          `Pedido generado el ${fechaActual} | Sistema de Merchandising AZUD | www.azud.com`,
          105,
          280,
          { align: 'center' }
        );

        // Guardar PDF
        const nombreFile = clienteSeleccionado && clienteSeleccionado.nombre_cliente
          ? clienteSeleccionado.nombre_cliente.replace(/\s+/g, '_')
          : 'Cliente';
        doc.save(`Pedido_${nombreFile}_${fechaActual.replace(/\//g, '-')}.pdf`);

        console.log("PDF generado con éxito");
        mostrarNotificacion('PDF exportado correctamente', 'success');
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert(`Error al generar el PDF: ${error.message}`);
    }
}



// Función para configurar los event listeners
function configurarEventListeners() {
    // Logo clickable para mostrar todos los productos
    const logoElement = document.querySelector('.logo');
    logoElement.addEventListener('click', function() {
        filtrarProductosPorCategoria('Todos');
    });
    logoElement.style.cursor = 'pointer';

    const comentarioInput = document.getElementById('cart-comment-input');
    const commentCount = document.getElementById('comment-count');

    if (comentarioInput) {
    comentarioInput.addEventListener('input', () => {
        // Contar palabras
        const words = comentarioInput.value
        .trim()
        .split(/\s+/)
        .filter(w => w.length > 0);
        // Si supera 100, recortar
        if (words.length > 100) {
        comentarioInput.value = words.slice(0, 100).join(' ');
        }
        // Actualizar contador
        commentCount.textContent = `${Math.min(words.length, 100)} / 100 palabras`;
    });
    }
    
    // Evento para el campo de búsqueda
    const campoBusqueda = document.getElementById('producto-search');
    const botonBusqueda = document.getElementById('search-button');
    if (campoBusqueda && botonBusqueda) {
        const iconoBusqueda = botonBusqueda.querySelector('.material-icons');
        
        // Verificar estado inicial
        if (campoBusqueda.value.trim() !== '') {
            iconoBusqueda.textContent = 'close';
            botonBusqueda.classList.add('search-clear');
        } else {
            iconoBusqueda.textContent = 'search';
            botonBusqueda.classList.remove('search-clear');
        }
        
        // Búsqueda en tiempo real mientras se escribe
        campoBusqueda.addEventListener('input', function() {
            const termino = this.value.trim();
            
            // Actualizar el ícono
            if (termino !== '') {
                iconoBusqueda.textContent = 'close';
                botonBusqueda.classList.add('search-clear');
            } else {
                iconoBusqueda.textContent = 'search';
                botonBusqueda.classList.remove('search-clear');
            }
            
            // Realizar búsqueda en tiempo real
            paginaActual = 1; // Reiniciar paginación
            const categoriaActual = document.querySelector('#category-list li.active')?.textContent || 'Todos';
            terminoBusqueda = termino;
            mostrarProductos(categoriaActual === 'Todos' ? null : categoriaActual, termino);
        });
        
        // Botón de búsqueda/limpiar
        botonBusqueda.addEventListener('click', function() {
            if (iconoBusqueda.textContent === 'close') {
                // Limpiar búsqueda
                campoBusqueda.value = '';
                iconoBusqueda.textContent = 'search';
                botonBusqueda.classList.remove('search-clear');
                terminoBusqueda = '';
                
                // Mostrar productos según la categoría actual
                const categoriaActual = document.querySelector('#category-list li.active')?.textContent || 'Todos';
                mostrarProductos(categoriaActual === 'Todos' ? null : categoriaActual, '');
            } else {
                // Iniciar búsqueda (aunque en realidad ya se hace con el input en tiempo real)
                const termino = campoBusqueda.value.trim();
                if (termino) {
                    const categoriaActual = document.querySelector('#category-list li.active')?.textContent || 'Todos';
                    terminoBusqueda = termino;
                    mostrarProductos(categoriaActual === 'Todos' ? null : categoriaActual, termino);
                }
            }
        });
    }
    
    // Selector de cliente
    const selectorCliente = document.getElementById('cliente');
    if (selectorCliente) {
        selectorCliente.addEventListener('change', function() {
            const nombreCliente = this.value;
            if (nombreCliente) {
                seleccionarCliente(nombreCliente);
            } else {
                // Restablecer si no hay cliente seleccionado
                presupuesto = 0;
                document.querySelector('.budget-display').innerHTML = '<span>Presupuesto 2025: </span><span id="presupuesto">0.00</span>€';
                carrito = [];
                actualizarContadorCarrito();
            }
        });
    }
    
    // Icono del carrito (para mostrar el modal)
    const iconoCarrito = document.querySelector('.cart-icon');
    if (iconoCarrito) {
        iconoCarrito.addEventListener('click', function() {
            const modal = document.getElementById('cart-modal');
            actualizarContenidoCarrito();
            modal.style.display = 'block';
        });
    }
    
    // Cerrar modales
    document.querySelector('.close')?.addEventListener('click', function() {
        document.getElementById('cart-modal').style.display = 'none';
    });
    
    document.querySelector('.size-close')?.addEventListener('click', function() {
        document.getElementById('size-modal').style.display = 'none';
    });
    
    document.querySelector('.image-close')?.addEventListener('click', function() {
        document.getElementById('image-modal').style.display = 'none';
    });
    
    document.querySelector('.pack-config-close')?.addEventListener('click', function() {
        document.getElementById('pack-config-modal').style.display = 'none';
    });
    
    // Exportar PDF
    document.getElementById('export-pdf')?.addEventListener('click', exportarPDF);
    
    // Cerrar modales cuando se hace clic fuera de ellos
    window.addEventListener('click', function(event) {
        const cartModal = document.getElementById('cart-modal');
        const sizeModal = document.getElementById('size-modal');
        const imageModal = document.getElementById('image-modal');
        const packConfigModal = document.getElementById('pack-config-modal');
        
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        
        if (event.target === sizeModal) {
            sizeModal.style.display = 'none';
        }
        
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
        
        if (event.target === packConfigModal) {
            packConfigModal.style.display = 'none';
        }
    });
}
// Función para mostrar mensajes en la interfaz
function mostrarMensaje(tipo, titulo, texto, acciones = []) {
    const panel = document.getElementById('mensaje-panel');
    const tituloElement = document.getElementById('mensaje-titulo');
    const textoElement = document.getElementById('mensaje-texto');
    const accionesElement = document.getElementById('mensaje-acciones');
    
    // Configurar tipo de mensaje
    panel.className = tipo; // error, warning, success o vacío para info
    
    // Establecer contenido
    tituloElement.textContent = titulo;
    textoElement.textContent = texto;
    
    // Limpiar acciones anteriores
    accionesElement.innerHTML = '';
    
    // Añadir nuevas acciones
    acciones.forEach(accion => {
        const boton = document.createElement('button');
        boton.className = 'azud-btn';
        boton.textContent = accion.texto;
        boton.onclick = accion.accion;
        accionesElement.appendChild(boton);
    });
    
    // Añadir botón para cerrar el mensaje
    const botonCerrar = document.createElement('button');
    botonCerrar.className = 'azud-btn';
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.onclick = () => {
        panel.classList.add('hidden');
    };
    accionesElement.appendChild(botonCerrar);
    
    // Mostrar el panel
    panel.classList.remove('hidden');
}

/* Añadir al final del archivo main.js (fuera de cualquier función) */
// Función para mostrar notificación emergente
function mostrarNotificacion(mensaje, tipo = 'info', duracion = 3000) {
    // Eliminar notificación existente si hay alguna
    const notificacionExistente = document.querySelector('.notificacion-flotante');
    if (notificacionExistente) {
        notificacionExistente.remove();
    }
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion-flotante ${tipo}`;
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <span class="notificacion-icono">${tipo === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notificacion-texto">${mensaje}</span>
            <span class="notificacion-cerrar">×</span>
        </div>
    `;
    
    // Añadir al DOM
    document.body.appendChild(notificacion);
    
    // Evento para cerrar la notificación
    notificacion.querySelector('.notificacion-cerrar').addEventListener('click', () => {
        notificacion.classList.add('notificacion-saliendo');
        setTimeout(() => notificacion.remove(), 300);
    });
    
    // Mostrar con animación
    setTimeout(() => notificacion.classList.add('notificacion-visible'), 10);
    
    // Auto-cerrar después de la duración especificada
    if (duracion > 0) {
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                notificacion.classList.add('notificacion-saliendo');
                setTimeout(() => notificacion.remove(), 300);
            }
        }, duracion);
    }
}


// Función para mostrar la imagen ampliada y descripción
function mostrarImagenAmpliada(producto) {
    const modal = document.getElementById('image-modal');
    const productName = document.getElementById('image-product-name');
    const modalImage = document.getElementById('modal-product-image');
    const descriptionContainer = document.getElementById('product-description-container');
    
    // Establecer el nombre del producto
    productName.textContent = producto.articulo;
    
    // Obtener la ruta de la imagen
    let rutaImagen = producto.imagen ? `media/${producto.imagen}` : 'media/placeholder.png';
    
    // Establecer la imagen
    modalImage.src = rutaImagen;
    modalImage.alt = producto.articulo;
    modalImage.onerror = function() {
        this.src = 'media/placeholder.png';
    };
    
    // Establecer tamaño máximo de la imagen
    modalImage.style.maxWidth = '500px';
    modalImage.style.maxHeight = '500px';
    
    // Añadir el código del producto debajo del título
    const headerElement = document.querySelector('.image-modal-content .modal-header');
    
    // Eliminar código anterior si existe
    const oldCodeElement = document.querySelector('.product-code-container');
    if (oldCodeElement) {
        oldCodeElement.remove();
    }
    
    // Crear y añadir el nuevo contenedor de código
    const codeContainer = document.createElement('div');
    codeContainer.className = 'product-code-container';
    codeContainer.innerHTML = `<span class="product-code-label">Ref.: ${producto.codigo || 'N/A'}</span>`;
    
    // Insertar después del header
    headerElement.parentNode.insertBefore(codeContainer, headerElement.nextSibling);
    
    // Limpiar y actualizar el contenedor de descripción
    descriptionContainer.innerHTML = '';
    
    // Comprobar si es un producto con tallas
    const tieneTallas = productos.some(p => 
        p.articulo === producto.articulo && 
        p.codigo !== producto.codigo &&
        p.talla && p.talla !== 'N/A' && p.talla !== ''
    );
    
    // Construir el contenido HTML de la descripción
    let contenidoHTML = '';
    
    // Añadir descripción si está disponible
    if (producto.descripcion && producto.descripcion.trim() !== '') {
        // Formatear la descripción para que cada número comience en una nueva línea
        let descripcionFormateada = producto.descripcion
            .replace(/(\d+\s+[a-záéíóúñ]+)/gi, '<br>$1')  // Añadir salto de línea antes de cada número seguido de texto
            .replace(/^<br>/, '');  // Eliminar el primer <br> si está al inicio
        
        contenidoHTML += `
            <div class="product-description-title">Descripción:</div>
            <div class="product-description-text">${descripcionFormateada}</div>
        `;
    }
    
    // Añadir selector de tallas si el producto tiene tallas
    if (tieneTallas) {
        const variantesTalla = productos.filter(p => p.articulo === producto.articulo);
        const tallasDisponibles = variantesTalla.filter(p => p.talla && p.talla !== 'N/A' && p.talla !== '');
        
        if (tallasDisponibles.length > 0) {
            contenidoHTML += `
                <div class="talla-section" style="margin-top: 5px;">
                    <div class="product-description-title">Seleccionar talla:</div>
                    <div class="size-selector-container" style="margin: 15px 0;">
                        <select id="talla-imagen-modal" class="size-selector" style="width: 100%; padding: 12px; font-size: 16px;">
                            ${tallasDisponibles.map(p => `<option value="${p.codigo}">${p.talla}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <hr style="margin: 25px 0;">
            `;
        }
    } else if (contenidoHTML) {
        // Si hay descripción pero no tallas, añadir un separador
        contenidoHTML += `<hr style="margin: 25px 0;">`;
    }
    
    // Añadir selector de unidades
    contenidoHTML += `
        <div class="cantidad-section" style="margin-top: 5px;">
            <div class="product-description-title">Cantidad:</div>
            <div class="quantity-input-container" style="margin: 8px 0; display: flex; justify-content: center; align-items: center;">
                <button class="quantity-btn decrease-image-modal" style="width: 35px; height: 35px; font-size: 18px;">-</button>
                <input type="number" id="cantidad-imagen-modal" value="1" min="1" max="99" style="width: 60px; height: 35px; text-align: center; margin: 0 15px; font-size: 18px; padding: 0 10px;">
                <button class="quantity-btn increase-image-modal" style="width: 35px; height: 35px; font-size: 18px;">+</button>
            </div>
        </div>
    `;
    
    // Añadir unidades disponibles (si el campo existe)
    if (producto.unidades !== undefined && producto.unidades !== null) {
        contenidoHTML += `
            <div style="margin-top: 10px;">
                <div class="product-description-title">Unidades disponibles:</div>
                <div class="product-description-text">${producto.unidades}</div>
            </div>
        `;
    }
    
    // Si hay contenido para mostrar
    if (contenidoHTML) {
        descriptionContainer.innerHTML = contenidoHTML;
        descriptionContainer.style.display = 'block';
    } else {
        descriptionContainer.style.display = 'none';
    }
    
    // Configurar los botones de cantidad
    setTimeout(() => {
        const decreaseBtn = document.querySelector('.decrease-image-modal');
        const increaseBtn = document.querySelector('.increase-image-modal');
        const quantityInput = document.getElementById('cantidad-imagen-modal');
        
        if (decreaseBtn && increaseBtn && quantityInput) {
            decreaseBtn.addEventListener('click', () => {
                if (parseInt(quantityInput.value) > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            });
        }
    }, 100);
    
    // Configurar el botón de añadir al carrito
    const addButton = document.getElementById('add-from-image-modal');
    
    // Configurar el evento del botón según si tiene tallas o no
    addButton.onclick = function() {
        const cantidad = parseInt(document.getElementById('cantidad-imagen-modal').value);
        
        if (tieneTallas) {
            // Si tiene tallas, obtener la talla seleccionada
            const tallaSelector = document.getElementById('talla-imagen-modal');
            if (tallaSelector) {
                const codigoSeleccionado = tallaSelector.value;
                agregarAlCarritoConCantidad(codigoSeleccionado, cantidad);
            }
        } else {
            // Si no tiene tallas, añadir directamente al carrito
            agregarAlCarritoConCantidad(producto.codigo, cantidad);
        }
        
        // Cerrar el modal de imagen
        modal.style.display = 'none';
    };
    
    // Mostrar el modal
    modal.style.display = 'block';
}

/**
 * Muestra el modal de configuración de un pack, multiplicando las cantidades
 * de sus componentes según el parámetro `multiplicador`.
 *
 * @param {string} packCode       Código del pack (se busca en packConfiguraciones).
 * @param {string} packName       Nombre del pack (para el título del modal).
 * @param {number} multiplicador  Factor por el que se multiplican las cantidades originales.
 */
function mostrarConfiguradorPack(packCode, packName, multiplicador = 1) {
    // 1. Buscar la configuración del pack
    const configPack = packConfiguraciones[packCode];
    if (!configPack) {
      console.error('Pack no encontrado:', packCode);
      return;
    }
  
    // 2. Multiplicar las cantidades de cada componente
    configPack.componentes.forEach(c => {
      c.cantidad = c.cantidad * multiplicador;
    });
  
    // 3. Referencias al modal
    const modal = document.getElementById('pack-config-modal');
    const title = document.getElementById('pack-config-title');
    const body  = document.getElementById('pack-config-body');
  
    // 4. Ajustar cabecera y limpiar cuerpo
    title.textContent = `Configurar: ${packName}`;
    body.innerHTML     = '';
    seleccionesUsuario = [];
  
    // 5. Generar UI para cada componente
    configPack.componentes.forEach((componente, idx) => {
      // Contenedor principal
      const cont = document.createElement('div');
      cont.className = 'pack-component-container';
      cont.dataset.componentIndex = idx;
      cont.dataset.required       = componente.cantidad;
  
      cont.innerHTML = `
        <div class="pack-component-header">
          <h3>${componente.nombre} (${componente.cantidad})</h3>
        </div>
        <div class="pack-component-selections" data-component-index="${idx}"></div>
        <div class="component-progress">
          <span class="progress-label">Progreso:</span>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width:0%"></div>
          </div>
          <span class="progress-value">0/${componente.cantidad}</span>
        </div>
        <button class="add-variant-btn" data-component-index="${idx}">
          <span class="material-icons">add_circle_outline</span> Añadir variante
        </button>
      `;
      body.appendChild(cont);
  
      // 5a. Forzar cada opción de código a string y buscar producto
      const opcionesProductos = componente.opciones
        .map(rawCode => {
          const codeStr = String(rawCode);
          const producto = productos.find(p => String(p.codigo) === codeStr);
          if (!producto) {
            console.warn(`Variante no encontrada para código "${codeStr}"`);
            return null;
          }
          let nombreVar = producto.articulo;
          if (producto.talla && producto.talla !== 'N/A') {
            nombreVar += ` - ${producto.talla}`;
          }
          return {
            codigo: codeStr,
            nombre: nombreVar,
            precio: parseFloat(producto.precio) || 0,
            imagen: producto.imagen ? `media/${producto.imagen}` : 'media/placeholder.png'
          };
        })
        .filter(o => o !== null);
  
      // 5b. Añadir la primera fila de selección
      añadirFilaSeleccion(idx, opcionesProductos, componente.cantidad);
  
      // 5c. Evento "Añadir variante"
      cont.querySelector('.add-variant-btn').addEventListener('click', () => {
        const seleccionadas = obtenerCantidadSeleccionadaComponente(idx);
        const faltantes     = componente.cantidad - seleccionadas;
        if (faltantes > 0) {
          añadirFilaSeleccion(idx, opcionesProductos, faltantes);
        } else {
          mostrarNotificacion(`Ya has seleccionado las ${componente.cantidad} unidades requeridas`, 'info');
        }
      });
    });
  
    // 6. Configurar botón "Añadir al Carrito" del modal
    const btnAdd = document.getElementById('pack-cart-button');
    btnAdd.onclick = () => {
      // Validar que no falte ni sobre producto
      let completo = true, exceso = false;
      configPack.componentes.forEach((c, i) => {
        const sel = obtenerCantidadSeleccionadaComponente(i);
        if (sel < c.cantidad) completo = false;
        if (sel > c.cantidad) exceso   = true;
      });
      if (!completo) return mostrarNotificacion('Debes seleccionar todas las cantidades requeridas', 'warning');
      if (exceso)   return mostrarNotificacion('Has seleccionado más productos de los permitidos', 'warning');
  
      // Recopilar y añadir al carrito
      recopilarSeleccionesUsuario();
      seleccionesUsuario.forEach(item => {
        agregarAlCarritoConCantidad(item.codigo, item.cantidad);
      });
  
      modal.style.display = 'none';
      mostrarNotificacion(`Pack ${packName} configurado y añadido al carrito`, 'success');
    };
  
    // 7. Mostrar el modal
    modal.style.display = 'block';
  }
  

// Función para añadir una nueva fila de selección
function añadirFilaSeleccion(componentIndex, opcionesProductos, cantidadMaxima) {
    const selectionsContainer = document.querySelector(`.pack-component-selections[data-component-index="${componentIndex}"]`);
    const selectionId = `${componentIndex}-${Date.now()}`;
    
    // Crear fila de selección
    const selectionRow = document.createElement('div');
    selectionRow.className = 'pack-selection-row';
    selectionRow.dataset.selectionId = selectionId;
    
    // HTML para el selector y controles
    selectionRow.innerHTML = `
        <div class="selection-controls">
            <div class="variant-selector">
                <select class="product-variant-select" data-component-index="${componentIndex}" data-selection-id="${selectionId}">
                    <option value="">Seleccione una variante...</option>
                    ${opcionesProductos.map(p => `<option value="${p.codigo}" data-nombre="${p.nombre}" data-precio="${p.precio}" data-imagen="${p.imagen}">${p.nombre}</option>`).join('')}
                </select>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn decrease-btn">-</button>
                <input type="number" class="quantity-input" value="1" min="1" max="${cantidadMaxima}" data-component-index="${componentIndex}" data-selection-id="${selectionId}">
                <button class="quantity-btn increase-btn">+</button>
            </div>
        </div>
        <div class="selection-preview">
            <!-- Aquí se mostrará la vista previa del producto seleccionado -->
        </div>
        <button class="remove-selection-btn" title="Eliminar selección">
            <span class="material-icons">close</span>
        </button>
    `;
    
    selectionsContainer.appendChild(selectionRow);
    
    // Obtener elementos
    const variantSelect = selectionRow.querySelector('.product-variant-select');
    const quantityInput = selectionRow.querySelector('.quantity-input');
    const decreaseBtn = selectionRow.querySelector('.decrease-btn');
    const increaseBtn = selectionRow.querySelector('.increase-btn');
    const previewContainer = selectionRow.querySelector('.selection-preview');
    const removeBtn = selectionRow.querySelector('.remove-selection-btn');
    
    // Evento para cambio en el selector de variante
    variantSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value) {
            const nombre = selectedOption.getAttribute('data-nombre');
            const precio = parseFloat(selectedOption.getAttribute('data-precio'));
            const imagen = selectedOption.getAttribute('data-imagen');
            
            // Actualizar la vista previa
            previewContainer.innerHTML = `
                <img src="${imagen}" alt="${nombre}" class="selection-preview-image" onerror="this.src='media/placeholder.png'">
                <div class="selection-preview-details">
                    <div class="selection-preview-name">${nombre}</div>
                    <div class="selection-preview-price">${precio.toFixed(2)}€</div>
                </div>
            `;
            
            // Actualizar el array de selecciones
            actualizarSeleccionUsuario(componentIndex, selectionId, selectedOption.value, nombre, precio, parseInt(quantityInput.value));
            
            // Actualizar la barra de progreso
            actualizarProgresoComponente(componentIndex);
            actualizarTotalPack();
        } else {
            // Limpiar vista previa
            previewContainer.innerHTML = '';
            
            // Eliminar del array de selecciones
            eliminarSeleccionUsuario(selectionId);
            
            // Actualizar barra de progreso
            actualizarProgresoComponente(componentIndex);
            actualizarTotalPack();
        }
    });
    
    // Eventos para los botones de cantidad
    decreaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            
            // Actualizar la selección
            if (variantSelect.value) {
                const selectedOption = variantSelect.options[variantSelect.selectedIndex];
                actualizarSeleccionUsuario(
                    componentIndex,
                    selectionId,
                    variantSelect.value,
                    selectedOption.getAttribute('data-nombre'),
                    parseFloat(selectedOption.getAttribute('data-precio')),
                    parseInt(quantityInput.value)
                );
                
                // Actualizar barra de progreso
                actualizarProgresoComponente(componentIndex);
                actualizarTotalPack();
            }
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        const cantidadSeleccionada = obtenerCantidadSeleccionadaComponente(componentIndex);
        const cantidadRequerida = parseInt(document.querySelector(`.pack-component-container[data-component-index="${componentIndex}"]`).dataset.required);
        
        // Calcular cuánto se puede incrementar sin pasarse
        const cantidadDisponible = cantidadRequerida - (cantidadSeleccionada - currentValue);
        
        if (currentValue < cantidadMaxima && currentValue < cantidadDisponible) {
            quantityInput.value = currentValue + 1;
            
            // Actualizar la selección
            if (variantSelect.value) {
                const selectedOption = variantSelect.options[variantSelect.selectedIndex];
                actualizarSeleccionUsuario(
                    componentIndex,
                    selectionId,
                    variantSelect.value,
                    selectedOption.getAttribute('data-nombre'),
                    parseFloat(selectedOption.getAttribute('data-precio')),
                    parseInt(quantityInput.value)
                );
                
                // Actualizar barra de progreso
                actualizarProgresoComponente(componentIndex);
                actualizarTotalPack();
            }
        } else {
            mostrarNotificacion(`No puedes añadir más unidades de este producto. Límite alcanzado.`, 'info');
        }
    });
    
    // Evento para cambio directo en el input
    quantityInput.addEventListener('change', function() {
        let newValue = parseInt(this.value);
        
        // Validar que sea un número
        if (isNaN(newValue)) {
            newValue = 1;
        }
        
        // Asegurar que está entre 1 y el máximo
        newValue = Math.max(1, Math.min(newValue, cantidadMaxima));
        
        // Ajustar si excede el total permitido
        const cantidadSeleccionada = obtenerCantidadSeleccionadaComponente(componentIndex);
        const cantidadAnterior = parseInt(this.dataset.lastValue || 1);
        const cantidadRequerida = parseInt(document.querySelector(`.pack-component-container[data-component-index="${componentIndex}"]`).dataset.required);
        
        // Calcular cuánto se puede incrementar sin pasarse
        const cantidadDisponible = cantidadRequerida - (cantidadSeleccionada - cantidadAnterior);
        
        if (newValue > cantidadDisponible) {
            newValue = cantidadDisponible;
            mostrarNotificacion(`Se ajustó la cantidad para no exceder el límite.`, 'info');
        }
        
        // Actualizar el valor
        this.value = newValue;
        this.dataset.lastValue = newValue;
        
        // Actualizar la selección
        if (variantSelect.value) {
            const selectedOption = variantSelect.options[variantSelect.selectedIndex];
            actualizarSeleccionUsuario(
                componentIndex,
                selectionId,
                variantSelect.value,
                selectedOption.getAttribute('data-nombre'),
                parseFloat(selectedOption.getAttribute('data-precio')),
                newValue
            );
            
            // Actualizar barra de progreso
            actualizarProgresoComponente(componentIndex);
            actualizarTotalPack();
        }
    });
    
    // Evento para eliminar la fila
    removeBtn.addEventListener('click', function() {
        // Eliminar del array de selecciones
        eliminarSeleccionUsuario(selectionId);
        
        // Eliminar la fila
        selectionRow.remove();
        
        // Actualizar barra de progreso
        actualizarProgresoComponente(componentIndex);
        actualizarTotalPack();
    });
    
    // Guardar el valor actual para comparaciones
    quantityInput.dataset.lastValue = quantityInput.value;
    
    return selectionRow;
}

// Función para obtener la cantidad seleccionada para un componente
function obtenerCantidadSeleccionadaComponente(componentIndex) {
    let total = 0;
    
    // Obtener todas las selecciones de este componente
    const selecciones = seleccionesUsuario.filter(s => s.componentIndex === componentIndex);
    
    // Sumar las cantidades
    selecciones.forEach(s => {
        total += s.cantidad;
    });
    
    return total;
}

// Función para actualizar el progreso visual de un componente
function actualizarProgresoComponente(componentIndex) {
    const container = document.querySelector(`.pack-component-container[data-component-index="${componentIndex}"]`);
    const progressBar = container.querySelector('.progress-bar');
    const progressValue = container.querySelector('.progress-value');
    const cantidadRequerida = parseInt(container.dataset.required);
    
    // Obtener la cantidad actual seleccionada
    const cantidadSeleccionada = obtenerCantidadSeleccionadaComponente(componentIndex);
    
    // Calcular el porcentaje
    const porcentaje = Math.min((cantidadSeleccionada / cantidadRequerida) * 100, 100);
    
    // Actualizar la barra de progreso
    progressBar.style.width = `${porcentaje}%`;
    
    // Actualizar el texto
    progressValue.textContent = `${cantidadSeleccionada}/${cantidadRequerida}`;
    
    // Cambiar el color según el progreso
    progressBar.classList.remove('complete', 'over');
    
    if (cantidadSeleccionada === cantidadRequerida) {
        progressBar.classList.add('complete');
    } else if (cantidadSeleccionada > cantidadRequerida) {
        progressBar.classList.add('over');
    }
    
    // Actualizar el estado del botón "Añadir variante"
    const btnAddVariant = container.querySelector('.add-variant-btn');
    if (cantidadSeleccionada >= cantidadRequerida) {
        btnAddVariant.disabled = true;
        btnAddVariant.style.opacity = '0.5';
    } else {
        btnAddVariant.disabled = false;
        btnAddVariant.style.opacity = '1';
    }
}


// Función para actualizar una selección en el array de selecciones
function actualizarSeleccionUsuario(componentIndex, selectionId, codigo, nombre, precio, cantidad) {
    // Buscar si ya existe
    const index = seleccionesUsuario.findIndex(s => s.selectionId === selectionId);
    
    if (index !== -1) {
        // Actualizar
        seleccionesUsuario[index] = {
            selectionId,
            componentIndex,
            codigo,
            articulo: nombre,
            precio,
            cantidad
        };
    } else {
        // Añadir nuevo
        seleccionesUsuario.push({
            selectionId,
            componentIndex,
            codigo,
            articulo: nombre,
            precio,
            cantidad
        });
    }
}

// Función para eliminar una selección del array
function eliminarSeleccionUsuario(selectionId) {
    seleccionesUsuario = seleccionesUsuario.filter(s => s.selectionId !== selectionId);
}

// Función para recopilar todas las selecciones actualizadas
function recopilarSeleccionesUsuario() {
    // Limpiar selecciones previas
    seleccionesUsuario = [];
    
    // Recorrer todos los selectores de variantes
    const variantSelects = document.querySelectorAll('.product-variant-select');
    
    variantSelects.forEach(select => {
        if (select.value) {
            const componentIndex = parseInt(select.dataset.componentIndex);
            const selectionId = select.dataset.selectionId;
            const selectedOption = select.options[select.selectedIndex];
            
            const codigo = select.value;
            const nombre = selectedOption.getAttribute('data-nombre');
            const precio = parseFloat(selectedOption.getAttribute('data-precio'));
            
            // Buscar el input de cantidad correspondiente
            const quantityInput = document.querySelector(`.quantity-input[data-selection-id="${selectionId}"]`);
            const cantidad = parseInt(quantityInput.value);
            
            // Añadir a las selecciones
            seleccionesUsuario.push({
                selectionId,
                componentIndex,
                codigo,
                articulo: nombre,
                precio,
                cantidad
            });
        }
    });
}

// Función para actualizar el total del pack
function actualizarTotalPack() {
    const totalElement = document.getElementById('pack-config-total');
    if (!totalElement) return;
    
    // Calcular el total sumando los precios de los productos seleccionados
    const total = seleccionesUsuario
        .filter(item => item !== null && item !== undefined)
        .reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    totalElement.textContent = total.toFixed(2);
}

// Reemplaza las funciones de creación y configuración del modal
function crearModalConfiguradorPack() {
    console.log("Creando modal del configurador...");
    
    // Eliminar el modal existente si hay alguno
    const modalExistente = document.getElementById('pack-config-modal');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    // Crear el modal desde cero
    const modal = document.createElement('div');
    modal.id = 'pack-config-modal';
    modal.className = 'modal';
    
    modal.innerHTML = `
    <div class="modal-content pack-config-content">
        <div class="modal-header">
            <h2 id="pack-config-title">Configurar Pack</h2>
            <span class="pack-config-close">&times;</span>
        </div>
        <div class="modal-body" id="pack-config-body">
            <!-- Aquí se cargarán dinámicamente los productos del pack -->
        </div>
        <div class="modal-footer">
            <button id="pack-cart-button" class="pack-add-cart-btn">Añadir al Carrito</button>
        </div>
    </div>
    `;
    
    // Añadir al DOM
    document.body.appendChild(modal);
    console.log("Modal agregado al DOM");
    
    // Configurar el evento de cierre
    const closeBtn = modal.querySelector('.pack-config-close');
    closeBtn.addEventListener('click', function() {
        console.log("Cerrar modal clickeado");
        modal.style.display = 'none';
    });
    
    // Cerrar al hacer clic fuera del modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Función para verificar las selecciones
function verificarSeleccionesPack() {
    // Obtener todos los contenedores de componentes
    const componenteContainers = document.querySelectorAll('.pack-component-container');
    let todoCompleto = true;
    let hayExcesos = false;
    
    componenteContainers.forEach(container => {
        const componentIndex = parseInt(container.dataset.componentIndex);
        const cantidadRequerida = parseInt(container.dataset.required);
        const cantidadSeleccionada = obtenerCantidadSeleccionadaComponente(componentIndex);
        
        if (cantidadSeleccionada < cantidadRequerida) {
            todoCompleto = false;
            // Resaltar visualmente el componente incompleto
            container.classList.add('incomplete');
            setTimeout(() => {
                container.classList.remove('incomplete');
            }, 2000);
        }
        
        if (cantidadSeleccionada > cantidadRequerida) {
            hayExcesos = true;
            // Resaltar visualmente el componente con exceso
            container.classList.add('over-selected');
            setTimeout(() => {
                container.classList.remove('over-selected');
            }, 2000);
        }
    });
    
    if (!todoCompleto) {
        mostrarNotificacion('Debes seleccionar todas las cantidades requeridas', 'warning');
    } else if (hayExcesos) {
        mostrarNotificacion('Has seleccionado más productos de los permitidos en alguna categoría', 'warning');
    } else {
        mostrarNotificacion('¡Perfecto! Ya puedes añadir al carrito', 'success');
    }
}

// Función para inicializar el configurador de packs
function inicializarConfiguradorPacks() {
    console.log("Inicializando configurador de packs...");
    
    // Añadir estilos CSS
    const estilos = document.createElement('style');
    estilos.textContent = `
    /* Estilos para el configurador de packs */
    .pack-config-content {
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .pack-component-container {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        transition: background-color 0.3s ease;
    }
    
    .pack-component-container.incomplete {
        background-color: rgba(255, 82, 82, 0.1);
    }
    
    .pack-component-container.over-selected {
        background-color: rgba(255, 179, 0, 0.1);
    }
    
    .pack-component-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .pack-component-header h3 {
        color: var(--azul-oscuro);
        font-size: 18px;
        font-weight: 500;
    }
    
    .pack-component-counter {
        font-size: 14px;
        color: var(--gris);
        padding: 3px 8px;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .pack-component-counter.complete {
        background-color: rgba(76, 175, 80, 0.2);
        color: #2e7d32;
    }
    
    .pack-component-counter.over {
        background-color: rgba(255, 82, 82, 0.2);
        color: #d32f2f;
    }
    
    .pack-component-options {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 15px;
    }
    
    .pack-product-variant {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f7f9fc;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #eee;
    }
    
    .variant-info {
        display: flex;
        align-items: center;
        flex: 1;
    }
    
    .variant-image {
    width: 250px;
    height: 250px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

    .variant-image img {
        max-width: 250px;
        max-height: 250px;
        width: auto;
        height: auto;
        object-fit: contain;
        background-color: white;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    
    .variant-details {
        flex: 1;
    }
    
    .variant-name {
        font-weight: 500;
        color: var(--azul-oscuro);
        margin-bottom: 3px;
        font-size: 14px;
    }
    
    .variant-code {
        font-size: 12px;
        color: var(--gris);
        margin-bottom: 3px;
    }
    
    .variant-price {
        font-weight: 600;
        color: var(--amarillo);
        font-size: 14px;
    }
    
    .variant-quantity {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    
    .variant-quantity-input {
        width: 40px;
        text-align: center;
        margin: 0 5px;
        padding: 4px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .pack-product-header {
        margin-bottom: 15px;
    }
    
    .pack-product-header h3 {
        color: var(--azul-oscuro);
        font-size: 18px;
        font-weight: 500;
    }
    
    .pack-product-selection {
        margin-bottom: 15px;
    }
    
    .pack-product-selector {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
    }
    
    .pack-product-preview {
        display: flex;
        align-items: center;
        background-color: #f7f9fc;
        padding: 15px;
        border-radius: 8px;
        margin-top: 10px;
    }
    
    .product-preview-image {
    width: 250px;
    height: 250px;
    max-width: 250px;
    max-height: 250px;
    object-fit: contain;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-right: 15px;
}
    
    .product-preview-info {
        display: flex;
        flex-direction: column;
    }
    
    .product-preview-name {
        font-weight: 500;
        color: var(--azul-oscuro);
        margin-bottom: 5px;
    }
    
    .product-preview-code {
        font-size: 14px;
        color: var(--gris);
        margin-bottom: 5px;
    }
    
    .product-preview-price {
        font-weight: 600;
        color: var(--amarillo);
    }
    
    /* Arreglar problema de las líneas en el footer */
    .modal-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: none !important; /* Eliminar línea superior */
    }
    
    .pack-config-summary {
        margin: 20px 0;
        padding-top: 10px;
        border-top: 2px solid var(--azul-oscuro);
        width: 100%;
    }
    
    #add-pack-to-cart {
        width: 300px;
        margin: 0; /* Eliminar márgenes */
        border: 1px solid var(--azul-oscuro); /* Un solo borde */
    }
    
    /* Botón configurar */
    /* Botón configurar */
    .configure-pack {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.8rem 1.5rem;
        background: #003865;
        color: white;
        border: 1px solid #003865;
        text-decoration: none;
        font-weight: 600;
        font-size: 18px;
        transition: transform 0.3s ease, color 0.6s ease, border-color 0.6s ease;
        position: relative;
        overflow: hidden;
        z-index: 1;
        width: 100%;
        height: 40px;
        text-align: center;
        cursor: pointer;
    }

    .configure-pack:hover {
        color: #003865;
    }

    .configure-pack::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #85e0d2;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.6s ease;
        z-index: -1;
    }

    
    /* Botón verificar */
    .check-btn {
        background-color: #f0f0f0;
        color: var(--azul-oscuro);
        border-color: #ddd;
        margin-right: 15px;
    }
    
    .check-btn:hover {
        background-color: #e0e0e0;
    }
    
    /* Estilos para la X de cerrar */
    .pack-config-close {
        color: var(--azul-oscuro);
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.2s;
    }
    
    .pack-config-close:hover {
        color: var(--azul-claro);
    }
    `;
    
    document.head.appendChild(estilos);
    console.log("Estilos CSS añadidos");
    
    // Crear el modal
    crearModalConfiguradorPack();
}

// Función para determinar si un producto es un pack
function esProductoPack(producto) {
    if (!producto || !producto.codigo) return false;
    return packConfiguraciones.hasOwnProperty(producto.codigo);
}

// Función para actualizar el total del pack
function actualizarTotalPack(selecciones) {
    const totalElement = document.getElementById('pack-config-total');
    
    // Calcular el total sumando los precios de los productos seleccionados
    const total = selecciones
        .filter(item => item !== null && item !== undefined)
        .reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    totalElement.textContent = total.toFixed(2);
}

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', inicializarApp);