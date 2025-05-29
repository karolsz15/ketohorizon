const path = window.location.pathname;
const repoName = '/ketohorizon';
const redirects = {
    [`${repoName}/articles`]: `${repoName}/articles.html`,
    [`${repoName}/recipes`]: `${repoName}/recipes.html`,
    [`${repoName}/ebooks`]: `${repoName}/ebooks.html`
};

if (redirects[path]) {
    window.location.replace(redirects[path]);
} 