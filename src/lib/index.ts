import { imageList } from "../dummy";

export const getGridStyle = (index: number) => {
    const modIndex = index % 14
    const offset = Math.floor(index / 14) * 16

    switch (modIndex) {
        case 0:
            return { gridColumn: `${1 + offset} / ${4 + offset}`, gridRow: "1 / 5" };
        case 1:
            return { gridColumn: `${4 + offset} / ${6 + offset}`, gridRow: "1 / 3" };
        case 2:
            return { gridColumn: `${4 + offset} / ${6 + offset}`, gridRow: "3 / 6", borderRadius: "120px" };
        case 3:
            return { gridColumn: `${7 + offset} / ${8 + offset}`, gridRow: "1 / 2", borderRadius: "120px", };
        case 4:
            return { gridColumn: `${8 + offset} / ${9 + offset}`, gridRow: "1 / 2", borderRadius: "120px", };
        case 5:
            return { gridColumn: `${6 + offset} / ${9 + offset}`, gridRow: "2 / 6", borderRadius: "0 0 120px 0" };
        case 6:
            return { gridColumn: `${9 + offset} / ${11 + offset}`, gridRow: "3 / 6", };
        case 7:
            return { gridColumn: `${10 + offset} / ${11 + offset}`, gridRow: "2 / 3", borderRadius: "50px 50px 0 0", };
        case 8:
            return { gridColumn: `${11 + offset} / ${14 + offset}`, gridRow: "1 / 4" };
        case 9:
            return { gridColumn: `${11 + offset} / ${13 + offset}`, gridRow: "4 / 6", borderRadius: "0 0 50px 50px", };
        case 10:
            return { gridColumn: `${14 + offset} / ${17 + offset}`, gridRow: "1 / 3" };
        case 11:
            return { gridColumn: `${14 + offset} / ${15 + offset}`, gridRow: "4 / 5", borderRadius: "120px", position: 'relative' as 'relative', top: '-2rem' as '2rem' };
        case 12:
            return { gridColumn: `${14 + offset} / ${15 + offset}`, gridRow: "5 / 6", borderRadius: "120px", position: 'relative' as 'relative', top: '-2rem' as '2rem' };
        case 13:
            return { gridColumn: `${15 + offset} / ${17 + offset}`, gridRow: "3 / 6", };
        default:
            return {};
    }
}

export const getGridStyleVer2 = (index: number) => {
    const modIndex = index % 14
    const offset = Math.floor(index / 14) * 16

    switch (modIndex) {
        case 0:
            return { gridColumn: `${1 + offset} / ${4 + offset}`, gridRow: "1 / 3" };
        case 1:
            return { gridColumn: `${1 + offset} / ${3 + offset}`, gridRow: "3 / 6" };
        case 2:
            return { gridColumn: `${3 + offset} / ${4 + offset}`, gridRow: "4 / 5", borderRadius: "120px", position: 'relative' as 'relative', top: '-2rem' as '2rem' };
        case 3:
            return { gridColumn: `${3 + offset} / ${4 + offset}`, gridRow: "5 / 6", borderRadius: "120px", position: 'relative' as 'relative', top: '-2rem' as '2rem' };
        case 4:
            return { gridColumn: `${4 + offset} / ${7 + offset}`, gridRow: "1 / 4" };
        case 5:
            return { gridColumn: `${4 + offset} / ${6 + offset}`, gridRow: "4 / 6", borderRadius: "0 0 120px 120px" };
        case 6:
            return { gridColumn: `${7 + offset} / ${8 + offset}`, gridRow: "2 / 3", borderRadius: "120px 120px 0 0" };
        case 7:
            return { gridColumn: `${7 + offset} / ${9 + offset}`, gridRow: "3 / 6"};
        case 8:
            return { gridColumn: `${9 + offset} / ${12 + offset}`, gridRow: "2 / 6", borderRadius: "0 0 0 50px", };
        case 9:
            return { gridColumn: `${9 + offset} / ${10 + offset}`, gridRow: "1 / 2", borderRadius: "120px", };
        case 10:
            return { gridColumn: `${10 + offset} / ${11 + offset}`, gridRow: "1 / 2", borderRadius: "120px" };
        case 11:
            return { gridColumn: `${12 + offset} / ${14 + offset}`, gridRow: "1 / 3", };
        case 12:
            return { gridColumn: `${12 + offset} / ${14 + offset}`, gridRow: "3 / 6", borderRadius: "120px" };
        case 13:
            return { gridColumn: `${14 + offset} / ${17 + offset}`, gridRow: "1 / 4", };
        default:
            return {};
    }
}

export const calculateMinWidth = (imageUrls: string[]) => {
    const batchSize = 28;
    const initialWidth = 600;
    const extraWidth = 600;

    const batchCount = Math.ceil(imageUrls.length / batchSize);
    return `${initialWidth + (batchCount - 1) * extraWidth}px`;
}

export const calculateGridDimensions = (imageUrls: string[]) => {
    const baseColumns = 30;
    const baseRows = 5;
    const batchSize = 30;
    const additionalColumnsPerBatch = 16;
    const additionalRowsPerBatch = 5;

    const batchCount = Math.ceil(imageUrls.length / batchSize);

    const totalColumns = baseColumns + (batchCount - 1) * additionalColumnsPerBatch;
    const totalRows = baseRows + (batchCount - 1) * additionalRowsPerBatch;

    return {
        totalColumns,
        totalRows,
    };
}

export function getRandomImages() {
    return imageList
      .sort(() => Math.random() - 0.5) 
      .slice(0, 30)
  }