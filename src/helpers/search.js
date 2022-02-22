export const searchTerms = (text) => (
  text.split(/ +/)
    .map((term) => term.trim())
    .filter((term) => term.length > 0)
    .filter(term => !term.includes(':'))
);

export const searchTermsClause = (text) => (
  searchTerms(text)
    .map(st => `"${st.toLowerCase()}"`).join(', ')
);

export const attTermsClause = (text) => (
  text.split(/ +/)
    .map((term) => term.trim())
    .filter((term) => term.length > 0)
    .filter(term => term.includes(':'))
    .map(term => term.split(':').slice(0, 2))
    .map(st => {
      const isMilestone = st[0].startsWith('x-');
      const attribute = isMilestone ? 'milestone' : 'spanWithAtts';
      const marker = isMilestone ? 'zaln' : 'w';
      return `"""attribute/${attribute}/${marker}/${st[0]}/0/${st[1]}"""`;
    }).join(', ')
);

export const searchTermsRegex = (text) => {
  const _searchTerms = searchTerms(text);
  let regex = 'xxxxx';

  if (_searchTerms.length > 0) {
    regex = _searchTerms.map(st => `(${st})`).join('|');
  };
  return regex;
};