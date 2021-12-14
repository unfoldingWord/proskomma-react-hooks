import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 2, min: 1 },
  wordsPerSentence: { max: 16, min: 2 },
});

export const loremIpsumPhrase = ({size}) => {
  const phrase = lorem.generateWords(size);
  return phrase;
};

export const loremIpsumVerse = ({verseNumber}) => {
  const verse = lorem.generateParagraphs(1);
  return `\v ${verseNumber} ${verse}`;
};

export const loremIpsumVerses = ({verseCount, start=1}) => {
  let verses = new Array(verseCount);
  verses = verses.map((_, index) => {
    const verseNumber = start + index;
    return loremIpsumVerse({verseNumber});
  }).join('\n');

  return verses;
};

export const loremIpsumVerseParagraph = ({verseCount, offset}) => {
  const verses = loremIpsumVerses({verseCount, offset});
  const paragraph = `\\p\n${verses}`;
  return paragraph;
};

export const loremIpsumVerseParagraphs = ({paragraphCount}) => {
  let paragraphs = new Array(paragraphCount);
  let offset = 0;
  paragraphs = paragraphs.map((_, index) => {
    const _count = getRandomInt(1, 6);
    offset = offset + _count;
    const paragraph = loremIpsumVerseParagraph({size: _count, offset});
    return paragraph;
  }).join('\n\n');
  return paragraphs;
};

export const loremIpsumChapter = ({chapterNumber, paragraphCount}) => {
  const paragraphs = loremIpsumVerseParagraphs({paragraphCount});
  const chapter = `\\c ${chapterNumber}\n\n${paragraphs}`;
  return chapter;
}

export const loremIpsumChapters = ({size}) => {
  const _count = size || getRandomInt(1, 200);
  let chapters = new Array(_count);
  chapters = chapters.map((_, index) => {
    const paragraphCount = getRandomInt(4,100);
    const chapterNumber = index + 1;
    const chapter = loremIpsumChapter({chapterNumber, paragraphCount});
    return chapter;
  }).join('\n\n');
  return chapters;
};

const getRandomInt = (min, max) => {
  return Math.round((min - 0.5) + Math.random() * (max - min + 1));
}
