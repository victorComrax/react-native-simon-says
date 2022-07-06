export const COLORS: string[] = ["#00A36C", "#6495ED", "#DE3163", "#CD7F32"];

export const generateRandomColor = (): string => {
    const randomNum: number = Math.floor(Math.random() * 4);
    return COLORS[randomNum];
}
