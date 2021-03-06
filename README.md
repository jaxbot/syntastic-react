# Syntastic Checker for React JSX files

## New way using ESLint

This project has been deprecated in favor of using ESLint, which supports React, JSX, and new ES6 features, and is in very active development.

To use Syntastic with ESLint:

Install eslint, babel-eslint (for ES6 support), and [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react):

```
npm install -g eslint
npm install -g babel-eslint
npm install -g eslint-plugin-react
```

Create a config like this in your project's `.eslintrc`, or do so globally by placing it in `~/.eslintrc`:

```
{
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true
    },
    "settings": {
        "ecmascript": 6,
        "jsx": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "strict": 0,
        "quotes": 0,
        "no-unused-vars": 0,
        "camelcase": 0,
        "no-underscore-dangle": 0
    }
}
```

Finally, configure Syntastic to use ESLint:

```
let g:syntastic_javascript_checkers = ['eslint']
```

You should be good to go! See [this issue](https://github.com/jaxbot/syntastic-react/issues/6#issuecomment-86569859) for more info.

## Using this project and JSHint instead

This is a simple wrapper that:
* Tries to compile as JSX
* Checks if the JSX compiler throws errors, and sends them to Syntastic if so
* Otherwise, passes JS to JSHint and outputs any errors found there

This gives you the power of syntax checking in Vim, without the annoyance of "unexpected regular expression". Awesome.

<img src="syntastic_1.png" alt="Syntastic working with JSHint issues" width="511" height="267" />

<img src="syntastic_2.png" alt="Syntastic working with JSX issues" width="568" height="236" />

# Usage

```
npm install -g syntastic-react
```

If you don't have jshint or react-tools, install those too:

```
npm install -g jshint
npm install -g react-tools
```

Add these lines to your vimrc:

```
let g:syntastic_javascript_checkers = ['jsxhint']
let g:syntastic_javascript_jsxhint_exec = 'jsx-jshint-wrapper'
```

And, of course, install Syntastic.

# More info

This is a part of [a blog post on setting up Vim for React development](https://jaxbot.me/articles/setting-up-vim-for-react-js-jsx-02-03-2015).

## Why? What about JSXHint?

JSXHint is being sunsetted and [doesn't handle React errors correctly](https://github.com/STRML/JSXHint/issues/45). This code is a simple wrapper that brings the best of both worlds, though this one is designed specifically for use with syntastic, and thus will not run the same way as the previous JSXHint wrapper.

# JSON support

If you receive an `Unexpected token` error when editing JSON files, note that Vim defaults to `json` being `ft=javascript`. Two main options exist to remedy this:

1. Use [vim-json](https://github.com/elzr/vim-json) and get proper JSON highlighting and filetype support.

2. Override the filetype manually in your vimrc, something like:

```
au BufRead,BufNewFile *.json set filetype=json
let g:syntastic_json_checkers=['jsonlint']
```

(Thanks, [sharkinsspatial](https://github.com/sharkinsspatial)!)

## About me

I'm Jonathan, I work on random Vim plugins, web development, Node.js, Android, and whatever else I feel like. [Follow me](https://github.com/jaxbot) if you're curious, or just want to make my day!
