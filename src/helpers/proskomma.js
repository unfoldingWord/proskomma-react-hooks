
export const importDocument = async ({ proskomma, document, onImport, serialize, verbose=false }) => {
  let result;
  const { selectors, bookCode, data } = document;
  try { // import the file
    result = await proskomma.importDocuments(selectors, "usfm", [data], { serialize });
    verbose && console.log(`Imported`, selectors, bookCode, result);
    onImport();
  } catch (e) {
    console.log(`Failed to Import`, selectors, bookCode, e);
  };
  return result;
};

export const importDocuments = async ({ proskomma, documents, onImport, serialize, verbose }) => {
  documents.forEach(async (document) => {
    await importDocument({ proskomma, document, onImport, verbose });
  });
};