import React, { useState, useEffect } from 'react';

/**
 * Disable the ESLint `import/no-extraneous-dependencies` for import ReactDOM
 * ReactDOM is only use for build the `live demo page` and `dev`,
 * so keep it in devDependencies
 */
import ReactDOM from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies

import Navbar from './Navbar';
import Section from './Section';

import ExampleDefault from './ExampleDefault';

import './index.scss';

const name = 'React TokenInput (react-customize-token-input)';
const url =
  'https://github.com/seawind543/example-react-token-input-with-formik';

const examples = [<ExampleDefault key="ExampleDefault" />];

const App = () => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const titles = [];
    (document.querySelectorAll('h2') || []).forEach((h2) => {
      const url = (h2.lastChild.className || '').split(' ').includes('hashTag')
        ? h2.lastChild.href
        : '#';

      titles.push({
        label: h2.firstChild.textContent || '',
        url,
      });
    });
    setTitles(titles);
  }, []);

  return (
    <div>
      <Navbar name={name} url={url} />
      <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
        <div className="row">
          <h1>Table of contents</h1>
          <ul>
            {titles.map((title, index) => {
              const { label, url } = title;

              const isUrlExist = url !== '#';
              return (
                <li key={index}>
                  {isUrlExist && <a href={url}>{label}</a>}
                  {!isUrlExist && <span>{label}</span>}
                </li>
              );
            })}
          </ul>
        </div>

        {examples.map((example, index) => (
          <div className="row" key={index}>
            <Section>{example}</Section>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
