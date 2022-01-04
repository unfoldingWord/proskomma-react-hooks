<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/unfoldingWord/proskomma-react-hooks">
    <img src="public/logo500.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Proskomma React Hooks</h3>
  <p align="center">
    This project is like placing training wheels on a speed bike (Proskomma).
    <br />
    <a href="https://proskomma-react-hooks.netlify.app"><strong>Explore the docs and code playground »</strong></a>
    <br />
    <br />
    <a href="https://proskomma-react-hooks.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/unfoldingWord/proskomma-react-hooks/issues">Report Bug</a>
    ·
    <a href="https://github.com/unfoldingWord/proskomma-react-hooks/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://proskomma-react-hooks.netlify.app/)

**Purpose:**
A collection of React Hooks that provide a way to simplify the implementation of Proskomma into your React projects.

**Problem:**
Proskomma.js is a very powerful tool but has a fairly steep learning curve to setup and get running.

**Scope:**
This project aims to simplify the implementing of Proskomma.js into our projects and especially the common use cases. It includes bootstrapping, importing and common queries/filters of Proskomma.

This project does not cover the downloading or obtaining of files to import.

**Background:**
We implemented Proskomma.js in a few early projects but found it taking too long to setup and too much specific domain knowledge to make it useful. We kept refactoring our common use cases into this project as custom hooks and have a single place to maintain them.

**Architecture and Design Principles:**
See ARCHITECTURE.md for details on architecture and design principles for this project.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.js](https://reactjs.org/)
* [Proskomma.js](https://github.com/mvahowe/proskomma-js)
* [React Stylguidist](https://react-styleguidist.js.org)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Prerequisites

**Data**
The source of the data to import into Proskomma are scripture files such as USFM.

Testing files can be generated using [Lorem Ipsum USFM](https://lorem-ipsum-usfm.netlify.app). 

Real USFM files can be found in multiple places such as:
- [Door43 Catalog](https://git.door43.org/catalog)
- [Ebible.org](https://ebible.org/Scriptures/)


This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation/First Steps

1. Setup a React app using `Create React App` or `React Styleguidist`.
  ```sh
  npx create-react-app proskomma-react-hooks-app
  ```
2. Add it to your React app or component library (inside your project path):
  * yarn
  ```sh
  yarn add proskomma-react-hooks
  ```
  * npm
  ```sh
  npm i proskomma-react-hooks
  ```
3. Bootstrap inside App.jsx with [useProskomma](https://proskomma-react-hooks.netlify.app/#useproskomma).
4. Import: Create a new component for Importing data [useImport](https://proskomma-react-hooks.netlify.app/#useimport).
5. Passage: Create a new component for Passage Lookup and use custom hook inside it via [usePassage](https://proskomma-react-hooks.netlify.app/#usepassage).
6. Search: Create a new component for Search and use custom hook inside it via [useSearchForPassages](https://proskomma-react-hooks.netlify.app/#usesearchforpassages)
7. Customize and run your own query [useQuery](https://proskomma-react-hooks.netlify.app/#usequery)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage/Integration

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Styleguidist](https://proskomma-react-hooks.netlify.app/#usequery)._

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [] [Return `data` in `useSearchForPassages` and `useSearchForPassagesByBookCodes` just like `useSearchForPassagesByBookCode`](https://github.com/unfoldingWord/proskomma-react-hooks/issues/16)
- [] [Import Serialized JSON for faster importing/resuming of previous Proskomma state](https://github.com/unfoldingWord/proskomma-react-hooks/issues/4)
- [] [Enable editing of data through mutations](https://github.com/unfoldingWord/proskomma-react-hooks/issues/7)
- [] [Importing of non-USFM sources such as USX](https://github.com/unfoldingWord/proskomma-react-hooks/issues/3)
- [] [Rendering to Epub, PDF, HTML, and React via pk-render](https://github.com/unfoldingWord/proskomma-react-hooks/issues/11)

See the [open issues](https://github.com/unfoldingWord/proskomma-react-hooks/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.  [Guidelines for external contributions.](https://forum.door43.org)

You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

If you would like to fork the repo and create a pull request. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Chris Klapp aka Klappy - christopher.klapp@unfoldingword.org

Project Link: [https://github.com/unfoldingWord/proskomma-react-hooks](https://github.com/unfoldingWord/proskomma-react-hooks)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Mark Howe](https://github.com/mvahowe)
* [klappy](https://github.com/klappy)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/unfoldingWord/proskomma-react-hooks.svg?style=flat
[contributors-url]: https://github.com/unfoldingWord/proskomma-react-hooks/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/unfoldingWord/proskomma-react-hooks.svg?style=flat
[forks-url]: https://github.com/unfoldingWord/proskomma-react-hooks/network/members
[stars-shield]: https://img.shields.io/github/stars/unfoldingWord/proskomma-react-hooks.svg?style=flat
[stars-url]: https://github.com/unfoldingWord/proskomma-react-hooks/stargazers
[issues-shield]: https://img.shields.io/github/issues/unfoldingWord/proskomma-react-hooks.svg?style=flat
[issues-url]: https://github.com/unfoldingWord/proskomma-react-hooks/issues
[license-shield]: https://img.shields.io/github/license/unfoldingWord/proskomma-react-hooks.svg?style=flat
[license-url]: https://github.com/unfoldingWord/proskomma-react-hooks/blob/master/LICENSE
[product-screenshot]: https://github.com/unfoldingWord/proskomma-react-hooks/raw/master/public/screen-shot.png
