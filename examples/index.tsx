/* eslint @typescript-eslint/no-shadow: 0 */

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import Navbar from './Navbar';
import Section from './Section';

import ExampleDefault from './ExampleDefault';

import './index.scss';

const name = 'React TokenInput (react-customize-token-input)';
const url =
  'https://github.com/seawind543/example-react-token-input-with-formik';

const examples = [<ExampleDefault key="ExampleDefault" />];

type ExampleTitle = {
  label: string;
  url: string;
};

const App = () => {
  const [exampleTitles, setExampleTitles] = useState<ExampleTitle[]>([]);

  useEffect(() => {
    const exampleTitles: ExampleTitle[] = [];
    (document.querySelectorAll('h2') || []).forEach((h2) => {
      // const url = (h2?.lastChild?.className || '').split(' ').includes('hashTag')
      //   ? h2?.lastChild?.href
      //   : '#';
      const anchor: HTMLAnchorElement | null = h2?.querySelector('.hashTag');
      const url = anchor?.href || '#';

      exampleTitles.push({
        label: h2?.firstChild?.textContent || '',
        url,
      });
    });
    setExampleTitles(exampleTitles);
  }, []);

  return (
    <div>
      <Navbar name={name} url={url} />
      <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
        <div className="row">
          <h1>Table of contents</h1>
          <ul>
            {exampleTitles.map((exampleTitle, index) => {
              const { label, url } = exampleTitle;

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

const container = document.getElementById('container');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
