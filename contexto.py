import os
from pathlib import Path

# Configuración
EXTENSIONES_PERMITIDAS = {'.html', '.css', '.js', '.json', '.md'}
CARPETAS_IGNORADAS = {'node_modules', '.git', '__pycache__', '.venv', 'dist', 'build'}
ARCHIVO_SALIDA = 'contexto_proyecto_ia.txt'

def generar_arbol(ruta_dir, prefijo='', archivo_txt=None):
    """Genera una representación visual de la estructura del proyecto."""
    ruta = Path(ruta_dir)
    if ruta.name in CARPETAS_IGNORADAS:
        return

    archivos = sorted([f for f in ruta.iterdir() if f.is_file() and f.suffix in EXTENSIONES_PERMITIDAS])
    directorios = sorted([d for d in ruta.iterdir() if d.is_dir() and d.name not in CARPETAS_IGNORADAS])
    
    elementos = directorios + archivos
    for i, elemento in enumerate(elementos):
        es_ultimo = (i == len(elementos) - 1)
        conector = '└── ' if es_ultimo else '├── '
        
        linea = f"{prefijo}{conector}{elemento.name}\n"
        archivo_txt.write(linea)
        
        if elemento.is_dir():
            siguiente_prefijo = prefijo + ('    ' if es_ultimo else '│   ')
            generar_arbol(elemento, siguiente_prefijo, archivo_txt)

def procesar_archivos(ruta_base, archivo_salida):
    ruta_base = Path(ruta_base)
    
    with open(archivo_salida, 'w', encoding='utf-8') as f_out:
        # 1. Escribir encabezado y estructura del proyecto
        f_out.write("==================================================\n")
        f_out.write("ESTRUCTURA DEL PROYECTO (ÁRBOL DE DIRECTORIOS)\n")
        f_out.write("==================================================\n\n")
        generar_arbol(ruta_base, archivo_txt=f_out)
        f_out.write("\n\n")
        
        # 2. Recorrer y volcar el contenido de los archivos relevantes
        f_out.write("==================================================\n")
        f_out.write("CONTENIDO DE LOS ARCHIVOS DEL PROYECTO\n")
        f_out.write("==================================================\n\n")
        
        for raiz, dirs, archivos in os.walk(ruta_base):
            # Filtrar carpetas ignoradas sobre la marcha
            dirs[:] = [d for d in dirs if d not in CARPETAS_IGNORADAS]
            
            for archivo in sorted(archivos):
                ruta_archivo = Path(raiz) / archivo
                
                if ruta_archivo.suffix in EXTENSIONES_PERMITIDAS and ruta_archivo.name != archivo_salida:
                    # Calcular ruta relativa para que el reporte sea limpio
                    ruta_relativa = ruta_archivo.relative_to(ruta_base)
                    
                    f_out.write(f"--- INICIO ARCHIVO: {ruta_relativa} ---\n")
                    try:
                        with open(ruta_archivo, 'r', encoding='utf-8') as f_in:
                            f_out.write(f_in.read())
                    except Exception as e:
                        f_out.write(f"[ERROR AL LEER ARCHIVO: {e}]\n")
                    f_out.write(f"\n--- FIN ARCHIVO: {ruta_relativa} ---\n\n")

if __name__ == "__main__":
    # Obtiene la ruta donde se está ejecutando el script
    ruta_actual = os.getcwd()
    print(f"Esaneando el proyecto en: {ruta_actual}")
    print(f"Filtrando extensiones: {', '.join(EXTENSIONES_PERMITIDAS)}")
    
    procesar_archivos(ruta_actual, ARCHIVO_SALIDA)
    
    print(f"\n¡Listo! Contexto unificado en '{ARCHIVO_SALIDA}'")
