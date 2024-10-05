const imageStrip = document.getElementById('roulette');
const spinBtn = document.getElementById('spin-btn');
const imageWidth = 512; // El ancho de cada imagen individual
const stripWidth = 7168; // El ancho de toda la tira de imágenes (14 * 512px)
const totalImages = 14; // Total de imágenes en una tira
let currentPosition = 0;
let isSpinning = false;

spinBtn.addEventListener('click', () => {
    if (isSpinning) return; // Evitar múltiples giros simultáneos
    isSpinning = true;

    // Generar una posición aleatoria para seleccionar una imagen dentro del strip
    const randomImage = Math.floor(Math.random() * totalImages);
    
    // Calcular el nuevo desplazamiento en base a la imagen aleatoria
    const newPosition = -(randomImage * imageWidth);

    // Actualizar la posición actual sumando el nuevo desplazamiento
    const offset = currentPosition + newPosition - imageWidth;

    // Aplicar el desplazamiento al strip de imágenes
    imageStrip.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
    imageStrip.style.transform = `translateX(${offset}px)`;

    // Actualizamos la posición actual
    currentPosition = offset;

    // Revisar si el strip ha llegado al final
    setTimeout(() => {
        // Si el desplazamiento ha superado una imagen completa de 7168px (fin del strip)
        if (Math.abs(currentPosition) >= stripWidth) {
            // Calcular la posición relativa donde debería estar en el primer strip
            currentPosition = currentPosition % stripWidth;

            // Reseteamos la posición pero en la misma imagen visible
            imageStrip.style.transition = 'none'; // Quitamos la animación para el reseteo
            imageStrip.style.transform = `translateX(${currentPosition}px)`; // Ajustar la posición

        }
        isSpinning = false; // Permitir otro giro
    }, 4000); // Duración de la animación
});
