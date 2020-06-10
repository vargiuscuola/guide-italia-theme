# Tema della documentazione interna di Vargiu Scuola

Il presente è un fork del repository [GitHub - italia/docs-italia-theme: Tema per i documenti pubblicati su Docs Italia](https://github.com/italia/docs-italia-theme).

Oltre alle modifiche allo stile e contenuti del tema, è stata aggiunta la versione unminified del file `docs_italia_theme/static/css/theme.css` con nome `theme.unmin.css` per consentirmi di apportare più agevolmente alcune modifiche.  
Dopo ciascuna modificha al file `theme.unmin.css` si può rigenerare il file minified tramite il comando (supponendo che il repository risieda nella directory `/opt/git/vargiuscuola/docs-italia-theme`):
```console
$ yui-compressor ./docs_italia_theme/static/css/theme.unmin.css >./docs_italia_theme/static/css/theme.css
```

Il file `theme.css` in realtà è stato generato originariamente tramite compilazione del file `sass/theme.scss` con comandi tipo i seguenti:
```console
$ gem install sass
$ sass ./sass/theme.scss >./docs_italia_theme/static/css/theme.css
```
Il file `sass` contiene però un riferimento a quelli del tema presente nel repository `italia/bootstrap-italia` (precisamente viene inclusa la directory `bootstrap-italia/src/scss/bootstrap-italia`): vista l'esiguità delle modifiche ho preferito procedere con la modifica diretta del file `css`.

---
**IMPORTANTE**

Dopo l'aggiornamento di questo repository, eseguire il seguente comando per aggiornare il relativo pacchetto `pip`:
```
$ pip install --upgrade "git+ssh://git@github.com/vargiuscuola/docs-italia-theme@bootstrap-italia"
```
---

Di seguito la documentazione in lingua inglese del repository originario.

[![Join the #design channel](https://img.shields.io/badge/Slack%20channel-%23design-blue.svg)](https://developersitalia.slack.com/messages/C7658JRJR)
[![Get invited](https://slack.developers.italia.it/badge.svg)](https://slack.developers.italia.it/)

# Docs Italia theme

This is the official theme for any piece of documentation hosted on the
upcoming Docs Italia.

## How to use Sphinx Italia on your documentation

* Add the following line to your documentation `requirements.txt` file:

    ```
    $ pip install git+https://github.com/italia/docs-italia-theme.git
    ```

* In your `conf.py` file, you'll need to specify the theme as follows:

    ```
    # Add this line at the top of the file within the "import" section
    import docs_italia_theme

    # Add the Sphinx extension 'docs_italia_theme' in the extensions list
    extensions = [
      ...,
      'docs_italia_theme'
    ]

    # Edit these lines
    html_theme = "docs_italia_theme"
    html_theme_path = [docs_italia_theme.get_html_theme_path()]
    ```

## Contributing or modifying the theme

* Clone the repository:

    ```
    git clone git+https://github.com/italia/docs-italia-theme.git
    ```

* If needed, install [Sphinx](http://www.sphinx-doc.org/en/stable/) into a virtual environment:

    ```
    pip install sphinx
    ```

* If needed, install [SASS](http://sass-lang.com/):

    ```
    gem install sass
    ```

4. Install [node.js](https://nodejs.org) and grunt:

    ```
    // Install node on OS X
    brew install node

    // Install grunt
    npm install -g grunt-cli

    // Now that everything is installed, let's install the theme dependecies.
    npm install
    ```

5. Run the main script to load a sample docs with the Sphinx Italia theme applied:

    ```
    npm start
    ```

    This will compile static assets and watch files required for the theme to reload at runtime.

**TODO:** building a release, handling versioning system to enable automatic update on Docs Italia platform
