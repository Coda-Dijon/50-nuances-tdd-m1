// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

(() => {
    const darkThemes = ['ayu', 'navy', 'coal'];
    const lightThemes = ['light', 'rust'];

    const classList = document.getElementsByTagName('html')[0].classList;

    let lastThemeWasLight = true;
    for (const cssClass of classList) {
        if (darkThemes.includes(cssClass)) {
            lastThemeWasLight = false;
            break;
        }
    }

    const theme = lastThemeWasLight ? 'default' : 'dark';
    mermaid.initialize({ startOnLoad: false, theme });

    // Un diagramme dans un <details> fermé se dessine mal (il n'a pas de taille) :
    // on ne dessine que les diagrammes visibles, les autres à l'ouverture du <details>
    const isHidden = (node) => node.closest('details:not([open])') !== null;
    const render = (nodes) => {
        const pending = nodes.filter((node) => !node.hasAttribute('data-processed') && !isHidden(node));
        if (pending.length) mermaid.run({ nodes: pending });
    };
    const allDiagrams = () => Array.from(document.querySelectorAll('pre.mermaid'));

    const start = () => render(allDiagrams());
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();

    document.addEventListener('toggle', (event) => {
        if (event.target.open) render(Array.from(event.target.querySelectorAll('pre.mermaid')));
    }, true);

    // Simplest way to make mermaid re-render the diagrams in the new theme is via refreshing the page

    for (const darkTheme of darkThemes) {
        document.getElementById(darkTheme).addEventListener('click', () => {
            if (lastThemeWasLight) {
                window.location.reload();
            }
        });
    }

    for (const lightTheme of lightThemes) {
        document.getElementById(lightTheme).addEventListener('click', () => {
            if (!lastThemeWasLight) {
                window.location.reload();
            }
        });
    }
})();
