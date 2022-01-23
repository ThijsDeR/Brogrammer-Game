export default class GridGenerator {
    static generateGrid(xPos, yPos, itemAmount, height, itemWidth, itemHeight, paddingX, paddingY) {
        const positions = [];
        const xPositions = [];
        let amountPerRow = 0;
        let itemsHeight = (itemHeight + paddingY);
        const i = 0;
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
        let rowAmount = Math.floor(itemAmount / amountPerRow);
        if (itemAmount % amountPerRow !== 0)
            rowAmount += 1;
        if (rowAmount % 2 === 0) {
            for (let a = rowAmount / 2; a > 0; a--) {
                xPositions.push(xPos - (itemWidth * a) - (paddingX * a) + (itemWidth / 2));
            }
            for (let b = 0; b < (rowAmount / 2); b++) {
                xPositions.push(xPos + (itemWidth * (b + 1)) + (paddingX * (b + 1)) - (itemWidth / 2));
            }
        }
        else {
            for (let c = (rowAmount - 1) / 2; c > 0; c--) {
                xPositions.push(xPos - (itemWidth * c) - (paddingX * c));
            }
            xPositions.push(xPos);
            for (let d = 0; d < (rowAmount - 1) / 2; d++) {
                xPositions.push(xPos + (itemWidth * (d + 1)) + (paddingX * (d + 1)));
            }
        }
        xPositions.forEach((xPosition) => {
            for (let e = 0; e < amountPerRow; e++) {
                positions.push({ x: xPosition, y: yPos + ((itemHeight + paddingY) * e) });
            }
        });
        return positions;
    }
}
