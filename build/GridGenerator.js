export default class GridGenerator {
    static generateGrid(xPos, yPos, itemAmount, height, itemWidth, itemHeight, paddingX, paddingY) {
        const positions = [];
        const xPositions = [];
        let amountPerRow = 0;
        let itemsHeight = (itemHeight + paddingY);
        let i = 0;
        let onNextRow = false;
        while (i < itemAmount && !onNextRow) {
            amountPerRow += 1;
            if (itemsHeight > height) {
                onNextRow = true;
            }
            else {
                itemsHeight += (itemHeight + paddingY);
            }
        }
        console.log(itemAmount, amountPerRow);
        let rowAmount = Math.floor(itemAmount / amountPerRow);
        if (itemAmount % amountPerRow !== 0)
            rowAmount += 1;
        console.log(rowAmount);
        if (rowAmount % 2 === 0) {
            for (let i = rowAmount / 2; i > 0; i--) {
                xPositions.push(xPos - (itemWidth * i) - (paddingX * i) + (itemWidth / 2));
            }
            for (let i = 0; i < (rowAmount / 2); i++) {
                xPositions.push(xPos + (itemWidth * (i + 1)) + (paddingX * (i + 1)) - (itemWidth / 2));
            }
        }
        else {
            for (let i = (rowAmount - 1) / 2; i > 0; i--) {
                xPositions.push(xPos - (itemWidth * i) - (paddingX * i));
            }
            xPositions.push(xPos);
            for (let i = 0; i < (rowAmount - 1) / 2; i++) {
                xPositions.push(xPos + (itemWidth * (i + 1)) + (paddingX * (i + 1)));
            }
        }
        xPositions.forEach((xPosition) => {
            for (let i = 0; i < amountPerRow; i++) {
                positions.push({ x: xPosition, y: yPos + ((itemHeight + paddingY) * i) });
            }
        });
        return positions;
    }
}
