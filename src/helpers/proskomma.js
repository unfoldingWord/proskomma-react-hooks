
export const importDocument = async ({
  proskomma,
  document,
  onImport,
  serialize,
  verbose = false,
}) => {
  let error;

  const {
    selectors,
    bookCode,
    data: _data,
    url,
    filetype='usfm',
  } = document;

  let data = _data;

  if (!data && !url) {
    error = 'document must include `data` or `url` attribute.';
  } else if (!data && url) {
    const response = await fetch(url);
    
    if (response.ok) {
      data = await response.text();
      
      if (verbose) console.log('importDocument(); successful fetch.', { ...selectors, bookCode, url });
    } else {
      error = `importDocument(); Failed to Download url: ${response.status}: ${response.statusText}.
      ${url}`;

      if (verbose) console.error(error, { ...selectors, bookCode, url });
    };
  };

  if (data && !error) {
    try { // import the file
      await proskomma.importDocuments(selectors, filetype, [data], { serialize });
      
      if (verbose) console.log(`Imported`, selectors, bookCode);
    } catch (e) {
      if (verbose) console.log(`Failed to Import`, { ...selectors, bookCode }, e);
      error = e;
    };
  };

  onImport({ ...selectors, bookCode });

  return error;
};

export const importDocuments = async ({
  proskomma, documents, onImport, serialize, verbose,
}) => {
  const errors = await Promise.all(documents.map(async (document) => {
    const error = await importDocument({
      proskomma, document, onImport, verbose, serialize,
    });
    return error;
  }));

  return errors;
};