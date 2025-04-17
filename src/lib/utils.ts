export function animateSemiEllipse(callback: (x: number, y: number) => any) {
    const startX = 490, startY = 170;
    const endX = 1120, endY = 470;
    const duration = 2000; // 2 секунды
    const fps = 60; // Количество кадров в секунду
    const steps = (duration / 1000) * fps;
    let step = 0;

    const centerX = (startX + endX) / 2;
    const centerY = endY;
    const a = (endX - startX) / 2; // Большая полуось эллипса
    const b = (endY - startY); // Малая полуось (так как полуэллипс)

    function updatePosition() {
        const t = step / steps * Math.PI; // От 0 до PI (полуэллипс)
        const x = centerX + a * Math.cos(t);
        const y = centerY - b * Math.sin(t);

        callback(x, y);

        step++;
        if (step <= steps) {
            requestAnimationFrame(updatePosition);
        }
    }

    updatePosition();
}

export function formatNumber(num: number) {
    // Разделяем число на целую и десятичную части
    const parts = num.toString().split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? `.${parts[1]}` : '';
  
    // Добавляем разделители тысяч
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return integerPart + decimalPart;
  }