
import React, { useState } from 'react';

function App() {

  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTone, setSelectedTone] = useState('informative');
  const [translatedOutput, setTranslatedOutput] = useState('');

  const handleTranslation = async () => {

    try {

      if (translatedOutput) {
        setTranslatedOutput("")
      }
      const response = await fetch('http://localhost:8000/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify
          ({

            message: inputText,
            prompt: `Translate the above text to ${selectedLanguage} with a ${selectedTone} tone.`

          }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      if (result.choices && result.choices.length > 0) {
        setTranslatedOutput(result.choices[0].message.content);
      } else {
        console.warn('No translation result found.');
        setTranslatedOutput('');
      }

    }
    catch (error) {
      console.error('Error during translation', error)
    }
  };
  return (

    <div className="flex items-center justify-center flex-col h-screen">

      <h1 className="text-3xl font-bold mb-8 text-slate-900">TweetAI</h1>
      <div className="w-full max-w-xl p-4">
        <form className=''>
          <div className="mb-4 mt-16">
            <label className="block text-slate-900 text-sm font-semibold mb-2 mt-3" htmlFor="enterInput">
              Tweet to rewrite(Paste your content here)
            </label>
            <textarea
              className="shadow-lg text-md appearance-none border-2 border-slate-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-2 hover:border-double hover:border-slate-950 transition-transform transform hover:scale-105"
              id="enterInput"
              type="text"
              rows="5"
              placeholder="Write your content..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-900 text-sm font-semibold mb-2" htmlFor="languageDropdown">
              Tone
            </label>
            <select
              className="block shadow-lg text-md appearance-none w-full bg-white border-2 border-slate-400 px-3 py-2 rounded-lg leading-tight focus:outline-none focus:shadow-outline hover:border-2 hover:border-double hover:border-slate-950 transition-transform transform hover:scale-105"
              id="toneDropdown"
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
            >
              <option value="standard">Standard</option>
              <option value="professional">Professional</option>
              <option value="informative">Informative</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-slate-900 text-sm font-semibold mb-2" htmlFor="languageDropdown">
              Language
            </label>
            <select
              className="block appearance-none text-md w-full bg-white border-2 border-slate-400 px-3 py-2 rounded-lg shadow-lg leading-tight focus:outline-none focus:shadow-outline hover:border-2 hover:border-double hover:border-slate-950 transition-transform transform hover:scale-105"
              id="languageDropdown"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="gu">Gujarati</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-slate-900 hover:bg-slate-600 text-slate-100 font-semibold py-2 px-6  shadow-lg rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
              type="button"
              onClick={handleTranslation}
            >
              Another one?
            </button>
          </div>


          <div className="mb-4 mt-8 relative">

            <textarea
              className="shadow-lg text-md appearance-none border-2 border-slate-400 rounded-lg w-full py-2 pl-4 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-2 hover:border-double hover:border-slate-950 transition-transform transform hover:scale-105"
              id="enterInput"
              type="text"
              rows="10"
              placeholder="Your content inspiration is here..."
              readOnly
              value={translatedOutput}
            />


            <button
              className="absolute bottom-4 text-sm right-5 bg-slate-600 hover:bg-slate-500 text-slate-200 font-semibold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
            >
              Copy
            </button>



          </div>

        </form>
      </div>
    </div>

  );
};

export default App;

