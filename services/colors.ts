export const COLORS: string[] = ["#00A36C", "#6495ED", "#DE3163", "#CD7F32"];

export const generateRandomColor = (): string => {
    const randomNum: number = Math.floor(Math.random() * 4);
    return COLORS[randomNum];
}

export const fillColorsArray = (score: number): string[] => {
    const tmpColors: any[] = [];
    let randomColor = generateRandomColor();

    for (let i = 0; i < score + 1; i++) {
        while (randomColor === tmpColors[tmpColors.length - 1] ) {
            randomColor = generateRandomColor();
        }
        tmpColors.push(randomColor);
    }
    return tmpColors;
}
