export default abstract class GridGenerator {
  public static generateGrid(
    xPos: number, 
    yPos: number, 
    itemAmount: number, 
    height: number, 
    itemWidth: number, 
    itemHeight: number, 
    paddingX: number, 
    paddingY: number
  ) {
    
    const positions: {x: number, y: number}[] = []
    const xPositions: number[] = []
    let amountPerRow = 0;
    let itemsHeight = (itemHeight + paddingY)
    let i = 0
    let onNextRow = false
    while (i < itemAmount && !onNextRow) {
      amountPerRow += 1
      if (itemsHeight > height) {
        onNextRow = true
      } else {
        itemsHeight += (itemHeight + paddingY)
      }
    }

    let rowAmount = Math.floor(itemAmount / amountPerRow)
    if (itemAmount % amountPerRow !== 0) rowAmount += 1
    
    if (rowAmount % 2 === 0) {
      for(let i = rowAmount / 2;  i > 0; i--) {
        xPositions.push(xPos - (itemWidth * i) - (paddingX * i) + (itemWidth / 2))
      }
      for(let i = 0; i < (rowAmount / 2); i++) {
        xPositions.push(xPos + (itemWidth * (i + 1)) + (paddingX* (i + 1)) - (itemWidth / 2))
      }
    } else {
      for(let i = (rowAmount - 1) / 2; i > 0; i--) {
        xPositions.push(xPos - (itemWidth * i) - (paddingX * i))
      }
      xPositions.push(xPos)
      for(let i = 0; i < (rowAmount - 1) / 2; i++) {
        xPositions.push(xPos + (itemWidth * (i + 1)) + (paddingX * (i + 1)))
      }
    }
    xPositions.forEach((xPosition) => {
      for (let i = 0; i < amountPerRow; i++) {
        positions.push({x: xPosition, y: yPos + ((itemHeight + paddingY) * i)})
      }
    })
    
    return positions
  }

  
}